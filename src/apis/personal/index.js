import Request from "../request";
/**
 * 修改手机号 API modifyPhoneApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const modifyPhoneApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.PUT, `/settings/motifyph/motify-phone`, data);
		if (response.code === 10000) success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};

/**
 * 修改邮箱 API modifyEmailApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const modifyEmailApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.PUT, "/settings/motifyph/motify-mail", data);
		success(response.data);
	} catch (error) {
		console.log(error);
		fail(error);
	}
};

/**
 * 上传头像 API uploadAvatarApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const uploadAvatarApi = async (data, success, fail) => {
	try {
		const response = await Request.postFile("/settings/modify-image/upload-image", data);
		success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};

/**
 * 获取个人信息 API getPersonalInfoApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const getPersonalInfoApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.GET, `/settings/person-setting/person-info`, data);
		console.log(response);
		if (response.code === 10000) success(response.data);
	} catch (error) {
		console.log(error);
		fail(error);
	}
};

/**
 * 保存个人信息 API savePersonalInfoApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const savePersonalInfoApi = async (data, success, fail) => {
	try {
		const response = await Request.requestJson(Request.PUT, "/settings/person-settings/info", data);
		if (response.code === 10000) success(response.data);
		console.log(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};

/**
 * 修改密码 API modifyPwdApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const modifyPwdApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.PUT, "/settings/person-settings/password", data);
		success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};

/**
 * 获取邮箱验证码 API getEmailCodeApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const getEmailCodeApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.POST, "/settings/yanzhengma-mail/mail-info", data);
		if (response.code === 10000 && success) success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};

/**
 * 获取手机验证码 API getPhoneCodeApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
export const getPhoneCodeApi = async (data, success, fail) => {
	try {
		const response = await Request.requestForm(Request.PUT, "/settings/yanzhengma-phone/phone-info", data);
		if (response.code === 10000 && success) success(response.data);
	} catch (error) {
		console.log(error);
		if (fail) fail(error);
	}
};
