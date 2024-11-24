<template>
	<ProcessDetailsHeader @add-click="handleDataClick" />
	<el-row :gutter="20">
		<el-col v-for="card in cards" :key="card" :sm="24" :md="12" :lg="6" class="process-col">
			<DetailsCard />
		</el-col>
	</el-row>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProcessDetailsHeader from "@/components/main/process/ProcessDetailsHeader.vue";
import DetailsCard from "@/components/main/process/DetailsCard.vue";
const router = useRouter();
// 跳转数据字典界面
const handleDataClick = () => {
	router.push("/process/datadictionary");
};
</script>
<style scoped>
.process-col {
	margin-top: 10px;
	width: 100%;
}
</style>
