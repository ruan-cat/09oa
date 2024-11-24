import Request from "../request";
import { userStore } from "@/stores/user";

/* 用户名登录 */
const currLoginBaseUrl = "/login";
// 授权登录
export const postAuthLoginApi = async (data, success, fail) => {
	const store = userStore();
	try {
		// 发送登录请求
		const res = await Request.requestForm(Request.POST, `${currLoginBaseUrl}/auth-login`, data);
		// 解构响应数据
		const { token, refreshToken } = res.data || {};
		if (token && refreshToken) {
			// 记录Token和RefreshToken到本地
			store.setToken({ token, refreshToken });
			// 执行成功回调
			success();
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
// 获取当前用户
export const getCurrentUserApi = async (success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${currLoginBaseUrl}/current-user`);
		const user = res.data || {};
		if (user) {
			success(user);
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail(err);
	}
};
// 获取菜单
export const getMenusApi = async (success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${currLoginBaseUrl}/get-menus`);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail(err);
	}
};
// 退出登录
export const getLogoutApi = async (success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${currLoginBaseUrl}/logout`);
		if (res.data) {
			success();
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};
// 刷新登录
export const postRefreshTokenApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, `${currLoginBaseUrl}/refresh-token`, data);
		// 解构响应数据
		const { token, refreshToken } = res.data || {};
		if (token && refreshToken) {
			success({ token, refreshToken });
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/* 忘记密码 */
// 修改密码
export const putModifyPasswordApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/login/forgotPassword/modifyPassword", data);
		if (res.data) {
			success();
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};
// 查询手机号返回验证码
export const getQuerySmsApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/login/forgotPassword/querySms", data);
		const { smsCode } = res.data || {};
		if (smsCode) {
			success(smsCode);
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/* 用户手机验证码登录 */
// 用户获取手机验证码
export const getPersonInfoApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/login/ByPhoneCode/person-info", data);
		if (res.data) {
			success(res.data);
		} else {
			fail();
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};
// 用户手机验证码登录
export const postPersonInfoApi = async (data, success, fail) => {
	const store = userStore();
	try {
		// 发送登录请求
		const res = await Request.requestJson(Request.POST, "/login/ByPhoneCode/person-info", data);
		// 解构响应数据
		const { token, refreshToken } = res.data || {};
		if (token && refreshToken) {
			// 记录Token和RefreshToken到本地
			store.setToken({ token, refreshToken });
			// 执行成功回调
			success();
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
