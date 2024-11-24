<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<!-- 左侧导航栏 -->
			<el-aside class="aside" style="width: 90px !important">
				<el-image
					src="https://sample.o2oa.net/o2_core/o2/xDesktop/$Default/blue/icons/logo_o2_40.png"
					class="menu-icon"
					@click="openDrawer"
				/>
				<MenuShow ref="menuShowRef" />
				<!-- 监听tab-click事件  tab--->
				<el-tabs
					tab-position="left"
					style="height: 100%; padding-top: 1px"
					class="tab-container"
					@tab-click="handleTabClick"
				>
					<el-tab-pane v-for="item in componentArr" :key="item.index" :name="item.path" :label="item.name">
						<template #label>
							<div class="tab-label">
								<el-image :src="item.image" class="tab-icon" />
								<span>{{ item.name }}</span>
							</div>
						</template>
					</el-tab-pane>
				</el-tabs>
			</el-aside>

			<el-container>
				<!-- 顶部tabs -->
				<el-header class="header">
					<!-- 上方显示标签 -->
					<el-tabs
						class="header-tabs"
						v-model="HeaderTabsActiveName"
						type="card"
						@tab-click="handlePathSwitch"
						@tab-remove="removeHeaderTabsList"
					>
						<el-tab-pane
							v-for="(item, index) in HeaderTabsList"
							:key="index"
							:label="item.name"
							:name="item.path"
							:closable="isTabClosable(item)"
						/>
					</el-tabs>
					<!-- 上方右侧内容 -->
					<div class="header-right">
						<el-input class="search-input" placeholder="请输入搜索关键字" :suffix-icon="Search" clearable />
						<div class="icon-group">
							<div>
								<Information />
							</div>
							<el-dropdown>
								<span class="icon-user">欢迎，{{ username }}！</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item @click="openPersonal">个人中心</el-dropdown-item>
										<el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
					</div>
				</el-header>

				<!-- 路由区域 -->
				<el-main>
					<!-- 
						https://github.com/xiaoluoboding/vue-sonner 
						FIXME: 该组件的定位位置是混乱的 需要想办法实现重设位置
					-->
					<Toaster
						:expand="true"
						:richColors="true"
						:closeButton="true"
						:visibleToasts="3"
						:position="'bottom-right'"
					></Toaster>

					<el-scrollbar>
						<router-view />
					</el-scrollbar>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
import { layoutImages } from "@/assets/layout/layoutImages";
import { watch, nextTick, ref, onMounted, computed, unref } from "vue";
import { useTabsStore } from "@/stores/layout"; // 引入Pinia store
import { useRoute, useRouter } from "vue-router";
import { Comment } from "@icon-park/vue-next";
import { Document, Menu as IconMenu, Location, Setting, House, Search } from "@element-plus/icons-vue";
import MenuShow from "./components/MenuShow.vue";
import { useUtilsStore } from "@/stores/utils.js";
import Information from "@/components/main/Information/Information.vue";
import { userStore } from "@/stores/user";
import { getLogoutApi } from "@/apis/login";
import { ElMessage } from "element-plus";
import { Toaster } from "vue-sonner";
// 获取当前路由
const router = useRouter();
const route = useRoute();
const tabsStore = useTabsStore();
const utilsStore = useUtilsStore();
const componentArr = computed(() => user.menus);
const HeaderTabsList = computed(() => tabsStore.HeaderTabs);
const HeaderTabsActiveName = ref(tabsStore.TabsActiveName);
// 获取用户信息
const user = userStore();
const username = user.getUser.xname;
// 定义menuShow组件的ref
const menuShowRef = ref(null);
// 打开抽屉
const openDrawer = () => {
	menuShowRef.value.openDrawer();
};
// 计算当前激活的菜单项
const activeMenu = computed(() => {
	return utilsStore.getActiveMenu(route.path);
});
// 获得活动的activeName
const getTabsActiveName = computed(() => {
	return tabsStore.TabsActiveName;
});
// 使用watch监听数据，并开启第一次绑定监听--immediate
watch(
	getTabsActiveName,
	(o1) => {
		if (o1) {
			// 我们每添加条数据都需要修改相关的tabs索引，否则选中项是不会高亮的
			HeaderTabsActiveName.value = o1;
		}
	},
	{
		immediate: true,
	},
);
watch(
	() => route.path,
	(newPath) => {
		// 获取前一个固定路由
		let fixedPath = utilsStore.getActiveMenu(newPath);
		// 判断 fixedPath 是否已经存在(避免路由被重定向时候，导致添加重复的tabs)
		const existingFixedTab = HeaderTabsList.value.find((i) => i.path === fixedPath);
		if (!existingFixedTab) {
			// 查找与 route.path 相同的路径
			const matchedItem = componentArr.value.find((item) => item.path === fixedPath);
			if (matchedItem) {
				HeaderTabsList.value.push({
					name: matchedItem.name, // 或者你可以使用 matchedItem.text，如果你希望使用 index 中定义的文本
					path: matchedItem.path,
					image: matchedItem.image, // 访问并使用找到的 icon 属性
				});
			}
		}
		HeaderTabsActiveName.value = fixedPath;
	},
	// 确保组件加载前执行
	{ immediate: true },
);
// 判断标签是否可关闭，首页不可关闭
const isTabClosable = (tab) => {
	return tab.path !== "/index";
};
// 点击顶部tabs触发
const handlePathSwitch = (targetName) => {
	let name = targetName.props.name;
	tabsStore.updateTabsActiveName(name);
	HeaderTabsActiveName.value = name;
	// 手动跳转，组件不会提供跳转功能
	router.push({
		path: name,
	});
};
// 删除顶部tabs触发
const removeHeaderTabsList = (tag) => {
	tabsStore.removeHeaderTabs(tag);
	setTimeout(() => {
		// 利用定时器达到延时方法，防止HeaderTabsActiveName还未变就执行下面的跳转
		router.push({
			path: HeaderTabsActiveName.value,
		});
	}, 0);
};
// 点击左侧导航栏时触发-push内容到header
const handleTabClick = (tab) => {
	let res = {
		name: tab.props.label,
		path: tab.props.name,
	};
	tabsStore.updateTabsActiveName(res.path);
	tabsStore.addHeaderTabs(res);
	router.push({
		path: tab.props.name,
	});
};
/* 用户名称点击 */
const openPersonal = () => {
	router.push("/personal");
};
const handleLogout = async () => {
	await getLogoutApi(
		() => {
			// 成功回调
			user.resetSaveData();
			router.push("/");
			ElMessage.success("退出登录成功");
		},
		() => {
			// 失败回调
			ElMessage.error("退出登录失败，请稍后再试！");
		},
	);
};
</script>

