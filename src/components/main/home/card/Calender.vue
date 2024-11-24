<template>
	<el-card class="container">
		<div class="calendar-container">
			<el-calendar ref="calendar">
				<template #header="{ date }">
					<el-button @click="selectDate('prev-month')" link>
						<el-icon class="Arrow" size="15px">
							<IconArrowLeft />
						</el-icon>
					</el-button>
					<el-text type="primary" style="flex-grow: 1; text-align: center">{{ date }}</el-text>
					<el-button type="primary" @click="selectDate('today')" link>今日</el-button>
					<el-button @click="selectDate('next-month')" link>
						<el-icon class="Arrow" size="15px">
							<IconArrowRight />
						</el-icon>
					</el-button>
				</template>
			</el-calendar>
		</div>
		<div class="schedule-container">
			<div class="menu-container">
				<el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
					<el-menu-item index="0">日程管理</el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多消息</span>
					</el-button>
				</el-menu>
			</div>
			<div class="content-container">
				<template v-if="scheduleData && scheduleData.previewList && scheduleData.previewList.length > 0">
					<div v-for="item in scheduleData.previewList" :key="item.xid" class="schedule-item">
						<el-card>
							<p>{{ item.xtitle }}</p>
							<p>{{ item.xeventType }}</p>
							<p>{{ item.xsource }}</p>
						</el-card>
					</div>
				</template>
				<template v-else>
					<div class="no-schedule">
						<el-icon size="100px"><IconCalendar /></el-icon>
						<el-text tag="b" size="large">{{ name }}，您好！今日无日程</el-text>
					</div>
				</template>
			</div>
			<div class="poetic-text">
				<div class="text-left">小雪将至未至时，</div>
				<div class="text-center">十一月中，</div>
				<div class="text-right">寒风细语冬初来。</div>
			</div>
		</div>
	</el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchSchedulePreview } from "@/apis/index/index1";
import type { CalendarDateType, CalendarInstance } from "element-plus";

const activeIndex = ref("0");
const name = ref("xadmin");
const scheduleData = ref(null);

const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
	if (!calendar.value) return;
	calendar.value.selectDate(val);
};

const loadSchedule = async () => {
	const params = {
		chooseDate: "2024-11-14 00:00:00",
		person: "xadmin",
	};
	try {
		const response = await fetchSchedulePreview(params);
		scheduleData.value = response;
	} catch (error) {
		console.error("加载日程数据失败:", error);
	}
};

onMounted(loadSchedule);
</script>

<style scoped lang="scss">
.container {
	block-size: 100%;
}
.el-calendar {
	--el-calendar-cell-width: 50px;
}
.el-card__body {
	block-size: 100%;
	display: flex;
	flex-direction: column;
}
.el-calendar-day {
	display: flex;
	align-items: center;
	justify-content: center;
}
.schedule-item {
	margin-bottom: 10px;
}
.no-schedule {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}
.content-container {
	padding: 10px;
}
.poetic-text {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 60%;
	justify-content: space-around;
	padding-top: 50px;
	.text-left {
		text-align: left;
		font-style: italic;
	}
	.text-center {
		text-align: center;
		font-style: italic;
	}
	.text-right {
		text-align: right;
		font-style: italic;
	}
}
</style>
