<script setup>
const tableData = [
	{
		title: "test context1",
		drafter: "silverystorm",
		department: "software",
		draftTime: "2024-10-18",
		current: "none",
	},
	{
		title: "test context2",
		drafter: "silverystorm",
		department: "software",
		draftTime: "2024-10-18",
		current: "none",
	},
	{
		title: "test context3",
		drafter: "silverystorm",
		department: "software",
		draftTime: "2024-10-18",
		current: "none",
	},
	{
		title: "test context4",
		drafter: "silverystorm",
		department: "software",
		draftTime: "2024-10-18",
		current: "none",
	},
];
</script>

<template>
	<div>
		<el-container>
			<el-header>周</el-header>
			<el-main>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="title" label="标题" />
					<el-table-column prop="drafter" label="拟稿人" width="180" />
					<el-table-column prop="department" label="拟稿部门" width="180" />
					<el-table-column prop="draftTime" label="拟稿时间" width="180" />
					<el-table-column prop="current" label="当前环节" width="180" />
				</el-table>
				<el-pagination :page-size="20" :pager-count="7" layout="prev, pager, next" :total="1"
			/></el-main>
		</el-container>
	</div>
</template>

<style scoped></style>
