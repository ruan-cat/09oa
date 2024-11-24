<script lang="ts" setup scope>
import { ref, onMounted } from "vue";
import type { CalendarDateType, CalendarInstance } from "element-plus";
import { PersonInfoApi } from "@/apis/index";

// 菜单组件
const activeIndex = ref("0");
// 员工名称
const name = ref("");

// 日历组件
const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
	if (!calendar.value) return;
	calendar.value.selectDate(val);
};

onMounted(() => {
	PersonInfoApi(
		(data: any) => {
			name.value = data.name;
		},
		() => {},
	);
});
</script>

<template>
	<el-card class="container">
		<!-- 日历组件 -->
		<div class="calendar-container">
			<el-calendar ref="calendar">
				<template #header="{ date }" style="display: flex; justify-content: space-between">
					<el-button @click="selectDate('prev-month')" link>
						<el-icon class="Arrow" size="15px">
							<IconArrowLeft />
						</el-icon>
					</el-button>

					<el-text type="primary" style="flex-grow: 1; text-align: center">
						{{ date }}
					</el-text>

					<el-button type="primary" @click="selectDate('today')" link> 今日 </el-button>

					<el-button @click="selectDate('next-month')" link>
						<el-icon class="Arrow" size="15px">
							<IconArrowRight />
						</el-icon>
					</el-button>
				</template>
			</el-calendar>
		</div>

		<!-- 日程组件 -->
		<div class="schedule-container" style="block-size: 100%; display: flex; flex-direction: column">
			<!-- 菜单 -->
			<div class="menu-container">
				<el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
					<el-menu-item index="0"> 日程管理 </el-menu-item>
					<el-button type="primary" style="margin-inline-start: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多消息</span>
					</el-button>
				</el-menu>
			</div>
			<!-- 日程 -->
			<div
				class="content-container"
				style="block-size: 100%; inline-size: 100%; padding-block-start: 10px; padding: 20px 20px"
			>
				<v-if>
					<el-text style="display: inline-block; inline-size: 100%; text-align: center; opacity: 0.7"
						>{{ name }}，您好！今日无日程</el-text
					>
					<div class="icon-background">
						<el-icon size="100px"><IconCalendar /></el-icon>
						<el-text tag="b" size="large">今日没有日程</el-text>
					</div>
				</v-if>
			</div>
		</div>
	</el-card>
</template>

<style scoped>
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
</style>
