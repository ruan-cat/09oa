import Request from "../request";

/**
 * requestApi 函数封装
 */
const requestApi = async (url: string, success: (data: any) => void, fail: () => void) => {
	try {
		// 发送请求
		const res = await Request.request(Request.GET, url, null, null);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else fail();
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};

/**
 * MySponsorMeetingInfoApi接口 我发起的会议
 * @param success 成功回调
 * @param fail 失败回调
 */
export const MySponsorMeetingInfoApi = (success: (data: any) => void, fail: () => void) => {
	requestApi(`/meeting/query-MySponsorMeetingInfo?id=1`, success, fail);
};

/**
 * MySponsorMeetingInfoApi接口 被邀请的会议
 * @param success 成功回调
 * @param fail 失败回调
 */
export const InvitedMeetingInfoApi = (success: (data: any) => void, fail: () => void) => {
	requestApi(`/meeting/query-InvitedMeetingInfo?id=1`, success, fail);
};

/**
 * PersonInfoApi接口 获取个人信息
 * @param success 成功回调
 * @param fail 失败回调
 */
export const PersonInfoApi = (success: (data: any) => void, fail: () => void) => {
	requestApi(`/person-setting/person-info?id=1`, success, fail);
};

/**
 * queryProcessInfo接口 查询代办统计信息
 * @param success 成功回调
 * @param fail 失败回调
 */
export const queryProcessInfo = (success: (data: any) => void, fail: () => void) => {
	requestApi(`/system-home/query-process-info?id=1`, success, fail);
};

/**
 * queryFileStatistics接口 查询文件统计信息
 * @param success 成功回调
 * @param fail 失败回调
 */
export const queryFileStatistics = (success: (data: any) => void, fail: () => void) => {
	requestApi(`/systemhome/queryFileStatistics?id=1`, success, fail);
};
