<template>
	<el-container>
		<el-header class="content-header">
			<el-button plain @click="handleAdd">新建</el-button>
			<el-dialog v-model="isShowClass" title="选择分类" width="600">
				<el-menu>
					<el-menu-item v-for="(item, index) in documentArr" :key="index" :index="item" @click="navigateTo(item)">
						{{ item }}
					</el-menu-item>
				</el-menu>
			</el-dialog>
			<el-dialog v-model="isShowNewMessage" title="选择分类" width="600">
				<div class="form-container">
					<div class="smg">
						<el-image style="width: 64px; height: 64px; border-radius: 10px" :src="imagePath" fit="fill" />
						<span
							class="categoryName"
							style="
								font-size: 20px;
								display: flex;
								justify-content: center;
								align-items: center;
								text-align: center;
								width: 100%;
							"
						>
							{{ activeCategory }}
						</span>
					</div>
					<el-form :model="form" label-width="auto" :rules="rules" style="max-width: 600px">
						<el-form-item label="新建单位">
							{{ form.xcreatorUnitName }}
						</el-form-item>
						<el-form-item label="身份">
							{{ form.xcreatorName }}
						</el-form-item>
						<el-form-item label="时间">
							{{ form.xcreateTime }}
						</el-form-item>
						<el-form-item label="标题">
							<el-input v-model="form.xtitle" />
						</el-form-item>
						<el-button type="primary" @click="handleConfirm">确定</el-button>
						<el-button @click="handleCancel">取消</el-button>
					</el-form>
				</div>
			</el-dialog>
			<el-button type="danger" @click="handleDelete" :disabled="!selectedRows.length">批量删除</el-button>
		</el-header>
		<el-main class="content-main">
			<el-table :data="filterTableData" style="width: 100%" ref="table" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column label="标题" property="title" />
				<el-table-column label="创建人" property="createPerson" />
				<el-table-column label="创建部门" property="createDepartment" />
				<el-table-column label="分类" property="class" />
				<el-table-column label="发布时间" property="date" />
				<el-table-column align="right">
					<template #header>
						<el-input v-model="search" size="small" placeholder="Type to search" />
					</template>
					<template #default="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
						<el-button size="small" type="danger" @click="handleDeleteItem(scope.$index, scope.row)">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next, sizes"
				:current-page="pageIndex"
				:page-size="pageSize"
				:page-sizes="[5, 10, 20, 50]"
				:total="total"
				@current-change="handlePageChange"
				@size-change="handleSizeChange"
				style="margin-top: auto; justify-content: center"
			/>
		</el-main>
	</el-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { getQueryColumnListApi, deleteMessageApi, getFindNewMessageApi } from "@/apis/contentindex";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { watch } from "vue";

const props = defineProps({
	category: String, //表单类型
});
// watch(
// 	() => props.category,
// 	async (newCategory) => {
// 		if (newCategory) {
// 			await fetchQueryColumnList(newCategory, true);
// 		}
// 	},
// );
const router = useRouter();
const route = useRoute();
// 搜索输入的响应式变量
const search = ref("");
// 表格数据
const tableData = ref([]);
// 分页状态
const pageIndex = ref(1); // 当前页码
const pageSize = ref(10); // 每页条目数
const total = ref(0); // 总条目数
const documentArr = ref([]); //新建的目录
const appId = route.params.id;
const isShowClass = ref(false);
const isShowNewMessage = ref(false);
const activeCategory = ref("");

const form = reactive({
	xtitle: "",
	xcategoryName: "",
	xcreateTime: "",
	xcreatorName: "",
	xcreatorUnitName: "",
});
const rules = {
	xtitle: [{ required: true }],
};
const formRef = ref(null);
const imagePath = ref("");
//新建后跳转到对应的页面
const navigateTo = async (item) => {
	activeCategory.value = item;
	isShowClass.value = false;
	isShowNewMessage.value = true;
	await fetchFindNewMessage();
};
//点击确定
const handleConfirm = () => {
	isShowNewMessage.value = false;
	router.push("/contentindex/fixedAsset/newMessage");
};
//点击取消
const handleCancel = () => {
	isShowNewMessage.value = false;
	router.push("/main/contentindex/FixedAssetDetails");
};

