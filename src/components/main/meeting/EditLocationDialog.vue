<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { putLocationModifyApi, postLocationAddApi } from "@/apis/meeting";

const formLabelWidth = "250px";

const locationForm = ref({});
const rules = {
	xname: [{ required: true, message: "请输入位置名称", trigger: "blur" }],
};

const dialogVisible = ref(false);
const formRef = ref();
const emit = defineEmits(["editSuccess"]);

const onSubmit = async () => {
	await formRef.value.validate();
	const isEdit = locationForm.value.id;
	if (isEdit) {
		await putLocationModifyApi(
			locationForm.value,
			() => {
				ElMessage.success("编辑成功");
			},
			(error) => {
				ElMessage.error("编辑失败");
			},
		);
	} else {
		await postLocationAddApi(
			locationForm.value,
			() => {
				ElMessage.success("添加成功");
			},
			(error) => {
				ElMessage.error("添加失败");
			},
		);
	}
	dialogVisible.value = false;
};

const open = (room) => {
	dialogVisible.value = true;
	if (room) {
		locationForm.value = { ...room };
	}
};
defineExpose({
	open,
});
</script>

<template>
	<el-dialog
		v-model="dialogVisible"
		:close-on-click-modal="false"
		title="编辑会议室位置"
		width="600"
		:show-close="false"
	>
		<el-form ref="formRef" :model="locationForm" :rules="rules">
			<el-form-item label="位置名称" prop="xname" :label-width="formLabelWidth">
				<el-input v-model="locationForm.xname" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div>
				<el-button @click="dialogVisible = false">关闭</el-button>
				<el-button type="primary" @click="onSubmit()">保存</el-button>
			</div>
		</template>
	</el-dialog>
</template>
