<template>
	<div class="card-container">
		<el-card style="inline-size: 100%">
			<template #header>
				<el-menu :ellipsis="false" mode="horizontal" :default-active="defaultActive">
					<el-menu-item index="0">文件统计</el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多信息</span>
					</el-button>
				</el-menu>
			</template>

			<div class="content-container">
				<v-chart ref="chartRef" :option="chartOption" autoresize class="echart" />
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { fetchFileStatistics } from "@/apis/index/index1";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
const defaultActive = ref("0");
const stats = ref({});
const chartOption = computed(() => ({
	tooltip: {
		trigger: "item",
	},
	legend: {
		top: "5%",
		left: "center",
	},
	series: [
		{
			name: "文件操作统计",
			type: "pie",
			radius: ["40%", "70%"],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: "#fff",
				borderWidth: 2,
			},
			label: {
				show: false,
				position: "center",
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "40",
					fontWeight: "bold",
				},
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: stats.value.uploadFileCount, name: "上传文件" },
				{ value: stats.value.deleteFileCount, name: "删除文件" },
				{ value: stats.value.sendFileCount, name: "发送文件" },
				{ value: stats.value.shareFileCount, name: "共享文件" },
			],
		},
	],
}));

const loadStatistics = async () => {
	try {
		const params = {
			xperson: "jack",
			endDate: "2024-11-23 00:00:00",
			startDate: "2024-10-31 00:00:00",
		};
		const response = await fetchFileStatistics(params);
		stats.value = response;
	} catch (error) {
		console.error("加载文件统计数据失败:", error);
	}
};

onMounted(loadStatistics);
</script>
<style scoped lang="scss">
.card-container {
	width: 100%;
	margin: auto;
	min-height: 300px;
}

.content-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
}
</style>
