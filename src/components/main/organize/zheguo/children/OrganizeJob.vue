<script setup>
import { reactive, ref, defineEmits } from "vue";
import { UserInformation } from "../mock/mock";
import TransferTree from "../component/TransferTree.vue";
import { FilterUser } from "../util/node";
import { Plus, Delete, Close } from "@element-plus/icons-vue";
const emit = defineEmits();
const OrganizeJobValue = reactive({
	// 表格数据
	TableValue: [],
	// 动态更新的弹出框数据
	MemberItems: {},
	// 控制对话框显示与隐藏
	dialogTransferVisible: false,
	// 穿梭框用户数据
	TransferValue: UserInformation,
	// 选中的key值数组
	CheckedUserKey: [],
	// 选中的节点索引
	TableNodeIndex: null,
	// 选中的节点对象
	TableNodeObject: {},
	// 表单数据
	form: {
		// 职位职称
		job: "",
		// 职位描述
		description: "",
	},
	// 返回给父组件的成员数量
	JobNum: 0,
});
// 自定义表单验证规则
const rules = {
	job: [
		{ required: true, message: "请输入职位职称", trigger: "blur" },
		{ min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
	],
	description: [
		{ required: true, message: "请输入职位描述", trigger: "blur" },
		{ min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
	],
};
/**
 * 显示成员信息
 * @event mouseover事件
 * @param {Object} item
 * @returns OrganizeJobValue.MemberItems
 */
const ShowMembers = (item) => {
	OrganizeJobValue.MemberItems = item;
};

/**
 * 点击Tag标签的删除按钮
 * @event click事件
 * @param {Number} index
 * @param {Object} row
 * @returns
 */
const TagDelete = (t_index, row, m_index) => {
	OrganizeJobValue.TableValue[t_index].members.splice(m_index, 1);
};

/**
 * 确定按钮
 * 1.点击之后隐藏对话框
 * 2.通过拿到对应的节点和索引值，通过响应式数据中的TableValue数组的members属性，将选中的key值数组赋值给members
 * @event click事件
 * @returns OrganizeJobValue.TableValue
 */
const DialogSureCheckout = () => {
	OrganizeJobValue.dialogTransferVisible = false;
	OrganizeJobValue.TableValue[OrganizeJobValue.TableNodeIndex].members = FilterUser(
		OrganizeJobValue.TransferValue,
		OrganizeJobValue.CheckedUserKey,
	);
};

/**
 * 将选中的key值数组保存在响应式数据中
 * @event change事件
 * @param movedKeys 选中后的的key值数组
 * @returns OrganizeJobValue.CheckedUserKey
 */
const handleChange = (movedKeys) => {
	OrganizeJobValue.CheckedUserKey = movedKeys;
};

/**
 * 点击添加标签
 * 1. 显示对话框
 * 2. 将选中的节点赋值给响应式数据中
 * 3. 将选中的节点索引赋值给响应式数据中
 * @event click事件
 * @param {Number} index
 * @param {Object} row
 * @returns OrganizeJobValue.dialogTransferVisible
 * @returns OrganizeJobValue.TableNode
 * @returns OrganizeJobValue.TableNodeIndex
 */
const handleAdd = (t_index, row) => {
	OrganizeJobValue.dialogTransferVisible = true;
	OrganizeJobValue.TableNode = row;
	OrganizeJobValue.TableNodeIndex = t_index;
};

/**
 * 点击删除表格行数据
 * @event click事件
 * @param {Number} index 选中的行索引
 * @param {Object} row 选中的行数据对象
 * @returns OrganizeJobValue.TableValue
 */
const handleDelete = (t_index, row) => {
	OrganizeJobValue.TableValue.splice(t_index, 1);
	OrganizeJobValue.JobNum = OrganizeJobValue.TableValue.length;
	emit("submit-Job", OrganizeJobValue.JobNum);
};

/**
 * 点击提交表单数据
 * 1.保存表单数据
 * 2.添加到表格数据中
 * @event click事件
 * @param formEl 表单对象
 */
const submitForm = () => {
	OrganizeJobValue.TableValue.push({
		id: Date.now(),
		job: OrganizeJobValue.form.job,
		description: OrganizeJobValue.form.description,
		members: [],
	});
	OrganizeJobValue.JobNum = OrganizeJobValue.TableValue.length;
	emit("submit-Job", OrganizeJobValue.JobNum);

	OrganizeJobValue.form.job = "";
	OrganizeJobValue.form.description = "";
};

/**
 * 点击重置表单数据
 * 1. 清空表单数据
 * @event click事件
 * @param formEl 表单对象
 */
const resetForm = () => {
	OrganizeJobValue.form = {
		job: "",
		desc: "",
	};
};
</script>
<template>
	<div style="padding: 20px">
		<el-table style="width: 1060px" :data="OrganizeJobValue.TableValue">
			<el-table-column label="职务名称" prop="job" />
			<el-table-column label="描述" prop="description" />
			<el-table-column label="成员" prop="members" width="300">
				<template #default="scope">
					<div class="custom-scrollbar">
						<el-popover :width="300" placement="top" trigger="hover">
							<template #reference>
								<div>
									<el-tag
										style="margin-right: 5px; cursor: pointer"
										v-for="(item, index) in scope.row.members"
										:key="index"
										@mouseover="ShowMembers(item)"
										size="small"
										type="success"
									>
										{{ item.label }}
										<el-icon @click="TagDelete(scope.$index, scope.row, index)" style="margin-left: 5px; font: 20px"
											><Close
										/></el-icon>
									</el-tag>
								</div>
							</template>
							<div style="display: flex; justify-content: center; align-items: center">
								<div>
									<p>姓名：{{ OrganizeJobValue.MemberItems.label }}</p>
									<p>工号：{{ OrganizeJobValue.MemberItems.p_code }}</p>
									<p>手机号码：{{ OrganizeJobValue.MemberItems.phone_number }}</p>
									<p>邮箱：{{ OrganizeJobValue.MemberItems.email }}</p>
									<p>排序值：{{ OrganizeJobValue.MemberItems.sortValue }}</p>
								</div>
							</div>
						</el-popover>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="right" width="200">
				<template #header>
					<el-popover :width="300" placement="top" trigger="click">
						<template #reference>
							<el-button size="small" type="primary"> 添加 </el-button>
						</template>
						<el-form :model="OrganizeJobValue.form" :rules="rules" ref="ruleFormRef" label-width="auto" status-icon>
							<el-form-item label="职称" prop="job">
								<el-input v-model="OrganizeJobValue.form.job" />
							</el-form-item>
							<el-form-item label="描述" prop="description">
								<el-input v-model="OrganizeJobValue.form.description" />
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm">提交</el-button>
								<el-button @click="resetForm">重置</el-button>
							</el-form-item>
						</el-form>
					</el-popover>
				</template>
				<template #default="scope">
					<el-button type="primary" :icon="Plus" circle @click="handleAdd(scope.$index, scope.row)" />
					<el-button type="danger" :icon="Delete" circle @click="handleDelete(scope.$index, scope.row)" />
				</template>
			</el-table-column>
		</el-table>

		<!-- 对话框 -->
		<el-dialog v-model="OrganizeJobValue.dialogTransferVisible" :show-close="false" width="700" height="400">
			<div style="margin-left: 20px">
				<!-- 穿梭框 -->
				<TransferTree :TransferValue="OrganizeJobValue.TransferValue" @submit-CheckedUserKey="handleChange" />
			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="OrganizeJobValue.dialogTransferVisible = false">返回</el-button>
					<el-button type="primary" @click="DialogSureCheckout"> 确定 </el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped>
.custom-scrollbar {
	overflow-y: scroll; /* 确保元素有滚动条 */
	width: 300px;
	overflow-x: auto;
	display: flex;
	padding: 5px;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 10px;
	height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #555;
	cursor: pointer;
}
</style>
