<template>
	<div class="header-con">
		<div class="header-left">
			<el-menu class="el-menu-demo" mode="horizontal">
				<router-link :to="{ path: '/networkdisk/share/myshare' }">
					<el-menu-item>分享给我</el-menu-item>
				</router-link>
				<router-link :to="{ path: '/networkdisk/share/othershare' }">
					<el-menu-item @click="selectfilst">我的分享</el-menu-item>
				</router-link>
				<router-link :to="{ path: '' }">
					<el-menu-item>其他</el-menu-item>
				</router-link>
			</el-menu>
		</div>
		<div class="header-right">
			<div>
				<el-input class="input-sty" :prefix-icon="Search" style="border-radius: 15px" />
			</div>
			<div class="f-icon">
				<el-button @click="selectfilst">
					<el-icon size="35">
						<Operation />
					</el-icon>
				</el-button>
			</div>
			<div class="s-icon">
				<el-button @click="selectuserfilst">
					<el-icon size="35"><Grid /></el-icon>
				</el-button>
			</div>
		</div>
	</div>
	<div style="margin: 0px; padding: 0px; background-color: white">
		<el-container style="background-color: rgb(255, 255, 255)">
			<el-header class="header"> </el-header>
			<el-main class="mainer" style="padding: 0px">
				<router-view :apidata="apiData"></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ElIcon, ElMessage } from "element-plus";
import { ref } from "vue";
import { Search, Operation, Grid } from "@element-plus/icons-vue";
import { queryfilelistbyfileid, queryfilelistfiled } from "@/apis/networkdisk/index.js";

//获取接收文件列表
const selectfilst = async () => {
	const data = {
		pageIndex: "1",
		pageSize: "10",
		xperson: "",
	};
	const apiData = ref<{
		pageIndex: number;
		pageSize: number;
		total: number;
		pages: number;
		rows: any[];
	} | null>(null);
	try {
		ElMessage.success("获取成功");
		apiData.value = await queryfilelistfiled(data);
	} catch (error) {
		ElMessage.error("获取失败失败,稍后重试！");
	}
	return {
		apiData,
	};
};
//获取共享文件列表
const selectuserfilst = async () => {
	const data = {
		pageIndex: "1",
		pageSize: "10",
		xperson: "",
	};
	const apidata = ref<{
		pageIndex: number;
		pageSize: number;
		total: number;
		pages: number;
		rows: any[];
	} | null>(null);
	try {
		ElMessage.success("获取成功");
		apidata.value = await queryfilelistbyfileid(data);
	} catch (error) {
		ElMessage.error("获取失败失败,稍后重试！");
	}
	return {
		apidata,
	};
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
	float: right;
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
	margin-right: 60px;
	margin-top: 16px;
	height: 40px;
}
.f-icon {
	margin-left: 10px;
	margin-right: 10px;
}
</style>
