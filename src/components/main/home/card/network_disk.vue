<script setup lang="ts">
import { ref, onMounted } from "vue";
const activeIndex = ref("0");

import * as echarts from "echarts/core";
import { TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

onMounted(async () => {
	let chartData: any;

	// 创建一个返回 Promise 的异步函数来封装 queryProcessInfo
	const fetchData = () => {
		return new Promise<void>((resolve) => {
			queryFileStatistics(
				(data: any) => {
					chartData = [
						{ value: data.deleteFileCount, name: "删除文件数量" },
						{ value: data.sendFileCount, name: "发送文件数量" },
						{ value: data.shareFileCount, name: "共享文件数量" },
						{ value: data.uploadFileCount, name: "上传文件数量" },
					];
					resolve();
				},
				() => {},
			);
		});
	};

	// 等待 fetchData 完成
	await fetchData();

	// 初始化 ECharts
	echarts.use([TooltipComponent, PieChart, CanvasRenderer, LabelLayout]);

	const chartDom = document.getElementById("file-echart");
	if (chartDom) {
		const myChart = echarts.init(chartDom);

		const option = {
			tooltip: {
				trigger: "item",
			},
			series: [
				{
					type: "pie",
					radius: "77%",
					data: chartData,
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

		// 设置 ECharts 的配置项
		myChart.setOption(option);
	}
});
</script>

<template>
	<div class="card-container">
		<el-card style="inline-size: 100%">
			<template #header>
				<el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
					<el-menu-item index="0">文件统计信息</el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多消息</span>
					</el-button>
				</el-menu>
			</template>
			<div class="content-container">
				<div id="file-echart" style="inline-size: 100%; block-size: 100%; margin: auto"></div>
			</div>
		</el-card>
	</div>
</template>

<style scoped></style>
