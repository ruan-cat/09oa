<template>
	<div class="card-container" style="inline-size: 100%; block-size: 100%">
		<el-card style="inline-size: 100%; block-size: 100%">
			<template #header>
				<el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
					<el-menu-item index="0">我的会议</el-menu-item>
					<el-menu-item index="1">会议邀请</el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link @click="goToMyMeeting">
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多会议</span>
					</el-button>
				</el-menu>
			</template>

			<div class="content-container" style="overflow-y: auto; max-height: 400px">
				<div v-if="activeIndex === '0' && tableData?.length > 0">
					<div v-for="meeting in tableData" :key="meeting.xstartTime" class="meeting-box">
						<div class="meeting-detail">
							<h3>{{ meeting.xsubject }}</h3>
							<p>房间：{{ meeting.xroomName }}</p>
							<p>开始时间：{{ meeting.xstartTime }}</p>
							<p>结束时间：{{ meeting.xcompletedTime }}</p>
						</div>
					</div>
				</div>
				<div v-else-if="activeIndex === '1' && invitedTableData?.length > 0">
					<div v-for="meeting in invitedTableData" :key="meeting.xstartTime" class="meeting-box">
						<div class="meeting-detail">
							<h3>{{ meeting.xsubject }}</h3>
							<p>房间：{{ meeting.xroomName }}</p>
							<p>开始时间：{{ meeting.xstartTime }}</p>
							<p>结束时间：{{ meeting.xcompletedTime }}</p>
						</div>
						<div class="meeting-actions">
							<el-button type="primary" size="small">接受</el-button>
							<el-button type="danger" size="small">拒绝</el-button>
						</div>
					</div>
				</div>
				<div v-else class="icon-background">
					<el-icon size="100px">
						<IconCalendar />
					</el-icon>
					<el-text tag="b" size="large">没有会议</el-text>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import { MySponsorMeetingInfoApi, InvitedMeetingInfoApi } from "@/apis/index";
import { useRouter } from "vue-router";
import { fetchMySponsorMeetingInfo, fetchInvitedMeetingInfo } from "@/apis/index/index1";
import { ElMessage } from "element-plus";

const activeIndex = ref("0");
const tableData = ref([]);
const invitedTableData = ref([]);
const MySponsorMeetingInfo = ref();
const InvitedMeetingInfo = ref();
const check = ref(false);
const router = useRouter();
const goToMyMeeting = () => {
	router.push("/meeting/mymeeting");
};
// 菜单激活回调
// const handleSelect = (key) => {
// 	activeIndex.value = key;
// 	// switch (key) {
// 	// 	case "0":
// 	// 		tableData.value = MySponsorMeetingInfo.value;
// 	// 		console.log(check.value);
// 	// 		break;

// 	// 	default:
// 	// 		tableData.value = InvitedMeetingInfo.value;
// 	// 		break;
// 	// }
// 	// check.value = !tableData.value || tableData.value.length === 0;
// };
const handleSelect = async (key) => {
	activeIndex.value = key;
	if (key === "0") {
		await loadMyMeetings();
	} else if (key === "1") {
		await loadInvitedMeetings();
	}
};
const loadMyMeetings = async () => {
	try {
		const personId = "1852159770479124482";
		const data = await fetchMySponsorMeetingInfo(personId);
		if (data && data.length > 0) {
			tableData.value = data;
		} else {
			ElMessage({
				message: "没有会议信息",
				type: "info",
				showClose: true,
			});
		}
	} catch (error) {
		console.error("加载会议信息失败:", error);
		ElMessage({
			message: "加载会议信息失败",
			type: "error",
			showClose: true,
		});
	}
};
const loadInvitedMeetings = async () => {
	try {
		const personId = "1852159770479124482";
		const data = await fetchInvitedMeetingInfo({ PersonId: personId });
		invitedTableData.value = data || [];
	} catch (error) {
		console.error("加载被邀请的会议信息失败:", error);
		ElMessage({
			message: "加载被邀请的会议信息失败",
			type: "error",
			showClose: true,
		});
	}
};

onMounted(loadMyMeetings);
</script>

<style scoped lang="scss">
.content-container {
	border: 1px solid #ebeef5;
	border-radius: 4px;
	background-color: #f9fafc;
	padding: 10px;
	width: 35vw;
	/* 自定义滚动条样式 */
	&::-webkit-scrollbar {
		width: 8px; /* 滚动条的宽度 */
	}

	&::-webkit-scrollbar-track {
		background: #f0f2f5; /* 滚动条轨道的颜色 */
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: #c0c4cc; /* 滚动条滑块的颜色 */
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: padding-box;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: #909399; /* 滚动条滑块hover时的颜色 */
	}
}

.meeting-box {
	border: 1px solid #d3dce6;
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	background-color: #fff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: space-between;
	align-items: center;
	cursor: pointer;
	// justify-content: center;
	.meeting-detail {
		width: 25vw;
	}
	h3 {
		margin: 0;
		color: #409eff;
		font-size: 18px;
	}
	p {
		margin: 5px 0;
		color: #666;
		font-size: 14px;
	}
	.meeting-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		// align-items: stretch;
		gap: 10px;
		width: 10vw;
		justify-content: center;
		button {
			padding: 10px 15px;
			font-size: 16px;
			// width: 100%;
		}
		::v-deep .el-button + .el-button {
			margin-left: 0px;
		}
	}
}
</style>
