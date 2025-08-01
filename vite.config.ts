import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import * as fs from "node:fs";

import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import vueDevTools from "vite-plugin-vue-devtools";
import { visualizer } from "rollup-plugin-visualizer";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { createPlugin } from "vite-plugin-autogeneration-import-file";
import tsAlias from "@ruan-cat/vite-plugin-ts-alias";

import { getRouteName } from "@ruan-cat/utils/unplugin-vue-router";
import {
	createDirOptionNameFunction,
	pathResolve,
	defaultAutoImportTemplate,
} from "@ruan-cat/utils/vite-plugin-autogeneration-import-file";

/**
 * 用全量导入的方式 获取类型
 * 这些类型不能写成export导入的形式，会导致全局类型声明失效
 *
 * 也可以等效地用 三斜线表达式 实现全量导入
 * <reference types="./types/env.shim.d.ts" />
 */
import "./types/env.shim.d.ts";

const { autoImport, resolver } = createPlugin();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	/**
	 * 根据当前工作目录中的 `mode` 加载 .env 文件
	 * @deprecated
	 * 不推荐 环境变量的类型声明文件 现在包含了vite的客户端拓展
	 *
	 * 客户端的拓展类型 包含一个索引类型
	 *
	 * 故无法准确推断key值的类型了
	 *
	 * 该函数效果不佳 故不推荐使用
	 */
	const getViteEnv = (mode: ConfigEnv["mode"], target: keyof ImportMetaEnv) => {
		// eslint-disable-next-line no-undef
		return loadEnv(mode, process.cwd())[target];
	};

	// 提供类型声明 便于得到使用提示
	const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;
	const VITE_PROXY_PREFIX = env.VITE_PROXY_PREFIX;
	const VITE_BASE_URL = env.VITE_BASE_URL;
	const VITE_APP_PORT = env.VITE_APP_PORT;
	// TODO: VITE_API_URL 在本项目疑似冗余
	const VITE_API_URL = env.VITE_API_URL;

	return {
		server: {
			open: true,
			host: "0.0.0.0",
			port: Number(VITE_APP_PORT),
			proxy: {
				[VITE_PROXY_PREFIX]: {
					changeOrigin: true,
					target: VITE_BASE_URL,
					rewrite: (path) => path.replace(new RegExp("^" + VITE_PROXY_PREFIX), ""),
				},
			},
		},

		build: {
			assetsDir: "static",
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							const regex = /.pnpm\/(.*?)\//;
							// const res = id.toString().split("node_modules/")[1].split("/")[0].toString();
							const ids = id.toString().split("node_modules/");
							const targetId = ids[1];
							const chunkNames = targetId.split("/");
							// 如果等于pnpm，说明是pnpm的包，需要取第二个
							if (chunkNames[0] === ".pnpm") {
								// console.log("in  chunkNames[0]", chunkNames[0]);
								return chunkNames[1];
							} else {
								return chunkNames[0];
							}
						}
					},
				},
				external: new RegExp("views/sample/.*"),
			},
		},

		plugins: [
			/**
			 * 类型化路由插件
			 * @description
			 * 其定义位置必须在 `@vitejs/plugin-vue` 插件之前。
			 *
			 * @see https://uvr.esm.is/introduction.html#installation
			 */
			VueRouter({
				dts: "./types/typed-router.d.ts",
				routesFolder: [
					{
						/**
						 * 在我们项目中，页面放在 views 文件夹下。
						 *
						 * 文档建议是写在pages内
						 * src: "src/pages",
						 */
						src: "src/views",
					},
				],
				getRouteName,
			}),

			/**
			 * 打包体积分析插件
			 * @description
			 * 暂不提供
			 */
			visualizer({
				filename: "./dist/visualizer/index.html",
				title: "visualizer打包分析报告",
				template: "treemap",
			}),

			vue(),

			/**
			 * 自动生成类型声明文件插件
			 */
			autoImport([
				// components 目录
				{
					// 文件命名规则
					name: createDirOptionNameFunction("Components"),
					// 匹配规则 匹配全部的vue组件
					pattern: ["**/*.vue"],
					// 监听的文件夹
					dir: pathResolve("./src/components"),
					// 生成的文件
					// FIXME: 当不包含文件路径时，就出现错误 如果没有预先准备好文件夹，就会生成失败。
					toFile: "./types/components-in-components-path.d.ts",
					// 文件生成模板
					template: defaultAutoImportTemplate,
					codeTemplates: [
						{
							key: "//code",
							template: '{{name}}: typeof import("{{path}}")["default"];\n    ',
						},
					],
				},

				// views 目录
				{
					name: createDirOptionNameFunction("Page"),
					pattern: ["**/*.vue"],
					dir: pathResolve("./src/views"),
					toFile: pathResolve("./types/components-in-views-path.d.ts"),
					template: defaultAutoImportTemplate,
					codeTemplates: [
						{
							key: "//code",
							template: '{{name}}: typeof import("{{path}}")["default"];\n    ',
						},
					],
				},
			]),

			AutoImport({
				imports: [
					VueRouterAutoImports,
					"@vueuse/core",
					"vue",
					"pinia",
					{ "@vueuse/integrations/useAxios": ["useAxios"] },
					{ "@ruan-cat/utils": ["isConditionsEvery", "isConditionsSome"] },
					{ from: "@ruan-cat/utils", imports: ["Prettify", "ToNumberLike"], type: true },
					{ "lodash-es": ["isUndefined", "isEmpty", "cloneDeep", "merge", "uniqueId"] },

					// 导入二次封装时使用的vueuse类型
					{
						from: "@ruan-cat/utils/vueuse",
						imports: [
							"KeyHelper",
							"UseAxiosOptions",
							"UseAxiosWrapperParams",
							"KeyAxiosRequestConfig",
							"RemoveUrlMethod",
							"CreateAxiosRequestConfig",
						],
						type: true,
					},

					// useAxios-for-01s 类型
					{
						type: true,
						from: "@ruan-cat/utils/vueuse/useAxios-for-01s/index.ts",
						imports: [
							"ParamsPathKey",
							"ParamsQueryKey",
							"ParamsBodyKey",
							"HttpParamWay",
							"AxiosRequestConfigBaseKey",
							"UseAxiosOptionsJsonVO",
							"UseAxiosOptionsImmediate",
							"JsonVO",
							"PageDTO",
						],
					},

					// useAxios-for-01s 函数与变量
					{
						"@ruan-cat/utils/vueuse/useAxios-for-01s/index.ts": [
							"UpType",
							"HttpCode",
							"MapContentTypeUpType",
							"useRequestIn01s",
						],
					},
				],
				ignore: ["vue-router"],
				dirs: [
					"src/**/*",
					// 组合式api
					{ glob: "src/composables/**/*", types: true },
				],
				dts: "./types/auto-imports.d.ts",
				resolvers: [ElementPlusResolver()],
			}),

			Components({
				version: 3,
				include: [],
				dirs: [
					// 不生成 不负责。目前此文件夹下面的组件，交给其他的插件实现生成，生成特定的命名规则前缀
					// "src/components",
					// 也不负责具体的路由页面
					// "src/views",
				],
				dts: "./types/components.d.ts",
				directoryAsNamespace: true,
				resolvers: [
					ElementPlusResolver(),
					resolver([0, 1]),
					IconsResolver({
						enabledCollections: ["icon-park"],
					}),
				],
			}),

			Icons({
				autoInstall: true,
			}),

			/**
			 * 开发调试插件
			 * @description
			 * vueDevTools 必须在 createHtmlPlugin 的前面导入
			 *
			 * @see https://github.com/vuejs/devtools-next/issues/278#issuecomment-2021745201
			 */
			vueDevTools(),

			createHtmlPlugin({
				inject: {
					data: {
						title: getViteEnv(mode, "VITE_APP_TITLE"),
					},
				},
			}),

			tsAlias({
				/**
				 * tsconfig name, optional.
				 * @default 'tsconfig.json'
				 */
				tsConfigName: "tsconfig.app.json",
			}),
		],
	};
});
