<template>
	<div class="header-con">
		<!-- 没有点钩子时展示的头部内容 -->
		<div class="header-left" v-if="!selectChangeHeader">
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
					<el-button type="primary" style="margin-left: 10px; margin-top: 12px; height: 40px; width: 70px">
						<el-icon :size="25" style="padding-right: 5px"><MostlyCloudy /></el-icon>
						上传
					</el-button>
				</template>
			</el-upload>
			<el-row class="mb-4">
				<el-button
					@click="dialogFormVisible = true"
					type="primary"
					plain
					style="margin-left: -320px; margin-top: 12px; height: 40px"
				>
					<el-icon :size="25" style="padding-right: 5px"><FolderAdd /></el-icon>
					新建文件夹
				</el-button>
			</el-row>
			<!-- 弹出输入框 -->
			<el-dialog v-model="dialogFormVisible" title="新建文件夹" width="500">
				<el-input v-model="newFolderName" placeholder="请输入文件夹名称"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false" style="margin-top: 10px">取 消</el-button>
					<el-button type="primary" @click="addNewFolder" style="margin-top: 10px">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<!-- 点击钩子后展示的头部内容 -->
		<div class="header-icon" v-if="selectChangeHeader">
			<el-button @click="upDwonTask" type="primary" plain style="margin-left: 10px; margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><MostlyCloudy /></el-icon>
				下载
			</el-button>
			<el-button @click="shareTask" type="primary" plain style="margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><Share /></el-icon>
				分享
			</el-button>
			<el-button @click="Changename" type="primary" plain style="margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><EditPen /></el-icon>
				重命名
			</el-button>
			<el-button @click="dialogVisible = true" type="primary" plain style="margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><Delete /></el-icon>
				删除
			</el-button>
			<el-button type="primary" plain style="margin-top: 12px; height: 40px">
				<el-icon :size="25" style="padding-right: 5px"><DataLine /></el-icon>
				移动
			</el-button>
		</div>
		<!-- 删除确认弹窗 -->
		<el-dialog v-model="dialogVisible" title="删除确认" width="500" :before-close="handleClose">
			<span>您确定要删除吗？</span>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="DeleteDask()"> 确认 </el-button>
				</div>
			</template>
		</el-dialog>
		<!-- 一级结构中Header的右部 -->
		<div class="header-right">
			<div>
				<el-input class="input-sty" :prefix-icon="Search" style="border-radius: 15px" placeholder="请输入文件名搜索" />
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
	<!-- 二级结构中header的内容 -->
	<div style="margin: 0px; padding: 0px; background-color: white">
		<el-container style="background-color: rgb(255, 255, 255)">
			<el-header class="header">
				<div style="padding-left: 10px">全部文件</div>
				<!-- 动态绑定table数据行 -->
				<div style="padding-right: 10px">已全部加载,共{{ tableData.length }}个</div>
			</el-header>
			<!-- 二级结构中main内容的表格内容 -->
			<el-main class="mainer" style="padding: 0px">
				<el-table
					ref="multipleTableRef"
					:data="tableData"
					style="width: 100%; color: black"
					border:false
					@selection-change="handleSelectionChange"
					@select="selectChange"
				>
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
import { ref, onMounted } from "vue";
import {
	MyfilePostfileInfo,
	myfileDelete,
	modifyfileattachment,
	myfileDownload,
	companynetdiskfolderquery,
	modifyfilefolder
} from "@/apis/networkdisk/index.js";
import { ElIcon, ElMessage, ElTable, ElMessageBox, ElUpload } from "element-plus";
import {
	Orange,
	Link,
	Delete,
	MostlyCloudy,
	FolderAdd,
	Search,
	Operation,
	Grid,
	Share,
	EditPen,
	DataLine,
	VideoPlay,
	Picture,
} from "@element-plus/icons-vue";
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
const dialogFormVisible = ref(false);
const newFolderName = ref("");
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

// 添加目录
const addNewFolder = async () => {
	const data = {
		xname: newFolderName.value,
		xsuperior: "000",
		xperson: "xadmin",
	};
	await MyfilePostfileInfo(
		data,
		(response: any) => {
			if (newFolderName.value) {
				fetchFiles(currentPage.value);
				ElMessage.success("添加成功");
				// fetchFiles();

				dialogFormVisible.value = false;
				newFolderName.value = "";
			} else {
				alert("请输入文件夹名称");
			}
			console.log(response);
		},
		() => {
			ElMessage.error("添加失败，请稍后重试");
		},
	);
};
const refreshFiles = () => {
	fetchFiles(currentPage.value);
};

