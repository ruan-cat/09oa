<template>
	<el-dialog
		v-model="dialogVisible"
		@open="handleDialogOpen"
		@close="closeDialog"
		:title="dialogTitle"
		width="800px"
		style="min-height: 500px"
	>
		<div style="display: flex">
			<!-- 左侧树形结构 -->
			<div style="flex: 1; margin-right: 20px">
				<el-card shadow="never">
					<el-input v-model="filterText" style="width: 240px; margin-bottom: 10px" placeholder="搜索内容" />
					<el-tree
						ref="treeRef"
						:data="processedRolesTree"
						:props="defaultProps"
						node-key="id"
						highlight-current
						@check-change="handleCheckChange"
						:filter-node-method="filterNode"
						:expand-on-click-node="true"
						:render-content="renderContent"
					/>
				</el-card>
			</div>
			<!-- 右侧列表展示选中的数据 -->
			<div style="flex: 1">
				<el-card shadow="never">
					<div slot="header">已选择的身份</div>
					<el-table :data="selectedRoles" style="width: 100%">
						<el-table-column prop="id" label="ID" width="150"></el-table-column>
						<el-table-column prop="label" label="名称" width="180"></el-table-column>
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
import { ref, watch, defineProps, defineEmits, defineExpose, nextTick } from "vue";
import { ElMessage, ElMessageBox, ElCheckbox } from "element-plus";
// 弹窗显示状态
const dialogVisible = ref(false);
const dialogTitle = ref("");
const processedRolesTree = ref([]);

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
function renderContent(h, { node, data, store }) {
	console.log(`Rendering node: ${data.label}, isLeaf: ${data.isLeaf}`);
	if (data.isLeaf) {
		return h("span", [
			h(ElCheckbox, {
				modelValue: node.checked,
				"onUpdate:modelValue": (val) => {
					node.setChecked(val);
					// console.log(`Node ${data.label}, checked: ${node.checked}`);
				},
				style: { display: "inline-block", marginRight: "8px", transform: "translateY(3px)" },
			}),
			h("span", data.label),
		]);
	} else {
		return h("span", data.label);
	}
}
const handleCheckChange = async (data, checked, indeterminate) => {
	if (!props.isMultiple) {
		const allCheckedNodes = treeRef.value.getCheckedNodes();
		allCheckedNodes.forEach((node) => {
			if (node.id !== data.id) {
				treeRef.value.setChecked(node, false);
			}
		});
		await nextTick();
		console.log("All checked nodes after update:", treeRef.value.getCheckedNodes());
	}
	updateSelectedRoles();
};
function processData(data) {
	return data.map((node) => {
		if (node.subordinates && node.subordinates.length > 0) {
			return {
				...node,
				label: node.levelName,
				children: processData(node.subordinates), // 递归处理子节点
				isLeaf: false,
			};
		} else if (node.members && node.members.length > 0) {
			return {
				...node,
				label: node.levelName,
				children: node.members.map((member) => ({
					label: member.mam_name, // 设置成员名称为标签
					id: member.mam_unique, // 设置成员唯一标识为ID
					leaf: true, // 标记为叶子节点
					parent: node,
					isLeaf: true,
				})),
				isLeaf: false,
			};
		}
		return {
			...node,
			isLeaf: true,
		};
	});
}

const updateSelectedRoles = () => {
	const checkedNodes = treeRef.value.getCheckedNodes(true);
	selectedRoles.value = checkedNodes
		.flatMap((node) => {
			// 如果节点是叶子节点，直接使用
			if (node.leaf) {
				return [
					{
						id: node.id, // 成员的唯一标识
						mamName: node.label,
						label: `${node.label} (${node.parent.levelName})`, // 成员名称和层级名称
						level: node.parent.levelName, // 层级名称
					},
				];
			}
			return [];
		})
		.filter((node) => node !== null);
};

const props = defineProps({
	title: String,
	rolesTree: {
		type: Array,
		default: () => [],
	},
	isMultiple: {
		type: Boolean,
		default: true, // 默认为多选
	},
});
watch(
	() => props.rolesTree,
	(newValue) => {
		console.log("rolesTree更新了:", newValue);
		// processedRolesTree.value = processData(newValue);
		try {
			processedRolesTree.value = processData(props.rolesTree);
		} catch (error) {
			console.error("处理 rolesTree 时出错:", error);
		}
	},
	{ deep: true },
);

const defaultProps = {
	children: "children", // 指向处理后的 children 属性
	label: "label", // 显示层级名称
	id: "id", // 唯一标识符
	// 是否多选
	isMultiple: {
		type: Boolean,
		default: true, // 默认为多选
	},
	isLeaf: "isLeaf",
};

// 存储选中的角色
const selectedRoles = ref([]);
// 定义需要触发的事件
const emits = defineEmits(["save", "openDialog"]);
// 打开弹窗事件
const handleDialogOpen = () => {
	emits("openDialog");
};
// 保存选择的角色
const saveSelections = () => {
	emits("save", selectedRoles.value); // 传递选中的角色
	dialogVisible.value = false;
	// ElMessage({
	// 	message: "身份成员添加成功",
	// 	type: "success",
	// 	duration: 3000,
	// });
};
/* defineExpose 子传父的方法 */
// 展示弹窗
const showDialog = (title) => {
	dialogVisible.value = true;
	dialogTitle.value = title;
	console.log("弹窗和标题:", title);
};
console.log("初始化rolesTree:", props.rolesTree);
// 关闭弹窗
const closeDialog = () => {
	dialogVisible.value = false;
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
