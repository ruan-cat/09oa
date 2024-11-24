import Request from "../request";
/**
 * xxx接口 xxxApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */

//查询个人成员列表
export const queryPersonListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/role/query-person-list", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//增加个人成员
export const addPersonApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/role/add-person-member", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//删除个人成员
export const deletePersonApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, "/role/del-person-member", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//查询群组成员列表
export const queryGroupListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/role/query-person-member", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//增加群组成员
export const addGroupMemberApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/role/add-groupmember", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//删除群组成员
export const deleteGroupMemberApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, "/role/del-groupmember", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//获取角色分配资源
export const getRoleApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/role/obtain-role-resource", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//修改角色分配资源
export const changeRoleApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/role/modify-role-resource", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//增加角色
export const addRoleApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/rolemanegement/add-role", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//获取角色名称列表
export const getRoleListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/role/query-role-name", data);
		console.log(res);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//获取角色信息
export const getRoleInformationApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/role/query_roleinfo", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//修改角色信息
export const changeRoleInformationApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/role/modify-role", data);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
//获取所有群组成员
export const getAllGroupMemberApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/group/query-group-name", data);
		if (res.data) {
			// 执行成功回调
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		// 打印错误信息
		console.warn(err);
		// 执行失败回调
		fail();
	}
};
