<script setup>
import { ref, defineProps, defineEmits } from "vue";
import EditMeetingDialog from "./EditMeetingDialog.vue";
import { getMeetingDetailApi } from "@/apis/meeting";

const dialogVisible = ref(false);
const meeting = ref({});
const open = (data) => {
	dialogVisible.value = true;
	meeting.value = data;
	getMeetingDetail(meeting);
};
defineExpose({
	open,
});

const formLabelWidth = "250px";

const editMeetingDialog = ref();
const onEdit = () => {
	editMeetingDialog.value.open(meeting.value);
	getMeetingDetail();
};
const onEditSuccess = () => {};

const meetingForm = ref({});
const getMeetingDetail = async (meeting) => {
	await getMeetingDetailApi(
		{
			id: meeting.value.meetingId,
		},
		(data) => {
			meetingForm.value = data;
			ElMessage.success("获取会议详情成功");
		},
		() => {
			ElMessage("获取会议详情失败");
		},
	);
};

const onAccept = async () => {
	await getMeetingAcceptApi(
		meeting.value.meetingId,
		() => {
			ElMessage.success("会议接受成功");
		},
		(error) => {
			ElMessage.error("会议接受失败");
		},
	);
};
const onRefuse = async () => {
	await getMeetingRefuseApi(
		meeting.value.meetingId,
		() => {
			ElMessage.success("会议拒绝成功");
		},
		(error) => {
			ElMessage.error("会议拒绝失败");
		},
	);
};
const onCheckin = async () => {
	await postMeetingCheckinApi(
		{ meetingId: meeting.value.meetingId },
		() => {
			ElMessage.success("签到成功");
		},
		(error) => {
			ElMessage.error("签到失败");
		},
	);
};
</script>

<template>
	<el-dialog v-model="dialogVisible" :close-on-click-modal="false" title="会议" width="800" :show-close="false">
		<el-form :model="meeting">
			<el-form-item label="申请人" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.applicant }}</el-text>
			</el-form-item>
			<el-form-item label="会议类型" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.type }}</el-text>
			</el-form-item>
			<el-form-item label="开始时间" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.startTime }}</el-text>
			</el-form-item>
			<el-form-item label="结束时间" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.completedTime }}</el-text>
			</el-form-item>
			<el-form-item label="会议室" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.room }}</el-text>
			</el-form-item>
			<el-form-item label="主持人" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.hostPerson }}</el-text>
			</el-form-item>
			<el-form-item label="承办部门" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.hostUnit }}</el-text>
			</el-form-item>
			<el-form-item label="参会人" :label-width="formLabelWidth">
				<el-text v-for="item in meetingForm.inviteMemberList">{{ item }}</el-text>
			</el-form-item>
			<el-form-item label="会议标题" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.subject }}</el-text>
			</el-form-item>
			<el-form-item label="会议描述" :label-width="formLabelWidth">
				<el-text>{{ meetingForm.summary }}</el-text>
			</el-form-item>
		</el-form>
		<div class="button-box">
			<el-button @click="onAccept" type="primary">接受</el-button>
			<el-button @click="onRefuse">拒绝</el-button>
			<el-button @click="onCheckin" type="primary">签到</el-button>
		</div>
		<template #footer>
			<div>
				<el-button @click="dialogVisible = false">关闭</el-button>
				<el-button type="primary" @click="onEdit">编辑</el-button>
			</div>
		</template>
	</el-dialog>
	<EditMeetingDialog ref="editMeetingDialog" @editSuccess="onEditSuccess" />
</template>

<style scoped>
.button-box {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
}
</style>
