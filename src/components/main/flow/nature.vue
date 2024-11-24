<template>
	<el-table :data="flowNodeData" stripe style="width: 100%">
		<el-table-column prop="id" label="Date" width="180" />
		<el-table-column prop="name" label="Name" width="180" />
	</el-table>
</template>
<!-- 标识:	95bf272d-b269-4433-b59f-4ee3dfc36c9e
创建时间:	2024-11-11 13:17:20
名称:	
拟稿
别名:	
描述:	
处理方式:	单人 并行 串行 抢办
表单:	 -->

<script setup lang="ts">
import { computed, ref } from "vue";
import { flow } from "@/stores/flow";
// 解构pinia数据并动态绑定
const flowInVue = flow();
const flowNodeData = computed(() => flowInVue.flowNodeData);
// 动态绑定pinia的数据
</script>

<style scoped>
.el-descriptions {
	margin-top: 20px;
}
</style>
