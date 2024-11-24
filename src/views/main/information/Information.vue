<!-- ParentComponent.vue -->
<template>
	<div>
		<!-- 显示任务列表的按钮 -->
		<!-- <el-button type="primary" @click="toggleDropdown">显示任务列表</el-button> -->
		<!-- 通过 v-if 控制子组件显示 -->
		<Information />
	</div>
</template>

<script setup lang="ts">
/* import { ref } from 'vue'; */
import Information from "@/components/main/Information/Information.vue"; // 引入子组件

/* const showDropdown = ref(false);  // 控制子组件的显示状态 */

/* const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;  // 切换显示状态
}; */
</script>
