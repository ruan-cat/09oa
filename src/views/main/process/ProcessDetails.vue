<!-- 流程卡片页面 -->
<template>
	<el-tabs tab-position="left" class="tab-container">
		<!-- 表单配置 -->
		<el-tab-pane>
			<template #label>
				<div class="tab-label">
					<el-image :src="processImages.ProcessForm" class="tab-icon" />
					<span>表单配置</span>
				</div>
			</template>
			<FormConfig />
		</el-tab-pane>
		<!-- 流程配置 -->
		<el-tab-pane>
			<template #label>
				<div class="tab-label">
					<el-image :src="processImages.ProcessFlow" class="tab-icon" />
					<span>流程配置</span>
				</div>
			</template>
			<ProcessConfig />
		</el-tab-pane>
		<!-- 数据配置 -->
		<el-tab-pane>
			<template #label>
				<div class="tab-label">
					<el-image :src="processImages.ProcessData" class="tab-icon" />
					<span>数据配置</span>
				</div>
			</template>
			<DataConfig />
		</el-tab-pane>
		<!-- 脚本配置 -->
		<el-tab-pane>
			<template #label>
				<div class="tab-label">
					<el-image :src="processImages.ProcessScript" class="tab-icon" />
					<span>脚本配置</span>
				</div>
			</template>
			<ProcessDetailsHeader />
			<el-row :gutter="20">
				<el-col v-for="card in cards" :key="card" :sm="24" :md="12" :lg="6" class="process-col">
					<DetailsCard />
				</el-col>
			</el-row>
		</el-tab-pane>
		<!-- 资源文件 -->
		<el-tab-pane>
			<template #label>
				<div class="tab-label">
					<el-image :src="processImages.ProcessFile" class="tab-icon" />
					<span>资源文件</span>
				</div>
			</template>
			<SourceFile />
		</el-tab-pane>
		<!-- 应用属性 -->
		<el-tab-pane>
			<template #label>
				<div class="tab-label">
					<el-image :src="processImages.ProcessProperty" class="tab-icon" />
					<span>应用属性</span>
				</div>
			</template>
			<ProcessDetailsHeader class="header">
				<template #custom-content>
					<span class="title-text">办公用品管理</span>
				</template>
			</ProcessDetailsHeader>
			<DetailsProperty />
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { processImages } from "@/assets/process/processImages.js"; // 集中导入图片
import { AllApplication } from "@icon-park/vue-next";
import ProcessDetailsHeader from "@/components/main/process/ProcessDetailsHeader.vue";
import DetailsCard from "@/components/main/process/DetailsCard.vue";
import DetailsProperty from "./detailspage/DetailsProperty.vue";
import FormConfig from "./detailspage/FormConfig.vue";
import DataConfig from "./detailspage/DataConfig.vue";
import ProcessConfig from "./detailspage/ProcessConfig.vue";
import SourceFile from "./detailspage/SourceFile.vue";
const cards = [1, 2, 3, 4];
// 跳转搜索界面
const handleSearchClick = () => {
	console.log("点击搜索按钮");
};
</script>

<style scoped>
.tab-container {
	height: 100%;
}

.tab-label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.tab-icon {
	width: 90px;
	/* 根据需要调整图标大小 */
	height: 70px;
	margin-bottom: 4px;
	/* 图片与文字之间的间距 */
}

.el-tab-pane {
	padding: 16px;
	/* 根据需要调整内容区域的内边距 */
}

.tab-container :deep(.el-tabs__item) {
	height: auto;
	margin: 10px 0;
}

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

.header {
	padding-left: 20px;
	display: flex;
	align-items: center;
}

.title-text {
	color: white;
	font-weight: bold;
	font-size: 20px;
	margin-left: 10px;
}
</style>
