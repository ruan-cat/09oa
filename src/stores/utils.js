import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Menu Store
 * 使用组合式 API 定义 Pinia Store
 */
export const useUtilsStore = defineStore("utils", () => {
	/**
	 * 截取路由的前一个部分
	 * @param {string} path 当前路由路径
	 * @returns {string} 截取后的路径
	 */
	const getActiveMenu = (path) => {
		const segments = path.split("/");
		// segments[0] 是空字符串，因为路径以 '/' 开头
		if (segments.length >= 2) {
			return `/${segments[1]}`;
		} else {
			return path;
		}
	};
	// 下载文件 download("logic-flow.json", data);
	const download = (filename, text) => {
		const element = document.createElement("a");
		element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
		element.setAttribute("download", filename);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};
	// 公开 actions
	return {
		getActiveMenu,
		download,
	};
});
