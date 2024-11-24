import Request from "../request";

// 获取文档列表
export const getQueryColumnListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/api/documents/list", data);
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
// 获取栏目消息
export const getQueryColumnMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/query-column-messages/{xid}", data);
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

//获取所有栏目类型
export const getAllCategoryApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/column/category", data);
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

//获取栏目列表
export const getColumnListApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/column/list", data);
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

//查询新建消息编辑页面
export const getNewMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/new-message/queryNewMessageEdit", data);
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

//发布消息
export const postNewMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/cmshome/publish-message", data);
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

//删除消息
export const deleteMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.DELETE, "/cmshome/delete-message", data);
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

//保存修改
export const postTempMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/modify-message/updateMessageEdit", data);
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

//上传新建消息  用不到
// export const getUpdateNewMessageApi = async (data, success, fail) => {
// 	try {
// 		const res = await Request.requestForm(Request.GET, "/cmshome/new-message/addNewMessage", data);
// 		if (res.data) {
// 			success(res.data);
// 		} else {
// 			fail();
// 		}
// 	} catch (err) {
// 		console.error(err);
// 		fail(err);
// 	}
// };

//查询新建消息页面
export const getFindNewMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/new-message/queryNewMessage", data);
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

//查询修改消息编辑页面
export const getFixedMessageApi = async (data, success, fail) => {
	try {
		const res = await Request.requestForm(Request.GET, "/cmshome/modify-message/queryMessageEdit", data);
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
