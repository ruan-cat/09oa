/**
 * ColumnFormDTO，CMS表单传输数据对象
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-229939068
 */
export interface ColumnFormDTO {
	/**
	 * 别名
	 */
	xalias?: string;
	/**
	 * 应用ID
	 */
	xappId?: string;
	/**
	 * 创建时间
	 */
	xcreateTime?: Date;
	/**
	 * 表单数据
	 */
	xdata?: string;
	/**
	 * 描述信息
	 */
	xdescription?: string;
	/**
	 * 分发因子
	 */
	xdistributeFactor?: number;
	/**
	 * 编辑者
	 */
	xeditor?: string;
	/**
	 * 是否有移动端版本
	 */
	xhasMobile?: boolean;
	/**
	 * 表单唯一标识符
	 */
	xid?: string;
	/**
	 * 移动端数据
	 */
	xmobileData?: string;
	/**
	 * 表单名称
	 */
	xname?: string;
	/**
	 * 属性信息
	 */
	xproperties?: string;
	/**
	 * 表单序列号
	 */
	xsequence?: string;
	/**
	 * 更新时间
	 */
	xupdateTime?: Date;
}
