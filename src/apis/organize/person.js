import Request from "../request";

// 查询个人成员列表
export const queryPersonListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/personal-management/gets-person-lists", data);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		fail(err);
	}
};
// 查询个人成员详情
export const queryPersonInfoApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `/personal-management/query-personal-info/${data}`);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		fail(err);
	}
};
// 查询个人角色
export const queryPersonRoleApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/personal-management/query-role", data);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		fail(err);
	}
};
// 查询个人属性
export const queryPersonPropsApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `/personal-management/query-person-attribute/${data}`);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		fail(err);
	}
};
// 查询个人身份
export const queryPersonIdentyApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/personal-management/list-personal-identity", data);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		fail(err);
	}
};
//修改个人信息
export const updatePersonInfoApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/personal-management/modify-personal-info", data);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		fail(err);
	}
};
