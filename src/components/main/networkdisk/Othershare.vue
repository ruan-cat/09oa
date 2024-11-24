<template>
	<div style="margin: 0px; padding: 0px; background-color: white">
		<el-container style="background-color: rgb(255, 255, 255)">
			<el-header class="header">
				<div style="padding-left: 10px">分享</div>
				<div style="padding-right: 10px">已全部加载,共{{ apidata?.rows }}个</div>
			</el-header>
			<el-main class="mainer" style="padding: 0px">
				<el-table ref="multipleTableRef" :data="apidata?.rows" style="width: 100%" border:false>
					<el-table-column type="selection" width="55" />
					<el-table-column label="文件名" width="800" prop="xname">
						<template>
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
					<el-table-column prop="xperson" label="分享者" width="200" />
					<el-table-column prop="xlength" label="大小" width="200" />
					<el-table-column prop="xupdateTime" label="修改时间" show-overflow-tooltip width="120" />
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn } from "element-plus";
import { ElIcon } from "element-plus";
import { Orange, Link, Delete } from "@element-plus/icons-vue";

const props = defineProps<{
	apidata: {
		pageIndex: number;
		pageSize: number;
		total: number;
		pages: number;
		rows: any[];
	} | null;
}>();

const { apidata } = toRefs(props);
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	height: 5%;
	color: #09aaff;

	font-size: 12px;
	display: flex;
	justify-content: space-between;
	float: right;
	padding: 0px;
	background-color: rgb(255, 255, 255);
}

.mainer {
	width: 100%;
	/* // height: 20%; */
	background-color: white;
}
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
	width: 10%;
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
</style>
