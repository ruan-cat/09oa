import type { PpCTaskcompletedDTO } from "types/office/PpCTaskcompletedDTO";

/**
 * queryAllProcess接口 xxx
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
// export const queryAllProcessApi = async (data, success, fail) => {
// 	try {
// 		const res = await Request.requestJson(Request.GET, `...`, data);
// 		if (res.code === 10000) {
// 			success(res.data);
// 		} else {
// 			fail();
// 		}
// 	} catch (err) {
// 		console.warn(err);
// 		fail();
// 	}
// };

/**
 * countTaskApi接口 分类统计事项总数
 * @param data 数据
 * @param success 成功回调
 * @param fail 失败回调
 */
// export const countTaskApi = async (data, success, fail) => {
// 	try {
// 		const testData = {
// 			id: 1,
// 		};
// 		const res = await Request.requestJson(
// 			Request.POST,
// 			`/bizcenter/count-task/query/get/select?id=1`,
// 			JSON.stringify(testData),
// 		);
// 		if (res.code === 10000) {
// 			success(res.data);
// 		} else {
// 			fail();
// 		}
// 	} catch (err) {
// 		console.warn(err);
// 		fail();
// 	}
// };

// TODO: 等待对接该接口
/**
 * 获取流程列表-已办
 * @description
 * /bizcenter/query-all-process/taskcompleted
 *
 * 传参为params
 *
 * @see http://8.154.26.37:10009/doc.html#/bizcenter/获取流程列表/selectTaskcompletedListByPersonUsingPOST
 */
export function taskcompletedApi<T = PageDTO<PpCTaskcompletedDTO>>(options: UseAxiosOptionsJsonVO) {
	return requestFormUseAxios<T, "params">({
		config: {
			url: "/bizcenter/query-all-process/taskcompleted",
			method: "POST",
			data: {},
		},
		options,
	});
}
