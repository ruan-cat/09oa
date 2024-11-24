<template>
	<el-descriptions direction="vertical" :column="1" size="small">
		<el-descriptions-item v-for="(value, index) in flowHistoryData" :key="index">
			<el-tag>{{ value }}</el-tag>
		</el-descriptions-item>
	</el-descriptions>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { flow } from "@/stores/flow";
// 解构pinia数据并动态绑定
const flowInVue = flow();
// 动态绑定pinia's flowHistoryData的数据
const flowHistoryData = computed(() => flowInVue.flowHistoryData);
</script>

<style scoped></style>
