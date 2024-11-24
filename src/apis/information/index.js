import Request from "../request";
// 定义一个功能模块基础url，方便替换
//const currBaseUrl = "http://8.140.236.255:10700/msg-notification";
export const deleteMessageApi = async (xid, success, fail) => {
    try {
		const res = await Request.requestForm(Request.DELETE, "/msg-notification/delete", data);
        if (res.code === 10000) {
            success(res.data);
        } else {
            fail();
        }
    } catch (err) {
        console.warn(err);
        fail();
    }
};

export const clearMessagesApi = async (xIds, success, fail) => {
    try {
		const res = await Request.requestForm(Request.DELETE, "/msg-notification/delete/all/{xIds}");
        if (res.code === 10000) {
            success(res.data);
        } else {
            fail();
        }
    } catch (err) {
        console.warn(err);
        fail();
    }
};
export const modifyMessageStatusApi = async (data, success, fail) => {
    try {
		const res = await Request.requestForm(Request.PUT, "/msg-notification/modify-status", data);
        const { xid, xconsumed } = res.data || {};
        if (xid && xconsumed) {
            success(res.data.xconsumed);
        } else {
            fail();
        }
    } catch (err) {
        console.warn(err);
        fail();
    }
};
export const getUnreadMessagesApi = async (data, success, fail) => {
    try {
        const res = await Request.requestForm(Request.GET, "/msg-notification/unread", data);

        if (res.code === 10000) {
            success(res.data);
        } else {
            fail();
        }
    } catch (err) {
        console.warn(err);
        fail();
    }
};
