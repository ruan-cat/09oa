import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import tsAlias from "vite-plugin-ts-alias";

import viteConfig from "./vite.config";

// 定义测试配置
const testConfig = defineConfig({
	test: {
		environment: "jsdom",
		exclude: [...configDefaults.exclude, "e2e/**"],
		root: fileURLToPath(new URL("./", import.meta.url)),
	},

	plugins: [
		// 使用tsAlias插件来处理tsconfig路径别名
		tsAlias({
			/**
			 * tsconfig name, optional.
			 * @default 'tsconfig.json'
			 */
			tsConfigName: "tsconfig.app.json",
		}),
	],
});

// 导出合并后的配置
export default defineConfig(({ mode }) => {
	/**
	 * 暂不考虑从vite内获取配置 目前vite允许导入ts文件，而vitest却不允许
	 * @see https://cn.vitejs.dev/config/#configuring-vite
	 * 故目前vitest不导入vite配置。
	 */

	// @ts-ignore
	// return mergeConfig(testConfig, viteConfig({ mode }));
	return testConfig;
});
