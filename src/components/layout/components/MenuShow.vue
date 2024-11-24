<template>
	<el-drawer
		v-model="isDrawerVisible"
		direction="ltr"
		@open="openDrawer"
		@close="closeDrawer"
		style="min-width: 390px; max-width: 390px"
	>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="应用" name="first">
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item, index) in menuItems" :key="index">
						<IconWithLabel :src="item.icon" :label="item.label" :path="item.path" class="icon-label" />
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="流程" name="second"> </el-tab-pane>
			<el-tab-pane label="信息" name="third"> </el-tab-pane>
			<el-tab-pane label="数据" name="fourth"> </el-tab-pane>
		</el-tabs>
	</el-drawer>
</template>

<script setup>
import { watch, nextTick, ref, onMounted, computed } from "vue";
import { useTabsStore } from "@/stores/layout"; // 引入Pinia store
import { useRoute, useRouter } from "vue-router";
import { Document, Menu as IconMenu, Location, Setting, House } from "@element-plus/icons-vue";

import officeIcon from "@/assets/process/office.png";
import IconWithLabel from "./IconWithLabel.vue";

const router = useRouter();
const tabsStore = useTabsStore();

/* Rom编写的内容 */
const isDrawerVisible = ref(); // 控制抽屉的显示与隐藏
// 开启/关闭弹窗
const openDrawer = () => {
	isDrawerVisible.value = true;
};
const closeDrawer = () => {
	isDrawerVisible.value = false;
};
/* 暴露方法 */
defineExpose({
	openDrawer,
	closeDrawer,
});

const activeName = ref("first"); // tabs 的默认选中项
const menuItems = [
	{ icon: officeIcon, label: "应用1", path: "/task/process" },
	{ icon: officeIcon, label: "应用2", path: "/task/personal" },
	{ icon: officeIcon, label: "应用3", path: "/task/login" },
	{ icon: officeIcon, label: "应用4", path: "/task/information" },
	{ icon: officeIcon, label: "应用5", path: "/task/schedule" },
];
</script>
<style scoped>
.icon-label {
	margin: 10px 0;
}
</style>
