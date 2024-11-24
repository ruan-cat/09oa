/**
 * 栏目类型对象
 *
 * @description
 * /app/query-all-type
 *
 * 导航栏的栏目类型。这里显示出全部栏目的名称，和可用的栏目数目。
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645938
 */
export interface ColumnType {
	/**
	 * 该类型的栏目个数
	 */
	xappCount?: number;

	/**
	 * 栏目类型
	 */
	xappType?: string;
}

/**
 * 栏目类型对象
 * @description
 *
 * 全部字段必填的 默认认定为dto，全部字段都有
 *
 * 作为全部的数据
 *
 * /app/query-all-type
 *
 * 导航栏的栏目类型。这里显示出全部栏目的名称，和可用的栏目数目。
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645938
 */
export type ColumnTypeDTO_Required = Required<ColumnType>;
