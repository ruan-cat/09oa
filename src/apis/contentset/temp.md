```ts
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
```
