<!--  点击封面卡片进入的详细页面的 头部 -->
<template>
	<el-header class="header-container">
		<slot name="custom-content">
			<el-row>
				<el-col :span="1" class="add-container click" @click="onAddClick">
					<folder-plus size="35" fill="white" />
				</el-col>
				<el-col :span="22" class="title-container">
					<el-image :src="Application"></el-image>
					<span class="title-text">办公用品管理</span>
				</el-col>
				<el-col :span="1" class="click" @click="onSearchClick">
					<telescope size="35" fill="white" />
				</el-col>
			</el-row>
		</slot>
	</el-header>
</template>
<script setup>
/**
 * 该组件暴露了插槽：
 * custom-content：整个头部部分
 * 该组件暴露了两个事件：
 * add-click：点击添加按钮时触发
 * telescope-click：点击搜索按钮时触发
 */
import { FolderPlus, Telescope } from "@icon-park/vue-next";
import Application from "@/assets/process/application.png";
import { defineEmits } from "vue";
// 定义需要发出的事件
const emit = defineEmits(["add-click", "search-click"]);
// 事件处理函数
const onAddClick = (event) => {
	emit("add-click", event);
};

const onSearchClick = (event) => {
	emit("search-click", event);
};
</script>
<style scoped>
.header-container {
	background-color: rgb(76, 107, 135);
	height: 80px;
}
.el-row {
	height: 100%;
	align-items: center;
}
.add-container {
	border-right: 1px solid white;
}
.title-container {
	padding-left: 20px;
	display: flex;
	align-items: center;
}
.title-text {
	color: white;
	font-weight: bold;
	font-size: 20px;
	margin-left: 10px;
}
.click {
	cursor: pointer;
}
</style>
