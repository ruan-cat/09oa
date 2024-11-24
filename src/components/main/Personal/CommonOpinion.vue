<template>
	<div class="common-opinion">
		<el-form :model="commonOpinionForm">
			<el-input type="textarea" v-model="commonOpinionForm.opinion" placeholder="请输入常用意见"></el-input>
			<div class="button-center">
				<el-button type="primary" @click="saveCommonOpinion">保存常用意见</el-button>
				<el-button type="primary" @click="setDefaultOpinion">保存为默认常用意见</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const commonOpinionForm = reactive({
	opinion: "",
});

const saveCommonOpinion = () => {
	ElMessage.success("常用意见保存成功");
};

const setDefaultOpinion = () => {
	ElMessage.success("保存为默认常用意见成功");
};
</script>

<style scoped>
.common-opinion {
	width: 600px;
	margin: 20px auto;
	background-color: #f9f9f9;
	padding: 20px;
	border-radius: 10px;
}

.button-center {
	margin-top: 40px;
	text-align: center;
}
</style>
