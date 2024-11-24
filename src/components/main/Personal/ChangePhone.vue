<template>
	<div class="change-phone">
		<el-form :model="changePhoneForm" :rules="phoneRules" ref="phoneFormRef" label-width="100px">
			<el-form-item label="当前手机号" prop="currentPhone">
				<el-input v-model="changePhoneForm.phone" placeholder="请输入当前手机号"></el-input>
			</el-form-item>
			<el-form-item label="新手机号" prop="newPhone">
				<el-input v-model="changePhoneForm.newphone" placeholder="请输入新手机号"></el-input>
			</el-form-item>
			<div class="button-center">
				<el-button type="primary" @click="onSubmitPhoneChange">修改</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { modifyPhoneApi, getPhoneCodeApi } from "@/apis/personal/index.js";
import { userStore } from "@/stores/user.js";

// 获取用户 Store
const userStore1 = userStore();

const changePhoneForm = reactive({
	id: "",
	phone: "",
	newphone: "",
});

const phoneFormRef = ref(null);
const phoneRules = {
	phone: [
		{ required: true, message: "请输入当前手机号", trigger: "blur" },
		{ pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
	],
	newphone: [
		{ required: true, message: "请输入新手机号", trigger: "blur" },
		{ pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
	],
};

// 提交表单并调用API修改手机号
const onSubmitPhoneChange = async () => {
	phoneFormRef.value.validate(async (valid) => {
		if (valid) {
			try {
				// 调用 API 传递手机号
				const data = {
					id: 1852159770479124482,
					phone: 17305842504,
					newphone: 19579790752,
				};
				await modifyPhoneApi(
					data,
					(response) => {
						ElMessage.success("手机号修改成功");
					},
					(error) => {
						ElMessage.error("手机号修改失败，请稍后再试");
					},
				);
			} catch (error) {
				// 处理 API 错误
				ElMessage.error("手机号修改失败，请稍后再试");
			}
		} else {
			ElMessage.error("表单验证失败，请检查输入");
		}
	});
};
</script>

<style scoped>
.change-phone {
	width: 600px;
	margin: 20px auto;
	background-color: #f9f9f9;
	padding: 20px;
	border-radius: 10px;
}

.button-center {
	margin-top: 10px;
	text-align: center;
}
</style>
