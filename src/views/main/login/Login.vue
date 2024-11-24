<template>
	<div class="background-image"></div>
	<div
		style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; padding-right: 180px"
	>
		<el-card class="login-card">
			<template #header>
				<span class="title">零壹OA 开发平台</span>
			</template>
			<!-- 登录表单和忘记密码表单的切换 -->
			<div v-if="!showForgetPassword">
				<el-tabs v-model="activeTab">
					<el-tab-pane name="password" label="密码登录">
						<el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="auto">
							<el-form-item label="用户名" prop="username">
								<el-input v-model="loginForm.username" placeholder="请输入用户名" />
							</el-form-item>
							<el-form-item label="密码&nbsp;&nbsp;&nbsp;" prop="password">
								<el-input type="password" v-model="loginForm.password" placeholder="请输入密码" />
							</el-form-item>
							<el-row>
								<el-col class="user-login">
									<el-button type="primary" @click="useVerify('blockPuzzle')" class="user-btn" round>登录</el-button>
								</el-col>
								<el-col>
									<el-link
										type="primary"
										@click="showForgetPassword = true"
										style="margin-left: 10px; margin-top: 10px; font-size: 0.9rem"
										>忘记密码?</el-link
									>
								</el-col>
							</el-row>
						</el-form>
					</el-tab-pane>
					<el-tab-pane name="sms" label="短信验证登录">
						<el-form :model="smsLoginForm" :rules="smsLoginRules" ref="smsLoginFormRef" label-width="auto">
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="smsLoginForm.phone" placeholder="请输入手机号" />
							</el-form-item>
							<el-form-item label="验证码" prop="verificationCode">
								<div style="display: flex; justify-content: space-between">
									<el-input
										v-model="smsLoginForm.verificationCode"
										style="width: 59%; display: inline-block"
										placeholder="请输入验证码"
									/>
									<el-button
										type="primary"
										style="width: 40%; display: inline-block"
										@click="sendVerificationCode"
										plain
										round
										>发送验证码</el-button
									>
								</div>
							</el-form-item>
							<el-button
								class="user-btn"
								style="display: flex; margin: 30px auto"
								type="primary"
								@click="handleSmsLogin"
								round
								>登录</el-button
							>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</div>
			<!-- 忘记密码的步骤表单 -->
			<div v-if="showForgetPassword">
				<!-- 步骤显示 -->
				<el-steps :active="activeStep" finish-status="success">
					<el-step title="Step 1" description="短信验证"></el-step>
					<el-step title="Step 2" description="设置新密码"></el-step>
					<el-step title="Step 3" description="完成"></el-step>
				</el-steps>

				<div v-if="activeStep === 0">
					<!-- 第一步的表单内容 -->
					<el-form :model="smsForm" :rules="smsRules" ref="smsRef" label-width="auto">
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="smsForm.phone"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="verificationCode">
							<div style="display: flex; justify-content: space-between">
								<el-input v-model="smsForm.verificationCode" style="width: 60%; display: inline-block" />
								<el-button @click="sendForgetVerificationCode" type="primary">发送验证码</el-button>
							</div>
						</el-form-item>
						<div style="display: flex; justify-content: center; align-items: center">
							<el-button type="primary" @click="reset">返回</el-button>
							<el-button type="primary" @click="verifyCode">下一步</el-button>
						</div>
					</el-form>
				</div>

				<div v-if="activeStep === 1">
					<!-- 第二步的表单内容 -->
					<el-form :model="resetPasswordForm" :rules="resetPasswordRules" ref="resetPasswordRef" label-width="auto">
						<el-form-item label="新密码" prop="newPassword">
							<el-input type="password" v-model="resetPasswordForm.newPassword" />
						</el-form-item>
						<!-- 重复新密码 -->
						<el-form-item label="重复新密码" prop="confirmPassword">
							<el-input type="password" v-model="resetPasswordForm.confirmPassword" />
						</el-form-item>
						<div style="display: flex; justify-content: center; align-items: center">
							<el-button type="primary" @click="prevStep">上一步</el-button>
							<el-button type="primary" @click="modifyPassword">下一步</el-button>
						</div>
					</el-form>
				</div>

				<div v-if="activeStep === 2">
					<!-- 第三步的内容 -->
					<el-row>
						<el-col :span="24" style="margin-top: 10px; display: flex; justify-content: center"> 密码重置成功 </el-col>
						<el-col :span="24" style="margin-top: 20px; display: flex; justify-content: center">
							<el-button type="primary" @click="reset">返回登录</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-card>
	</div>
	<!-- 验证码组件 -->
	<Verify
		mode="pop"
		:captchaType="captchaType"
		:imgSize="{ width: '400px', height: '200px' }"
		ref="verify"
		@success="handleSuccess"
	></Verify>
	<!-- 右侧背景图片容器 -->
	<div class="right-image">
		<div class="overlay-text">
			<span>
				智能办公、快速搭建、文档协作、随时随地打造适合所有人的高效办公。 一款真正全代码开源的企业应用定制化开发平台
			</span>
			<img
				src="https://sample.o2oa.net/x_portal_assemble_surface/jaxrs/file/4747eef4-a5e9-4a80-82cf-2c3086c5a27a/portal/f4fbfb29-98ae-45c5-a9ac-a4d141049d78/content"
				class="right-logo"
			/>
		</div>
	</div>
