<template>
	<!-- 一级结构中aside的内容 -->
	<el-menu
		:style="{ width: '200px' }"
		:default-active="defaultActive"
		@select="selectmenu"
		router
		class="aside-container"
	>
		<!-- 使用v-for渲染目录结构 -->
		<template v-for="(item, index) in menuData" class="menu">
			<router-link :to="{ path: '' + item.path }">
				<el-menu-item style="height: 50px" :index="item.id" :key="item.id">
					<el-icon size="20">
						<component :is="item.icon"></component>
					</el-icon>
					<span style="color: rgb(119, 119, 119)">{{ item.name }}</span>
				</el-menu-item>
			</router-link>
		</template>
		<!-- 一级结构aside中底部内容 -->
		<div class="aside-botton">
			<p>已用：-</p>
			<el-button
				plain
				@click="dialogFormVisible = true"
				style="font-size: 12px; color: rgb(119, 119, 119); margin-left: -15px"
			>
				企业网盘设置
			</el-button>

			<el-dialog v-model="dialogFormVisible" title="企业网盘设置" width="500">
				<el-form :model="form">
					<el-form-item label="只允许上传的文件后缀,英文;分隔" :label-width="formLabelWidth">
						<el-input v-model="textarea" style="width: 240px" :rows="2" type="textarea" placeholder="Please input" />
					</el-form-item>
					<el-form-item label="不允许上传的文件后缀,英文;分隔" :label-width="formLabelWidth">
						<el-input v-model="textarea" style="width: 240px" :rows="2" type="textarea" placeholder="Please input" />
					</el-form-item>
					<el-form-item label="容量(单位M),0表示无限大." :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off" />
					</el-form-item>
				</el-form>
				<template #footer>
					<div class="dialog-footer">
						<el-button @click="dialogFormVisible = false">关闭</el-button>
						<el-button type="primary" @click="dialogFormVisible = false"> 确认 </el-button>
					</div>
				</template>
			</el-dialog>
		</div>
	</el-menu>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import path from "path";
import { ElIcon } from "element-plus";
import { FolderOpened, Picture, Film, Document, Headset, MoreFilled, Share, Delete } from "@element-plus/icons-vue";

const dialogFormVisible = ref(false);

const form = reactive({
	name: "",
	region: "",
	date1: "",
	date2: "",
	delivery: false,
	type: [],
	resource: "",
	desc: "",
});

const router = useRouter();
// menuData的数据内容用于渲染目录图标和标题
const menuData = [
	{ id: 1, icon: FolderOpened, name: "全部文件", path: "/networkdisk/alltask" },
	{ id: 2, icon: Picture, name: "图片", path: "/networkdisk/picture" },
	{ id: 3, icon: Film, name: "视频", path: "/networkdisk/video" },
	{ id: 4, icon: Document, name: "文档", path: "/networkdisk/documentation" },
	{ id: 5, icon: Headset, name: "音乐", path: "/networkdisk/music" },
	{ id: 6, icon: MoreFilled, name: "其他", path: "/networkdisk/addiyional" },
	{ id: 7, icon: Share, name: "分享", path: "/networkdisk/share" },
	{ id: 8, icon: Delete, name: "回收", path: "/networkdisk/recycle" },
];
const selectmenu = (index) => {
	this.defaultActive = index;
};
const open = () => {
	dialogFormVisible.value = true;
};

const activeIndex = () => {};
</script>

<style scoped>
.aside-container {
	height: 100%;
	background-color: rgb(247, 247, 247);
}

.aside-container .aside-botton {
	position: absolute;
	bottom: 15px;
	left: 10px;
	cursor: pointer;
	font-size: 12px;
	color: rgb(119, 119, 119);

	p {
		margin-bottom: 5px;
	}
}
</style>
