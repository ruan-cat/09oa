<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useMeetingStore } from "@/stores/meeting";
import MiniMeeting from "./MiniMeeting.vue";
import { dayjs } from "element-plus";

const meetingStore = useMeetingStore();

const props = defineProps({
	date: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="room-card">
		<div class="date">{{ date.format("MM月DD日") }}</div>
		<div class="circle">{{ meetingStore.computeDay(date) }}</div>
		<div class="meetinglist-box">
			<el-scrollbar>
				<div v-for="item in meetingStore.meetingList" class="meetinglist">
					<div v-if="meetingStore.compareDate(item.startTime, date)">
						<MiniMeeting :meeting="item" />
					</div>
				</div>
				<el-empty description="暂无会议" image="" />
			</el-scrollbar>
		</div>
	</div>
</template>

<style scoped>
.room-card {
	margin-right: 20px;
	height: 630px;
	width: 300px;
	background-color: #c9f8fa;
	margin-bottom: 20px;
}

.meeting-card:hover {
	box-shadow: 0px 5px 10px 0px #808080;
}
.date {
	background-color: #e6edf4;
	height: 100px;
	line-height: 70px;
	font-size: 30px;
	text-align: center;
}
.circle {
	background-color: #4a90e2;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	font-size: 20px;
	justify-content: center;
	align-items: center;
	text-align: center;
	display: flex;
	position: relative;
	top: -40px;
	left: 110px;
}

.meetinglist-box {
	width: 300px;
	height: 450px;
}
</style>
