<template>
	<div v-if="visible" class="dialog-overlay">
		<div class="dialog-content">
			<h3>新建日历</h3>
			<div class="form-group">
				<label>日历名称：</label>
				<input v-model="calendarName" type="text" />
			</div>

			<div class="form-group">
				<label>颜色：</label>
				<div class="color-picker">
					<span
						v-for="color in colors"
						:key="color"
						:style="{ background: color }"
						@click="selectColor(color)"
						:class="{ selected: selectedColor === color }"
					></span>
				</div>
			</div>

			<div class="form-group">
				<label>类型：</label>
				<select v-model="calendarType">
					<option>个人日历</option>
					<option>组织日历</option>
					<option>关注的日历</option>
				</select>
			</div>

			<div class="form-group">
				<label>是否公开：</label>
				<select v-model="isPublic">
					<option>是</option>
					<option>否</option>
				</select>
			</div>

			<div class="form-group">
				<label>备注：</label>
				<textarea v-model="remarks"></textarea>
			</div>

			<div class="form-group">
				<label>是否启用：</label>
				<input type="radio" v-model="isEnabled" value="是" /> 是
				<input type="radio" v-model="isEnabled" value="否" /> 否
			</div>

			<div class="dialog-footer">
				<button @click="saveCalendar">保存</button>
				<button @click="closeDialog">关闭</button>
			</div>
		</div>
	</div>
</template>

<script>
import { addCalendarApi } from "@/apis/schedule/index.js";
export default {
	props: {
		visible: Boolean,
	},
	data() {
		return {
			calendarName: "",
			selectedColor: "",
			calendarType: "个人日历",
			isPublic: "否",
			remarks: "",
			isEnabled: "是",
			colors: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#9900ff"],
		};
	},
	methods: {
		selectColor(color) {
			this.selectedColor = color;
		},
		saveCalendar() {
			// 定义传入的日历数据
			const calendarData = {
				xid: "1",
				xname: "aaa",
				xcolor: "red", // 日历颜色
				xtype: "PERSON", // 日历类型
				xisPublic: 1, // 是否公开，1表示公开
				xdescription: "aa",
				xstatus: "yes", // 状态
			};
			// 定义成功和失败的回调函数
			const successCallback = (data) => {
				ElMessage({
					message: "新建日历成功",
					type: "success",
					duration: 2000, // 提示显示时间（毫秒）
				});
				console.log("新建日历成功:", data);
				this.closeDialog(); // 关闭弹窗
				// 您可以在这里添加其他逻辑，例如刷新日历列表等
			};

			const failureCallback = (error) => {
				console.error("新建日历失败:", error);
				ElMessage({
					message: "创建日历失败，请稍后再试",
					type: "error",
					duration: 2000,
				});
			};

			// 调用 API，并传入参数和回调函数
			addCalendarApi(calendarData, successCallback, failureCallback);
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

.color-picker span {
	width: 20px;
	height: 20px;
	display: inline-block;
	margin-right: 10px;
	cursor: pointer;
	border-radius: 50%;
	border: 2px solid transparent;
}

.color-picker span.selected {
	border-color: #000;
}

.dialog-footer {
	text-align: right;
}

.dialog-footer button {
	margin-left: 10px;
}
</style>