<style scoped>
.common-layout {
	height: 100%;
}
/* 左侧导航栏 */

.aside :deep(.el-tabs) {
	width: 90px !important;
	background-color: #092e59 !important;
}
.aside :deep(.el-tabs__content) {
	display: none;
}
.aside :deep(.el-tabs__header) {
	margin-right: 0 !important;
	width: 100%;
}
.aside :deep(.el-tabs--left .el-tabs__nav-wrap.is-left) {
	margin-right: 0;
}
.aside :deep(.el-tabs__item) {
	display: flex;
	justify-content: center;
	color: #ffffff !important;
	margin: 0 !important;
	padding: 10px !important;
	width: 90px !important;
}
.aside :deep(.tab-container .el-tabs__item):hover {
	background-color: #337acc !important;
}
.aside :deep(.tab-container .el-tabs__item.is-active) {
	color: #ffffff !important;
}
/* 文字效果 */
.aside :deep(.el-tabs__item) span {
	visibility: hidden;
	opacity: 0;
	transition:
		opacity 0.8s ease,
		visibility 0s 0.3s; /* 添加过渡效果，延迟visibility */
}
/* 当鼠标悬停时，文字变为可见，并且透明度变为1 */
.aside :deep(.el-tabs__item:hover) span {
	visibility: visible;
	opacity: 1;
	transition:
		opacity 0.8s ease,
		visibility 0s; /* 立即显示visibility */
}
.aside .tab-container :deep(.el-tabs__item) {
	height: auto;
	margin: 10px 0;
}
/* !!!去除aside右侧的白色内容 */
.aside :deep(.el-tabs__nav-wrap::after) {
	display: none;
}
/* 导航栏蓝条消失(必须加 .aside 控制区域 防止全局更改) */
.aside :deep(.tab-container .el-tabs__active-bar) {
	display: none;
}
.el-main {
	padding: 0;
}
/* 左侧导航栏的设置 */
.aside .tab-container {
	height: 100%;
}
.el-aside,
.tab-container {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.tab-label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.tab-icon {
	width: 30px;
	height: 30px;
}
/* 最上方图标的调整 */
.menu-icon {
	background-color: #337acc !important;
	width: 90px;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.menu-icon :deep(.el-image__inner) {
	width: 40px;
	height: 40px;
}

/* 顶部导航栏 */
.header {
	height: 70px;
	width: 100%;
	display: flex;
}
.header :deep(.el-tabs) {
	min-width: 70%;
	max-width: 70%;
}
.header-tabs {
	height: 100%;
}
.header :deep(.el-tabs__header) {
	border: 0;
}
.header :deep(.el-tabs__content) {
	display: none;
}
.header :deep(.el-tabs__nav) {
	border: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.header :deep(.el-tabs__item) {
	border-radius: 14px !important;
	color: #666666 !important;
	margin-right: 10px;
	margin-left: 10px;
	background: #f7f7f7 !important;
	height: 28px;
	padding: 0 13px !important;
	transition: none !important; /* !!!禁用过渡 若不禁用此部分会造成切换时闪烁 */
}
.header :deep(.el-tabs__item.is-active) {
	background: #4a90e2 !important;
	color: #ffffff !important;
}
/* 始终显示关闭按钮 */
.header :deep(.el-tabs__item.is-closable .is-icon-close) {
	width: 14px !important;
	transition: none !important;
}
/* 超出界限时左右两侧的拓展按钮 */
.header :deep(.el-tabs__nav-wrap span) {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 28px;
}
/* header右侧内容 */
.header-right {
	display: flex;
	justify-content: space-between; /* 左右两侧内容 */
	align-items: center; /* 垂直居中 */
	width: 100%; /* 确保父容器的宽度可用 */
}

.search-input {
	flex-grow: 1; /* 搜索框占据左侧的可用空间 */
	margin-right: 10px; /* 给搜索框和右侧图标一些间距 */
	width: 60%;
}
.icon-group {
	display: flex;
}
.icon-group::before {
	content: none !important;
}

.icon-notice {
	margin-right: 10px; /* 给通知图标和用户名一些间距 */
	cursor: pointer;
	height: 24px;
}

.icon-user {
	margin-left: 10px; /* 给用户名和其他元素之间留一些间距 */
	cursor: pointer;
}
</style>
