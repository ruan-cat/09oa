<template>
	<!-- 个人信息 Tab -->
	<div class="personal-info">
		<!-- 头像预览和更换 -->
		<div class="upload">
			<img :src="avatarUrl" alt="头像预览" class="avatar-img" />
			<div>
				<input type="file" accept="image/*" @change="changeAvatar" style="display: none" ref="fileInput" />
				<button class="uploadButton" @click="triggerFileInput">上传头像</button>
			</div>
		</div>

		<el-form class="personalInfo" :model="form" :rules="rules" ref="formRef" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="请输入姓名"></el-input>
			</el-form-item>

			<el-form-item label="工号" prop="employeeId">
				<el-input v-model="form.employeeId" placeholder="请输入工号"></el-input>
			</el-form-item>

			<el-form-item label="办公电话" prop="officePhone">
				<el-input v-model="form.officePhone" placeholder="请输入办公电话" type="tel"></el-input>
			</el-form-item>

			<el-form-item label="QQ" prop="qq">
				<el-input v-model="form.qq" placeholder="请输入QQ号码"></el-input>
			</el-form-item>

			<el-form-item label="微信号" prop="wechat">
				<el-input v-model="form.wechat" placeholder="请输入微信号"></el-input>
			</el-form-item>

			<el-form-item label="论坛昵称" prop="forumNickname">
				<el-input v-model="form.forumNickname" placeholder="请输入论坛昵称"></el-input>
			</el-form-item>

			<el-form-item label="个人签名" prop="signature">
				<el-input type="textarea" v-model="form.signature" placeholder="请输入个人签名"></el-input>
			</el-form-item>

			<el-form-item label="语言设置" prop="language">
				<el-select v-model="form.language" placeholder="请选择语言">
					<el-option label="简体中文" value="zh"></el-option>
					<el-option label="English" value="en"></el-option>
				</el-select>
			</el-form-item>

			<div class="button-center">
				<el-button type="primary" @click="onSubmit">保存个人信息</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { userStore } from "@/stores/user.js";

//获取用户 Store

const userStore1 = userStore();

import { getPersonalInfoApi, uploadAvatarApi, savePersonalInfoApi } from "@/apis/personal/index.js";

const avatarUrl = ref(null);
const fileInput = ref(null);

const form = reactive({
	name: "",
	employeeId: "",
	officePhone: "",
	qq: "",
	wechat: "",
	forumNickname: "",
	signature: "",
	language: "",
});

onMounted(async () => {
	await getPersonalInfoApi(
		{
			id: 1852159770479124482,
		},
		(data) => {
			avatarUrl.value = data.head;
			form.name = data.name;
			form.employeeId = data.id;
			form.officePhone = data.telphone;
			form.qq = data.qq;
			form.wechat = data.weixin;
			form.forumNickname = data.bbsname;
			form.signature = data.single;
			form.language = data.language;
		},
		(error) => {
			ElMessage.error("获取个人信息失败");
		},
	);
});
// 上传头像的方法
const triggerFileInput = () => {
	fileInput.value.click();
};

const changeAvatar = async (event) => {
	const file = event.target.files[0];
	if (file) {
		// 1. 本地回显图片
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = (e) => {
			avatarUrl.value = e.target.result; // 本地回显图片
		};

		// 2. 直接调用上传接口，不再手动创建 FormData
		const data = {
			file: file, // 直接将 file 对象添加到数据中
		};

		try {
			// 3. 调用接口上传图片到后端
			await uploadAvatarApi(
				data,
				(data) => {
					// 4. 更新用户 Store 中的头像 URL
					userStore1.user.avatar = data.avatar;

					// 成功提示
					ElMessage.success("头像上传成功");
				},
				(error) => {
					ElMessage.error("头像上传失败，请稍后再试");
				},
			);
		} catch (error) {
			// 上传失败时提示错误信息
			ElMessage.error("头像上传失败，请重试");
		}
	}
};
// 表单验证规则
const rules = {
	name: [
		{ required: true, message: "请输入姓名", trigger: "blur" },
		{ type: "string", message: "姓名必须为字符串", trigger: ["blur", "change"] },
	],
	employeeId: [
		{ required: true, message: "请输入工号", trigger: "blur" },
		{ type: "string", message: "工号必须为字符串或数字", trigger: ["blur", "change"] },
	],
	officePhone: [
		{ required: false, message: "请输入办公电话", trigger: "blur" },
		{ pattern: /^\d{3,4}-?\d{7,8}$/, message: "请输入正确的办公电话", trigger: ["blur", "change"] },
	],
	qq: [
		{ required: true, message: "请输入QQ号码", trigger: "blur" },
		{ type: "string", message: "QQ号必须为数字", pattern: /^\d+$/, trigger: ["blur", "change"] },
	],
	wechat: [
		{ required: false, message: "请输入微信号", trigger: "blur" },
		{ type: "string", message: "微信号必须为字符串", trigger: ["blur", "change"] },
	],
	forumNickname: [{ required: true, message: "请输入论坛昵称", trigger: "blur" }],
	signature: [{ required: true, message: "请输入个人签名", trigger: "blur" }],
	language: [{ required: true, message: "请选择语言设置", trigger: "change" }],
};

// 引用表单实例
const formRef = ref(null);

// 提交表单，给后端发送PUT请求保存数据
const onSubmit = async () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			try {
				await savePersonalInfoApi(
					form,
					(response) => {
						ElMessage.success("个人信息保存成功！");
					},
					(error) => {
						ElMessage.error("个人信息保存失败");
					},
				);
			} catch (error) {
				ElMessage.error("个人信息保存失败");
			}
		} else {
			ElMessage.error("表单验证失败，请检查输入！");
		}
	});
};
</script>

<style scoped>
.personal-info {
	width: 600px;
	margin: 20px auto;
	background-color: #f9f9f9;
	padding: 20px;
	border-radius: 10px;
}

.upload {
	margin-bottom: 20px;
	text-align: center;
}

.avatar-img {
	width: 90px;
	border-radius: 50%;
	margin-bottom: 10px;
}

.uploadButton {
	padding: 8px 16px;
	background-color: #409eff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.uploadButton:hover {
	background-color: #66b1ff;
}

.button-center {
	text-align: center;
}
</style>
