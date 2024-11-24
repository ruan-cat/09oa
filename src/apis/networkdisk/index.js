import Request from "../request";
import qs from "qs";

// 定义一个功能模块基础url，方便替换
const currBaseUrl = "/companynetdisk";
/**
 * 定义添加目录的响应接口
 * @typedef {{ code: number, message: string, data: object }} ApiResponse
 */

/**
 * 定义 User 接口
 * @typedef {{ xid: string, name: string, size: string, data: string }} User
 */

/**
 * 定义分页数据接口
 * @typedef {{ pageIndex: number, pageSize: number, total: number, pages: number, rows: User[] }} PaginationData
 */

/**
 * 查询文件列表
 * @param {object} data - 请求数据
 * @param {function(PaginationData)} success - 成功回调函数
 * @param {function(string)} fail - 失败回调函数
 */
export const companynetdiskfolderquery = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.GET, `/companynetdisk/folder-query`);
		if (response.code === 10000) {
			success(response.data);
		} else {
			fail(response.message || "查询失败");
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error.message || "网络请求失败");
	}
};

/**
 * 添加目录
 * @param {object} data - 请求数据
 * @param {function(User)} success - 成功回调函数
 * @param {function(string)} fail - 失败回调函数
 */
export const MyfilePostfileInfo = async (data, success, fail) => {
	try {
		console.log("Sending data:", data); // 打印发送的数据
		// 发送上传请求
		const response = await Request.requestJson(Request.POST, "/companynetdisk/folder-add", data);
		console.log("Response:", response); // 打印响应数据
		if (response.code === 10000) {
			// 将响应数据转换为 User 类型
			success(response.data);
		} else {
			fail(error);
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error);
	}
};
//删除文件
export const myfileDelete = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.DELETE, `/companynetdisk/myfile-delete/${data}`);
		if (response.code === 10000) {
			success(response.data);
		} else {
			fail(error);
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
//下载
export const myfileDownload = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.GET, `/companynetdisk/myfile-download/${data}`);
		if (response.code === 10000) {
			success(response.data);
		} else {
			fail(new Error(response.message || "下载失败"));
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error);
	}
};
//上传
export const myfileUpload = async (formData, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestForm(Request.POST, "/companynetdisk/myfile-upload", formData);
		if (response.code === 10000) {
			console.log("文件上传成功:", response.data);
			success(response.data);
		} else {
			console.error("文件上传失败:", response.message || "未知错误");
			fail(new Error(response.message || "未知错误"));
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error);
	}
};
//共享
export const ShareFiles = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.POST, "/companynetdisk/myfile-sharefiles", data);
		if (response.code === 10000) {
			success(response.data);
		} else {
			fail(error);
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error);
	}
};
//获取接收文件列表
export const queryfilelistfiled = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.GET, "/companynetdisk/query-filelist-filed", {
			params: data,
		});
		if (response.data.code === 10000) {
			return response.data.data;
		} else {
			console.error("获取返回错误：", response.data.message);
			return null;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
//获取共享文件列表
export const queryfilelistbyfileid = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.GET, "/companynetdisk/query-filelist-by-fileid", {
			params: data,
		});
		if (response.data.code === 10000) {
			return response.data.data;
		} else {
			console.error("获取返回错误：", response.data.message);
			return null;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
//重命名目录
export const modifyfilefolder = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.PUT, "/companynetdisk/modify-file", data);
		if (response.code === 10000) {
			success(response.data);
		} else {
			fail(error);
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error);
	}
};
//重命名文件
export const modifyfileattachment = async (data, success, fail) => {
	try {
		// 发送上传请求
		const response = await Request.requestJson(Request.PUT, "/companynetdisk/modify-file", data);
		if (response.code === 10000) {
			success(response.data);
		} else {
			fail(error);
		}
	} catch (error) {
		// 打印错误信息
		console.error(error);
		// 执行失败回调
		fail(error);
	}
};
