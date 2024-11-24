<template>
	<div class="container" style="inline-size: 100%; block-size: 100%; display: flex">
		<div class="content-aside">
			<div class="left-section">
				<div class="smg">
					<el-image style="width: 64px; height: 64px; border-radius: 10px" :src="imagePath" fit="fill" />
				</div>
				<div class="right-container">
					<div class="left-text">{{ smgName }}</div>
					<div class="desc-text">{{ description }}</div>
				</div>
			</div>
			<el-menu :default-active="activeIndex" @select="handleSelect" style="background-color: #f7f7f7">
				<el-menu-item index="all">
					<span>所有文档</span>
				</el-menu-item>
				<el-menu-item v-for="(item, index) in documentArr" :index="item">
					{{ item.categoryName }}
				</el-menu-item>
			</el-menu>
		</div>
		<div class="content" style="inline-size: 100%; block-size: 100%">
			<form-list ref="formList" />
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import icon from "@/assets/process/office.png";
import { computed, ref } from "vue";
import FormList from "@/components/main/contentindex/FormList.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const activeIndex = ref("all"); // 默认index
const documentArr = ref([]);
const description = ref("");
const smgName = ref("");
const imagePath = ref("");
const formList = ref(null); // 子组件formList的ref响应
const appId = route.params.id;
// 切换分类
const handleSelect = async (category) => {
	console.log(category);
	if (category != "all") {
		await formList.value.fetchQueryColumnList(category, true);
		activeIndex.value = category; // 更新当前活动索引
	} else {
		// 发送获取所有表单信息
		await formList.value.fetchQueryColumnList(null, true);
		activeIndex.value = "all"; // 更新为“所有文档”
	}
};
//获取栏目信息
const fetchQueryColumnMessage = async () => {
	await getQueryColumnMessageApi(
		{
			appId: "182342d6-8559-4cb4-bc3c-b47dbc153bbc",
		},
		(data) => {
			documentArr.value = data[0].categorylist;
			smgName.value = data[0].xappName;
			description.value = data[0].xdescription;
			imagePath.value = data[0].xappIcon;
			ElMessage.success("获取栏目信息成功");
		},
		() => {
			ElMessage.error("获取栏目信息失败");
		},
	);
};
onMounted(async () => {
	await fetchQueryColumnMessage();
});
</script>

<style scoped>
.content-aside {
	border-top: 1px solid rgb(255, 255, 255);
	border-right: 1px solid rgb(221, 221, 221);
	float: left;
	width: 300px;
	height: 100%;
	background-color: rgb(247, 247, 247);
}

/* 左侧图标 */
.left-section {
	height: 100px;
	width: 300px;
	border-bottom: 3px solid rgb(60, 118, 183);
}

.left-text {
	color: rgb(51, 51, 51);
	font-size: 20px;
	padding-top: 20px;
	line-height: 30px;
	height: 50px;
	width: 170px;
}

.desc-text {
	color: rgb(153, 153, 153);
	font-size: 12px;
	padding-top: 5px;
	padding-bottom: 5px;
	line-height: 20px;
	height: 40px;
	width: 170px;
	overflow: hidden;
}

.smg {
	float: left;
	padding-top: 17px;
	padding-left: 20px;
}

.right-container {
	padding-left: 15px;
	float: left;
	width: 170px;
}
</style>
