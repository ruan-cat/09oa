/**
 * 栏目对象
 */
export interface Column {
	/**
	 * 栏目唯一编号
	 * @description
	 * 栏目id是必定存在的内容
	 */
	xid: string;

	/**
	 * 栏目别名
	 */
	xappAlias?: string;
	/**
	 * 栏目图片二进制资源
	 */
	xappIcon?: string;
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
	 * 编辑表单类型名称
	 */
	xeditName?: string;

	/**
	 * 阅读表单类型名称
	 */
	xpublishName?: string;
}

/**
 * 栏目 columns 组件的 props 类型
 * @description
 * 辅助类型
 *
 * vue无法直接传递一个数组，要传递一个对象
 */
export interface ColumnsProps {
	/** 栏目信息数组 */
	columns: Column[];
}
