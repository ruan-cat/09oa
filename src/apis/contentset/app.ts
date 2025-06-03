/**
 * @author f1-阮喵喵
 * @description
 * 本文件不使用预设的接口请求工具
 */
import type { AppAddColumn } from "types/contentset/AppAddColumn";
import type { AppQueryConditionVo } from "types/contentset/AppQueryConditionVo";
import type { AppQueryOneColumnDto } from "types/contentset/AppQueryOneColumnDto";
import type { Column } from "types/contentset/Column";
import type { ColumnTypeDTO_Required } from "types/contentset/ColumnType";

/**
 * 新建栏目
 * @description
 * 传参传递data
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645937
 */
export function addColumnApi<T = AppAddColumn>(options?: UseAxiosOptionsJsonVO<T>) {
	return postUseAxios<T>({
		config: {
			url: "/app/add-column",
		},
		options,
	});
}

/**
 * 更新栏目基础信息
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645942
 */
export function updateAppinfoApi<T = AppAddColumn>(data: T) {
	return putUseAxios<T>({
		config: { url: "/app/update-appinfo", data },
	});
}

/**
 * 根据条件查询栏目
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645939
 */
export function queryConditionApi<T = PageDTO<Column>>(options?: UseAxiosOptionsJsonVO<T>) {
	return getUseAxios<T>({
		config: { url: "/app/query-condition", params: <AppQueryConditionVo>{} },
		options,
	});
}

/**
 * 查询所有的栏目类型
 * @description
 * /app/query-all-type
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645938
 */
export function appQueryAllTypeApi<T = ColumnTypeDTO_Required[]>(options?: UseAxiosOptionsJsonVO<T>) {
	return getUseAxios<T>({
		config: {
			url: "/app/query-all-type",
			params: {},
		},
		options,
	});
}

/**
 * 查询栏目基础信息
 * @description
 * /app/query-one
 *
 * 根据栏目id，查询栏目的基础信息
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-231655646
 * @see http://121.40.172.83:10031/doc.html#/basicinformation/栏目基础信息管理/queryBasicinformationUsingGET
 */
export function appQueryOneApi<T = AppQueryOneColumnDto>(options: UseAxiosOptionsJsonVO<T>) {
	return getUseAxios<T>({
		config: {
			url: "/app/query-one",
			params: <{ xid: string }>{ xid: "" },
		},
		options,
	});
}
