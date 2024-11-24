<script setup>
import { watchEffect, onMounted } from "vue";
import { reactive, defineEmits, defineProps, ref } from "vue";
import { rulesMenuValue } from "../mock/mock";
import { addMenuApi } from "@/apis/organize/index";
const emit = defineEmits(["submit-FormValue"]);
const props = defineProps({
	FormDataChildValue: {
		type: Object,
	},
	menuID: {
		type: String,
	},
	FatherMenuID: {
		type: String,
	},
});

const MenuForm = reactive({
	menu_name: "",
	menu_type: "",
	is_button: false,
	permission: "",
	status: false,
	link_url: "",
	level: 0,
	remark: "",
	creator_id: "",
	updater_id: "",
});
// 组件响应式数据
const InformationData = ref({
	ButtonShow: false,
});

const ruleFormRef = ref(null);

const rules = reactive(rulesMenuValue);

// 数据校验和错误处理
const validateFormData = (formData) => {
	return (
		formData &&
		formData.menu_name !== undefined &&
		formData.menu_type !== undefined &&
		formData.is_button !== undefined &&
		formData.permission !== undefined &&
		formData.status !== undefined &&
		formData.link_url !== undefined &&
		formData.level !== undefined &&
		formData.remark !== undefined &&
		formData.creator_id !== undefined &&
		formData.updater_id !== undefined
	);
};

// 使用 watchEffect 监听 FormDataChildValue 的变化
watchEffect(() => {
	const newFormData = props.FormDataChildValue;
	if (validateFormData(newFormData)) {
		MenuForm.menu_name = newFormData.menu_name;
		MenuForm.menu_type = newFormData.menu_type;
		MenuForm.is_button = newFormData.is_button;
		MenuForm.permission = newFormData.permission;
		MenuForm.status = newFormData.status;
		MenuForm.link_url = newFormData.link_url;
		MenuForm.level = newFormData.level;
		MenuForm.remark = newFormData.remark;
		MenuForm.creator_id = newFormData.creator_id;
		MenuForm.updater_id = newFormData.updater_id;
	} else {
		console.error("自定义报错：各项表单没有数值");
	}
});

// 初始赋值
onMounted(() => {
	if (validateFormData(props.FormDataChildValue)) {
		MenuForm.menu_name = props.FormDataChildValue.menu_name;
		MenuForm.menu_type = props.FormDataChildValue.menu_type;
		MenuForm.is_button = props.FormDataChildValue.is_button;
		MenuForm.permission = props.FormDataChildValue.permission;
		MenuForm.status = props.FormDataChildValue.status;
		MenuForm.link_url = props.FormDataChildValue.link_url;
		MenuForm.level = props.FormDataChildValue.level;
		MenuForm.remark = props.FormDataChildValue.remark;
		MenuForm.creator_id = props.FormDataChildValue.creator_id;
		MenuForm.updater_id = props.FormDataChildValue.updater_id;
	} else {
		console.error("FormDataChildValue is invalid or missing required fields");
	}
});
const onSubmit = async (formEl) => {
	emit("submit-FormValue", MenuForm);
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log("submit!");
		} else {
			console.log("error submit!", fields);
		}
	});
};
</script>
<template>
	<el-form
		:disabled="!InformationData.ButtonShow"
		ref="ruleFormRef"
		:inline="true"
		:model="MenuForm"
		:rules="rules"
		label-position="right"
		class="demo-form-inline demo-ruleForm"
		status-icon
	>
		<el-form-item label="菜单名称：" prop="menu_name">
			<el-input v-model="MenuForm.menu_name" clearable />
		</el-form-item>
		<el-form-item label="菜单类型：" prop="menu_type">
			<el-select v-model="MenuForm.menu_type" placeholder="请选择菜单类型">
				<el-option label="普通菜单" value="1" />
				<el-option label="目录" value="2" />
				<el-option label="内嵌Frame" value="3" />
				<el-option label="外链跳转" value="4" />
			</el-select>
		</el-form-item>
		<el-form-item label="所在层级：" prop="level">
			<el-input v-model="MenuForm.level" clearable />
		</el-form-item>
		<el-form-item label="跳转链接:" prop="link_url">
			<el-input v-model="MenuForm.link_url" clearable />
		</el-form-item>
		<el-form-item label="备注：" prop="remark">
			<el-input v-model="MenuForm.remark" clearable />
		</el-form-item>
		<el-form-item label="创建者ID：" prop="creator_id">
			<el-input v-model="MenuForm.creator_id" clearable />
		</el-form-item>
		<el-form-item label="更新者ID：" prop="updater_id">
			<el-input v-model="MenuForm.updater_id" clearable />
		</el-form-item>
		<el-form-item label="菜单状态：" prop="status">
			<el-switch v-model="MenuForm.status" />
		</el-form-item>
		<el-form-item label="权限标识：" prop="permission">
			<el-input v-model="MenuForm.permission" clearable />
		</el-form-item>
		<el-form-item label="权限：" prop="is_button">
			<el-switch v-model="MenuForm.is_button" />
		</el-form-item>
	</el-form>
	<div class="button_form">
		<div v-if="!InformationData.ButtonShow">
			<el-button style="width: 300px" @click="InformationData.ButtonShow = true">编辑信息</el-button>
		</div>
		<div v-if="InformationData.ButtonShow">
			<el-button type="primary" @click="onSubmit(ruleFormRef)" style="width: 300px">保存菜单信息</el-button>
			<el-button @click="InformationData.ButtonShow = false" style="width: 150px">取消</el-button>
		</div>
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
