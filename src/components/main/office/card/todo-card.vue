<template>
	<div style="display: flex; flex-direction: column; align-items: center; height: 100%">
		<el-table :data="paginatedData" :show-header="false" :border="true" size="large" style="width: 100%">
			<el-table-column prop="type" width="150" />
			<el-table-column min-width="500">
				<template #default="scope">
					<span>
						【{{ scope.row.children_type }}】
						<el-link :href="scope.row.link">{{ scope.row.title }}</el-link>
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="department" width="120" />
			<el-table-column width="150">
				<template #default="scope">
					<span>
						<el-text type="primary" style="text-align: center">{{ scope.row.process }}</el-text>
					</span>
				</template>
			</el-table-column>
			<el-table-column width="300">
				<template #default="scope">
					<span style="display: flex; justify-content: space-between">
						【{{ scope.row.date }}】
						<el-tag type="primary" v-if="scope.row.done">已完成</el-tag>
					</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="total"
			:page-size="page_size"
			:current-page="currentPage"
			@current-change="handlePageChange"
			style="margin-block-start: auto"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// TODO: 需要得到这个生产环境接口
// import { queryAllProcessApi } from "@/apis/office/index.js";
// queryAllProcessApi;

// 当前页码
const currentPage = ref(1);

// 数据类型
interface officeData {
	type: string; // 办公类型
	children_type: string; // 子类型
	department: string; // 部门
	title: string; // 标题
	process: string; // 流程
	date: string; // 时间
	done: boolean; // 是否完成
	link?: string; // 链接（可选）
}

interface Props {
	tableData?: officeData[];
}

// 每页条目数
const page_size = 17;

// 接收传递的 props
const props = defineProps<Props>();
const tableData: officeData[] = props.tableData ?? []; // 如果没有传递数据则使用空数组

// 总条目数
const total = tableData.length;

// 按日期排序
const sortedData = tableData.sort((a, b) => {
	const dateA = new Date(a.date).getTime();
	const dateB = new Date(b.date).getTime();
	return dateB - dateA; // 升序排列，改为 `dateB - dateA` 为降序
});

// 计算当前页显示的数据
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * page_size;
	const end = start + page_size;
	return sortedData.slice(start, end);
});

// 页码变化处理函数
function handlePageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>

<style></style>
