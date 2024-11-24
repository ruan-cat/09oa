import { AddLocation } from "@element-plus/icons-vue";
import { defineStore } from "pinia";
import { ref } from "vue";
import { dayjs } from "element-plus";

export const useMeetingStore = defineStore("meetingStore", () => {
	const meetingList = ref([
		// {
		// 	meetingId: "001",
		// 	applicant: "张三",
		// 	type: "业务会议",
		// 	startTime: "2024-10-18 09:00:00",
		// 	completedTime: "2024-10-18 10:00:00",
		// 	room: "会议室A",
		// 	hostPerson: "李四",
		// 	department: "市场部",
		// 	participants: "王五, 赵六, 孙七",
		// 	subject: "产品发布会议",
		// 	summary: "讨论新产品的发布计划和市场策略。",
		// },
		// {
		// 	meetingId: "002",
		// 	applicant: "王小明",
		// 	type: "技术讨论",
		// 	startTime: "2024-10-19 14:00:00",
		// 	completedTime: "2024-10-19 15:30:00",
		// 	room: "会议室B",
		// 	hostPerson: "赵四",
		// 	department: "技术部",
		// 	participants: "张三, 李四",
		// 	subject: "会议室技术问题讨论",
		// 	summary: "解决当前会议室的技术问题及设备升级方案。",
		// },
		// {
		// 	meetingId: "003",
		// 	applicant: "李瑶",
		// 	type: "项目进展",
		// 	startTime: "2024-10-20 11:00:00",
		// 	completedTime: "2024-10-20 12:00:00",
		// 	room: "会议室B",
		// 	hostPerson: "王五",
		// 	department: "产品部",
		// 	participants: "张三, 王小明, 赵四",
		// 	subject: "项目进展汇报会议",
		// 	summary: "汇报各自项目的最新进展及后续计划。",
		// },
		// {
		// 	meetingId: "004",
		// 	applicant: "小丽",
		// 	type: "团队建设",
		// 	startTime: "2024-10-21 15:00:00",
		// 	completedTime: "2024-10-21 17:00:00",
		// 	room: "小型会议室D",
		// 	hostPerson: "张三",
		// 	department: "人事部",
		// 	participants: "全员",
		// 	subject: "年度团队建设活动",
		// 	summary: "增强团队协作与沟通，提升团队凝聚力。",
		// },
	]); // 存储会议列表
	const roomList = ref([
		{
			id: "1",
			name: "会议室A",
			location: "一楼东侧",
			floor: 1,
			capacity: 20,
			housenumber: "A101",
			extnumber: "1234",
			device: ["projector", "whiteboard", "TV"],
			status: "able",
		},
		{
			id: "2",
			name: "会议室B",
			location: "二楼西侧",
			floor: 2,
			capacity: 15,
			housenumber: "B202",
			extnumber: "5678",
			device: ["whiteboard", "videoconferencing"],
			status: "able",
		},
		{
			id: "3",
			name: "会议室C",
			location: "三楼中部",
			floor: 3,
			capacity: 10,
			housenumber: "C303",
			extnumber: "9101",
			device: ["projector", "camera"],
			status: "unable",
		},
		{
			id: "4",
			name: "小型会议室D",
			location: "一楼南侧",
			floor: 1,
			capacity: 5,
			housenumber: "D404",
			extnumber: "2345",
			device: [],
			status: "able",
		},
	]); // 存储会议室列表
	const locationList = ref(
		{
			id: "1",
			name: "一楼东侧",
		},
		{
			id: "2",
			name: "二楼西侧",
		},
		{
			id: "3",
			name: "三楼中部",
		},
		{
			id: "4",
			name: "一楼南侧",
		},
	);

	const setMeetingList = (newList) => {
		meetingList.value = newList;
	};

	//筛选会议
	const findMeetingByRoomName = (roomName) => {
		return meetingList.value.filter((item) => item.room === roomName);
	};

	const findMeetingByStartTime = (time) => {
		return meetingList.value.filter((item) => item.startTime === time);
	};

	//换算星期
	const getDayOfWeek = (date) => {
		const dayOfWeek = date.day();
		const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		return daysOfWeek[dayOfWeek];
	};

	const computeDay = (date) => {
		const today = dayjs(); // 获取今天的日期
		const tomorrow = today.add(1, "day"); // 获取明天的日期
		const dayAfterTomorrow = today.add(2, "day"); // 获取后天的日期

		// 比较输入日期与今天、明天、后天
		if (date.isSame(today, "day")) {
			return "今天";
		} else if (date.isSame(tomorrow, "day")) {
			return "明天";
		} else if (date.isSame(dayAfterTomorrow, "day")) {
			return "后天";
		} else {
			// 返回日期对应的星期几
			return getDayOfWeek(date);
		}
	};

	const compareDate = (dateString, date) => {
		// 将传入的日期字符串解析为 Day.js 对象
		const inputDate = dayjs(dateString);
		const today = date.startOf("day");
		// 比较输入日期与今天的关系
		if (inputDate.isSame(today, "day")) {
			return true;
		} else {
			return false;
		}
	};

	return {
		meetingList,
		roomList,
		locationList,
		setMeetingList,
		findMeetingByRoomName,
		getDayOfWeek,
		computeDay,
		compareDate,
	};
});
