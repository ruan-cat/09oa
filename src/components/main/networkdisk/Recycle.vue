<template>
	<div class="header-con">
		<div class="header-left" v-if="!selectChangeHeader">
			<el-upload ref="uploadRef" action="/upload" class="upload-demo" :limit="1" :auto-upload="false">
				<template #trigger>
					<el-button
						type="primary"
						style="margin-left: 10px; margin-top: 12px; height: 40px; background-color: aliceblue; color: #4a90e2"
					>
						<el-icon :size="25" style="padding-right: 5px"><MostlyCloudy /></el-icon>
						清空回收站
					</el-button>
				</template>
			</el-upload>
		</div>
		<div class="header-icon" v-if="selectChangeHeader">
			<el-button type="primary" plain style="margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><Delete /></el-icon>
				彻底删除
			</el-button>
			<el-button type="primary" plain style="margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><RefreshRight /></el-icon>
				还原
			</el-button>
		</div>
		<div class="header-right">
			<div>
				<el-input class="input-sty" :prefix-icon="Search" style="border-radius: 15px" />
			</div>
			<div class="f-icon">
				<el-icon size="35">
					<Operation />
				</el-icon>
			</div>
			<div class="s-icon">
				<el-icon size="35"><Grid /></el-icon>
			</div>
		</div>
	</div>
	<div style="margin: 0px; padding: 0px; background-color: white">
		<el-container style="background-color: rgb(255, 255, 255)">
			<el-header class="header">
				<div style="float: right; padding-right: 10px">已全部加载,共0个</div>
			</el-header>
			<el-main class="mainer" style="padding: 0px">
				<el-table
					ref="multipleTableRef"
					:data="tableData"
					style="width: 100%"
					border:false
					@selection-change="handleSelectionChange"
					@select="selectChange"
				>
					<el-table-column type="selection" width="55" />
					<el-table-column label="文件名" width="800">
						<template #default="scope"
							>{{ scope.row.date }}
							<el-icon class="el-icon" style="opacity: 1; float: right; margin-top: 5px; margin-right: 10px"
								><Orange
							/></el-icon>
							<el-icon class="el-icon" style="opacity: 1; float: right; margin-top: 5px; margin-right: 10px"
								><Link
							/></el-icon>
							<el-icon class="el-icon" style="opacity: 1; float: right; margin-top: 5px; margin-right: 10px"
								><Delete
							/></el-icon>
						</template>
					</el-table-column>
					<el-table-column property="name" label="大小" width="200" />
					<el-table-column property="address" label="修改时间" show-overflow-tooltip width="120" />
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ElTable, ElIcon, ElMessage } from "element-plus";
import { Orange, Link, Delete } from "@element-plus/icons-vue";
import { MostlyCloudy, RefreshRight, Search, Operation, Grid } from "@element-plus/icons-vue";

interface User {
	date: string;
	name: string;
	address: string;
}

const selectChangeHeader = ref(false);
const selectChange = () => {
	selectChangeHeader.value = !selectChangeHeader.value;
};
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
	if (rows) {
		rows.forEach((row) => {
			multipleTableRef.value!.toggleRowSelection(row, undefined);
		});
	} else {
		multipleTableRef.value!.clearSelection();
	}
};
const handleSelectionChange = (val: User[]) => {
	multipleSelection.value = val;
};

const tableData: User[] = [
	{
		date: "a.docx",
		name: "27M",
		address: "2024-10-19 23:52:13",
	},
];
</script>

<style lang="scss" scoped>
.header-con {
	width: 101.6%;
	display: flex;
	justify-content: space-between;
	background-color: rgb(251, 251, 251);
	border-bottom: 1px solid rgb(242, 242, 242);
	padding: 4px 0px 3px;
	margin-bottom: 10px;
}
.header-left {
	width: 200px;
	height: 55px;
	display: flex;
	justify-content: space-between;
}
.upload-demo {
	height: 10%;
	margin-right: 330px;
	z-index: 1;
}

.header-right {
	display: flex;
	/* // margin-top: 10px; */
	margin-right: 60px;
	margin-top: 16px;
	height: 40px;
}
.f-icon {
	margin-left: 10px;
	margin-right: 10px;
}
.header {
	width: 100%;
	height: 5%;
	color: #09aaff;

	font-size: 12px;
	/* //   display: flex; */
	/* //   justify-content: space-between; */
	float: right;
	padding: 0px;
	background-color: rgb(255, 255, 255);
}

.mainer {
	width: 100%;
	/* // height: 20%; */
	background-color: white;
}
.header-icon {
	width: 600px;
	display: flex;
	font-size: 13px;
	margin-left: 10px;
}
</style>
