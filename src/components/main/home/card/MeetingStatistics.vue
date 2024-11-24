<template>
	<div class="card-container">
		<el-card style="inline-size: 100%">
			<template #header>
				<el-menu :ellipsis="false" mode="horizontal" :default-active="defaultActive">
					<el-menu-item index="0"> 会议统计 </el-menu-item>
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
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent]);
const defaultActive = ref("0");

const chartOption = ref({
	tooltip: {},
	legend: {
		data: ["收到邀请次数", "参与会议次数", "拒绝次数"],
	},
	xAxis: {
		data: ["一月", "二月", "三月"],
	},
	yAxis: {},
	series: [
		{
			name: "收到邀请次数",
			type: "bar",
			data: [5, 20, 36],
		},
		{
			name: "参与会议次数",
			type: "bar",
			data: [15, 10, 25],
		},
		{
			name: "拒绝次数",
			type: "bar",
			data: [1, 4, 2],
		},
	],
});
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
