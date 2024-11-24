<template>
	<div class="card-container">
		<el-card style="inline-size: 100%">
			<template #header>
				<el-menu :ellipsis="false" mode="horizontal" :default-active="defaultActive">
					<el-menu-item index="0"> 流程信息统计</el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多消息</span>
					</el-button>
				</el-menu>
			</template>

			<div class="content-container">
				<v-chart ref="chart" :option="chartOption" style="width: 100%; height: 400px"></v-chart>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent]);

import { fetchProcessInfo } from "@/apis/index/index1";
const defaultActive = ref("0");

const chartOption = ref({});
const processId = "1852159770479124482";

const loadProcessData = async () => {
	try {
		const params = { id: processId };
		const response = await fetchProcessInfo(params);
		if (response) {
			chartOption.value = {
				tooltip: {
					trigger: "item",
				},
				legend: {
					orient: "vertical",
					left: "left",
				},
				series: [
					{
						name: "流程统计",
						type: "pie",
						radius: "50%",
						data: [
							{ value: response.draft, name: "草稿" },
							{ value: response.read, name: "待阅" },
							{ value: response.readCompleted, name: "已阅" },
							{ value: response.task, name: "待办" },
							{ value: response.taskCompleted, name: "已办" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			};
		}
	} catch (error) {
		console.error("获取流程信息失败:", error);
	}
};

onMounted(loadProcessData);
</script>
<style scoped lang="scss">
.card-container {
	width: 100%;
	margin: auto;
}

.content-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
}
</style>
