<template>
	<div class="settings-page">
		<!-- 使用 Element Plus 的 Tabs 组件 -->
		<el-tabs v-model="activeTab" @tab-click="handleTabClick">
			<el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab" :name="index.toString()">
				<!-- 动态渲染对应的组件 -->
				<component :is="getTabComponent(index)" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref } from "vue";
import PersonalInfo from "@/components/main/Personal/PersonalInfo.vue";
import CommonOpinion from "@/components/main/Personal/CommonOpinion.vue";
import ChangePhone from "@/components/main/Personal/ChangePhone.vue";
import ChangeEmail from "@/components/main/Personal/ChangeEmail.vue";
import ChangePassword from "@/components/main/Personal/ChangePassword.vue";

// 当前激活的选项卡索引
const activeTab = ref("0");

// 选项卡标题数组
const tabs = ["个人信息", "常用意见", "修改手机号", "修改邮箱", "修改密码"];

// 根据索引返回对应组件
const getTabComponent = (index) => {
	switch (index) {
		case 0:
			return PersonalInfo;
		case 1:
			return CommonOpinion;
		case 2:
			return ChangePhone;
		case 3:
			return ChangeEmail;
		case 4:
			return ChangePassword;
		default:
			return PersonalInfo;
	}
};

// 选项卡点击事件（可选）
const handleTabClick = (tab) => {
	console.log(`切换到选项卡: ${tabs[parseInt(tab.name)]}`);
};
</script>

<style scoped>
.settings-page {
	height: 100%;
	width: 100%;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}

.el-tabs__header {
	margin-bottom: 20px;
	border-bottom: 1px solid #ccc;
}

.el-tab-pane {
	padding: 20px;
	min-height: 400px;
}
</style>
