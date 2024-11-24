/* 应用基础信息 */
import Request from "../request";

// 获取所有应用类型
export const getQueryTypesApi = async (success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/application/query-types`);
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
// 分页查询应用
export const getSummaryApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/application/summary`, data);
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
// 新增应用信息
export const getApplicationAddApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.POST, `/process-app-manager/application/add`, data);
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
// 删除应用信息
export const deleteApplicationDeleteApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.DELETE, `/process-app-manager/application/delete/${data}`);
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
