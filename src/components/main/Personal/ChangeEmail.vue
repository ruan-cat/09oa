<template>
	<div class="change-email">
		<el-form :model="changeEmailForm" :rules="emailRules" ref="emailFormRef" label-width="100px">
			<el-form-item label="当前邮箱" prop="currentEmail">
				<el-input v-model="changeEmailForm.mail" placeholder="请输入当前邮箱"></el-input>
			</el-form-item>
			<el-form-item label="新邮箱" prop="newEmail">
				<el-input v-model="changeEmailForm.newmail" placeholder="请输入新邮箱"></el-input>
			</el-form-item>
			<div class="button-center">
				<el-button type="primary" @click="onSubmitEmailChange">修改</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { modifyEmailApi } from "@/apis/personal/index.js";

const changeEmailForm = reactive({
	mail: "",
	newmail: "",
});

const emailFormRef = ref(null);
const emailRules = {
	mail: [
		{ required: true, message: "请输入当前邮箱", trigger: "blur" },
		{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
	],
	newmail: [
		{ required: true, message: "请输入新邮箱", trigger: "blur" },
		{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
	],
};

// 提交表单并调用API修改邮箱
const onSubmitEmailChange = async () => {
	emailFormRef.value.validate(async (valid) => {
		if (valid) {
			try {
				// 调用API传递邮箱
				const data = {
					id: 1,
					mail: "3170610146@qq.com",
					newmail: "2601803754@qq.com",
				};
				await modifyEmailApi(
					data,
					(response) => {
						// 成功时的反馈
						ElMessage.success("邮箱修改成功");
					},
					(error) => {
						// 错误处理
						ElMessage.error("邮箱修改失败，请稍后再试");
					},
				);
			} catch (error) {
				ElMessage.error("邮箱修改失败，请稍后再试");
			}
		} else {
			ElMessage.error("表单验证失败，请检查输入");
		}
	});
};
</script>

<style scoped>
.change-email {
	width: 600px;
	margin: 20px auto;
	background-color: #f9f9f9;
	padding: 20px;
	border-radius: 10px;
}

.button-center {
	text-align: center;
}
</style>
