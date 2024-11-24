export default [
	{
		path: "/contentindex",
		component: () => import("@/views/main/contentindex/index.vue"),
	},
	{
		path: "/contentindex/fixedAsset/:appId",
		component: () => import("@/views/main/contentindex/FixedAssetDetails.vue"),
	},
	{
		path: "/contentindex/fixedAsset/newMessage",
		component: () => import("@/views/main/contentindex/NewMessage.vue"),
		props: (route) => ({
			id: route.query.id, //点击消息的id
			categoryId: route.query.categoryId, //点击分类的id
			appId: route.query.appId, //应用的id
		}),
	},
];
