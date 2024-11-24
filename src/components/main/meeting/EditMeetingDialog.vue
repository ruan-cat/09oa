<script setup>
import { ref, defineProps, defineEmits, defineExpose } from "vue";
import { useMeetingStore } from "@/stores/meeting";
import { postMeetingAddApi } from "@/apis/meeting/index";
import { ElMessage } from "element-plus";
import PeopleTree from "../public/PeopleTree.vue";
import { isMultipleSelect } from "@logicflow/core";

const formLabelWidth = "250px";
const formRef = ref();
const meetingStore = useMeetingStore();

//新建会议
const meetingForm = ref({
	meetingtype: "",
	startTime: "",
	completedTime: "",
	room: {},
	hostPerson: "",
	hostunit: "",
	participants: "",
	subject: "",
	summary: "",
});
const rules = {
	meetingtype: [{ required: true, message: "请输入类型", trigger: "blur" }],
	startTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
	completedTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
	// room: [{ required: true, message: "请选择会议室", trigger: "blur" }],
	hostPerson: [{ required: true, message: "请输入主持人", trigger: "blur" }],
	hostunit: [{ required: true, message: "请选择部门", trigger: "blur" }],
	participants: [{ required: true, message: "请输入参与人", trigger: "blur" }],
	subject: [{ required: true, message: "请输入标题", trigger: "blur" }],
	summary: [{ required: true, message: "请输入表述", trigger: "blur" }],
};

const dialogVisible = ref(false);
const emit = defineEmits(["editSuccess"]);

const onSubmit = async () => {
	await formRef.value.validate();
	const isEdit = meetingForm.value.meetingId;
	if (isEdit) {
		await putMeetingModifyApi(
			meetingForm.value,
			() => {
				ElMessage.success("修改会议成功");
			},
			() => {
				ElMessage.error("修改会议失败");
			},
		);
		ElMessage.success("编辑成功");
	} else {
		await postMeetingAddApi(
			meetingForm.value,
			() => {
				ElMessage.success("添加成功");
			},
			(error) => {
				ElMessage.error("添加失败");
			},
		);
	}
	dialogVisible.value = false;
	emit("editSuccess");
};

const onCancel = async () => {
	await deleteMeetingCancelApi(
		meetingForm.value.meetingId,
		() => {
			dialogVisible.value = false;
			ElMessage.success("会议取消成功");
		},
		(error) => {
			ElMessage.error("会议取消失败");
		},
	);
};

const open = (meeting) => {
	dialogVisible.value = true;
	if (meeting) {
		meetingForm.value = { ...meeting };
	}
	getRoom();
};
defineExpose({
	open,
});

//会议室选择列表
const options = ref([]);
const getRoom = async () => {
	await getRoomChooseApi(
		{},
		(data) => {
			options.value = data.map((data) => {
				return {
					value: data.locationId,
					label: data.locationName,
					children: data.meetingRooms.map((room) => ({
						value: room.meetingRoomId,
						label: room.meetingRoomName,
					})),
				};
			});
		},
		() => {
			ElMessage.error("获取会议室选择列表失败");
		},
	);
};
const props = {
	expandTrigger: "hover",
};

//选择参会人
const inviteMemberList = ref();
const handleSaveTree = (selectedRoles) => {
	meetingForm.value.participants = selectedRoles;
};
const handleOpenTree = () => {
	inviteMemberList.value.showDialog();
};
const maintainerRolesTree = ref([]);
</script>
<template>
	<el-dialog v-model="dialogVisible" :close-on-click-modal="false" title="编辑会议" width="800" :show-close="false">
		<el-form ref="formRef" :model="meetingForm" :rules="rules">
			<el-form-item label="会议类型" prop="meetingtype" :label-width="formLabelWidth">
				<el-input v-model="meetingForm.meetingtype" autocomplete="off" />
			</el-form-item>
			<el-form-item label="起止时间" prop="startTime" :label-width="formLabelWidth">
				<el-date-picker v-model="meetingForm.startTime" type="datetime" placeholder="开始时间" />
			</el-form-item>
			<el-form-item label="起止时间" prop="completedTime" :label-width="formLabelWidth">
				<el-date-picker v-model="meetingForm.completedTime" type="datetime" placeholder="结束时间" />
			</el-form-item>
			<el-form-item label="会议室" prop="room" :label-width="formLabelWidth">
				<el-cascader v-model="meetingForm.room" :options="options" :props="props" />
			</el-form-item>
			<el-form-item label="主持人" prop="hostPerson" :label-width="formLabelWidth">
				<el-input v-model="meetingForm.hostPerson" autocomplete="off" />
			</el-form-item>
			<el-form-item label="承办部门" prop="hostunit" :label-width="formLabelWidth">
				<el-input v-model="meetingForm.hostunit" autocomplete="off" />
			</el-form-item>
			<el-form-item label="参会人" prop="participants" :label-width="formLabelWidth">
				<el-button type="small" @click="handleOpenTree">选择参会人</el-button>
				<!-- <PeopleTree ref="inviteMemberList" @save="handleSaveTree" @openDialog="handleOpenTree" :title="`选择参会人`" /> -->
				<el-input v-model="meetingForm.participants" autocomplete="off" />
			</el-form-item>
			<el-form-item label="会议标题" prop="subject" :label-width="formLabelWidth">
				<el-input v-model="meetingForm.subject" autocomplete="off" />
			</el-form-item>
			<el-form-item label="会议描述" prop="summary" :label-width="formLabelWidth">
				<el-input autosize type="textarea" v-model="meetingForm.summary" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="button-box">
				<div>
					<el-button v-if="meetingForm.meetingId" type="primary" @click="onCancel">取消会议</el-button>
				</div>
				<div>
					<el-button @click="dialogVisible = false">关闭</el-button>
					<el-button type="primary" @click="onSubmit">保存</el-button>
				</div>
			</div>
		</template>
	</el-dialog>
</template>

<style scoped>
.button-box {
	display: flex;
	justify-content: space-between;
}
</style>
