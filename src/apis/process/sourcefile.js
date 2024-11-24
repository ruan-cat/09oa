// 资源文件api
// 获取附件列表
export const getSourceFileListApi = async (data, success, fail) => {
	try {
		// 发送请求
		const res = await Request.requestJson(Request.GET, `/process-app-manager/attahcment/query-list`, data);
		// 解构响应数据
		if (res.data) {
			success(res.data);
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
