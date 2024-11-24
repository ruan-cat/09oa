<script setup>
import { ref, defineProps, defineEmits } from "vue";
import EditRoomDialog from "./EditRoomDialog.vue";
import MeetingDialog from "./MeetingDialog.vue";
import MiniMeeting from "./MiniMeeting.vue";
import { Delete } from "@element-plus/icons-vue";
import { useMeetingStore } from "@/stores/meeting";
import { deleteRoomApi } from "@/apis/meeting";

const meetingStore = useMeetingStore();
const props = defineProps({
	room: {
		type: Object,
		required: true,
	},
});

const visible = ref(false);

const formLabelWidth = "250px";

const deleteRoom = async (room) => {
	await deleteRoomApi(
		room.name,
		() => {
			ElMessage.success("删除会议室成功");
		},
		() => {
			ElMessage.error("删除会议室失败");
		},
	);
};

const editRoomDialog = ref();
const onEdit = () => {
	editRoomDialog.value.open(props.room);
};
</script>

<template>
	<div @click="visible = true" class="room-card">
		<div class="room-name">{{ room.mettingname }}</div>
		<div>{{ room.mettingbuild }}</div>
		<!-- TODO 添加每个设备对应的icon -->
		<div class="icon-box">
			<div></div>
			<div class="clickable">
				<el-popconfirm @confirm="deleteRoom" title="确定要删除该会议室吗？">
					<template #reference>
						<el-icon @click.native.stop :size="20"><Delete /></el-icon>
					</template>
					<template #actions="{ confirm, cancel }">
						<el-button size="small" @click="cancel">取消</el-button>
						<el-button type="primary" size="small" @click="confirm"> 确定 </el-button>
					</template>
				</el-popconfirm>
			</div>
		</div>
		<div class="meetinglist-box">
			<el-scrollbar>
				<div v-if="meetingStore.findMeetingByRoomName(room.mettingname).length > 0" class="meetinglist">
					<div v-for="item in meetingStore.findMeetingByRoomName(room.mettingname)">
						<MiniMeeting :meeting="item" />
					</div>
				</div>
				<div v-else class="nomeeting">
					<p>暂无会议</p>
				</div>
			</el-scrollbar>
		</div>
	</div>
	<el-dialog :model-value="visible" :close-on-click-modal="false" title="会议室" width="600" :show-close="false">
		<el-form :model="room">
			<el-form-item label="会议室名称" :label-width="formLabelWidth">
				<el-text>{{ room.mettingname }}</el-text>
			</el-form-item>
			<el-form-item label="会议室位置" :label-width="formLabelWidth">
				<el-text>{{ room.mettingbuild }}</el-text>
			</el-form-item>
			<el-form-item label="会议室楼层" :label-width="formLabelWidth">
				<el-text>{{ room.mettingfloor }}</el-text>
			</el-form-item>
			<el-form-item label="容纳人数" :label-width="formLabelWidth">
				<el-text>{{ room.mettingcapacity }}</el-text>
			</el-form-item>
			<el-form-item label="会议室门牌" :label-width="formLabelWidth">
				<el-text>{{ room.mettingroomnumber }}</el-text>
			</el-form-item>
			<el-form-item label="分机号" :label-width="formLabelWidth">
				<el-text>{{ room.mettingdis }}</el-text>
			</el-form-item>
			<el-form-item label="会议室设备" :label-width="formLabelWidth">
				<!-- TODO 要把名称跟中文对应 -->
				<el-text>{{ room.mettingdevice }}</el-text>
			</el-form-item>
			<el-form-item label="会议室状态" :label-width="formLabelWidth">
				<el-text v-if="room.mettingavailable === true">可用</el-text>
				<el-text v-if="room.mettingavailable === false">不可用</el-text>
			</el-form-item>
		</el-form>
		<template #footer>
			<div>
				<el-button @click="visible = false">关闭</el-button>
				<el-button type="primary" @click="onEdit">编辑</el-button>
			</div>
		</template>
	</el-dialog>
	<EditRoomDialog ref="editRoomDialog" />
</template>

<style scoped>
.room-card {
	margin-right: 20px;
	height: 580px;
	width: 300px;
	background-color: #fff;
	padding: 20px;
	background-color: #c9f8fa;
}

.room-card:hover {
	box-shadow: 0px 5px 10px 0px #808080;
}

.room-name {
	font-size: 24px;
}

.icon-box {
	display: flex;
}

.meetinglist-box {
	margin-top: 10px;
	border: solid, #808080;
	width: 260px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.icon-box {
	display: flex;
	justify-content: space-between;
}
.clickable:hover {
	color: #409eff;
	cursor: pointer;
}
.nomeeting {
	line-height: 300px;
}
</style>
