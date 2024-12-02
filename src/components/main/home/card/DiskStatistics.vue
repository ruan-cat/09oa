<template>
	<div class="card-container">
		<el-card style="inline-size: 100%">
			<template #header>
				<el-menu :ellipsis="false" mode="horizontal" :default-active="defaultActive">
					<el-menu-item index="0"> 网盘文件</el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多文件</span>
					</el-button>
				</el-menu>
			</template>

			<div class="content-container">
				<ul>
					<li v-for="file in diskFiles" :key="file.xid">
						<div class="file-item">
							<div class="file-name">
								<el-icon><Document /></el-icon>
								{{ file.xname }}
							</div>
							<!-- <save-one theme="outline" size="24" fill="#333" @click="downloadFile(file)" /> -->
							<div class="download-icon">
								<el-icon @click="downloadFile(file)"><Download /></el-icon>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { fetchDiskFileInfo } from "@/apis/index/index1";
import { ElMessage } from "element-plus";
import { Document, Download } from "@element-plus/icons-vue";
const diskFiles = ref([]);
const defaultActive = ref("0");
const loadDiskFiles = async () => {
	try {
		const response = await fetchDiskFileInfo({ xperson: "jack" });
		if (response && response.diskFileDTOList) {
			diskFiles.value = response.diskFileDTOList;
		}
	} catch (error) {
		console.error("获取文件信息失败:", error);
	}
};
const downloadFile = (file) => {
	ElMessage({
		message: `正在下载: ${file.xname}`,
		type: "success",
		duration: 3000,
	});
};
onMounted(loadDiskFiles);
</script>
<style scoped lang="scss">
.card-container {
	width: 100%;
	margin: auto;
}

.content-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	ul {
		list-style-type: none;
		padding: 0;
		width: 100%;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10px 0;
		padding: 10px;
		background-color: #f0f0f0;
		border-radius: 5px;
	}
	.file-item {
		display: flex;
		align-items: center;
		width: 100%;
		flex-direction: space-between;
		.file-name {
			width: 92%;
		}
		.download-icon {
			margin-bottom: 1px;
			cursor: pointer;
			width: 8%;
		}
	}
	// .file-icon {
	// 	display: block;
	// 	height: 26px;
	// 	width: 26px;
	// 	background-image: url("https://sample.o2oa.net/m_app/yunFile/image/css_sprites.png");
	// 	background-position: -43px -10px; /* Adjust these values based on the sprite's layout */
	// 	background-size: cover;
	// 	margin-right: 10px;
	// }
	.file-icon {
		margin-bottom: 5px;
		margin-right: 10px;
	}
}
</style>
