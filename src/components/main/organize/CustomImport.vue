<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { download } from "./zheguo/util/download";
const handleExport = () => {
	download();
};
</script>
<template>
	<div class="custom">
		<h1>组织导入导出</h1>
		<p>
			您可以通过Excel批量导入组织，<a href="../模版.xls" style="color: blue; text-decoration: underline" download
				>点击此处</a
			>获取组织导入模板
		</p>
		<div class="custom-header">
			<el-upload
				v-model:file-list="fileList"
				class="upload-demo"
				action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
				multiple
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-remove="beforeRemove"
				:limit="3"
				:on-exceed="handleExceed"
			>
				<el-button type="primary">上传Excel文件，导入组织</el-button>
			</el-upload>
		</div>
		<div class="custom-body">
			<el-button type="primary" @click="handleExport">导出组织到Excel文件</el-button>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.custom {
	width: 100%;
	height: 100vh;
	background-color: #f0f0f0;
	padding: 50px;

	.custom-header {
		margin-top: 20px;
	}
	.custom-body {
		margin-top: 20px;
	}
}
</style>
