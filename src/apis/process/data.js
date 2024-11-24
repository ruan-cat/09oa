import Request from "../request";

/* 数据配置 */
// 创建数据配置
export const createDataConfigApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.POST, "/process-app-manager/data/add", data);
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
// 修改数据配置
export const modifyDataConfigApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.PUT, "/process-app-manager/data/modify", data);
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
// 删除数据配置
export const deleteDataConfigApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.DELETE, "/process-app-manager/data/remove/{id}", data);
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
// 获取数据配置列表
export const getDataConfigListApi = async (configId, success, fail) => {
	try {
		// 发送请求，使用 GET 方法和传递 Query 参数
		const res = await Request.requestJson(Request.GET, "/process-app-manager/data/query-list", configId);
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
// 获取数据配置详情
export const getDataConfigDetailApi = async (configId, success, fail) => {
	try {
		// 发送请求，使用 GET 方法和传递 Query 参数
		const res = await Request.requestJson(Request.GET, "/process-app-manager/data/query-detail", configId);
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
