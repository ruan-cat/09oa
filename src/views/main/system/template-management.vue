<template>
	<div class="" style="padding: 10px; border-top: 1px solid black">
		<div>
			<h1>选择表单模板</h1>
		</div>
		<div style="display: flex">
			<div style="margin-right: 10px"><p>类别</p></div>
			<div class="flex flex-wrap gap-4 items-center">
				<el-select v-model="type_arr" placeholder="Select" style="width: 240px" @change="">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
		</div>
		<div style="padding-top: 20px">
			<el-space wrap>
				<el-card v-for="i in items" :key="i.id" class="box-card" @click="clickTab(type_arr, i.id)">
					<template #header>
						<div>
							<div class="one">{{ i.title }}</div>
						</div>
					</template>
					<div v-if="i.id == 0" class="text-part-one">
						<file-addition-one theme="outline" size="50" fill="#333" />
					</div>
					<div v-else class="text-part-two">
						<div class="one">
							{{ i.description.length > 20 ? i.description.substring(0, 20) + "······" : i.description }}
						</div>
					</div>
				</el-card>
			</el-space>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { FileAdditionOne } from "@icon-park/vue-next";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
// loc data
// 下拉单选框数据
const type_arr = ref();
const open_table = ref(false);
const options = [
	{
		value: "( *^-^)ρ(*╯^╰)",
		label: "( *^-^)ρ(*╯^╰)",
	},
	{
		value: "(′д｀ )…彡…彡",
		label: "(′д｀ )…彡…彡",
	},
	{
		value: "( ′ 3`) sigh~",
		label: "( ′ 3`) sigh~",
	},
	{
		value: "φ(゜▽゜*)♪",
		label: "φ(゜▽゜*)♪",
	},
	{
		value: "o(*≧▽≦)ツ┏━┓",
		label: "o(*≧▽≦)ツ┏━┓",
	},
];
// 表格数据
const items = [
	{
		id: 0,
		title: "新建表格",
		description: "创建一个新的表格文档，用于组织和存储数据。",
		type: 1,
	},
	{
		id: 1,
		title: "学习 Vue.js",
		description:
			"深入学习 Vue.js 框架，掌握组件化开发和状态管理。探索 Vue 的响应式系统、指令、插件和工具链，以及如何构建大型、高性能的单页应用。",
		type: 1,
	},
	{
		id: 2,
		title: "掌握 JavaScript",
		description:
			"精通 JavaScript 语言的核心概念，包括原型链、闭包、IIFE、异步编程模式和 ES6+ 新特性。学习如何编写模块化、可维护和高性能的代码。",
		type: 1,
	},
	{
		id: 3,
		title: "前端开发基础",
		description:
			"学习前端开发的基础知识，包括 HTML、CSS 和 JavaScript。掌握如何构建响应式布局、处理浏览器兼容性问题、优化前端性能和提升用户体验。",
		type: 1,
	},
	{
		id: 4,
		title: "Node.js 入门",
		description:
			"了解 Node.js 的基本概念和优势，学习如何使用 Node.js 构建快速、可扩展的后端服务。探索 Node.js 的生态系统，包括 Express、Koa、NestJS 等流行的框架。",
		type: 1,
	},
	{
		id: 5,
		title: "数据结构与算法",
		description:
			"学习常见的数据结构（如数组、链表、树、图等）和算法（如排序、搜索、动态规划等），提高编程能力和解决问题的能力。掌握算法的时间复杂度和空间复杂度分析方法。",
		type: 1,
	},
	{
		id: 6,
		title: "React.js 基础",
		description:
			"学习 React.js 框架的核心概念，包括组件、状态、生命周期、Hooks 和 Context。掌握如何构建可复用的 UI 组件，管理状态和上下文，以及优化 React 应用的性能。",
		type: 1,
	},
	{
		id: 7,
		title: "API 设计",
		description:
			"了解 RESTful API 的设计原则，学习如何构建和使用 API。探索 API 的版本控制、认证、限流、文档和测试等最佳实践。",
		type: 1,
	},
	{
		id: 8,
		title: "前端性能优化",
		description:
			"学习前端性能优化的技巧，包括代码分割、懒加载、服务端渲染、缓存策略、图片优化等。提高网页加载速度和用户体验。",
		type: 1,
	},
	{
		id: 9,
		title: "版本控制与 Git",
		description:
			"掌握 Git 的基本使用，包括初始化仓库、提交更改、分支管理、合并和冲突解决。了解版本控制的重要性，以及如何使用 Git 进行团队协作。",
		type: 1,
	},
	{
		id: 10,
		title: "移动端开发",
		description:
			"学习如何为移动设备开发响应式网页和应用。探索移动端开发的挑战，包括屏幕尺寸多样性、触摸交互、性能优化和原生 API 访问。",
		type: 1,
	},
];
// loc func
// 表格数据不存在pinia中
function clickTab(type_arr: string, id: number) {
	if (id == 0) {
		console.log("111111111111111");
		open_table.value = true;
	}
}
</script>

<style scoped>
.box-card {
	width: 150px;
	height: 200px;
	cursor: pointer; /* 添加指针样式 */
	background-color: #c1c5cad4; /* 设置背景颜色 */
	color: black; /* 设置文本颜色 */
	border: none; /* 移除边框 */
	border-radius: 2px; /* 添加圆角 */
	text-align: center; /* 文本居中 */
	user-select: none; /* 防止文本被选中 */
}
.card-header,
.text-part-one {
	display: flex;
	justify-content: center;
	padding-top: 10px;
}
.one {
	user-select: none; /* 防止文本被选中 */
}
</style>
