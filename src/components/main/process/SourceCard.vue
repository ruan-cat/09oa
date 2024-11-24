<!-- 资源文件的卡片 -->
<template>
	<el-card>
		<el-container>
			<el-aside>
				<el-image :src="imagePath" />
			</el-aside>
			<el-main>
				<div>
					<span>{{ name }}</span>
					<span>{{ uptime }}</span>
				</div>
				<div>
					<span>{{ url }}</span>
				</div>
			</el-main>
		</el-container>
	</el-card>
</template>

<script setup>
const imagePath = ref("");
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	uptime: {
		type: String,
		required: true,
	},
});
</script>

<style scoped></style>
