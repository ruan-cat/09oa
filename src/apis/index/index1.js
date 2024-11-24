import Request from "../request";

/**
 * 获取发布的消息信息
 * @param {Object} params 查询参数，包括必需的 personId
 * @returns {Promise} 返回包含消息数据的Promise对象
 */
export const fetchPromulgationMessageInfo = async (params) => {
	// const url = "/systemhome/message/query-promulgationMessageInfo";
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/message/query-promulgationMessageInfo";
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取发布的消息信息失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
export const fetchMySponsorMeetingInfo = async (personId) => {
	// const url = "/systemhome/meeting/query-MySponsorMeetingInfo";
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/meeting/query-MySponsorMeetingInfo";
	const params = personId ? { PersonId: personId } : {};
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取我发起的会议信息失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};

export const fetchInvitedMeetingInfo = async (params) => {
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/meeting/query-InvitedMeetingInfo";
	// const url = "/systemhome/meeting/query-InvitedMeetingInfo";
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取被邀请的会议信息失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};

//获取流程信息
export const fetchProcessInfo = async (params) => {
	// const url = "/systemhome/query-process-info";
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/query-process-info";
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取流程信息失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
// 查询文件信息列表
export const fetchDiskFileInfo = async (params) => {
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/queryDiskFileInfo";
	// const url="/systemhome/queryDiskFileInfo";
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("查询文件信息列表失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
// 查询文件统计数据
export const fetchFileStatistics = async (params) => {
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/queryFileStatistics?id=1";
	// const url="/systemhome/queryFileStatistics";
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("查询文件统计数据失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
//查询日程预览数据
export const fetchSchedulePreview = async (params) => {
	// const url="/systemhome/querySchedulePreview";
	const url = "https://apifoxmock.com/m1/5341789-5012728-default/systemhome/querySchedulePreview";
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("查询日程预览数据失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
