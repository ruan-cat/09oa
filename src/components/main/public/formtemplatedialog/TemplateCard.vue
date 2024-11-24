<template>
	<el-card shadow="hover" class="card-container" @click="handleClick()">
		<el-image :src="imagePath" style="width: 150px; height: 135px" />
		<div class="card-name">
			<span>{{ templateName }}</span>
		</div>
	</el-card>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
	templateName: String,
	imagePath: String,
	id: String,
});
const handleClick = () => {
	console.log(props.id);
	router.push({
		name: "FormManage", // 使用路由名称
		query: { templateId: props.id }, // 传递 id 参数
	});
};
</script>
<style scoped>
.card-container {
	border: 0 !important;
	width: 164px;
	height: 184px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
}

.card-container:hover {
	background-color: rgb(187, 187, 187);
}
.card-name {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
