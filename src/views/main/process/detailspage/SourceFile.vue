<template>
	<ProcessDetailsHeader />
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
		<el-button type="primary">Click to upload</el-button>
		<template #tip>
			<div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
		</template>
	</el-upload>
	<el-row>
		<el-col v-for="card in SourceFileCards" :key="card.id" :id="card.id" class="sourceFileCard">
			<SourceCard :name="card.name" :id="card.id" :url="card.url" :uptime="card.uptime" />
		</el-col>
	</el-row>
</template>
<script setup>
import ProcessDetailsHeader from "@/components/main/process/ProcessDetailsHeader.vue";
import SourceCard from "@/components/main/process/SourceCard.vue";
//卡片的数组
const SourceFileCards = ref([]);
//卡片的属性
const file = ref();
const id = ref("");
const name = ref("");
const url = ref("");
const uptime = ref("");

//获取附件列表
const fetchSourceFileList = async () => {
	await getSourceFileListApi(
		{},
		(data) => {
			id.value = data.id;
			name.value = data.name;
			url.value = data.url;
			uptime.value = data.uptime;
			ElMessage.success("获取附件列表成功");
		},
		() => {
			ElMessage.error("获取附件列表失败");
		},
	);
};
//让api中获取的数据渲染到页面上
onMounted(async () => {
	// 暂不实现
	// await fetchSourceFileList();
});

//文件上传
import { ElMessage, ElMessageBox } from "element-plus";

const fileList = ref([
	{
		name: "element-plus-logo.svg",
		url: "https://element-plus.org/images/element-plus-logo.svg",
	},
]);

const handleRemove = (file, uploadFiles) => {
	console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
	console.log(uploadFile);
};

const handleExceed = (files, uploadFiles) => {
	ElMessage.warning(
		`The limit is 3, you selected ${files.length} files this time, add up to ${
			files.length + uploadFiles.length
		} totally`,
	);
};

const beforeRemove = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
		() => true,
		() => false,
	);
};
</script>

<style scoped>
/* 卡片的样式 */
.sourceFileCard {
}
</style>
