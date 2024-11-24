import Request from "../request";

// 定义一个功能模块基础url，方便替换
const currBaseUrl = "/";

// 新增日历
export const addCalendarApi = async (data, success, fail) => {
	try {
		const response = await Request.requestJson(Request.POST, "/cal-schedule/insert-calendar", data);
		if (response.code === 10000) success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};
// 查询日历列表
export const getCalendarListApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.GET, "/cal-schedule/query-calendars", data);
		if (response.code === 10000) success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};
// 查询日历信息
export const getCalendarInfoApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.GET, "/cal-schedule/query-calendar", data);
		if (response.code === 10000) success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};
