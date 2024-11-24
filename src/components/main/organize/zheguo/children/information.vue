<script setup>
import { watchEffect, onMounted } from "vue";
import { reactive, defineEmits, defineProps, ref } from "vue";
import { rulesValue } from "../mock/mock";
import TransferTree from "../component/TransferTree.vue";
import { createOrgApi, getUserNameListApi, getJobNameTreeApi } from "@/apis/organize/index";
import { pinyin } from "pinyin-pro";
import py from "js-pinyin";

// js-pinyin配置
py.setOptions({ checkPolyphone: false, charCase: 1 });
const emit = defineEmits(["submit-FormValue"]);

const props = defineProps({
	FormDataChildValue: {
		type: Object,
	},
});
// 表单数据
const formInline = reactive({
	xname: "",
	xunique: "",
	xtypeList: "",
	xshortName: "",
	xdescription: "",
	xcontrollerList: [],
	xsuperior: "",
	xorderNumber: "",
});

// 组件响应式数据
const InformationData = ref({
	ButtonShow: false,
});

const ruleFormRef = ref(null);
const rules = reactive(rulesValue);
const UserNameList = ref([]);
// 数据校验和错误处理
const validateFormData = (formData) => {
	return (
		formData &&
		formData.xname !== undefined &&
		formData.xunique !== undefined &&
		formData.xshortName !== undefined &&
		formData.xorderNumber !== undefined &&
		formData.xtypeList !== undefined &&
		formData.xdescription !== undefined &&
		formData.xcontrollerList !== undefined &&
		formData.xsuperior !== undefined
	);
};

// 使用 watchEffect 监听 FormDataChildValue 的变化
watchEffect(() => {
	const newFormData = props.FormDataChildValue;
	if (validateFormData(newFormData)) {
		formInline.xname = newFormData.xname;
		formInline.xunique = newFormData.xunique;
		formInline.xshortName = newFormData.xshortName;
		formInline.xorderNumber = newFormData.xorderNumber;
		formInline.xtypeList = newFormData.xtypeList;
		formInline.xdescription = newFormData.xdescription;
		formInline.xcontrollerList = newFormData.xcontrollerList;
		formInline.xsuperior = newFormData.xsuperior;
	} else {
		console.error("自定义报错：各项表单没有数值");
	}
});

