<!-- 流程应用页面 -->
<template>
	<el-tabs addable class="content-tabs">
		<!-- 右侧按钮 -->
		<template #add-icon>
			<el-button link class="mg-10">
				<template #icon>
					<telescope />
				</template>
				查找设计
			</el-button>
			<el-button link class="mg-10">
				<template #icon>
					<folder-download />
				</template>
				导入应用
			</el-button>
			<el-input placeholder="搜索..." clearable class="mg-10" style="min-width: 30%" v-model="searchQuery">
				<template #suffix>
					<search />
				</template>
			</el-input>
			<el-button type="primary" class="add-btn" round>
				<template #icon>
					<add-one :strokeWidth="5" />
				</template>
				新建应用
			</el-button>
		</template>
		<!-- 下方的分类栏 -->
		<el-tab-pane label="全部" class="tab-pane">
			<template #label>
				<span class="custom-tabs-label">
					<all-application theme="outline" size="20" :strokeWidth="3" />
					<span class="tab-text">全部</span>
				</span>
			</template>
			<el-row :gutter="20">
				<el-col v-for="card in filteredAppData" :key="card.appId" :md="24" :lg="12" class="content-col">
					<FixedAssetCard
						:appId="card.appId"
						:appIcon="card.appIcon"
						:appType="card.appType"
						:category="card.category"
						:form="card.form"
						:description="card.description"
						:appName="card.appName"
					/>
				</el-col>
			</el-row>
		</el-tab-pane>
		<!-- 动态生成分类 -->
		<el-tab-pane v-for="type in appTypes" :key="type.appType" :label="type.appType" :name="type.appType">
			<template #label>
				<span class="custom-tabs-label">
					<folder-close theme="outline" size="20" :strokeWidth="3" />
					<span class="tab-text">{{ type.appType }}({{ type.count }})</span>
				</span>
			</template>
			<el-row :gutter="20">
				<template v-for="card in filteredAppData">
					<el-col v-if="card.appType === type.appType" :key="card.appId" :md="24" :lg="12" class="process-col">
						<FixedAssetCard
							:appId="card.appId"
							:appIcon="card.appIcon"
							:appType="card.appType"
							:category="card.category"
							:form="card.form"
							:description="card.description"
							:appName="card.appName"
						/>
					</el-col>
				</template>
			</el-row>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
import { ref } from "vue";
import { AllApplication, FolderClose, AddOne, Search, Telescope, FolderDownload } from "@icon-park/vue-next";
import FixedAssetCard from "@/components/main/contentindex/FixedAssetCard.vue";
import { getAllCategoryApi } from "@/apis/contentindex";
const appData = ref([]);
const appTypes = ref([]);
const activeTab = ref("全部");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const category = ref([]);
const form = ref([]);
const searchQuery = ref("");
// 过滤应用数据
const filteredAppData = computed(() => {
	return appData.value.filter((card) => {
		return card.appType.includes(searchQuery.value) || card.description.includes(searchQuery.value);
	});
});
// 获取所有栏目类型
const fetchTypes = async () => {
	await getAllCategoryApi(
		{},
		(data) => {
			appTypes.value = data;
			ElMessage.success("获取所有栏目类型成功");
		},
		() => {
			ElMessage.error("获取所有栏目类型失败");
		},
	);
};
// 获取栏目列表
const fetchData = async () => {
	await getColumnListApi(
		{
			pageIndex: 1,
			pageSize: 10,
			pages: 100,
			appName: "手动阀手动阀",
			rows: 1,
			total: 10000,
		},
		(data) => {
			console.log(data.rows);
			appData.value = data.rows;
			total.value = data.pages;
			category.value = data.rows[0].category;
			form.value = data.rows[0].form;
			ElMessage.success("获取栏目列表成功");
		},
		() => {
			ElMessage.error("获取栏目列表失败，请稍后再试");
		},
	);
};

onMounted(async () => {
	await fetchData();
	await fetchTypes();
});
// 示例数据
</script>

<style scoped>
.content-tabs :deep(.el-tabs__new-tab) {
	border: 0 !important;
	cursor: default !important;
	min-width: 40%;
}

.add-btn {
	z-index: 99;
}
.mg-10 {
	margin-left: 10px;
	margin-right: 10px;
}
.content-tabs :deep(.el-tabs__item) {
	margin-left: 20px !important;
}

.content-col {
	margin-top: 5px; /* 减小卡片之间的纵向间距 */
	padding: 10px; /* 增加卡片内部的边距 */
	width: 100%; /* 确保子组件占满列宽 */
	justify-content: center;
	align-items: center;
}
.custom-tabs-label {
	display: flex;
	align-items: center;
}
.tab-icon {
	width: 20px; /* 根据需要调整图片宽度 */
	height: 20px; /* 根据需要调整图片高度 */
	margin-right: 8px; /* 图片与文字之间的间距 */
	vertical-align: middle;
}
.tab-text {
	font-size: 16px; /* 调整文字大小 */
	margin-bottom: 2px;
	margin-left: 8px;
}
.custom-tabs-label {
	display: flex;
	align-items: center;
}
</style>
