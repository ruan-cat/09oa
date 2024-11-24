<template>
	<div class="calendar-container">
		<!-- 左侧侧边栏 -->
		<div class="calendar-sidebar">
			<button class="new-calendar-btn" @click="openNewCalendarDialog">+ 新建日历</button>
			<ul>
				<!-- 我的日历部分 -->
				<li>
					<div @click="toggleSection('myCalendars')" class="section-header">
						<span>{{ isSectionOpen.myCalendars ? "▼" : "▶" }}</span> 我的日历
					</div>
					<ul v-if="isSectionOpen.myCalendars" class="calendar-list">
						<li v-for="(calendar, index) in myCalendars" :key="index">
							<input
								type="radio"
								:id="'my-calendar-' + index"
								v-model="selectedCalendar"
								:value="calendar.xid"
								@click="fetchCalendarDetail(calendar.xid)"
							/>
							<!-- [改动] 公用同一个 fetchCalendarDetail 方法 -->
							<label :for="'my-calendar-' + index">
								<span class="bullet" :class="{ selected: selectedCalendar === calendar.xid }">●</span>
								{{ calendar.xname }}
							</label>
							<!-- 功能按钮 -->
							<button class="options-btn" @click.stop="toggleOptionsPopup">⋮</button>
							<!-- 功能弹窗 -->
							<div v-if="isOptionsPopupVisible" class="options-popup">
								<ul>
									<li @click="showCurrentCalendarOnly">只显示当前日历</li>
									<li @click="openNewScheduleDialog">新建日程</li>
									<li @click="editCalendar">编辑日历</li>
									<li @click="deleteCalendar">删除日历</li>
								</ul>
							</div>
						</li>
					</ul>
				</li>
				<!-- 组织日历部分 -->
				<li>
					<div @click="toggleSection('orgCalendars')" class="section-header">
						<span>{{ isSectionOpen.orgCalendars ? "▼" : "▶" }}</span> 组织日历
					</div>
					<ul v-if="isSectionOpen.orgCalendars" class="calendar-list">
						<li v-for="(calendar, index) in orgCalendars" :key="index">
							<input
								type="radio"
								:id="'org-calendar-' + index"
								v-model="selectedCalendar"
								:value="calendar.xid"
								@click="fetchCalendarDetail(calendar.xid)"
							/>
							<!-- [改动] 公用同一个 fetchCalendarDetail 方法 -->
							<label :for="'org-calendar-' + index">
								<span class="bullet" :class="{ selected: selectedCalendar === calendar.xid }">●</span>
								{{ calendar.xname }}
							</label>
						</li>
					</ul>
				</li>
				<!-- 关注的日历部分 -->
				<li>
					<div @click="toggleSection('followedCalendars')" class="section-header">
						<span>{{ isSectionOpen.followedCalendars ? "▼" : "▶" }}</span> 关注的日历
					</div>
					<ul v-if="isSectionOpen.followedCalendars" class="calendar-list">
						<li v-for="(calendar, index) in followedCalendars" :key="index">
							<input
								type="radio"
								:id="'followed-calendar-' + index"
								v-model="selectedCalendar"
								:value="calendar.xid"
								@click="fetchCalendarDetail(calendar.xid)"
							/>
							<!-- [改动] 公用同一个 fetchCalendarDetail 方法 -->
							<label :for="'followed-calendar-' + index">
								<span class="bullet" :class="{ selected: selectedCalendar === calendar.xid }">●</span>
								{{ calendar.xname }}
							</label>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<!-- 日历主内容区域 -->
		<div class="calendar-main">
			<div class="calendar-menu">
				<div class="menu-buttons">
					<button @click="changeView('month')">月</button>
					<button @click="changeView('week')">周</button>
					<button @click="changeView('day')">日</button>
					<button @click="changeView('agenda')">日程</button>
				</div>
				<button class="new-schedule-btn" @click="openNewScheduleDialog">新建日程</button>
			</div>

			<div class="calendar-view">
				<!-- 周视图网格 -->
				<div class="calendar-view" v-if="currentView === 'week'">
					<div class="week-header">
						<div class="week-day-header">全天</div>
						<div v-for="day in weekDays" :key="day.date" class="week-day-header">
							{{ day.label }}
						</div>
					</div>
					<div class="week-grid">
						<div class="time-column">
							<div v-for="hour in 24" :key="hour" class="time-slot">{{ hour }}:00</div>
						</div>
						<div class="day-columns">
							<div v-for="day in 7" :key="day" class="day-column">
								<div v-for="hour in 24" :key="hour" class="hour-slot"></div>
								<div class="event" v-if="day === 5 && hour === 0">11-01 00:00~23:59 事件 11</div>
								<!-- 示例事件 -->
							</div>
						</div>
					</div>
				</div>
				<!-- 月视图网格 -->
				<div class="calendar-view" v-if="currentView === 'month'">
					<div class="calendar-header">
						<div
							class="calendar-day-header"
							v-for="day in ['周日', '周一', '周二', '周三', '周四', '周五', '周六']"
							:key="day"
						>
							{{ day }}
						</div>
					</div>
					<div class="calendar-grid">
						<div v-for="day in 35" :key="day" class="calendar-day">
							<span class="day-number">{{ day <= daysInMonth ? day : "" }}</span>
							<div class="event" v-if="day === 2">
								<!-- 示例事件1 -->
								<span class="event-title">11-01 00:00~23:59 事件 11</span>
							</div>
							<div class="event" v-if="day === 2">
								<!-- 示例事件2 -->
								<span class="event-title">18:00~19:00 事件 33</span>
							</div>
							<div class="event" v-if="day === 2">
								<!-- 示例事件3 -->
								<span class="event-title">14:00~15:00 事件 22</span>
							</div>
						</div>
					</div>
				</div>
				<!-- 日视图网格 -->
				<div class="calendar-view" v-if="currentView === 'day'">
					<div class="day-header">2024年11月01日, 周五</div>
					<div class="day-grid">
						<div class="time-column">
							<div v-for="hour in 24" :key="hour" class="time-slot">{{ hour }}:00</div>
						</div>
						<div class="event-column">
							<div v-for="hour in 24" :key="hour" class="hour-slot"></div>
							<div class="event" style="top: 0%">11-01 00:00~23:59 事件 11</div>
							<div class="event" style="top: 58.3%">14:00~15:00 事件 22</div>
							<!-- 示例事件 -->
						</div>
					</div>
				</div>
				<!-- 日程 -->
				<div class="calendar-view" v-if="currentView === 'agenda'">
					<div class="agenda-header">
						<button @click="prevMonth">&lt;</button>
						<span>{{ currentMonthYear }}</span>
						<button @click="nextMonth">&gt;</button>
					</div>
					<div class="agenda-list">
						<div class="agenda-day" v-for="day in agendaDays" :key="day.date">
							<div class="agenda-date">{{ day.dateLabel }}</div>
							<div class="agenda-event" v-for="event in day.events" :key="event.id">
								<div class="event-color" :style="{ backgroundColor: event.color }"></div>
								<div class="event-time">{{ event.time }}</div>
								<div class="event-title">{{ event.title }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<new-calendar-dialog :visible="isDialogVisible" @close="isDialogVisible = false" />
		<new-schedule-dialog :visible="isScheduleDialogVisible" @close="isScheduleDialogVisible = false" />
	</div>
</template>

<script>
import NewCalendarDialog from "@/components/main/schedule/schedule.vue";
import NewScheduleDialog from "@/components/main/schedule/NewScheduleDialog.vue";
import { getCalendarListApi } from "@/apis/schedule/index.js";
export default {
	components: {
		NewCalendarDialog,
		NewScheduleDialog,
	},
	data() {
		return {
			isOptionsPopupVisible: {}, // 控制每个功能弹窗的显示
			currentMonthYear: "2024年11月",
			agendaDays: [
				{
					date: "2024-11-01",
					dateLabel: "11月1日 周五",
					events: [
						{ id: 1, time: "全天", title: "事件 11", color: "#0056b3" },
						{ id: 2, time: "18:00 - 19:00", title: "事件 33", color: "#007bff" },
						{ id: 3, time: "14:00 - 15:00", title: "事件 22", color: "#ff99cc" },
					],
				},
			],
			currentDate: "2024年11月01日, 周五",
			weekDays: [
				{ label: "周日(10.27)", date: "2024-10-27" },
				{ label: "周一(10.28)", date: "2024-10-28" },
				{ label: "周二(10.29)", date: "2024-10-29" },
				{ label: "周三(10.30)", date: "2024-10-30" },
				{ label: "周四(10.31)", date: "2024-10-31" },
				{ label: "周五(11.01)", date: "2024-11-01" },
				{ label: "周六(11.02)", date: "2024-11-02" },
			],
			selectedCalendar: null, // 存储选中的日历ID
			isSectionOpen: {
				myCalendars: true,
				orgCalendars: false,
				followedCalendars: false,
			},
			currentView: "week", // 默认视图
			myCalendars: [], // 存储我的日历
			orgCalendars: [], // 存储组织日历
			followedCalendars: [], // 存储关注的日历
			isDialogVisible: false, // 控制日历弹窗是否显示
			isScheduleDialogVisible: false, // 控制新建日程弹窗是否显示
			calendarDetail: null, // calendarDetail 存储日历详情
		};
	},
	methods: {
		toggleOptionsPopup(index) {
			// Toggle visibility for the selected calendar's popup
			this.$set(this.isOptionsPopupVisible, index, !this.isOptionsPopupVisible[index]);
		},
		showCurrentCalendarOnly() {
			console.log("只显示当前日历");
			this.closeAllPopups();
		},
		editCalendar() {
			console.log("编辑日历");
			this.closeAllPopups();
		},
		deleteCalendar() {
			console.log("删除日历");
			this.closeAllPopups();
		},
		closeAllPopups() {
			// Close all popups
			this.isOptionsPopupVisible = {};
		},
		toggleSection(section) {
			this.isSectionOpen[section] = !this.isSectionOpen[section];
		},
		openNewCalendarDialog() {
			this.isDialogVisible = true; // 打开新建日历弹窗
		},
		openNewScheduleDialog() {
			this.isScheduleDialogVisible = true; // 打开新建日程弹窗
		},
		changeView(view) {
			this.currentView = view; // 切换日历视图
		},
		// 获取日历列表并根据类型进行分类
		fetchCalendarList() {
			const data = {}; // 无需传参

			const successCallback = (data) => {
				// 清空之前的数据
				this.myCalendars = [];
				this.orgCalendars = [];
				this.followedCalendars = [];

				// 根据 xtype 分类
				data.forEach((calendar) => {
					if (calendar.xtype === "PERSON") {
						this.myCalendars.push(calendar);
					} else if (calendar.xtype === "组织日历") {
						this.orgCalendars.push(calendar);
					} else if (calendar.xtype === "关注的日历") {
						this.followedCalendars.push(calendar);
					}
				});

				ElMessage({
					message: "日历列表加载成功",
					type: "success",
					duration: 2000,
				});
			};

			const failureCallback = (error) => {
				console.error("获取日历列表失败:", error);
				ElMessage({
					message: "获取日历列表失败，请稍后再试",
					type: "error",
					duration: 2000,
				});
			};

			getCalendarListApi(data, successCallback, failureCallback);
		},
	},
	// 获取选中的日历详情
	fetchCalendarDetail(calendarId) {
		// [改动] 新增 fetchCalendarDetail 方法，适用于三种日历类型
		const successCallback = (data) => {
			this.calendarDetail = data; // 存储获取的日历详情
			console.log("日历详情:", data);
			ElMessage({
				message: "日历详情加载成功",
				type: "success",
				duration: 2000,
			});
		};

		const failureCallback = (error) => {
			console.error("获取日历详情失败:", error);
			ElMessage({
				message: "获取日历详情失败，请稍后再试",
				type: "error",
				duration: 2000,
			});
		};

		getCalendarDetailApi(calendarId, successCallback, failureCallback); // [改动] 调用 getCalendarDetailApi
	},

	mounted() {
		this.fetchCalendarList();
	},
};
</script>

<style scoped>
.calendar-container {
	display: flex;
	font-family: Arial, sans-serif;
}

.calendar-sidebar {
	width: 250px;
	background-color: #f8f9fa;
	border-right: 1px solid #dee2e6;
	padding: 20px;
}

.new-calendar-btn {
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	background-color: #007bff;
	color: white;
	cursor: pointer;
	margin-bottom: 20px;
	transition: background-color 0.3s;
	font-size: 16px;
	font-weight: bold;
}

.new-calendar-btn:hover {
	background-color: #0056b3;
}

.calendar-sidebar .section-header {
	cursor: pointer;
	font-weight: bold;
	margin: 10px 0;
	padding: 10px;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.calendar-sidebar .section-header:hover {
	background-color: #e9ecef;
}

.calendar-list {
	list-style-type: none;
	padding-left: 0;
}

.calendar-list li {
	margin: 5px 0;
}

.bullet {
	margin-right: 10px;
	color: #6c757d;
}

.bullet.selected {
	color: #007bff;
}

.calendar-main {
	flex: 1;
	padding: 20px;
}

.calendar-menu {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.menu-buttons {
	display: flex;
}

.menu-buttons button {
	margin-right: 10px;
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	background-color: #007bff;
	color: white;
	cursor: pointer;
	transition: background-color 0.3s;
}

.menu-buttons button:hover {
	background-color: #0056b3;
}

.new-schedule-btn {
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	background-color: #28a745;
	color: white;
	cursor: pointer;
	transition: background-color 0.3s;
}

.new-schedule-btn:hover {
	background-color: #218838;
}
.calendar-main {
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
}

.calendar-menu {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.menu-buttons button.active,
.menu-buttons button:hover {
	background-color: #007bff;
	color: #ffffff;
}

.new-schedule-btn {
	background: #28a745;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	padding: 8px 12px;
	cursor: pointer;
	font-size: 14px;
	transition: background-color 0.3s ease;
}

.new-schedule-btn:hover {
	background-color: #218838;
}

.calendar-header {
	display: flex;
	border-bottom: 1px solid #ddd;
}

.calendar-day-header {
	flex: 1;
	text-align: center;
	padding: 10px;
	font-weight: bold;
	background-color: #f0f0f0;
	border-right: 1px solid #ddd;
}

.calendar-grid {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 1px;
	background-color: #ddd;
}

.calendar-day {
	background-color: #ffffff;
	position: relative;
	padding: 5px;
	min-height: 80px;
	border: 1px solid #ddd;
}

.day-number {
	font-size: 12px;
	font-weight: bold;
	position: absolute;
	top: 5px;
	left: 5px;
}

.event {
	background-color: #e6f7ff;
	color: #0056b3;
	font-size: 12px;
	border-radius: 3px;
	margin-top: 5px;
	padding: 2px 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.event-title {
	display: block;
}

.week-header {
	display: grid;
	grid-template-columns: 100px repeat(7, 1fr);
	border-bottom: 1px solid #ddd;
}

.week-day-header {
	text-align: center;
	padding: 10px 0;
	font-weight: bold;
	background-color: #f0f0f0;
	border-right: 1px solid #ddd;
}

.week-grid {
	display: flex;
}

.time-column {
	width: 100px;
	display: flex;
	flex-direction: column;
}

.time-slot {
	height: 50px;
	text-align: center;
	border-bottom: 1px solid #ddd;
}

.day-columns {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	flex: 1;
}

.day-column {
	border-right: 1px solid #ddd;
	position: relative;
}

.hour-slot {
	height: 50px;
	border-bottom: 1px solid #ddd;
}

.event {
	position: absolute;
	top: 0;
	left: 0;
	background-color: #e6f7ff;
	color: #0056b3;
	padding: 2px 5px;
	border-radius: 3px;
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.week-header {
	display: grid;
	grid-template-columns: 100px repeat(7, 1fr);
	border-bottom: 1px solid #ddd;
}

.week-day-header {
	text-align: center;
	padding: 10px 0;
	font-weight: bold;
	background-color: #f0f0f0;
	border-right: 1px solid #ddd;
}

.week-grid {
	display: flex;
}

.time-column {
	width: 100px;
	display: flex;
	flex-direction: column;
}

.time-slot {
	height: 50px;
	text-align: center;
	border-bottom: 1px solid #ddd;
}

.day-columns {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	flex: 1;
}

.day-column {
	border-right: 1px solid #ddd;
	position: relative;
}

.hour-slot {
	height: 50px;
	border-bottom: 1px solid #ddd;
}

.event {
	position: absolute;
	top: 0;
	left: 0;
	background-color: #e6f7ff;
	color: #0056b3;
	padding: 2px 5px;
	border-radius: 3px;
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.day-header {
	text-align: center;
	padding: 10px;
	font-weight: bold;
	border-bottom: 1px solid #ddd;
	background-color: #f9f9f9;
}

.day-grid {
	display: flex;
}

.time-column {
	width: 100px;
	display: flex;
	flex-direction: column;
}

.time-slot {
	height: 50px;
	text-align: center;
	border-bottom: 1px solid #ddd;
}

.event-column {
	position: relative;
	flex: 1;
	border-left: 1px solid #ddd;
}

.hour-slot {
	height: 50px;
	border-bottom: 1px solid #ddd;
}

.event {
	position: absolute;
	left: 5px;
	width: calc(100% - 10px);
	background-color: #e6f7ff;
	color: #0056b3;
	padding: 5px;
	border-radius: 3px;
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.agenda-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	font-weight: bold;
	padding: 10px;
	background-color: #f9f9f9;
	border-bottom: 1px solid #ddd;
}

.agenda-list {
	padding: 10px;
}

.agenda-day {
	margin-top: 10px;
}

.agenda-date {
	font-weight: bold;
	color: #333;
	padding: 5px 0;
	border-bottom: 1px solid #007bff;
}

.agenda-event {
	display: flex;
	align-items: center;
	padding: 5px 0;
	border-bottom: 1px solid #eee;
}

.event-color {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-right: 10px;
}

.event-time {
	width: 100px;
	color: #666;
	font-size: 14px;
}

.event-title {
	flex: 1;
	font-size: 14px;
	color: #333;
}
</style>
