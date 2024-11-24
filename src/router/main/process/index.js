export default [
	{
		path: "/process",
		component: () => import("@/views/main/process/Process.vue"),
	},
	{
		path: "/process/details/:id",
		component: () => import("@/views/main/process/ProcessDetails.vue"),
	},
	{
		path: "/process/formmanage",
		name: "FormManage", // 添加路由名称
		component: () => import("@/views/main/process/FormManage.vue"),
		props: (route) => ({
			id: route.query.id,
			templateId: route.query.templateId,
			appId: route.query.appId,
		}),
	},
	{
		path: "/process/flowmanage",
		component: () => import("@/views/main/process/FlowManage.vue"),
	},
	{
		path: "/process/datadictionary",
		component: () => import("@/views/main/process/DataDictionary.vue"),
	},
];
