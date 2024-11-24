import { defineStore } from "pinia";
import { getCurrentUserApi, postRefreshTokenApi, getMenusApi } from "@/apis/login";
import Request from "@/apis/request";
import { ElMessage } from "element-plus";
// 测试菜单数据
const tempMenus = [
	{
		index: 1,
		path: "/index",
		name: "系统首页",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/homepage.png",
	},
	{
		index: 2,
		path: "/office",
		name: "办公中心",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/taskCenter.png",
	},
	{
		index: 3,
		path: "/process",
		name: "流程应用管理",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/process.png",
	},
	{
		index: 4,
		path: "/organize",
		name: "组织管理",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/org.png",
	},
	{
		index: 5,
		path: "/contentset",
		name: "内容管理设置",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/cms.png",
	},
	{
		index: 6,
		path: "/contentindex",
		name: "内容管理首页",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/cmsIndex.png",
	},
	{
		index: 7,
		path: "/schedule",
		name: "日程安排",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/calendar.png",
	},
	{
		index: 8,
		path: "/personal",
		name: "个人设置",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/profile.png",
	},
	{
		index: 9,
		path: "/system",
		name: "系统配置",
		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/setting.png",
	},
	{
		index: 10,
		path: "/information",
		name: "消息通知",
		image: layoutImages.Message,
	},
	{
		index: 11,
		path: "/meeting",
		name: "会议管理",
		image: layoutImages.Message,
	},
	{
		index: 12,
		path: "/networkdisk",
		name: "企业网盘",
		image: layoutImages.Message,
	},
];

export const userStore = defineStore("user", {
	// persist: {
	// 	key: "user-store",
	// 	enabled: true,
	// 	strategies: [
	// 		{
	// 			storage: localStorage,
	// 		},
	// 	],
	// },
	state: () => ({
		// 记录token
		token: null,
		// 记录refreshToken
		refreshToken: null,
		// 保存一个标识信息，指示登陆后需要加载的初始化数据是否完成
		loaded: false,
		// 保存当前用户
		user: {},
		// 菜单数据
		menus: [],
	}),
	getters: {
		// 获取token
		getToken: (state) => state.token || localStorage.getItem("token"),
		// 是否已加载
		isLoaded: (state) => state.loaded,
		// 获取当前用户
		getUser: (state) => state.user,
		// 获取菜单
		getMenus: (state) => state.menus,
	},
	actions: {
		// 加载用户
		async loadUser() {
			// 发送获取当前用户信息请求
			await getCurrentUserApi(
				(data) => {
					this.user = data;
				},
				(err) => {
					console.log(err);
					ElMessage.error("获取用户信息失败");
				},
			);
		},
		// 加载菜单
		async loadMenus() {
			// 发送获取菜单请求
			await getMenusApi(
				(data) => {
					// 处理菜单数据,以兼容我们的代码
					// this.menus = tempMenus;
					// fix:等待后端修复
					this.menus = data.map((menu) => ({
						index: menu.id,
						path: menu.href,
						name: menu.text,
						image: menu.icon,
					}));
					ElMessage.success("获取菜单成功");
				},
				() => {
					ElMessage.error("获取菜单失败");
				},
			);
		},
		// 加载刷新凭证
		loadRefreshToken() {
			if (!this.refreshToken) this.refreshToken = localStorage.getItem("refreshToken");
		},
		// 刷新token
		async reloadToken() {
			// 先加载刷新凭证
			this.loadRefreshToken();
			// 发送刷新凭证请求
			await postRefreshTokenApi(
				{
					refreshToken: this.refreshToken,
					clientId: import.meta.env.VITE_API_URL,
				},
				(data) => {
					//设置Token相关属性
					this.setToken(data);
				},
				() => {
					ElMessage.error("刷新凭证失败");
				},
			);
		},
		// 设置是否加载完成
		setLoaded(loaded) {
			this.loaded = loaded;
		},
		// 设置token
		setToken(data) {
			this.token = data.token;
			this.refreshToken = data.refreshToken;
			localStorage.setItem("token", this.token);
			localStorage.setItem("refreshToken", this.refreshToken);
		},
		// 重置数据
		resetSaveData() {
			this.loaded = false;
			this.user = null;
			this.token = null;
			this.refreshToken = null;
			this.menus = []; // 重置menus
			this.system = []; // 重置system
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		},
	},
});
