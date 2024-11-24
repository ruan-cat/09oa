<template>
	<div class="header-con">
		<div class="header-left">
			<el-upload
				ref="uploadRef"
				action="/api/companynetdisk/myfile-upload"
				class="upload-demo"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-upload="beforeUpload"
				:on-success="handleSuccess"
				:on-error="handleError"
				v-model:file-list="fileList"
				:headers="headers"
			>
				<template #trigger>
					<el-button type="primary" style="margin-left: 10px; margin-top: 12px; height: 40px">
						<el-icon :size="25" style="padding-right: 5px"><MostlyCloudy /></el-icon>
						上传
					</el-button>
				</template>
			</el-upload>
			<el-row class="mb-4">
				<el-button type="primary" plain style="margin-left: -320px; margin-top: 12px; height: 40px">
					<el-icon :size="25" style="padding-right: 5px"><FolderAdd /></el-icon>
					新建文件夹
				</el-button>
			</el-row>
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
				<div style="float: right">已全部加载,共{{ tableData.length }}个</div>
			</el-header>
			<el-main class="mainer" style="padding: 0px">
				<el-table ref="multipleTableRef" :data="tableData" style="width: 100%; color: black" border:false>
					<el-table-column type="selection" width="55" />
					<el-table-column prop="xname" label="文件名" width="800">
						<template #default="scope">
							<span>{{ scope.row.xname }}</span>

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
					<el-table-column prop="xlength" label="大小" width="200" />
					<el-table-column prop="xLastUpdateTime" label="修改时间" show-overflow-tooltip width="350" />
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { Orange, Link, Delete } from "@element-plus/icons-vue";
import { MostlyCloudy, FolderAdd, Search, Operation, Grid } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { companynetdiskfolderquery } from "@/apis/networkdisk/index.js";
import { ElIcon, ElMessage, ElTable, ElUpload } from "element-plus";
import { userStore } from "@/stores/user";
// 切换一级结构header内容的函数
const selectChangeHeader = ref(false);
const selectChange = () => {
	selectChangeHeader.value = !selectChangeHeader.value;
};

interface User {
	folder_xid: string;
	folder_xcreateTime: string;
	folder_xsequence: string;
	folder_xupdateTime: string;
	folder_xname: string;
	folder_xperson: string;
	xid: string;
	xcreateTime: string;
	xsequence: string;
	xupdateTime: string;
	xdeepPath: string;
	xextension: string;
	xLastUpdatePerson: string;
	xLastUpdateTime: string;
	xlength: number;
	xname: string;
	xperson: string;
	xstorage: string;
}
interface PaginationData {
	pageIndex: number;
	pageSize: number;
	total: number;
	pages: number;
	rows: User[];
}
const total = ref(0);
const pageSize = ref(1000);
const currentPage = ref(1);
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const tableData = ref<User[]>([]);
const fileList = ref([]);
// 定义 headers
let store = userStore();
let token = store.getToken;
const headers = ref({
	Authorization: "Bearer " + token, // 获取 token 的方法
});
//获取指定目录内容列表（分页）
const fetchFiles = (pageIndex: number = 1) => {
	companynetdiskfolderquery(
		{ pageIndex, pageSize: pageSize.value },
		(data: PaginationData) => {
			tableData.value = data.rows;

			total.value = data.total;
			pageSize.value = data.pageSize;
			currentPage.value = data.pageIndex;
		},
		(error: any) => {
			console.error("请求失败:", error);
			ElMessage.error("请求失败，请重试");
		},
	);
};
//上传
const handleRemove = (file: any, fileList: any) => {
	console.log(file, fileList);
};

const handlePreview = (file: any) => {
	console.log(file);
};

const beforeUpload = (file: File) => {
	// 允许上传任何类型的文件
	console.log("File:", file);
	console.log("File type:", typeof file);
	console.log("File instanceof File:", file instanceof File);
	return true;
};

const handleSuccess = (response: any, file: any, fileList: any) => {
	console.log("success", response, file, fileList);
	ElMessage.success("文件上传成功");
};

const handleError = (err: any, file: any, fileList: any) => {
	console.log("error", err, file, fileList);
	ElMessage.error("文件上传失败");
};
onMounted(() => {
	fetchFiles(currentPage.value);
});
</script>

<style scoped>
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
