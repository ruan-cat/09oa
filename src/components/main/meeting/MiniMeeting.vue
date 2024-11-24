<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useMeetingStore } from "@/stores/meeting";
import MeetingDialog from "./MeetingDialog.vue";

const meetingStore = useMeetingStore();
const props = defineProps({
	meeting: {
		type: Object,
		required: true,
	},
});

const meetingDialog = ref();
const onclick = (meeting) => {
	meetingDialog.value.open(meeting);
};
</script>

<template>
	<div @click.stop="onclick(meeting)" class="meeting-box">
		<div class="info">
			<p>{{ meeting.startTime }}</p>
			<h3>{{ meeting.subject }}</h3>
			<p>{{ meeting.summary }}</p>
		</div>
	</div>
	<MeetingDialog ref="meetingDialog" />
</template>

<style scoped>
.meeting-box {
	width: auto;
	border-left: solid wheat 5px;
	padding: 10px;
	background-color: #fff;
	box-shadow: none;
	margin: 20px;
}
.meeting-box:hover {
	color: #4a90e2;
	cursor: pointer;
}
</style>
