import Request from "@/apis/request";

// 定义一个功能模块基础url，方便替换
const currBaseUrl = "/captcha";

//获取验证图片以及token
export function reqGet(data) {
	return Request.requestJson(Request.POST, currBaseUrl + "/get", data, {});
}

//滑动或者点选验证
export function reqCheck(data) {
	return Request.requestJson(Request.POST, currBaseUrl + "/check", data, {});
}
