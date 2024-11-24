<template>
	<el-card class="card-container" shadow="hover">
		<!-- 右上角的未分类应用文字 -->
		<div class="card-content">
			<div class="left-section" @click="openDetail">
				<el-image style="width: 80px; height: 80px" :src="props.appIcon" fit="fill" />
				<span class="left-text">{{ props.appName }}</span>
				<span class="desc-text">{{ props.description ? description : "此应用没有描述" }}</span>
			</div>
			<div class="right-section">
				<header class="header">
					<span v-for="item of props.category" style="display: inline-block; margin-right: 10px">{{ item }}</span>
				</header>
				<main class="main">
					<ul>
						<li v-for="item of props.form">{{ item }}</li>
					</ul>
				</main>
			</div>
		</div>
	</el-card>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import icon from "@/assets/process/office.png";
const router = useRouter();
const openDetail = () => {
	router.push(`/contentindex/fixedAsset/${props.appId}`);
};
const props = defineProps({
	appName: String, //应用名称
	description: String, // 应用描述
	appType: String, // 应用类型
	appId: Number, // 应用id
	appIcon: String, //应用图标
	category: Array, //表单类型
	form: Array, //表单数据
});
</script>
<style scoped>
.card-container {
	width: 540px;
	float: left;
	height: 240px;
	background-color: rgb(255, 255, 255);
	margin-left: 10px;
	margin-top: 10px;
	position: relative;
}
/* 右上角的未分类应用文字样式 */
.top-right-text {
	width: 80px;
	position: absolute;
	top: 10px; /* 距离顶部的距离，根据需要调整 */
	right: 0px; /* 距离右侧的距离，根据需要调整 */
	font-size: 11px;
	color: #333;
	background-color: #f0f0f0;
	padding: 0 5px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	text-align: center;
	height: 20px;
	line-height: 20px;
}

:deep(.el-card__body) {
	height: 100%;
}
.card-content {
	height: 100%;
	display: flex;
	align-items: center;
}
/* 左侧占30%，并添加右边框作为分隔线 */
.left-section {
	cursor: pointer;
	flex: 0 0 30%;
	border-right: 1px solid #e6e6e6; /* 分隔线颜色 */
	padding-right: 20px; /* 分隔线右侧的内边距，避免内容紧贴分隔线 */
	box-sizing: border-box; /* 确保内边距不影响总宽度 */
	display: flex;
	flex-direction: column;
	align-items: center; /* 水平居中 */
	justify-content: center; /* 垂直居中 */
	text-align: center; /* 文本居中 */
}
/* 右侧占70% */
.right-section {
	width: 330px;
	height: 240px;
	padding-left: 15px;
	padding-right: 15px;
	overflow: hidden;
	background-color: rgb(255, 255, 255);
	cursor: pointer;
	float: left;
}
/* 右侧的内容的格式 */
.header {
	font-size: 16px; /* 调整header字体大小 */
	color: #333; /* header颜色 */
	margin-bottom: 10px; /* header与main之间的距离 */
	border-bottom: 1px solid #e6e6e6; /* 分界线 */
	padding: 5px; /* 增加header的上下内边距 */
}

.main {
	margin-top: 10px; /* main上方的间距（可选） */
}

/* 右侧子项样式 */
.right-item {
	font-size: 16px;
	color: #333;
	display: flex;
	align-items: center;
}

.left-text {
	margin-top: 10px; /* 图标与文字之间的间距 */
	font-size: 16px;
	color: #333;
}
.desc-text {
	margin-top: 10px;
	font-size: 12px;
	color: #999999;
}
.right-text {
	font-size: 14px;
	color: rgb(153, 153, 153);
}
</style>
