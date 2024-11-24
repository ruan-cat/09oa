<!-- 表单模板展示弹窗 -->
<template>
	<el-dialog v-model="dialogVisible" @open="handleDialogOpen" @close="closeDialog" title="表单模板选择">
		<!-- 分类标签 -->
		<el-tabs v-model="activeTab" @tab-click="handleTabClick">
			<el-tab-pane label="全部" name="all"></el-tab-pane>
			<el-tab-pane
				v-for="category in categories"
				:key="category.xcategory"
				:label="category.xcategory"
				:name="category.xcategory"
			></el-tab-pane>
		</el-tabs>
		<!-- 模板列表  -->
		<el-row :gutter="20">
			<el-col :xs="24" :sm="12" :lg="6">
				<TemplateCard
					style="margin-top: 10px"
					:templateName="`空白表单`"
					:imagePath="`https://sample.o2oa.net/x_component_process_FormDesigner/Module/Form/template/form.png`"
					:id="appId"
				/>
			</el-col>
			<el-col v-for="item in filteredTemplateList" :key="item.xid" :xs="24" :sm="12" :lg="6">
				<TemplateCard style="margin-top: 10px" :templateName="item.xname" :imagePath="item.xicon" :id="item.xid" />
			</el-col>
		</el-row>
		<!-- 分页组件 -->
		<div class="page-box">
			<el-pagination
				background
				layout="prev, pager, next, sizes"
				:current-page="pageIndex"
				:page-size="pageSize"
				:page-sizes="[5, 10, 20, 50]"
				:total="total"
				@current-change="handlePageChange"
				@size-change="handleSizeChange"
			/>
		</div>
	</el-dialog>
</template>
<script setup>
import { ref } from "vue";
import TemplateCard from "./TemplateCard.vue";
import { getFormQueryAllQueryApi, getFormCategoriesApi } from "@/apis/public";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const route = useRoute();
const appId = route.params.id;
// 弹窗是否显示
const dialogVisible = ref(false);
// 模板列表
const templateList = ref([]);
// 分页状态
const pageIndex = ref(1); // 当前页码
const pageSize = ref(10); // 每页条目数
const total = ref(0); // 总条目数
// 分类列表
const categories = ref(); // 存储所有分类
// 当前选中的分类
const activeTab = ref("all");
// 计算属性：根据当前选中的分类过滤模板列表
const filteredTemplateList = computed(() => {
	if (activeTab.value === "all") {
		return templateList.value;
	}
	return templateList.value.filter((item) => item.xcategory === activeTab.value);
});
// 获取模板列表函数
const fetchTemplateList = async () => {
	await getFormQueryAllQueryApi(
		{
			pageIndex: pageIndex.value,
			pageSize: pageSize.value,
		},
		(data) => {
			templateList.value = data.rows;
			total.value = data.total;
			ElMessage.success("获取模板列表成功");
		},
		() => {
			ElMessage.error("获取模板列表失败，请稍后再试");
		},
	);
};
// 获取分类列表函数
const fetchCategories = async () => {
	await getFormCategoriesApi(
		{
			xapplication: appId,
		},
		(data) => {
			categories.value = data;
			ElMessage.success("获取模板列表成功");
		},
		() => {
			ElMessage.error("获取模板列表失败，请稍后再试");
		},
	);
};
// 打开对话框
const handleDialogOpen = () => {
	// 重置分页状态
	pageIndex.value = 1;
	pageSize.value = 10;
	// 获取第一页数据
	fetchTemplateList();
};

// 关闭对话框
const closeDialog = () => {
	dialogVisible.value = false;
};
// 处理页码变化
const handlePageChange = (newPage) => {
	pageIndex.value = newPage;
	fetchTemplateList();
};
// 处理每页条目数变化
const handleSizeChange = (newSize) => {
	pageSize.value = newSize;
	pageIndex.value = 1; // 通常在更改每页条目数时重置到第一页
	fetchTemplateList();
};
// 展示对话框的方法 - 单独暴露该方法，避免与 openDialog 方法重合，导致触发两次 @open 方法
const showDialog = () => {
	dialogVisible.value = true;
};
/* 暴露的方法 */
defineExpose({
	showDialog,
	closeDialog,
});
</script>
<style scoped>
.page-box {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>
