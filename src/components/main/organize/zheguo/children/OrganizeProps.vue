<script setup>
import { reactive, defineEmits, onMounted, defineProps } from "vue";
import { getOrgAttr, deleteOrgAttr, addOrgAttr } from "@/apis/organize/index";
// 获取父组件传递的属性
const emit = defineEmits();
const props = defineProps({
	// 父组件传递的属性
	xid: {
		type: String,
		default: "",
	},
});
// 组织属性数据结构
const OrganizePropsValue = reactive({
	// 表格数据
	TableValue: [],
	// 表单数据
	form: {
		xdistinguishedName: "",
		xdistributeFactor: "",
		xdescription: "",
	},
	PropNum: 0,
});
// 自定义校验规则
const rules = {
	props: [
		{
			required: true,
			message: "请输入属性",
			trigger: "blur",
		},
	],
	value: [
		{
			required: true,
			message: "请输入值",
			trigger: "blur",
		},
	],
	desc: [
		{
			required: true,
			message: "请输入描述",
			trigger: "blur",
		},
	],
};

// 获取组织属性
onMounted(async () => {
	await getOrgAttr(
		{
			pageIndex: 1,
			pageSize: 10,
		},
		() => {
			ElMessage({
				type: "success",
				message: "已获取组织属性",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取组织属性失败",
			});
		},
	).then((res) => {
		OrganizePropsValue.TableValue = res.data.rows;
		OrganizePropsValue.PropNum = res.data.rows.length;
		emit("submit-Props", OrganizePropsValue.PropNum);
	});
});
/**
 * 点击提交表单数据
 * 1.保存表单数据
 * 2.添加到表格数据中
 * @event click事件
 * @param formEl 表单对象
 */
const submitForm = () => {
	console.log(props.xid);

	if (!props.xid) {
		ElMessage({
			type: "error",
			message: "请先选择组织",
		});
		return;
	}
	ElMessageBox.confirm("你确定要添加该属性吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(async () => {
			await addOrgAttr(
				{
					xid: props.xid,
					xdistinguishedName: OrganizePropsValue.form.xdistinguishedName,
					xdistributeFactor: OrganizePropsValue.form.xdistributeFactor,
					xdescription: OrganizePropsValue.form.xdescription,
				},
				() => {
					OrganizePropsValue.TableValue.push({
						xid: Date.now(),
						xdistinguishedName: OrganizePropsValue.form.xdistinguishedName,
						xdistributeFactor: OrganizePropsValue.form.xdistributeFactor,
						xdescription: OrganizePropsValue.form.xdescription,
					});
					OrganizePropsValue.PropNum = OrganizePropsValue.TableValue.length;
					emit("submit-Props", OrganizePropsValue.PropNum);
					resetForm();
					ElMessage({
						type: "success",
						message: "已成功添加该属性",
					});
				},
				() => {
					ElMessage({
						type: "error",
						message: "添加失败",
					});
				},
			);
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "已撤销选择",
			});
		});
};

/**
 * 点击重置表单数据
 * 1. 清空表单数据
 * @event click事件
 * @param formEl 表单对象
 */
const resetForm = () => {
	OrganizePropsValue.form = {
		xdistinguishedName: "",
		xdistributeFactor: "",
		xdescription: "",
	};
};
/**
 * 删除行数据
 * 1. 删除表格数据
 * @param index 删除的索引
 * @param row 行数据
 */
const handleDelete = (index, row) => {
	console.log(row);

	ElMessageBox.confirm("你确定要删除该属性吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(async () => {
			await deleteOrgMember(
				{
					xids: [row.xid],
				},
				() => {
					OrganizePropsValue.TableValue.splice(index, 1);
					OrganizePropsValue.PropNum = OrganizePropsValue.TableValue.length;
					emit("submit-Props", OrganizePropsValue.PropNum);
					ElMessage({
						type: "success",
						message: "已成功删除该属性",
					});
				},
				() => {
					ElMessage({
						type: "error",
						message: "删除失败",
					});
				},
			);
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "已撤销选择",
			});
		});
};
</script>

<template>
	<div style="padding: 20px">
		<el-table style="width: 1060px" :data="OrganizePropsValue.TableValue">
			<el-table-column label="属性" prop="xdistinguishedName" />
			<el-table-column label="值" prop="xdistributeFactor" />
			<el-table-column label="描述" prop="xdescription" />
			<el-table-column align="right" width="400">
				<template #header>
					<el-popover :width="300" placement="bottom" trigger="click">
						<template #reference>
							<el-button size="small" type="primary"> 添加 </el-button>
						</template>
						<el-form :model="OrganizePropsValue.form" :rules="rules" label-width="auto" status-icon>
							<el-form-item label="属性" prop="xdistinguishedName">
								<el-input v-model="OrganizePropsValue.form.xdistinguishedName" />
							</el-form-item>
							<el-form-item label="值" prop="xdistributeFactor">
								<el-input v-model="OrganizePropsValue.form.xdistributeFactor" />
							</el-form-item>
							<el-form-item label="描述" prop="xdescription">
								<el-input v-model="OrganizePropsValue.form.xdescription" />
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm">提交</el-button>
								<el-button @click="resetForm">重置</el-button>
							</el-form-item>
						</el-form>
					</el-popover>
				</template>
				<template #default="scope">
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"> 删除 </el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
