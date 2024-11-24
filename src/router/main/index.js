const routes = [
	{
		path: "/layout",
		name: "Layout",
		redirect: { name: "index" },
		component: () => import("@/components/layout/Layout.vue"),
		children: [
			{
				path: "/index",
				name: "index",
				component: () => import("@/views/main/index/Index.vue"),
			},
		],
	},
];

// 读取子目录下的 `index.js`，并将其内容设置为二级路由
const secondRouter = import.meta.glob("./**/index.js", { eager: true });

for (const path in secondRouter) {
	// 将每个文件夹下的 `index.js` 路由添加到 Layout 的 children 中
	routes[0].children.push(...secondRouter[path].default);
}

export default routes;
