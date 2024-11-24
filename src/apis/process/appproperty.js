/* 应用属性 */
import Request from "../request";

//获得应用属性
export const getAppPropertiesApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/application/query-properties`, data);
		// 解构响应数据
		if (res.data) {
			success(res.data);
		} else {
			// 执行失败回调
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.error(err);
		// 执行失败回调
		fail();
	}
};

//修改应用属性
export const putFixAppPropertiesApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.PUT, `/process-app-manager/application/modify-properties`, data);
		// 解构响应数据
		if (res.data) {
			success(res.data);
		} else {
			// 执行失败回调
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.error(err);
		// 执行失败回调
		fail();
	}
};
