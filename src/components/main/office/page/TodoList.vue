<script lang="ts" setup>
import todoCard from "../card/todo-card.vue";
import jsonData from "../test/todo.json";
import { CirclePlus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

// TODO: 需要得到这个生产环境接口
// import { countTaskApi } from "@/apis/office/index.js";

const router = useRouter();
const goToAddProcess = () => {
	router.push("/office/addprocess");
};
const menuItems = ref();

const tableData = jsonData;

onMounted(async () => {
	menuItems.value = [
		{ menuName: "代办" },
		{ menuName: "待阅" },
		{ menuName: "已办" },
		{ menuName: "已阅" },
		{ menuName: "投稿" },
		{ menuName: "草稿" },
	];
	// TODO: 需要得到这个生产环境接口
	// await countTaskApi(
	// 	null,
	// 	(data) => {
	// 		console.log(data);
	// 		menuItems.value.forEach((item) => {
	// 			switch (item.menuName) {
	// 				case "代办":
	// 					item.count = data.task;
	// 					break;
	// 				case "待阅":
	// 					item.count = data.read;
	// 					break;
	// 				case "已办":
	// 					item.count = data.taskComplete;
	// 					break;
	// 				case "已阅":
	// 					item.count = data.readComplete;
	// 					break;
	// 				case "投稿":
	// 					item.count = data.review;
	// 					break;
	// 				case "草稿":
	// 					item.count = data.draft;
	// 					break;
	// 				default:
	// 					item.count = 0; // 如果没有匹配项，可以设置一个默认值
	// 			}
	// 		});
	// 		console.log(menuItems);
	// 	},
	// 	() => {},
	// );
});
</script>

<template>
	<el-row :gutter="10" style="block-size: 950px">
		<el-col :span="4">
			<el-card class="card-container" style="block-size: 100%">
				<div class="title-container" style="display: flex; align-items: center">
					<el-text size="large" style="display: inline-block; margin: 10px">办公中心</el-text>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="22px" @click="goToAddProcess">
							<IconCirclePlusFilled />
						</el-icon>
					</el-button>
				</div>
				<el-menu default-active="0">
					<el-menu-item
						v-for="(item, index) in menuItems"
						:key="index"
						:index="index"
						style="border-inline-start: 1px solid #eee"
					>
						<span>{{ item.menuName }}({{ item.count }})</span>
					</el-menu-item>
				</el-menu>

				<el-button @click="goToAddProcess" type="primary" round style="inline-size: 100%; margin-block-start: 20px">
					<el-icon :size="15"><CirclePlus /></el-icon> 新建流程
				</el-button>
			</el-card>
		</el-col>
		<el-col :span="20">
			<el-card class="card-container" style="display: flex; block-size: 100%">
				<todoCard :table-data="tableData" />
			</el-card>
		</el-col>
	</el-row>
</template>

<style></style>
