<script setup>
import { useMeetingStore } from "@/stores/meeting";
import MeetingCard from "@/components/main/meeting/MeetingCard.vue";
import { dayjs } from "element-plus";

const meetingStore = useMeetingStore();

const today = dayjs();
</script>

<template>
	<div>
		<el-container>
			<el-header>
				<h2>{{ today.format("MM月DD日") }} ,{{ meetingStore.getDayOfWeek(today) }}</h2>
			</el-header>
			<el-main>
				<el-scrollbar>
					<div class="list-box-container">
						<MeetingCard :date="today" />
						<MeetingCard :date="today.add(1, 'day')" />
						<MeetingCard :date="today.add(2, 'day')" />
						<MeetingCard :date="today.add(3, 'day')" />
						<MeetingCard :date="today.add(4, 'day')" />
						<MeetingCard :date="today.add(5, 'day')" />
						<MeetingCard :date="today.add(6, 'day')" />
					</div>
				</el-scrollbar>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped>
.list-box-container {
	display: flex;
}
</style>