//获取新建消息页面
const fetchFindNewMessage = async () => {
	console.log(appId);

	await getFindNewMessageApi(
		{
			xappId: appId,
			xidentityId: "用户1",
		},
		(data) => {
			imagePath.value = data.xcategoryIcon;
			form.xcategoryName = data.xcategoryName;
			form.xcreateTime = data.xcreateTime;
			form.xcreatorName = data.xcreatorName;
			form.xcreatorUnitName = data.xcreatorUnitName;

			ElMessage.success("获取新建消息页面成功");
		},
		() => {
			ElMessage.error("获取新建消息页面失败");
		},
	);
};

// 获取文档列表
const fetchQueryColumnList = async (category, resetPage = false) => {
	if (resetPage) {
		pageIndex.value = 1;
	}
	await getQueryColumnListApi(
		{
			xid: appId,
			xcategoryName: "你哈送到家奥斯",
			pageIndex: pageIndex.value, // 当前页数
			pageSize: pageSize.value, // 每页显示条目数
			...(category
				? {
						xcategory: category,
					}
				: {}),
		},
		(data) => {
			// 对 data.rows 进行字段映射
			tableData.value = data.rows.map((row) => ({
				title: row.xtitle,
				createPerson: row.xcreatorName,
				createDepartment: row.xcreatorUnit,
				class: row.xcategoryName,
				date: row.xpublishTime,
			}));
			total.value = data.total;
			ElMessage.success("获取文档列表成功");
		},
		() => {
			ElMessage.error("获取文档列表失败");
		},
	);
};

//选择新建
const handleAdd = async () => {
	isShowClass.value = true;
	await getQueryColumnMessageApi(
		{
			appId: appId,
		},
		(data) => {
			documentArr.value = data[0].additionalFields;
			console.log(documentArr.value);
			ElMessage.success("获取栏目信息成功");
		},
		() => {
			ElMessage.error("获取栏目信息失败");
		},
	);
};
defineExpose({
	fetchQueryColumnList,
});
onMounted(async () => {
	await fetchQueryColumnList();
});
// 选中的行
const selectedRows = ref([]);
// 计算属性：根据搜索输入过滤表格数据
const filterTableData = computed(() =>
	tableData.value.filter((data) => !search.value || data.title.toLowerCase().includes(search.value.toLowerCase())),
);
// 编辑操作
const handleEdit = (index, row) => {
	router.push("/contentindex/NewMessage");
	router.push({
		path: "/contentindex/NewMessage",
		query: { appId: appId, id: row.id },
	});
};
// 删除操作
const handleDelete = async () => {
	const indexes = ref([]);
	selectedRows.value.forEach((row) => {
		const index = tableData.value.indexOf(row);
		indexes.value.push(row.title);
	});
	await deleteMessageApi(
		{
			ids: indexes,
		},
		() => {
			ElMessage.success("删除成功");
		},
		() => {
			ElMessage.error("删除失败");
		},
	);
};
//删除对应项目
const handleDeleteItem = async (index, row) => {
	await deleteMessageApi(
		{
			ids: index,
		},
		() => {
			ElMessage.success("删除成功");
		},
		() => {
			ElMessage.error("删除失败");
		},
	);
	console.log("Delete:", index, row);
};
// 选中行变化处理
const handleSelectionChange = (selection) => {
	selectedRows.value = selection;
};
// 添加操作
const dialogFormVisible = () => {};
// 处理页码变化
const handlePageChange = (newPage) => {
	pageIndex.value = newPage;
	fetchQueryColumnList();
};
// 处理每页条目数变化
const handleSizeChange = (newSize) => {
	pageSize.value = newSize;
	pageIndex.value = 1; // 通常在更改每页条目数时重置到第一页
	fetchQueryColumnList();
};
</script>

<style scoped>
.content-header {
	margin-left: 13px;
	margin-right: 20px;
	border-bottom: 1px solid rgb(204, 204, 204);
}

.content-main {
	margin-left: 13px;
	margin-right: 10px;
	height: 528.429px;
	display: flex;
	flex-direction: column;
}
</style>
