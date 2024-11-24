<template>
	<!-- 对话框 -->
	<el-dialog v-model="dialogVisible" title="新增流程" width="500px" @close="resetForm">
		<el-form :model="form" :rules="rules" ref="formRef" label-width="100px" label-position="right">
			<!-- 应用名称 -->
			<el-form-item label="应用名称" prop="appName">
				<el-input v-model="form.appName" placeholder="请输入应用名称"></el-input>
			</el-form-item>
			<!-- 应用别名 -->
			<el-form-item label="应用别名" prop="appAlias">
				<el-input v-model="form.appAlias" placeholder="请输入应用别名"></el-input>
			</el-form-item>
			<!-- 应用描述 -->
			<el-form-item label="应用描述" prop="appDescription">
				<el-input type="textarea" v-model="form.appDescription" placeholder="请输入应用描述" rows="4"></el-input>
			</el-form-item>
			<!-- 应用类型 -->
			<el-form-item label="应用类型" prop="appType">
				<el-input v-model="form.appType" placeholder="请输入应用类型"></el-input>
			</el-form-item>
		</el-form>

		<!-- 对话框底部按钮 -->
		<template #footer>
			<el-button @click="closeDialog">取消</el-button>
			<el-button type="primary" @click="submitForm">确定</el-button>
		</template>
	</el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getApplicationAddApi } from "@/apis/process/index.js";
// 弹窗是否显示
const dialogVisible = ref(false);
// 表单引用
const formRef = ref(null);
// 表单数据
const form = reactive({
	appName: "",
	appAlias: "",
	appDescription: "",
	appType: "",
});
// 表单验证规则
const rules = {
	appName: [{ required: true, message: "请输入应用名称", trigger: "blur" }],
	appAlias: [{ required: true, message: "请输入应用别名", trigger: "blur" }],
	appDescription: [{ required: true, message: "请输入应用描述", trigger: "blur" }],
	appType: [{ required: true, message: "请输入应用类型", trigger: "blur" }],
};
// 显示对话框
const showDialog = () => {
	dialogVisible.value = true;
};
// 关闭对话框并重置表单
const closeDialog = () => {
	dialogVisible.value = false;
	resetForm();
};
const emit = defineEmits(["submit"]);
// 提交表单
const submitForm = () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			await getApplicationAddApi(
				{
					xname: form.appName,
					xalias: form.appAlias,
					xdescription: form.appDescription,
					xapplicationCategory: form.appType,
				},
				() => {
					// 在这里通知父组件,刷新应用列表
					emit("isAdd", true);
					closeDialog();
					ElMessage.success("新增成功");
				},
				() => {
					ElMessage.error("新增失败");
				},
			);
		} else {
			console.log("表单验证失败");
			return false;
		}
	});
};
// 重置表单
const resetForm = () => {
	if (formRef.value) {
		formRef.value.resetFields();
	}
};
// 暴露的方法
defineExpose({
	showDialog,
	closeDialog,
});
</script>
