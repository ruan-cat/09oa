import Request from "../request";
/* 表单配置 */
// 获取表单详情
export const getFormSituationApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/form/query-info`, data);
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
// 获取表单列表
export const getFormListApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/form/query-list`, data);
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
// 获取表单分类及其数量
export const getFormClassAndCountApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/form/query-category`, data);
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
// 修改表单
export const putFormFixApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.PUT, `/process-app-manager/form/modify`, data);
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
// 创建表单
export const postFormCreateApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.POST, `/process-app-manager/form/add`, data);
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
// 删除表单
export const deleteFormApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.DELETE, `/process-app-manager/form/remove/${data}`);
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

/* 表单模板-j2 */
// 删除表单模板
export const deleteTemplateApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.DELETE, `/process-app-manager/form/remove/${data}`);
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
// 修改表单模板
export const putTemplateInfoApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.PUT, "/templet-change/templet-info", data);
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

// 获取模板详情
export const getTemplateInfoApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/template-setting/template-info", data);
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
