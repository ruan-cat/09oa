<template>
	<el-tabs addable class="process-tabs" v-model="activeTab">
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
			<el-button type="primary" class="add-btn" round @click="handleAddProcess()">
				<template #icon>
					<add-one :strokeWidth="5" />
				</template>
				新建应用
			</el-button>
			<AddProcess ref="addProcessRef" @isAdd="fetchData(isRest)" />
		</template>
		<!-- 全部分类 -->
		<el-tab-pane label="全部" name="全部" class="tab-pane">
			<template #label>
				<span class="custom-tabs-label">
					<all-application theme="outline" size="20" :strokeWidth="3" />
					<span class="tab-text">全部</span>
				</span>
			</template>
			<el-row :gutter="20">
				<el-col v-for="card in filteredAppData" :key="card.xid" :md="24" :lg="12" class="process-col">
					<ProcessCard :name="card.xname" :desc="card.xdescription" :type="card.xapplicationCategory" :id="card.xid" />
				</el-col>
			</el-row>
			<el-pagination
				:current-page="currentPage"
				:page-size="pageSize"
				:total="total"
				layout="prev, pager, next"
				style="text-align: center; justify-content: center; margin-top: 20px; margin-bottom: 50px"
				@current-change="handlePageChange"
			/>
		</el-tab-pane>
		<!-- 动态生成分类 -->
		<el-tab-pane
			v-for="type in appTypes"
			:key="type.xapplicationCategory"
			:label="type.xapplicationCategory"
			:name="type.xapplicationCategory"
		>
			<template #label>
				<span class="custom-tabs-label">
					<folder-close theme="outline" size="20" :strokeWidth="3" />
					<span class="tab-text">{{ type.xapplicationCategory }}({{ type.xcount }})</span>
				</span>
			</template>
			<el-row :gutter="20">
				<template v-for="card in filteredAppData">
					<el-col
						v-if="card.xapplicationCategory === type.xapplicationCategory"
						:key="card.xid"
						:md="24"
						:lg="12"
						class="process-col"
					>
						<ProcessCard
							:name="card.xname"
							:desc="card.xdescription"
							:type="card.xapplicationCategory"
							:id="card.xid"
						/>
					</el-col>
				</template>
			</el-row>
			<el-pagination
				:current-page="currentPage"
				:page-size="pageSize"
				:total="total"
				layout="prev, pager, next"
				style="text-align: center; justify-content: center; margin-top: 20px; margin-bottom: 50px"
				@current-change="handlePageChange"
			/>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ProcessCard from "@/components/main/process/ProcessCard.vue";
import AddProcess from "@/components/main/process/AddProcess.vue";
import { AllApplication, FolderClose, AddOne, Search, Telescope, FolderDownload } from "@icon-park/vue-next";
import { getSummaryApi, getQueryTypesApi } from "@/apis/process";
import { ElMessage } from "element-plus";

const addProcessRef = ref(null);
const appData = ref([]);
const appTypes = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const activeTab = ref("全部");

// 过滤应用数据
const filteredAppData = computed(() => {
	return appData.value.filter((card) => {
		return card.xname.includes(searchQuery.value) || card.xdescription.includes(searchQuery.value);
	});
});
// 获取应用列表
const fetchData = async (isRest = false) => {
	if (isRest) {
		currentPage.value = 1; // 重置页码
	}
	await getSummaryApi(
		{ pageIndex: currentPage.value, pageSize: pageSize.value },
		(data) => {
			appData.value = data.rows;
			total.value = data.total;
			ElMessage.success("获取应用列表成功");
		},
		() => {
			ElMessage.error("获取应用列表失败，请稍后再试");
		},
	);
};
// 获取应用类型
const fetchTypes = async () => {
	await getQueryTypesApi(
		(data) => {
			appTypes.value = data.rows;
			ElMessage.success("获取应用类型成功");
		},
		() => {
			ElMessage.error("获取应用类型失败，请稍后再试");
		},
	);
};

onMounted(async () => {
	await fetchTypes();
	await fetchData();
});
// 处理页面变更
const handlePageChange = (page) => {
	currentPage.value = page;
	fetchData();
};

const handleAddProcess = () => {
	addProcessRef.value.showDialog();
};
</script>

<style scoped>
.process-tabs :deep(.el-tabs__new-tab) {
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
.process-tabs :deep(.el-tabs__item) {
	margin-left: 20px !important;
}
.process-col {
	margin-top: 10px;
	width: 100%; /* 确保子组件占满列宽 */
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
</style>