</template>

<script setup>
import logoImg from "@/assets/logo.jpg";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Verify from "@/components/verifition/Verify.vue";
import {
	postAuthLoginApi,
	getQuerySmsApi,
	putModifyPasswordApi,
	getPersonInfoApi,
	postPersonInfoApi,
} from "@/apis/login";
const router = useRouter();
const activeTab = ref("password");

const showForgetPassword = ref(false);
const activeStep = ref(0);

// 表单初始化
const loginForm = ref({
	username: "jack",
	password: "password123",
});
const smsLoginForm = ref({
	phone: "",
	verificationCode: "",
});
const smsForm = ref({
	phone: "",
	verificationCode: "",
});
const resetPasswordForm = ref({
	newPassword: "",
	confirmPassword: "",
});
// 表单响应值
const loginFormRef = ref(null);
const smsLoginFormRef = ref(null);
const smsRef = ref(null);
const resetPasswordRef = ref(null);
// 表单规则
const loginRules = {
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const smsLoginRules = {
	phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
	verificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
const smsRules = {
	phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
	verificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
const resetPasswordRules = {
	newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
	confirmPassword: [
		{ required: true, message: "请重复新密码", trigger: "blur" },
		{
			validator: (rule, value, callback) => {
				if (value !== resetPasswordForm.value.newPassword) {
					console.log("value", value);
					console.log(" resetPasswordForm.newPassword", resetPasswordForm.value.newPassword);
					callback(new Error("两次输入的密码不一致"));
				} else {
					callback();
				}
			},
			trigger: "blur",
		},
	],
};

// 处理用户名登录
const handleLogin = (captchaVerification) => {
	loginFormRef.value.validate(async (valid) => {
		if (valid) {
			await postAuthLoginApi(
				{ username: loginForm.value.username, password: loginForm.value.password, code: captchaVerification },
				() => {
					// 成功回调
					ElMessage.success("密码登录成功");
					router.push("/layout");
				},
				() => {
					// 失败回调
					ElMessage.error("登录失败，请检查您的用户名和密码。");
				},
			);
		} else {
			ElMessage.error("请填写正确的登录信息");
		}
	});
};
// 处理手机验证登录
const handleSmsLogin = () => {
	smsLoginFormRef.value.validate(async (valid) => {
		if (valid) {
			await postPersonInfoApi(
				{
					phoneNum: smsLoginForm.value.phone,
					phoneCode: smsLoginForm.value.verificationCode,
				},
				() => {
					ElMessage.success("短信验证登录成功");
					router.push("/layout");
				},
				() => {
					ElMessage.error("登录失败，请检查您的验证码");
				},
			);
		} else {
			ElMessage.error("请填写正确的登录信息");
		}
	});
};
// 手机验证登录-获得验证码
const sendVerificationCode = async () => {
	smsLoginFormRef.value.validateField("phone", async (valid) => {
		if (valid) {
			await getPersonInfoApi(
				{
					phoneNum: smsLoginForm.value.phone,
				},
				(smsCode) => {
					// 成功回调
					ElMessage.success("短信发送成功");
					ElMessage.success({
						message: `收到的验证码是：${smsCode}`,
						duration: 8000,
					});
				},
				() => {
					// 失败回调
					ElMessage.error("短信发送失败，请检查您的手机号。");
				},
			);
		}
	});
};
// 发送忘记密码-验证码(error 需修改)
const forgetSmsCode = ref("");
const sendForgetVerificationCode = async () => {
	smsRef.value.validateField("phone", async (valid) => {
		if (valid) {
			await getQuerySmsApi(
				{
					xmobile: smsForm.value.phone,
				},
				(smsCode) => {
					// 成功回调
					forgetSmsCode.value = smsCode;
					ElMessage.success("短信发送成功");
					ElMessage.success({
						message: `收到的验证码是：${smsCode}`,
						duration: 8000,
					});
				},
				() => {
					// 失败回调
					ElMessage.error("短信发送失败，请检查您的手机号。");
				},
			);
		}
	});
};
const verifyCode = () => {
	smsRef.value.validate((valid) => {
		if (valid) {
			if (forgetSmsCode.value == smsForm.value.verificationCode) {
				activeStep.value++;
			} else {
				ElMessage.error("验证码错误，请重新输入");
			}
		}
	});
};
// 修改密码
const modifyPassword = async () => {
	resetPasswordRef.value.validate(async (valid) => {
		if (valid) {
			await putModifyPasswordApi(
				{
					newPassword: resetPasswordForm.value.newPassword,
				},
				() => {
					// 成功回调
					ElMessage.success("密码修改成功");
					activeStep.value++;
				},
				() => {
					// 失败回调
					ElMessage.error("密码修改失败，请稍后再试");
				},
			);
		}
	});
};
// 上一步
const prevStep = () => {
	// 确保 activeStep 不小于 0
	if (activeStep.value > 0) {
		activeStep.value--;
	} else {
		ElMessage.warning("当前已是第一步，无法再回退");
	}
};

// 重置忘记密码步骤
const reset = () => {
	activeStep.value = 0;
	smsForm.value = {
		phone: "",
		verificationCode: "",
	};
	resetPasswordForm.value = {
		newPassword: "",
		confirmPassword: "",
	};
	showForgetPassword.value = false;
};

// 验证码组件引用
const verify = ref(null);
// 验证码类型
const captchaType = ref("");

/**
 * 弹出验证码框
 * @param type 验证码类型 blockPuzzle 滑块验证 clickWord点击文字验证
 */
function useVerify(type) {
	captchaType.value = type;
	// verify.value.show();
	handleLogin();
}

/**
 * 验证码验证通过执行登录二次验证逻辑
 * @param res 验证通过信息
 */
function handleSuccess(res) {
	// handleLogin(res.captchaVerification);
	// 不提供严格的验证码登录
	handleLogin();
}
</script>

<style scoped>
:deep(.verify-icon) {
	width: 20px;
	height: 20px;
	display: block;
	padding: 20px;
}
:deep(.verify-refresh) {
	width: 50px;
	padding: 26px;
}
:deep(.icon-right::before),
:deep(.icon-refresh::before) {
	width: 25px;
	height: 25px;
	background-size: cover;
}

.login-card :deep(.el-tabs__header) {
	margin-top: -10px;
}
.login-card :deep(.el-tabs__item) {
	font-size: 1.1rem;
}
.login-card :deep(.el-input) {
	height: 35px;
	font-size: 1rem;
}
.login-card :deep(.el-form-item__label) {
	font-size: 1rem;
}
.login-card :deep(.el-tabs__content) {
	margin-top: 15px;
}

.logo {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 120px;

	margin: 30px 0px 0px 30px;
}
.right-image {
	z-index: 999;
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	width: 24%; /* 调整宽度以满足需求 */
	background-image: url("https://sample.o2oa.net/x_portal_assemble_surface/jaxrs/file/7caae2ea-4abe-47fc-8abd-d739d3df304a/portal/f4fbfb29-98ae-45c5-a9ac-a4d141049d78/content");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
}

.overlay-text {
	color: rgb(255, 255, 255);
	font-size: 22px;
	font-family: MicrosoftYaHei;
	line-height: 30px;
	margin: 40% 2% 0px;
	padding: 10px;
}
.right-logo {
	height: auto;
	width: 100%;
	background-repeat: no-repeat;
	margin-top: 100px;
}
.background-image {
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%; /* 调整宽度以满足需求 */
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	background-image: url("@/assets/login-bg.jpg");
	z-index: 1;
	opacity: 0.5;
}
.login-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: rgb(249, 249, 249); /* 背景颜色 */
}

.login-card {
	z-index: 999;
	height: 450px;
	width: 600px;
	padding: 20px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 卡片阴影 */
}

.user-login {
	display: flex;
	flex-direction: column; /* 设置为列方向 */
	justify-content: center; /* 垂直居中 */
	align-items: center; /* 水平居中 */
}
.user-btn {
	margin-top: 10px;
	height: 40px;
	font-size: 18px;
	width: 267px;
}
.title {
	font-weight: bold;
	font-size: 2rem;
	background-image: url("@/assets/logo.jpg");
	background-size: 65px;
	background-position: left;
	background-repeat: no-repeat;
	padding-left: 70px;
}
</style>
