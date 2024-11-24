import Request from "../request";
// 定义一个功能模块基础url，方便替换
const sysAndLogDataUrl = "/system-info";

export const apiGetFlowDataApi = async function fetchData(url) {
	try {
		// 确保 url 以 '/' 开头
		const formattedUrl = url.startsWith("/") ? url : `/${url}`;
		// 发送get请求
		const data = await Request.request(Request.GET, `${formattedUrl}`, null);
		console.log("API:Get 数据: ", data);
		return data;
	} catch (error) {
		console.error("API: Get :err: ", error);
	}
};
export const apiPutFlowDataApi = async function (data, url) {
	try {
		// 发送 PUT 请求
		const response = await Request.request(Request.PUT, `/system-info${formattedUrl}`, data);
		console.log("API: Put 数据: ", response);
		return response;
	} catch (error) {
		console.error("API: Put err: ", error);
		throw error;
	}
};
