import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

// 定义测试配置
const testConfig = defineConfig({
	test: {
		environment: "jsdom",
		exclude: [...configDefaults.exclude, "e2e/**"],
		root: fileURLToPath(new URL("./", import.meta.url)),
	},
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
