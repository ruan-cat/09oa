import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";
import { userStore } from "./user";
const user = userStore();
export const useTabsStore = defineStore("tabs", () => {
	const tags = ref(["首页"]);
	// const item = ref([
	// 	{
	// 		index: 1,
	// 		path: "/index",
	// 		name: "系统首页",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/homepage.png",
	// 	},
	// 	{
	// 		index: 2,
	// 		path: "/office",
	// 		name: "办公中心",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/taskCenter.png",
	// 	},
	// 	{
	// 		index: 3,
	// 		path: "/process",
	// 		name: "流程应用管理",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/process.png",
	// 	},
	// 	{
	// 		index: 4,
	// 		path: "/organize",
	// 		name: "组织管理",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/org.png",
	// 	},
	// 	{
	// 		index: 5,
	// 		path: "/contentset",
	// 		name: "内容管理设置",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/cms.png",
	// 	},
	// 	{
	// 		index: 6,
	// 		path: "/contentindex",
	// 		name: "内容管理首页",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/cmsIndex.png",
	// 	},
	// 	{
	// 		index: 7,
	// 		path: "/schedule",
	// 		name: "日程安排",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/calendar.png",
	// 	},
	// 	{
	// 		index: 8,
	// 		path: "/personal",
	// 		name: "个人设置",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/profile.png",
	// 	},
	// 	{
	// 		index: 9,
	// 		path: "/system",
	// 		name: "系统配置",
	// 		image: "https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/appicons/setting.png",
	// 	},
	// 	{
	// 		index: 10,
	// 		path: "/information",
	// 		name: "消息通知",
	// 		image: layoutImages.Message,
	// 	},
	// 	{
	// 		index: 11,
	// 		path: "/meeting",
	// 		name: "会议管理",
	// 		image: layoutImages.Message,
	// 	},
	// 	{
	// 		index: 12,
	// 		path: "/networkdisk",
	// 		name: "企业网盘",
	// 		image: layoutImages.Message,
	// 	},
	// ]);
	const item = user.menus;
	const HeaderTabs = ref([
		{
			name: "系统首页",
			path: "/index",
		},
	]);
	const TabsActiveName = ref("/index");

	const removeTag = (tagName) => {
		tags.value = tags.filter((t) => t !== tagName);
	};
	const updateTabsActiveName = (name) => {
		TabsActiveName.value = name;
	};
	// 添加tabs标签
	const addHeaderTabs = (msg) => {
		let res = true;
		HeaderTabs.value.forEach(function (item) {
			if (item.name == msg.name) {
				res = false;
			}
		});
		if (res) {
			HeaderTabs.value.push(msg);
		}
		TabsActiveName.value = msg.path;
	};
	// 删除tabs标签
	const removeHeaderTabs = (msg) => {
		// 如果要删除的是首页就直接退出，这里根据业务而定
		if (msg == "/index") return;
		// 通过循环方式找到要删除的数据项
		HeaderTabs.value.forEach((item, index) => {
			if (item.path == msg) {
				HeaderTabs.value.splice(index, 1);
				return true;
			}
		});
		// 如果当前显示页如删除项一样，则自动跳转会首页,这里也是根据具体业务而定
		if (TabsActiveName.value == msg) {
			TabsActiveName.value = "/index";
		}
	};
	return {
		tags,
		item,
		HeaderTabs,
		TabsActiveName,
		removeTag,
		updateTabsActiveName,
		addHeaderTabs,
		removeHeaderTabs,
	};
});
