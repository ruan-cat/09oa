import { createRouter, createWebHistory } from "vue-router";
import { routes as autoRoutes, handleHotUpdate } from "vue-router/auto-routes";

import { ElMessage } from "element-plus";
import { userStore } from "../stores/user";

/**
 * 项目原本就有的路由
 * @description
 * 这里预设的都是静态路由
 */
const originRoutes = [
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("../views/status/404.vue"),
	},
	{
		path: "/forbidden",
		name: "Forbidden",
		component: () => import("../views/status/403.vue"),
	},
	{
		path: "/error",
		name: "Error",
		component: () => import("../views/status/500.vue"),
	},
];

// 读取login模块路由
const loginRouter = import.meta.glob("./login/index.js", { eager: true });
for (const path in loginRouter) {
	// @ts-ignore
	originRoutes.push(...loginRouter[path].default);
}

// 读取main模块路由
const mainRouter = import.meta.glob("./main/index.js", { eager: true });
for (const path in mainRouter) {
	// @ts-ignore
	originRoutes.push(...mainRouter[path].default);
}

// TODO[TEST_CODE]:读取示例演示模块路由
if (import.meta.env.DEV) {
	const sampleRouter = import.meta.glob("./sample/index.js", { eager: true });
	for (const path in sampleRouter) {
		// @ts-ignore
		originRoutes.push(...sampleRouter[path].default);
	}
}
// TODO[TEST_CODE]:读取task演示模块路由
const taskRouter = import.meta.glob("./task/index.js", { eager: true });
for (const path in taskRouter) {
	// @ts-ignore
	originRoutes.push(...taskRouter[path].default);
}

const routes = [...originRoutes, ...autoRoutes];

// 定义一个路由对象
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// 添加一个路由的全局前置守卫
router.beforeEach(async function (to, from, next) {
	// 判断是否是登录页面
	// @ts-ignore
	if (to.name === "Login" || to.name === "NotFound" || to.name === "Forbidden" || to.name === "Error") {
		next();
		return;
	}

	// TODO[TEST_CODE]:放行示例模块访问
	if (import.meta.env.DEV) {
		if (to.path.indexOf("sample") !== -1) {
			next();
			return;
		}
	}

	// 判断本地是否记录token值
	let store = userStore();
	let token = store.getToken;
	// 如果有token
	if (token) {
		// 判断是否已经加载数据
		let isLoaded = store.isLoaded;
		// 如果没有加载
		if (!isLoaded) {
			// 加载用户信息
			console.log("加载用户信息");
			await store.loadUser();
			// 加载菜单资源
			console.log("加载菜单资源");

			await store.loadMenus();
			// 设置加载完毕
			store.setLoaded(true);
		}
		next();
	}
	// 如果没有token值，直接进入登录
	else {
		// @ts-ignore
		next({ name: "Login" });
		ElMessage.warning("在未登录时，禁止访问其他页面！");
	}
});

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
	handleHotUpdate(router);
}

export default router;
