import Request from "../request";

const base_url = "/c1-org";

/**
 * 获取组织名称树
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const GetOrgNameTreeApi = async (success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${base_url}/orgmanagment/SelectOrgNameTree`);
		if (res.data) {
			success();
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取组织信息
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const GetOrgInfoApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${base_url}/orgmanagment/queryOrgInfo`, data);
		if (res.data) {
			success();
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 创建组织
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const createOrgApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, `${base_url}/orgmanagment/createOrg`, data);
		if (res.data) {
			success();
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 删除组织
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const deleteOrgApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, `${base_url}/orgmanagment/deleteOrg`, data);
		if (res.data) {
			success();
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取组织成员
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const getOrgMember = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${base_url}/orgmanagment/queryOrgStruct`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};
/**
 * 删除组织成员
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */

export const deleteOrgMember = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, `${base_url}/removeorgmem`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取资源名称树
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const getResNameTree = async (success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${base_url}/resource-management/resource-tree-permissions`);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取组织属性
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const getOrgAttr = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${base_url}/queryOrgUnitattribute`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 *  删除对应组织属性
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const deleteOrgAttr = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, `${base_url}/removeOrgUnitattribute`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 *  添加组织属性
 *  @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const addOrgAttr = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, `${base_url}/Attrib_add`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取人员名称列表（条件+分页）
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const getUserNameListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.POST, `${base_url}/orgmanagment/Staff`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取组织职务名称树
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const getJobNameTreeApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `${base_url}/orgunit/query-orgunit-duties`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 添加组织成员
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 *
 */
export const addOrgMemberApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, `${base_url}/addorgmem`, data);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 获取菜单信息
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const getMenuInfoApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `/query-menuinfo/queryone/${data.menu_id}`);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 添加菜单
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const addMenuApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/resource-management/add-menu", data);
		if (res.data) {
			success();
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/***
 * 删除菜单
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const deleteMenuApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, `/resource-management/delet-menu/${data.menu_id}`);
		console.log(res);

		if (res.data) {
			success();
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};

/**
 * 查询菜单功能权限
 * @param data {object} 参数对象
 * @param success 成功回调
 * @param fail 失败回调
 * @return {Promise}
 */
export const queryMenuPermissionsApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `/resource-management/menu-useautority/${data.role_id}`);
		if (res.data) {
			success(res.data);
			return res;
		}
	} catch (err) {
		console.error(err);
		fail();
	}
};
