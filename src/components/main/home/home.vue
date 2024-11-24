<script setup>
import news from "./card/news.vue";
import todo_list from "./card/todo_list.vue";
import meetingstatistics from "./card/MeetingStatistics.vue";
import meetings from "./card/meetings.vue";
import network_disk from "./card/network_disk.vue";
import NetworkDisk from "./card/NetworkDisk.vue";
// import calendar from "./card/calendar.vue";
import Calender from "./card/Calender.vue";
import processstatistics from "./card/ProcessStatistics.vue";
import diskstatistics from "./card/DiskStatistics.vue";
import "./home.css";
</script>

<template>
	<el-row :gutter="10">
		<el-col :span="19">
			<el-row :gutter="10">
				<el-col :span="14">
					<news />
				</el-col>
				<el-col :span="10">
					<meetingstatistics />
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<meetings />
				</el-col>
				<el-col :span="12">
					<NetworkDisk />
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<processstatistics />
				</el-col>
				<el-col :span="12">
					<diskstatistics />
				</el-col>
			</el-row>
		</el-col>
		<el-col :span="5" style="padding-block-end: 20px">
			<Calender />
		</el-col>
	</el-row>
</template>

<style scoped>
.el-row {
	margin-block-end: 20px;
}

.el-col {
	max-block-size: 3000px;
}

.grid-content {
	min-block-size: 36px;
	/* 用来布局的背景，可删 */
	background: #777;
}
</style>
