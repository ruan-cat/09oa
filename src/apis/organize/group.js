import Request from "../request";

// 定义一个功能模块基础url，方便替换
const groupBaseUrl = "/organization-group";

/**
 * 获取群组列表接口
 * @param {Request} params 查询参数
 * @param {Function} success 成功回调函数
 * @param {Function} fail 失败回调函数
 */
// export const fetchGroupListApi = async (params, success, fail) => {
// 	try {
// 		const url = `https://apifoxmock.com/m1/5341789-5012728-default${groupBaseUrl}/id-grouplist`;
// 		const res = await Request.requestJson(Request.GET, url, params);
// 		if (res && res.data) {
// 			success(res.data);
// 		}
// 	} catch (err) {
// 		console.warn("Error fetching group list:", err);
// 		fail(err);
// 	}
// };
export const fetchGroupListApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/query-group-name`;
	const url = `/group/query-group-name`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("请求失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
export const addGroupApi = async (groupData) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/add-group`;
	const url = `/group/add-group`;
	try {
		const res = await Request.requestJson(Request.POST, url, groupData);
		return res;
	} catch (err) {
		console.error("Error adding group:", err);
		throw err;
	}
};
export const getGroupInfoApi = async (id) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/get-groupInfo`;
	const url = `/group/get-groupInfo`;
	try {
		const res = await Request.requestJson(Request.GET, url, { id });
		return res.data;
	} catch (err) {
		console.error("获取详细群组失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
export const deleteGroupApi = async (groupId) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/delete-group/1`;
	const url = `/group/delete-group/${groupId}`;
	try {
		const res = await Request.requestJson(Request.DELETE, url, { id: groupId });
		return res;
	} catch (err) {
		console.error("Error deleting group:", err);
		throw err;
	}
};
export const fetchPersonnelApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/query-person-member`;
	const url = `/group/query-person-member`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("Error fetching personnel data:", err);
		throw err;
	}
};
export const deletePersonApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/delete-person-member`;
	const url = `/group/delete-person-member`;
	try {
		const res = await Request.requestJson(Request.DELETE, url, params);
		return res;
	} catch (err) {
		console.error("删除失败:", err);
		throw err;
	}
};
export const updateGroupApi = async (groupData) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/modify-group`;
	const url = `/group/modify-group`;
	try {
		const res = await Request.requestJson(Request.PUT, url, groupData);
		return res;
	} catch (err) {
		console.error("修改群组信息失败:", err.response ? err.response.data : err.message);
		throw err;
	}
};
export const fetchIDMemberListApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/query-id-member`;
	const url = `/group/query-id-member`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (error) {
		console.error("请求身份成员信息失败:", err);
		// 更详细的错误处理
		if (err.response) {
			console.error("详细错误信息:", err.response.data);
			throw new Error(`服务器错误: ${err.response.data.message || err.message}`);
		} else {
			throw new Error(`请求失败: ${err.message}`);
		}
	}
};
export const deleteIdentityMemberApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/del-identity-member`;
	const url = `/group/del-identity-member`;
	try {
		const res = await Request.requestJson(Request.DELETE, url, params);
		return res;
	} catch (err) {
		console.error("删除失败:", err);
		throw err;
	}
};
export const fetchGroupMembersApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/query-group-member`;
	const url = `/group/query-group-member`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("请求获取群组成员失败:", err);
		throw err;
	}
};
export const deleteGroupMemberApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/del-group-member`;
	const url = `/group/del-group-member`;
	try {
		const res = await Request.requestJson(Request.DELETE, url, params);
		return res;
	} catch (err) {
		console.error("删除群组成员失败:", err);
		throw err;
	}
};
export const fetchOrganizationMembersApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/query/query-unit-member`;
	const url = `/group/query-unit-member`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("请求获取组织成员失败:", err);
		throw err;
	}
};
export const deleteOrganizationMemberApi = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/del-unit-member`;
	const url = `/group/del-unit-member`;
	try {
		const res = await Request.requestJson(Request.DELETE, url, params);
		return res;
	} catch (err) {
		console.error("删除组织成员失败:", err);
		throw err;
	}
};

export const getIdentityApit = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/application-manage/identity", data);
		if (res.data && res.data.data) {
			console.log("API response:", res.data);
			success(res.data.data);
		} else {
			console.error("API did not return data:", res);
			fail();
		}
	} catch (err) {
		console.error("API request failed:", err);
		fail();
	}
};
export const addIdentityMemberApi = async (groupData) => {
	const url = `/group/add-identity-member`;
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/add-identity-member`;
	try {
		const res = await Request.requestJson(Request.POST, url, groupData);
		return res;
	} catch (err) {
		console.error("Error adding group:", err);
		throw err;
	}
};
export const getPersonListApi = async (params) => {
	const url = `https://apifoxmock.com/m1/5341789-5012728-default/personal-management/gets-person-lists`;
	// const url = `/orgmanagment/Staff`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取人员列表失败:", err);
		throw err;
	}
};
export const addPersonMemberApi = async (groupData) => {
	const url = `/group/add-person-member`;
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/add-person-member`;
	try {
		const res = await Request.requestJson(Request.POST, url, groupData);
		return res;
	} catch (err) {
		console.error("Error adding person:", err);
		throw err;
	}
};
export const addGroupMemberApi = async (groupData) => {
	const url = `/group/add-group-member`;
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/add-group-member`;
	try {
		const res = await Request.requestJson(Request.PUT, url, groupData);
		return res.data;
	} catch (err) {
		console.error("Error adding group member:", err);
		throw err;
	}
};
export const getOrgNameTreeApi = async (params) => {
	const url = `/orgmanagment/SelectOrgNameTree`;
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/orgmanagment/SelectOrgNameTree`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取组织成员失败:", err);
		throw err;
	}
};

export const addUnitMemberApi = async (groupData) => {
	const url = `/group/add-unit-member`;
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/group/add-unit-member`;
	try {
		const res = await Request.requestJson(Request.PUT, url, groupData);
		return res.data;
	} catch (err) {
		console.error("Error adding group member:", err);
		throw err;
	}
};

// 获取组织成员名称树-c1
export const getQueryOrgunitMembersApit = async (data, success, fail) => {
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
// 获取组织名称树-c1
export const getIdSelectOrgNameTreeApit = async (data, success, fail) => {
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
// 获取人员名称列表（条件+分页）-c3
export const getPersonListApit1 = async (data, success, fail) => {
	try {
		// 发送请求/c1-org/orgmanagment/Staff
		const res = await Request.requestJson(Request.GET, "/c1-org/orgmanagment/Staff", data);
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
export const getPersonListApit = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/personal-management/gets-person-lists`;
	const url = `/c1-org/orgmanagment/Staff`;
	try {
		const res = await Request.requestJson(Request.POST, url, params);
		return res.data;
	} catch (err) {
		console.error("获取人员列表失败:", err);
		throw err;
	}
};
export const getPersonListApit3 = async (params) => {
	// const url = `https://apifoxmock.com/m1/5341789-5012728-default/personal-management/gets-person-lists`;
	const url = `/personal-management/gets-person-lists`;
	try {
		const res = await Request.requestJson(Request.GET, url, params);
		return res.data;
	} catch (err) {
		console.error("获取人员列表失败:", err);
		throw err;
	}
};
