<template>
	<div v-if="visible" class="dialog-overlay">
		<div class="dialog-content">
			<h3>新建日程</h3>
			<div class="form-group">
				<label>日历：</label>
				<select v-model="calendar">
					<option>我的日历</option>
					<option>工作日历</option>
				</select>
			</div>

			<div class="form-group">
				<label>标题：</label>
				<input v-model="title" type="text" />
			</div>

			<div class="form-group">
				<label>开始：</label>
				<input v-model="startDate" type="date" />
				<input v-model="startTime" type="time" />
			</div>

			<div class="form-group">
				<label>结束：</label>
				<input v-model="endDate" type="date" />
				<input v-model="endTime" type="time" />
			</div>

			<div class="form-group"><input type="checkbox" v-model="allDay" /> 全天</div>

			<div class="form-group">
				<label>提醒：</label>
				<select v-model="reminder">
					<option>不提醒</option>
					<option>10分钟前</option>
					<option>30分钟前</option>
				</select>
			</div>

			<div class="dialog-footer">
				<button @click="saveSchedule">保存</button>
				<button @click="closeDialog">关闭</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		visible: Boolean,
	},
	data() {
		return {
			calendar: "我的日历",
			title: "",
			startDate: "",
			startTime: "",
			endDate: "",
			endTime: "",
			allDay: false,
			reminder: "不提醒",
		};
	},
	methods: {
		saveSchedule() {
			const newSchedule = {
				calendar: this.calendar,
				title: this.title,
				start: `${this.startDate} ${this.startTime}`,
				end: `${this.endDate} ${this.endTime}`,
				allDay: this.allDay,
				reminder: this.reminder,
			};
			// 保存逻辑，提交到 API 或其他处理
			console.log("保存新日程:", newSchedule);
			this.closeDialog();
		},
		closeDialog() {
			this.$emit("close");
		},
	},
};
</script>

<style scoped>
.dialog-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}

.dialog-content {
	background: #fff;
	padding: 20px;
	border-radius: 10px;
	width: 400px;
}

.form-group {
	margin-bottom: 15px;
}

.dialog-footer {
	text-align: right;
}

.dialog-footer button {
	margin-left: 10px;
}
</style>
