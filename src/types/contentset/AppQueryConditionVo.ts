/**
 * 根据条件查询栏目 qureyVo
 *
 * @description
 * /app/query-condition
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645939
 */
export interface AppQueryConditionVo {
	/**
	 * 查询页码
	 */
	pageIndex?: number;
	/**
	 * 查询条数
	 */
	pageSize?: number;
	/**
	 * 栏目别名
	 */
	xappAlias?: string;
	/**
	 * 栏目名称
	 */
	xappName?: string;
	/**
	 * 栏目类型
	 */
	xappType?: string;
	/**
	 * 栏目描述
	 */
	xdescription?: string;
}
