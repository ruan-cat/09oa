export default [
	{
		path: "/office",
		component: () => import("@/views/main/office/Office.vue"),
		redirect: "/office/todo",
		children: [
			{ path: "todo", component: () => import("@/components/main/office/page/TodoList.vue") },
			{ path: "addprocess", component: () => import("@/components/main/office/page/Addprocess.vue") },
		],
	},
];
