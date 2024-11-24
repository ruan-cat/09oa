/**
 * AppQueryOneColumnDto 栏目基础信息传输对象
 *
 * @description
 * 查询接口返回的栏目对象
 *
 * 后端返回的数据对象
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-231655646
 */
export interface AppQueryOneColumnDto {
	/**
	 * 阅读表单
	 */
	readForm?: string[];
	/**
	 * 编辑表单
	 */
	writeForm?: string[];
	/**
	 * 栏目别名
	 */
	xappAlias?: string;
	/**
	 * 栏目图标
	 */
	xappIcon?: string;
	/**
	 * 栏目排序
	 * @description
	 * 栏目排序 设计为字符串 前端传递数值类型的字符串即可
	 */
	xappInfoSeq?: `${number}`;
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
	/**
	 * 编号
	 */
	xid?: string;
}