// 初始赋值
onMounted(async () => {
	await getUserNameListApi(
		{
			pageIndex: 1,
			pageSize: 10,
			xstatus: "0",
			Pinyin: "1",
			xdistinguishedName: "1",
		},
		() => {
			ElMessage({
				type: "success",
				message: "已获取人员列表",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取人员列表失败",
			});
		},
	).then((res) => {
		UserNameList.value = res.data;
	});
	if (validateFormData(props.FormDataChildValue)) {
		formInline.xname = props.FormDataChildValue.xname;
		formInline.xunique = props.FormDataChildValue.xunique;
		formInline.xshortName = props.FormDataChildValue.xshortName;
		formInline.xorderNumber = props.FormDataChildValue.xorderNumber;
		formInline.xtypeList = props.FormDataChildValue.xtypeList;
		formInline.xdescription = props.FormDataChildValue.xdescription;
		formInline.xcontrollerList = props.FormDataChildValue.xcontrollerList;
		formInline.xsuperior = props.FormDataChildValue.xsuperior;
	} else {
		console.error("FormDataChildValue is invalid or missing required fields");
	}
});
const onSubmit = async (formEl) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log("submit!");
		} else {
			console.log("error submit!", fields);
		}
	});
	ElMessageBox.confirm("你确定要保存信息并提交吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(async () => {
			await createOrgApi(
				{
					...formInline,
					xpinyin: py.getFullChars(formInline.xname),
					xpinyinInitial: pinyin(formInline.xname, {
						pattern: "first",
						toneType: "none",
					}).replaceAll(" ", ""),
				},
				() => {
					emit("submit-FormValue", formInline);
					ElMessage({
						type: "success",
						message: "已提交并保存",
					});
				},
				() => {
					ElMessage({
						type: "error",
						message: "提交失败",
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
const isDouble = ref(true);

const dialogIdRef = ref(null);
const handleFocus = () => {
	isDouble.value = true;
	dialogIdRef.value.showDialog();
};
const handleControllerSave = (data) => {
	formInline.xcontrollerList = data.labelRoles;
	dialogIdRef.value.closeDialog();
};

const handleSuperior = () => {
	isDouble.value = false;
	dialogIdRef.value.showDialog();
};
</script>
<template>
	<el-form
		:disabled="!InformationData.ButtonShow"
		ref="ruleFormRef"
		:inline="true"
		:model="formInline"
		:rules="rules"
		label-position="right"
		class="demo-form-inline demo-ruleForm"
		status-icon
	>
		<el-form-item label="组织名称：" prop="xname">
			<el-input v-model="formInline.xname" clearable />
		</el-form-item>
		<el-form-item label="唯一编码：" prop="xunique">
			<el-input v-model="formInline.xunique" clearable />
		</el-form-item>
		<el-form-item label="组织类别：" prop="xtypeList">
			<el-select v-model="formInline.xtypeList" placeholder="请选择组织类别" size="large" clearable>
				<el-option label="company" value="company" />
				<el-option label="department" value="department" />
			</el-select>
		</el-form-item>
		<el-form-item label="组织简称：" prop="xshortName">
			<el-input v-model="formInline.xshortName" clearable />
		</el-form-item>
		<el-form-item label="组织描述：" style="width: 90.5%" prop="xdescription">
			<el-input v-model="formInline.xdescription" clearable style="width: 100%" />
		</el-form-item>
		<el-form-item label="管理者名：" label-position="right" prop="xcontrollerList">
			<el-select
				v-model="formInline.xcontrollerList"
				multiple
				collapse-tags
				collapse-tags-tooltip
				:max-collapse-tags="3"
				placeholder=""
				@click="handleFocus"
				style="width: 240px"
			>
			</el-select>
		</el-form-item>
		<el-form-item label="上级组织：" prop="xsuperior">
			<el-input @click="handleSuperior" v-model="formInline.xsuperior" clearable />
		</el-form-item>
		<el-form-item label="排序值：" style="width: 90.5%" prop="xorderNumber">
			<el-input-number v-model="formInline.xorderNumber" style="width: 100%" />
		</el-form-item>
	</el-form>
	<div class="button_form">
		<div v-if="!InformationData.ButtonShow">
			<el-button style="width: 300px" @click="InformationData.ButtonShow = true">编辑信息</el-button>
		</div>
		<div v-if="InformationData.ButtonShow">
			<el-button type="primary" @click="onSubmit(ruleFormRef)" style="width: 300px">保存组织信息</el-button>
			<el-button @click="InformationData.ButtonShow = false" style="width: 150px">取消</el-button>
		</div>
		<!-- 对话框 -->
		<TransferTree
			title="选择组织成员"
			:isMultiple="isDouble"
			ref="dialogIdRef"
			label="xname"
			@save="handleControllerSave"
			:rolesTree="UserNameList"
			:TreeStructure="{
				label: 'xname',
				children: 'children',
				xmobile: 'xmobile',
				xunique: 'xunique',
				xdistinguishedName: 'xdistinguishedName',
			}"
		/>
	</div>
</template>

<style lang="scss" scoped>
.demo-form-inline .el-input {
	--el-input-width: 300px;
}

.demo-form-inline .el-select {
	--el-select-width: 300px;
}

.el-form {
	width: 900px;
	margin: 20px auto;

	.el-input {
		height: 40px;
	}

	.el-input-number {
		height: 40px;
	}
}
.button_form {
	display: flex;
	margin-left: 250px;
	justify-content: space-between;

	.el-button {
		height: 35px;
		font-size: 18px;
	}
}
</style>
