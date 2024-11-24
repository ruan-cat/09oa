<script setup>
import { ref, computed } from "vue";
import RoomCard from "@/components/main/meeting/RoomCard.vue";
import EditLocation from "@/components/main/meeting/EditLocationDialog.vue";
import LocationPopover from "@/components/main/meeting/LocationPopover.vue";
import { useMeetingStore } from "@/stores/meeting";
import { getLocationApi, getRoomApi } from "@/apis/meeting/index";

//当前时间
const currentDate = new Date();
const datetime = ref(currentDate);

const hour = ref(1);
const minute = ref(0);
const hourOptions = Array.from({ length: 13 }, (_, index) => index);
const minuteOptions = Array.from({ length: 61 }, (_, index) => index * 5);

let activePosition = "all";
const handleChange = (name) => {
	activePosition = name;
};

const meetingStore = useMeetingStore();

const newLocationDialog = ref();
const newLocation = () => {
	newLocationDialog.value.open({});
};

const roomList = ref([]);
const locationList = ref([]);
//获取位置信息
const locationParams = {
	pageIndex: 1,
	pageSize: 10,
};
const getLocation = async () => {
	await getLocationApi(
		locationParams,
		(data) => {
			locationList.value = data.rows;
			ElMessage.success("获取会议位置信息成功");
		},
		() => {
			ElMessage.error("获取会议位置信息失败");
		},
	);
};

//获取会议室列表
const roomParams = ref({
	pageIndex: 1,
	pageSize: 100,
	date1: "",
	time1: "",
	build: "",
});
const getRoom = async () => {
	await getRoomApi(
		roomParams.value,
		(data) => {
			roomList.value = data.rows;
			ElMessage.success("获取会议室信息成功");
		},
		() => {
			ElMessage.error("获取会议信息失败");
		},
	);
};

//刷新页面
const clearPage = async () => {
	await getLocation();
	await getRoom();
};
onMounted(() => {
	clearPage();
});
</script>

<template>
	<div>
		<el-container>
			<el-header>
				<div class="header">
					<el-date-picker v-model="datetime" type="datetime" />
					<p>持续</p>
					<el-select v-model="hour" placeholder="Select" size="small" style="width: 60px">
						<el-option v-for="item in hourOptions" :key="item" :label="item" :value="item" />
					</el-select>
					<p>小时</p>
					<el-select v-model="minute" placeholder="Select" size="small" style="width: 60px">
						<el-option v-for="item in minuteOptions" :key="item" :label="item" :value="item" />
					</el-select>
					<p>分钟</p>
					<el-button @click="newLocation">新建会议室</el-button>
					<EditLocation ref="newLocationDialog" />
				</div>
			</el-header>
			<el-main>
				<el-tabs v-model="activePosition" type="card" @tab-change="handleChange">
					<el-tab-pane label="全部" name="all">
						<el-scrollbar>
							<div class="room-box-container">
								<div v-for="item in roomList" :key="item.mettingbuild">
									<RoomCard :room="item" />
								</div>
							</div>
						</el-scrollbar>
					</el-tab-pane>
					<div v-for="item in locationList">
						<el-tab-pane :key="item.mettingbuild" :label="item.mettingbuild" :name="item.mettingbuild">
							<template #label>
								<LocationPopover :location="item" @deleteSuccess="clearPage">
									<span>{{ item.mettingbuild }}</span>
								</LocationPopover>
							</template>
							<el-scrollbar>
								<div class="room-box-container">
									<div v-for="room in roomList" :key="room.mettingname">
										<div v-if="room.mettingbuild === activePosition">
											<RoomCard :room="room" />
										</div>
									</div>
								</div>
							</el-scrollbar>
						</el-tab-pane>
					</div>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped>
.header {
	display: flex;
}

.header p {
	margin: 5px;
}

.room-box-container {
	display: flex;
	margin-bottom: 20px;
}

.room-card {
	margin-right: 20px;
	height: 580px;
	width: 300px;
	background-color: #fff;
	padding: 20px;
}

.room-box:hover {
	box-shadow: 0px 5px 10px 0px #808080;
}

.room-name {
	font-size: 24px;
}

.icon-box {
	display: flex;
}

.meetinglist-box {
	margin-top: 40px;
	border: solid, #808080;
	width: 260px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
