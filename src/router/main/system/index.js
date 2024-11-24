export default [
	{
		path: "/system",
		component: () => import("@/views/main/system/System.vue"),
		children: [
			{
				path: "/system/systemdata",
				component: () => import("@/views/main/system/system-data.vue"),
			},
			{
				path: "/system/template",
				component: () => import("@/views/main/system/template-management.vue"),
			},
			{
				path: "/system/password",
				component: () => import("@/views/main/system/password-config.vue"),
			},
			{
				path: "/system/login",
				component: () => import("@/views/main/system/login-config.vue"),
			},
			{
				path: "/system/new-table",
				component: () => import("@/views/main/system/new-table-web.vue"),
			},
		],
	},
];
