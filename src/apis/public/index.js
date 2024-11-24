/* 公共服务API */
import Request from "../request";

// 新增表单模板-c5-http://121.199.69.117:8090/swagger/ui#/
export const postTemplateBuiltApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.POST, "/base/template-built", data);
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
// 获取表单模板列表(分页)-c5
export const getFormQueryAllQueryApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/base/query-all", data);
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
// 获取表单模板分类-c5
export const getFormCategoriesApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/base/query-category", data);
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
// 获取资源名称树-j8-http://8.138.168.58:10701/doc.html#/resource/%E8%B5%84%E6%BA%90%E6%A0%91/getResourceTreeUsingGET
export const getResourceTreeApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/org/menu/resource/tree", data);
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
// 获取组织成员名称树-c1
export const getQueryOrgunitMembersApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/c1-org/orgunit/query-orgunit-members", data);
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
// 获取组织职务名称树-c1
export const getQueryOrgunitDutiesApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/c1-org/orgunit/query-orgunit-duties", data);
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
// 获取组织名称树-c1-http://8.154.43.106:8090/swagger/ui#/
export const getIdSelectOrgNameTreeApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/c1-org/orgmanagment/SelectOrgNameTree", data);
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
// 获取群组名称列表(条件+分页)-c2-http://39.101.72.75:8090/swagger/ui#/
export const getIdGrouplistApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/group/query-group-name", data);
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

// 获取人员名称列表（条件+分页）-c3-http://118.31.168.132:8090/swagger/ui#/
export const getIdentityApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, "/personal-management/gets-person-lists", data);
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
