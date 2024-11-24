<template>
	<div class="icon-with-label" @click="navigate">
		<el-image :src="src" class="circular-image" :preview="false" />
		<div class="label">{{ label }}</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});
// 获取路由实例
const router = useRouter();

// 定义跳转方法
const navigate = () => {
	router.push(props.path);
};
</script>

<style scoped>
.icon-with-label {
	text-align: center;
	cursor: pointer;
}

.circular-image {
	width: 40px; /* 根据需要调整大小 */
	height: 40px; /* 根据需要调整大小 */
	border-radius: 50%;
	object-fit: cover;
}

.label {
	font-size: 14px;
	color: #333;
}
</style>
