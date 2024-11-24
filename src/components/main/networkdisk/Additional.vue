<template>
	<div class="header-con">
		<!-- 其他组件的左头部 -->
		<div class="header-left">
			<el-upload ref="uploadRef" action="/upload" class="upload-demo" :limit="1" :auto-upload="false">
				<template #trigger>
					<el-button type="primary" style="margin-left: 10px; margin-top: 12px; height: 40px">
						<el-icon :size="25" style="padding-right: 5px"><MostlyCloudy /></el-icon>
						上传
					</el-button>
				</template>
			</el-upload>
		</div>
		<!-- 组件页面的右头部 -->
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
	<!-- 一级结构中二级结构的头部 -->
	<div style="margin: 0px; padding: 0px; background-color: white">
		<el-container style="background-color: rgb(255, 255, 255)">
			<el-header class="header">
				<div style="float: right; padding-right: 10px">已全部加载,共0个</div>
			</el-header>
			<el-main class="mainer" style="padding: 0px"> </el-main>
		</el-container>
	</div>
</template>

<script setup>
import { ElTable, ElIcon, ElMessage } from "element-plus";
import { Orange, Link, Delete } from "@element-plus/icons-vue";
import { MostlyCloudy, FolderAdd, Search, Operation, Grid } from "@element-plus/icons-vue";
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
</style>
