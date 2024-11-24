import Request from "../request";
import { useMeetingStore } from "@/stores/meeting";

const meetingStore = useMeetingStore();

// 定义一个功能模块基础url，方便替换
// const currBaseUrl = "/";

/**
 * xxx接口 xxxApi
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */

//请求会议列表 会议管理（10）
export const getMeetinglistApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/meeting/query-one", data);
		if (res.data) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//新增会议
export const postMeetingAddApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/meeting/add", data);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//修改会议
export const putMeetingModifyApi = async (data, success, fail) => {
	try {
		const res = await Request.request(Request.PUT, "/meeting/modify", data);
		if (res.code === 10000) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//查询会议详细
export const getMeetingDetailApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/meeting/query-detail", data);
		if (res.data) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//会议签到
export const postMeetingCheckinApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/meeting/checkin-meeting", data);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//拒绝会议
export const getMeetingRefuseApi = async (id, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `/meeting/refuse/${id}`);
		if (res.code === 10000) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//接受会议
export const getMeetingAcceptApi = async (id, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, `/meeting/accept/${id}`);
		if (res.code === 10000) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//结束会议
export const getMeetingEndApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/meeting/end", data);
		if (res.code === 10000) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
//取消会议
export const deleteMeetingCancelApi = async (id, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, `/meeting/cancel/${id}`);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//会议文件上传
export const postFileUploadApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/meeting/file/upload", data);
		if (res.code === 10000) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//获取会议室位置列表 会议室位置（4）
export const getLocationApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/meeting/meetingroom/query-build", data);
		if (res.code === 10000) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//新增会议室位置
export const postLocationAddApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/meeting/meetingroom/add", data);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//修改会议室位置信息
export const putLocationModifyApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/meeting/meetingroom/room-info", data);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//删除会议室位置信息
export const deleteLocationApi = async (id, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, `/meeting/meetingroom/room-pos/${id}`);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//查询会议室列表 会议室（5）
export const getRoomApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/meeting/meetingroom/query-roomlist", data);
		if (res.data) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//新增会议室
export const postRoomAddApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.POST, "/meeting/meetingroom/query-build", data);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//会议室修改
export const putRoomModifyApi = async (data, success, fail) => {
	try {
		const res = await Request.requestJson(Request.PUT, "/meeting/meetingroom/modify", data);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//会议室选择列表
export const getRoomChooseApi = async (name, success, fail) => {
	try {
		const res = await Request.requestJson(Request.GET, "/meeting/meetingroom/info");
		if (res.data) {
			success(res.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
//会议室删除
export const deleteRoomApi = async (name, success, fail) => {
	try {
		const res = await Request.requestJson(Request.DELETE, `/meeting/meetingroom/delete/${name}`);
		if (res.code === 10000) {
			success();
		} else {
			fail(error);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
