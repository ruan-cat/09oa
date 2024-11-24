<template>
	<ProcessDetailsHeader @add-click="handleAddFormClick()" />
	<FormTemplateDialog ref="formTemplateDialogRef" />
	<el-tabs v-model="activeCategory">
		<el-tab-pane v-for="(category, index) in categories" :key="index" :label="category.name" :name="category.name">
			<el-row :gutter="20">
				<el-col v-for="card in formCards" :key="card.id" :id="card.id" :sm="24" :md="12" :lg="6" class="process-col">
					<DetailsCard
						:title="card.xname"
						:time="card.xupdateTime"
						:id="card.xid"
						:app-id="appId"
						@edit="handleEditForm"
						@delete="handleDeleteForm"
					/>
				</el-col>
			</el-row>
			<el-pagination
				v-model:current-page="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next"
				:total="total"
				style="text-align: center; justify-content: center"
				hide-on-single-page
			/>
		</el-tab-pane>
	</el-tabs>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import ProcessDetailsHeader from "@/components/main/process/ProcessDetailsHeader.vue";
import DetailsCard from "@/components/main/process/DetailsCard.vue";
import FormTemplateDialog from "@/components/main/public/formtemplatedialog/FormTemplateDialog.vue";
import { getFormClassAndCountApi, getFormListApi, deleteFormApi } from "@/apis/process/form.js";
const router = useRouter();
const route = useRoute();
// 模板对话框ref
const formTemplateDialogRef = ref(null);
// 表单卡片列表
const formCards = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
// 分类数据
const categories = ref([{ name: "全部", number: 0 }]);
const activeCategory = ref("全部"); // 默认选中“全部”分类
const appId = route.params.id;
// 获取分类数据的方法
const fetchCategories = async () => {
	await getFormClassAndCountApi(
		{ xapplication: appId },
		(data) => {
			// 成功回调
			categories.value.push(
				...data.map((cat) => ({
					name: cat.xcategory,
					number: cat.xnumber,
				})),
			);
		},
		() => {
			// 失败回调
			ElMessage.error("获取分类失败，请稍后再试");
		},
	);
};
// 获取表单列表的方法
const fetchFormList = async (page, size, categoryId) => {
	await getFormListApi(
		{ pageIndex: page, pageSize: size, ...(categoryId ? { xcategory: categoryId } : null), xapplication: appId },
		(data) => {
			// 成功回调
			formCards.value = data.rows;
			total.value = data.total;
			pageSize.value = data.pageSize;
			currentPage.value = data.pageIndex;
			ElMessage.success("获取数据成功");
		},
		() => {
			// 失败回调
			ElMessage.error("获取数据失败，请稍后再试");
		},
	);
};
// 处理页码变化
watch(
	() => currentPage.value,
	(newValue) => {
		fetchFormList(newValue, pageSize.value, activeCategory.value);
	},
);
// 处理分类变化
watch(
	() => activeCategory.value,
	(newCategory) => {
		currentPage.value = 1; // 切换分类时重置页码
		if (newCategory != "全部") {
			fetchFormList(currentPage.value, pageSize.value, newCategory);
		} else {
			fetchFormList(currentPage.value, pageSize.value, null);
		}
	},
);
onMounted(async () => {
	await fetchCategories();
	await fetchFormList(currentPage.value, pageSize.value, null);
});
// 跳转选择表单模板界面
const handleAddFormClick = () => {
	formTemplateDialogRef.value.showDialog();
};
// 修改卡片事件
const handleEditForm = (id, appId) => {
	router.push({
		name: "FormManage",
		query: { id, appId },
	});
};
// 删除卡片事件
const handleDeleteForm = async (id) => {
	await deleteFormApi(
		id,
		() => {
			currentPage.value = 1; // 重置页码
			fetchFormList(currentPage.value, pageSize.value, activeCategory.value);
			fetchCategories();
			ElMessage.success("删除成功");
		},
		() => {
			ElMessage.error("删除失败");
		},
	);
};
</script>
<style scoped>
.process-col {
	margin-top: 10px;
	width: 100%;
}
</style>
