<template>
	<div class="change-password">
		<div v-if="!isForgotPassword" class="change-password-tab">
			<el-form :model="changePasswordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
				<el-form-item label="当前密码" prop="currentPassword">
					<el-input
						v-model="changePasswordForm.currentPassword"
						type="password"
						placeholder="请输入当前密码"
					></el-input>
				</el-form-item>

				<el-form-item label="新密码" prop="newPassword">
					<el-input v-model="changePasswordForm.newPassword" type="password" placeholder="请输入新密码"></el-input>
				</el-form-item>

				<el-form-item label="确认新密码" prop="confirmNewPassword">
					<el-input
						v-model="changePasswordForm.confirmNewPassword"
						type="password"
						placeholder="请再次输入新密码"
					></el-input>
				</el-form-item>

				<div class="button-center">
					<el-button type="primary" @click="onSubmitPasswordChange">修改密码</el-button>
					<el-button type="primary" @click="isForgotPassword = true">忘记密码?</el-button>
				</div>
			</el-form>
		</div>

		<div v-if="isForgotPassword" class="forgot-password-tab">
			<el-form :model="forgotPasswordForm" :rules="forgotPasswordRules" ref="forgotPasswordFormRef" label-width="120px">
				<el-form-item label="手机号或邮箱" prop="contactInfo">
					<el-input v-model="forgotPasswordForm.contactInfo" placeholder="请输入手机号或邮箱"></el-input>
				</el-form-item>

				<el-form-item label="验证码" prop="verificationCode">
					<el-input v-model="forgotPasswordForm.verificationCode" placeholder="请输入收到的验证码"></el-input>
					<div class="sendCode" style="margin-left: 10px">
						<el-button type="primary" @click="sendVerificationCode">发送验证码</el-button>
					</div>
				</el-form-item>

				<el-form-item label="新密码" prop="newPassword">
					<el-input v-model="forgotPasswordForm.newPassword" type="password" placeholder="请输入新密码"></el-input>
				</el-form-item>

				<el-form-item label="确认新密码" prop="confirmNewPassword">
					<el-input
						v-model="forgotPasswordForm.confirmNewPassword"
						type="password"
						placeholder="请再次输入新密码"
					></el-input>
				</el-form-item>

				<div class="button-center">
					<el-button type="primary" @click="onSubmitForgotPassword">重置密码</el-button>
					<el-button type="primary" @click="isForgotPassword = false">返回</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { modifyPwdApi } from "@/apis/personal/index.js";

const isForgotPassword = ref(false);

// 引用表单实例的 ref
const passwordFormRef = ref(null);

const changePasswordForm = reactive({
	currentPassword: "",
	newPassword: "",
	confirmNewPassword: "",
});

const forgotPasswordForm = reactive({
	contactInfo: "",
	verificationCode: "",
	newPassword: "",
	confirmNewPassword: "",
});

const passwordRules = {
	currentPassword: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
	newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
	confirmNewPassword: [
		{ required: true, message: "请确认新密码", trigger: "blur" },
		{
			validator: (rule, value, callback) => {
				if (value !== changePasswordForm.newPassword) {
					callback(new Error("两次输入的新密码不一致"));
				} else {
					callback();
				}
			},
			trigger: "blur",
		},
	],
};

const forgotPasswordRules = {
	contactInfo: [{ required: true, message: "请输入手机号或邮箱", trigger: "blur" }],
	verificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
	newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
	confirmNewPassword: [
		{ required: true, message: "请确认新密码", trigger: "blur" },
		{
			validator: (rule, value, callback) => {
				if (value !== forgotPasswordForm.newPassword) {
					callback(new Error("两次输入的新密码不一致"));
				} else {
					callback();
				}
			},
			trigger: "blur",
		},
	],
};

const onSubmitPasswordChange = async () => {
	passwordFormRef.value.validate(async (valid) => {
		if (valid) {
			try {
				// 调用修改密码的 API
				const data = {
					id: 1,
					prePassword: changePasswordForm.currentPassword,
					newPassword: changePasswordForm.newPassword,
				};
				await modifyPwdApi(
					data,
					(response) => {
						// 成功回调
						ElMessage.success("密码修改成功");
					},
					(error) => {
						// 失败回调
						ElMessage.error("密码修改失败，请稍后再试");
					},
				);
			} catch (error) {
				ElMessage.error("修改密码请求失败，请稍后再试");
			}
		} else {
			ElMessage.error("表单验证失败，请检查输入");
		}
	});
};
const onSubmitForgotPassword = () => {
	forgotPasswordFormRef.value.validate((valid) => {
		if (valid) {
			ElMessage.success("密码重置成功！");
		} else {
			ElMessage.error("表单验证失败，请检查输入");
		}
	});
};

const sendVerificationCode = () => {
	ElMessage.success("验证码已发送！");
};
</script>

<style scoped>
.change-password {
	width: 600px;
	margin: 20px auto;
	background-color: #f9f9f9;
	padding: 20px;
	border-radius: 10px;
}

.button-center {
	text-align: center;
}

.forgot-password-tab .el-input {
	width: 300px;
}

.change-password-tab .el-input,
.forgot-password-tab .el-input {
	width: 300px;
}
</style>
