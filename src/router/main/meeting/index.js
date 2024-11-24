export default [
	{
		path: "/meeting",
		component: () => import("@/views/main/meeting/Meeting.vue"),
		redirect: "/meeting/mymeeting",
		children: [
			{
				path: "/meeting/mymeeting",
				component: () => import("@/views/main/meeting/meetingmenu/MyMeeting.vue"),
			},
			{
				path: "/meeting/monthmeeting",
				component: () => import("@/views/main/meeting/meetingmenu/MonthMeeting.vue"),
			},
			{
				path: "/meeting/weekmeeting",
				component: () => import("@/views/main/meeting/meetingmenu/WeekMeeting.vue"),
			},
			{
				path: "/meeting/daymeeting",
				component: () => import("@/views/main/meeting/meetingmenu/DayMeeting.vue"),
			},
			{
				path: "/meeting/meetinglist",
				component: () => import("@/views/main/meeting/meetingmenu/MeetingList.vue"),
			},
			{
				path: "/meeting/meetingroom",
				component: () => import("@/views/main/meeting/meetingmenu/MeetingRoom.vue"),
			},
		],
	},
];
