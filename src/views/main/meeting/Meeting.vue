<script setup>
import { ref, reactive, computed } from "vue";
import { Avatar, List, HomeFilled } from "@element-plus/icons-vue";
import EditMeetingDialog from "@/components/main/meeting/EditMeetingDialog.vue";
import EditRoomDialog from "@/components/main/meeting/EditRoomDialog.vue";
import { useMeetingStore } from "@/stores/meeting";

const activeIndex = ref("/main/meeting/mymeeting");

const meetingStore = useMeetingStore();

const newMeetingDialog = ref();
const newMeeting = () => {
	newMeetingDialog.value.open({});
};
const onEditSuccess = () => {};

const newRoomDialog = ref();
const newRoom = () => {
	newRoomDialog.value.open({});
};

const params = ref({
	pageIndex: 1,
	pageSize: 10,
	type: "",
	status: "",
	id: "",
});
const listData = ref([]);
const getListData = async () => {
	await getMeetinglistApi(
		params.value,
		(data) => {
			listData.value = data.rows;
			meetingStore.setMeetingList(data.rows);
			ElMessage.success("获取会议信息成功");
		},
		(error) => {
			ElMessage.error("获取会议信息失败");
		},
	);
};
getListData();
</script>

<template>
	<div>
		<el-container>
			<el-header>
				<div class="header">
					<el-menu router :default-active="activeIndex" mode="horizontal" :ellipsis="false">
						<el-menu-item index="/meeting/mymeeting">
							<el-icon><Avatar /></el-icon>
							我的会议</el-menu-item
						>
						<!-- <el-menu-item index="/meeting/monthmeeting">月</el-menu-item> -->
						<!-- <el-menu-item index="/meeting/weekmeeting">周</el-menu-item> -->
						<!-- <el-menu-item index="/meeting/daymeeting">日</el-menu-item> -->
						<el-menu-item index="/meeting/meetinglist">
							<el-icon><List /></el-icon>会议列表</el-menu-item
						>
						<el-menu-item index="/meeting/meetingroom"
							><el-icon><HomeFilled /></el-icon>会议室</el-menu-item
						>
					</el-menu>
					<div class="buttons">
						<el-button @click="newMeeting()">新建会议</el-button>
						<el-button @click="newRoom()">新建会议室</el-button>
						<EditMeetingDialog ref="newMeetingDialog" @editSuccess="onEditSuccess" />
						<EditRoomDialog ref="newRoomDialog" />
					</div>
				</div>
			</el-header>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</div>
</template>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	margin-top: 12px;
}

.buttons {
	display: flex;
	justify-content: flex-end;
	margin: auto 0;
	margin-right: 20px;
}
</style>