const getFileIcon = (fileName: string): any => {
	const ext = fileName.split(".").pop()?.toLowerCase();
	if (["doc", "docx"].includes(ext!)) return Document;
	if (["jpg", "jpeg", "png", "gif"].includes(ext!)) return Picture;
	if (["pdf"].includes(ext!)) return Document;
	if (["mp4", "avi", "mkv"].includes(ext!)) return VideoPlay;
	if (["mp3", "wav", "aac"].includes(ext!)) return Audio;
	return File;
};

const isImage = (fileName: string): boolean => {
	const ext = fileName.split(".").pop()?.toLowerCase();
	return ["jpg", "jpeg", "png", "gif"].includes(ext!);
};
const getFileUrl = (xid: string): string => {
	// 使用后端提供的下载 API 构建文件的 URL
	return `/companynetdisk/myfile-download/${xid}`;
};
onMounted(() => {
	fetchFiles(currentPage.value);
});
// 删除文件

const multipleSelection = ref([] as any[]);
const handleSelectionChange = (val: any[]) => {
	multipleSelection.value = val;
	upDownSelection.value = val;
};
const dialogVisible = ref(false);
const DeleteDask = async () => {
	if (multipleSelection.value.length === 0) {
		ElMessage.warning("请先选择要删除的项");
		return;
	}
	const xids = multipleSelection.value.map((row) => row.xid);
	await myfileDelete(
		xids,
		(response: string) => {
			ElMessage.success("删除成功");
			fetchFiles();
			// tableData.value = tableData.value.filter((item) => !xids.includes(item.xid));
			console.log(response);
		},
		() => {
			ElMessage.error("删除失败");
		},
	);
	dialogVisible.value = false;
};
const handleClose = (done: () => void) => {
	ElMessageBox.confirm("确认关闭这个消息")
		.then(() => {
			done();
		})
		.catch(() => {
			// catch error
		});
};
//下载文件
const upDownSelection = ref<User[]>([]);
const upDwonTask = async () => {
	if (multipleSelection.value.length === 0) {
		ElMessage.warning("请先选择要下载的项");
		return;
	}
	for (const row of multipleSelection.value) {
		try {
			await myfileDownload(
				row.xid,
				(data: Blob) => {
					// const fileBlob = new Blob([data], { type: "application/octet-stream" });
					// const fileUrl = URL.createObjectURL(fileBlob);
					// const a = document.createElement("a");
					// a.href = fileUrl;
					// a.download = row.name; // 设置文件名
					// a.click();
					// URL.revokeObjectURL(fileUrl); // 释放 URL 对象
					// ElMessage.success(`下载成功: ${row.name}`);
					ElMessage.success(`下载成功: ${data}`);
				},
				(error: any) => {
					ElMessage.error(`下载文件 ${row.name} 失败,稍后重试！`);
					console.error(`下载文件 ${row.name} 失败`, error);
				},
			);
		} catch (error) {
			ElMessage.error(`下载文件 ${row.name} 失败,稍后重试！`);
			console.error(`下载文件 ${row.name} 失败`, error);
		}
	}
};
//分享
const shareTask = async () => {
	const data = {
		ATTACHMENT_XID: "",
		xshareList: "",
		xorderColumn: "",
	};
	await ShareFiles(
		data,
		(response: string) => {
			ElMessage.success("分享成功");
			console.log(response);
		},
		() => {
			ElMessage.error("分享失败,稍后重试！");
		},
	);
};
//重命名目录
const type = ref(1);
const Changename = async () => {
	if (type.value === 0) {
		const xids = multipleSelection.value.map((row) => row.xid);
		await modifyfilefolder(
			xids,
			(response: string) => {
				ElMessage.success("修改成功");
				console.log(response);
			},
			() => {
				ElMessage.error("修改失败,稍后重试！");
			},
		);
	} else {
		const data = {
			xid: "1",
		};
		await modifyfileattachment(
			data,
			(response: string) => {
				ElMessage.success("修改成功");
				console.log(response);
			},
			() => {
				ElMessage.error("修改失败,稍后重试！");
			},
		);
	}
};
</script>

<style scoped>
.header {
	width: 100%;
	height: 5%;
	color: #09aaff;
	font-size: 12px;
	display: flex;
	justify-content: space-between;
	padding: 0px;
	background-color: rgb(255, 255, 255);
}
.mainer {
	width: 100%;
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
	margin-right: 60px;
	margin-top: 16px;
	height: 40px;
}
.f-icon {
	margin-left: 10px;
	margin-right: 10px;
}
.header-icon {
	width: 600px;
	display: flex;
	font-size: 13px;
}
</style>
