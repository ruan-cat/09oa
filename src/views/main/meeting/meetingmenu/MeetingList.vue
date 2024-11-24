<script setup>
import { ref } from "vue";
import { useMeetingStore } from "@/stores/meeting";
import MeetingDialog from "@/components/main/meeting/MeetingDialog.vue";
import { getMeetinglistApi } from "@/apis/meeting/index";
import { RowHeight } from "@icon-park/vue-next";

const meetingDialog = ref();
const clickTable = (row, column, cell, event) => {
	meetingDialog.value.open(row);
};

const meetingStore = useMeetingStore();

const params = ref({
	pageIndex: 1,
	pageSize: 10,
	type: "",
	status: "",
	id: "",
});
const total = ref(0);
const listData = ref([]);
const getListData = async () => {
	await getMeetinglistApi(
		params.value,
		(data) => {
			listData.value = data.rows;
			total.value = data.total;
			meetingStore.setMeetingList(data.rows);
			ElMessage.success("获取会议信息成功");
		},
		(error) => {
			ElMessage.error("获取会议信息失败");
		},
	);
};
getListData();

const onSizeChange = (size) => {
	params.value.pageIndex = 1;
	params.value.pageSize = size;
	getListData();
};
const onCurrentChange = (page) => {
	params.value.pageIndex = page;
	getListData();
};
</script>

<template>
	<div>
		<el-container>
			<el-aside :span="6">
				<el-menu default-active="1-1">
					<el-sub-menu index="1">
						<template #title>
							<span>我的会议申请</span>
						</template>
						<el-menu-item index="1-1">未开始</el-menu-item>
						<el-menu-item index="1-2">进行中</el-menu-item>
						<el-menu-item index="1-3">已结束</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="2">
						<template #title>
							<span>我收到的邀请</span>
						</template>
						<el-menu-item index="2-1">未开始</el-menu-item>
						<el-menu-item index="2-2">进行中</el-menu-item>
						<el-menu-item index="2-3">已结束</el-menu-item>
						<el-menu-item index="2-4">已拒绝</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</el-aside>
			<el-main class="layout">
				<el-table @cell-click="clickTable" :data="listData" style="width: 100%" stripe>
					<el-table-column prop="applicant" label="申请人" width="100" />
					<el-table-column prop="startTime" label="开始时间" width="260" />
					<el-table-column prop="completedTime" label="结束时间" width="260" />
					<el-table-column prop="subject" label="会议标题" />
					<el-table-column prop="room" label="会议室" width="180" />
				</el-table>
				<MeetingDialog ref="meetingDialog" />
				<el-pagination
					v-model:current-page="params.pageIndex"
					v-model:page-size="params.pageSize"
					:page-sizes="[5, 10]"
					:pager-count="7"
					layout="total, sizes, prev, pager, next"
					:total="total"
					@size-change="onSizeChange"
					@current-change="onCurrentChange"
					style="margin-top: 20px; justify-content: flex-end"
				/>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped>
.layout {
	background-color: #fff;
	width: 100%;
	height: 100%;
}

:v-deep .el-header {
	padding-top: 5px;
}
</style>
