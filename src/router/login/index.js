const routes = [
	{
		path: "/",
		name: "Login",
		component: () => import("@/views/main/login/Login.vue"),
	},
];

export default routes;
