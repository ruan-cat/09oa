<template>
	<div class="card" @mousedown="startDrag" @touchstart="startDrag" :style="cardStyle">
		<div class="card-content">
			<!-- <slot></slot> -->
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
					</div>
					<div class="rv-two">
						<component :is="componentsMap[rv_two as ComponentKeys]"></component>
					</div>
				</div>
			</el-card>
			<div class="resizer" @mousedown.prevent="startResize" @touchstart.prevent="startResize"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
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

// 位置和尺寸的响应式变量
const positionX = ref(100); // 初始的 X 轴位置
const positionY = ref(100); // 初始的 Y 轴位置
const width = ref(100); // 初始宽度
const height = ref(150); // 初始高度

// 用于标识是否正在拖动或调整大小的状态变量
const isDragging = ref(false);
const isResizing = ref(false);

// 初始位置和大小的中间变量，用于计算拖动和调整大小时的偏移
const initialX = ref(0);
const initialY = ref(0);
const currentWidth = ref(0);
const currentHeight = ref(0);

// 计算属性，用于动态生成卡片的样式
const cardStyle = computed(() => ({
	position: "absolute",
	top: `${positionY.value}px`,
	left: `${positionX.value}px`,
	width: `${width.value}px`,
	height: `${height.value}px`,
}));

// 开始拖动事件处理函数
const startDrag = (event: MouseEvent | TouchEvent) => {
	isDragging.value = true; // 设置正在拖动的状态
	// 获取开始拖动时初始事件的 X 和 Y 坐标
	initialX.value =
		event instanceof MouseEvent ? event.clientX - positionX.value : event.touches[0].clientX - positionX.value;
	initialY.value =
		event instanceof MouseEvent ? event.clientY - positionY.value : event.touches[0].clientY - positionY.value;

	// 添加全局事件监听器，监听拖动和拖动结束
	document.addEventListener("mousemove", drag);
	document.addEventListener("touchmove", drag);
	document.addEventListener("mouseup", stopDrag);
	document.addEventListener("touchend", stopDrag);
};

// 拖动处理函数
const drag = (event: MouseEvent | TouchEvent) => {
	if (!isDragging.value) return; // 如果没有拖动，不执行任何操作

	// 获取当前鼠标或触摸位置
	const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
	const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

	// 更新卡片的 X 和 Y 位置
	positionX.value = clientX - initialX.value;
	positionY.value = clientY - initialY.value;
};

// 停止拖动事件处理函数
const stopDrag = () => {
	isDragging.value = false; // 重置拖动状态
	// 移除事件监听器
	document.removeEventListener("mousemove", drag);
	document.removeEventListener("touchmove", drag);
	document.removeEventListener("mouseup", stopDrag);
	document.removeEventListener("touchend", stopDrag);
};

// 开始调整大小事件处理函数
const startResize = (event: MouseEvent | TouchEvent) => {
	isResizing.value = true; // 设置正在调整大小的状态
	currentWidth.value = width.value; // 记录当前宽度
	currentHeight.value = height.value; // 记录当前高度

	// 获取开始调整大小时的初始事件 X 和 Y 坐标
	initialX.value = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
	initialY.value = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

	// 添加全局事件监听
	document.addEventListener("mousemove", resize);
	document.addEventListener("touchmove", resize);
	document.addEventListener("mouseup", stopResize);
	document.addEventListener("touchend", stopResize);
};

// 调整大小处理函数
const resize = (event: MouseEvent | TouchEvent) => {
	if (!isResizing.value) return; // 如果没有调整大小的动作，不执行

	// 获取当前鼠标或触摸位置
	const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
	const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

	// 更新卡片的宽度和高度
	width.value = currentWidth.value + (clientX - initialX.value);
	height.value = currentHeight.value + (clientY - initialY.value);
};

// 停止调整大小事件处理函数
const stopResize = () => {
	isResizing.value = false; // 重置调整大小状态
	// 移除事件监听
	document.removeEventListener("mousemove", resize);
	document.removeEventListener("touchmove", resize);
	document.removeEventListener("mouseup", stopResize);
	document.removeEventListener("touchend", stopResize);
};
</script>

<style scoped>
.card {
	border: 1px solid #ccc;
	background-color: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	user-select: none;
}
.rv-two,
.rv-one {
	/* width: 200px;
  height: 300px; */
	overflow-y: auto;
	overflow-x: hidden;
	border: 1px solid #ccc;
}
.card-content {
	padding: 0;
}

.resizer {
	position: absolute;
	width: 20px;
	height: 20px;
	background: lightgray;
	right: 0;
	bottom: 0;
	cursor: nwse-resize;
}
</style>
