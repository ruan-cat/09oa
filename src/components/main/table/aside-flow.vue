<template>
	<el-card style="width: 480px">
		<template #header>
			<div><p>属性</p></div>
		</template>
		<div class="card-header">
			<div class="main-two">
				<div class="main-two-one button" @click="clickOnePart('active')">活动</div>
				<div class="main-two-two button" @click="clickOnePart('routers')">路由</div>
			</div>
			<div class="rv-one">
				<component :is="componentsMap[rv_one as ComponentKeys]"></component>
			</div>
			<div class="main-two">
				<div class="main-three-one button" @click="clickTwoPart('nature')">属性</div>
				<div class="main-three-two button" @click="clickTwoPart('JSON')">JSON</div>
				<div class="main-three-three button" @click="clickTwoPart('TEXT')">TEXT</div>
			</div>
			<div class="rv-two">
				<component :is="componentsMap[rv_two as ComponentKeys]"></component>
			</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 导入组件
import Active from "@/components/main/flow/active.vue";
import Nature from "@/components/main/flow/nature.vue";
import Routers from "@/components/main/flow/routers.vue";
// 初始化组件映射
const componentsMap = {
	active: Active,
	routers: Routers,
	nature: Nature,
};
// 定义字符串联合类型
type ComponentKeys = "active" | "routers" | "nature" | "JSON" | "TEXT";
// loc data
const rv_one = ref("");
const rv_two = ref("");
// loc func
function clickOnePart(name: string) {
	switch (name) {
		case "active":
			rv_one.value = "active";
			break;
		case "routers":
			rv_one.value = "routers";
			break;
		default:
			console.log(`false in clickOnePart, this name is ${name}`);
			break;
	}
}
function clickTwoPart(name: string) {
	switch (name) {
		case "nature":
			rv_two.value = "nature";
			break;
		case "JSON":
			rv_two.value = "JSON";
			break;
		case "TEXT":
			rv_two.value = "TEXT";
			break;
		default:
			console.log(`false in clickOnePart, this name is ${name}`);
			break;
	}
}
</script>

<style>
.rv-one,
.rv-two {
	height: 200px;
	width: 100%;
}
.main-two {
	display: flex;
	justify-content: flex-start;
}
.el-overlay {
	background-color: rgba(0, 0, 0, 0.1) !important; /* 调整此处透明度 */
}
.button {
	cursor: pointer; /* 添加指针样式 */
	padding: 5px 10px; /* 添加内边距 */
	background-color: #c1c5cad4; /* 设置背景颜色 */
	color: white; /* 设置文本颜色 */
	border: none; /* 移除边框 */
	border-radius: 2px; /* 添加圆角 */
	text-align: center; /* 文本居中 */
	user-select: none; /* 防止文本被选中 */
}
</style>
