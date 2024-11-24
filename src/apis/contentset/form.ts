import type { UseAxiosOptionsJsonVO } from "tools/request-with-useAxios";

import type { PageDTO } from "types/index";

import type { ColumnFormDTO } from "types/contentset/ColumnFormDTO";
import type { ColumnFormVO } from "types/contentset/ColumnFormVO";

/**
 * 添加栏目表单
 * @description
 * /form/add-form
 *
 * 传参为data
 *
 * TODO: 等待对接
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-229939068
 */
export function formAddFormApi<T = ColumnFormDTO>(options: UseAxiosOptionsJsonVO<T>) {
	return postUseAxios<T>({
		config: {
			url: "/form/add-form",
		},
		options,
	});
}

/**
 * 获取栏目表单列表
 * @description
 * /form/query-all/{id}
 *
 * 属于path路径传参 传参要传递path
 *
 * 返回值是不带分页对象的 是直接返回对象数组
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-229939070
 */
export function formQueryAllApi<T = ColumnFormVO[]>(options: UseAxiosOptionsJsonVO<T>) {
	return getUseAxios<T, "url">({
		/**
		 * FIXME: 这里仍然需要传递url，否则 useAxios 函数就会使用错误的axios示例来请求，
		 *
		 * 导致反向代理地址不正确
		 *
		 * 必须提供完整的参数，才能让 useAxios 函数使用正确函数重载
		 */
		config: {
			url: "/form/query-all/{id}",
		},
		options,
	});
}
