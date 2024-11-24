<template>
	<el-dialog
		v-model="dialogVisible"
		@open="handleDialogOpen"
		@close="closeDialog"
		:title="props.title"
		width="800px"
		style="min-height: 500px"
	>
		<div style="display: flex">
			<!-- 左侧树形结构 -->
			<div style="flex: 1; margin-right: 20px">
				<el-card shadow="never">
					<el-input
						v-model="filterText"
						style="width: 240px; margin-bottom: 10px; margin-left: 20px"
						placeholder="搜索内容"
					/>
					<el-scrollbar>
						<el-tree
							ref="treeRef"
							:data="props.rolesTree"
							:props="defaultProps"
							highlight-current
							show-checkbox
							@check-change="handleCheckChange"
							:filter-node-method="filterNode"
							style="height: 300px"
						/>
					</el-scrollbar>
				</el-card>
			</div>
			<!-- 右侧列表展示选中的数据 -->
			<div style="flex: 1">
				<el-card shadow="never">
					<h3 style="width: 100%; text-align: center">已选择的节点</h3>
					<el-table :data="DataAll.labelRoles" style="width: 100%" height="315">
						<el-table-column prop="label"></el-table-column>
					</el-table>
				</el-card>
			</div>
		</div>
		<!-- 对话框底部操作按钮 -->
		<template #footer>
			<el-button @click="closeDialog">取消</el-button>
			<el-button type="primary" @click="saveSelections">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
/* defineProps 父传子的参数 */
const props = defineProps({
	isMultiple: {
		type: Boolean,
		default: true,
	},
	// 弹窗标题
	title: {
		type: String,
		default: "选择角色",
	},
	// 角色树 数组格式
	rolesTree: {
		type: Array,
		default: () => [
			{
				id: 1,
				label: "公司领导",
				children: [
					{ id: 2, label: "公司领导1" },
					{ id: 3, label: "公司领导2" },
				],
			},
			{
				id: 4,
				label: "技术部门",
				children: [
					{ id: 5, label: "系统管理员" },
					{ id: 6, label: "研发部" },
					{ id: 7, label: "开发部" },
				],
			},
			{
				id: 8,
				label: "支持部门",
				children: [
					{ id: 9, label: "商务支持部" },
					{ id: 10, label: "财务部" },
				],
			},
			{
				id: 9,
				label: "支持部门",
				children: [
					{ id: 10, label: "商务支持部" },
					{ id: 11, label: "财务部" },
				],
			},
			{
				id: 12,
				label: "支持部门",
				children: [
					{ id: 13, label: "商务支持部" },
					{ id: 14, label: "财务部" },
				],
			},
		],
	},
	TreeStructure: {
		type: Object,
		default: {
			id: "id",
			label: "label",
			children: [],
		},
	},
	label: {
		type: String,
		default: "label",
	},
});

// 弹窗显示状态
const dialogVisible = ref(false);
// 引用树形组件以便获取选中节点
const treeRef = ref(null);
// 搜索关键字
const filterText = ref("");
watch(filterText, (val) => {
	if (treeRef.value) {
		treeRef.value.filter(val);
	}
});
// 过滤树形节点
const filterNode = (value, data) => {
	if (!value) return true;
	return data.label.includes(value);
};
// 树形组件的属性设置
const defaultProps = props.TreeStructure;
// 处理选中节点变化
const handleCheckChange = (data) => {
	console.log(data);

	updateSelectedRoles();
};
// 更新选中的角色列表
const updateSelectedRoles = () => {
	if (treeRef.value) {
		// 确保 treeRef 已被绑定
		const checkedNodes = treeRef.value.getCheckedNodes(true);

		DataAll.labelRoles = checkedNodes.map((node) => ({
			label: node[props.label],
		}));
		DataAll.selectedRoles = checkedNodes.map((node) => ({
			...node,
		}));
	} else {
		console.warn("treeRef is null");
	}
};

/* defineEmits 父传子的方法 */
// 存储选中的角色

const DataAll = reactive({
	selectedRoles: [],
	labelRoles: [],
});
// 定义需要触发的事件
const emits = defineEmits(["save", "openDialog"]);
// 打开弹窗事件
const handleDialogOpen = () => {
	emits("openDialog");
};
// 保存选择的角色
const saveSelections = () => {
	emits("save", DataAll); // 传递选中的角色
};
/* defineExpose 子传父的方法 */
// 展示弹窗
const showDialog = () => {
	dialogVisible.value = true;
};
// 关闭弹窗
const closeDialog = () => {
	dialogVisible.value = false;
	DataAll.selectedRoles = [];
};
// 暴露方法
defineExpose({
	showDialog,
	closeDialog,
});
</script>

<style scoped>
:deep(.el-dialog__body) {
	min-height: 300px;
}
</style>
