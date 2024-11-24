<template>
	<ProcessDetailsHeader @add-click="handleAddFlowClick" />
	<el-tabs>
		<el-tab-pane>
			<template #label>
				<span class="custom-tabs-label">
					<all-application theme="outline" size="20" :strokeWidth="3" />
					<span class="tab-text">全部</span>
				</span>
			</template>
			<el-row :gutter="20">
				<el-col v-for="card in cards" :key="card" :sm="24" :md="12" :lg="6" class="process-col">
					<DetailsCard />
				</el-col>
			</el-row>
		</el-tab-pane>
	</el-tabs>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AllApplication } from "@icon-park/vue-next";
import ProcessDetailsHeader from "@/components/main/process/ProcessDetailsHeader.vue";
import DetailsCard from "@/components/main/process/DetailsCard.vue";
const router = useRouter();
// 跳转流程编辑界面
const handleAddFlowClick = () => {
	router.push("/process/flowmanage");
};
</script>
<style scoped>
.custom-tabs-label {
	display: flex;
	align-items: center;
}
.tab-text {
	font-size: 16px;
	/* 调整文字大小 */
	margin-bottom: 2px;
	margin-left: 8px;
}
.process-col {
	margin-top: 10px;
	width: 100%;
	/* 确保子组件占满列宽 */
}
</style>
