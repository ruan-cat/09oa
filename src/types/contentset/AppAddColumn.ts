import type { RequiredPick } from "type-plus";

/**
 * 新建栏目
 * @description
 * /app/add-column
 *
 * @see https://app.apifox.com/link/project/5341789/apis/api-226645937
 */
export interface AppAddColumn {
	/**
	 * 栏目名称
	 *
	 * @description
	 * 在新增业务内 栏目名称是必填的 必须填写栏目名称
	 */
	xappName: string;

	/**
	 * 是否所有人可发布
	 */
	xallPeoplePublish?: boolean;
	/**
	 * 是否所有人可见
	 */
	xallPeopleView?: boolean;
	/**
	 * 是否允许匿名
	 */
	xanonymousAble?: boolean;
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
	 */
	xappInfoSeq?: string;
	/**
	 * 栏目备忘录
	 */
	xappMemo?: string;

	/**
	 * 栏目类型
	 */
	xappType?: string;
	/**
	 * 栏目创建时间
	 */
	xcreateTime?: Date;
	/**
	 * 栏目创建者身份
	 */
	xcreatorIdentity?: string;
	/**
	 * 栏目创建者
	 */
	xcreatorPerson?: string;
	/**
	 * 栏目创建者顶部单位名称
	 */
	xcreatorTopUnitName?: string;
	/**
	 * 栏目创建者单位名称
	 */
	xcreatorUnitName?: string;
	/**
	 * 默认编辑表单标识
	 */
	xdefaultEditForm?: string;
	/**
	 * 默认阅读表单标识
	 */
	xdefaultReadForm?: string;
	/**
	 * 栏目描述
	 */
	xdescription?: string;
	/**
	 * 栏目分布因子
	 */
	xdistributeFactor?: number;
	/**
	 * 文档类型
	 */
	xdocumentType?: string;
	/**
	 * 栏目图标颜色
	 */
	xiconColor?: string;
	/**
	 * 栏目唯一标识
	 */
	xid?: string;
	/**
	 * 是否发送通知
	 */
	xsendNotify?: boolean;
	/**
	 * 栏目序列号
	 */
	xsequence?: string;
	/**
	 * 是否显示所有文档视图
	 */
	xshowAllDocuments?: boolean;
	/**
	 * 栏目最近更新时间
	 */
	xupdateTime?: Date;
}

/**
 * 新建栏目
 * @description
 * 以表单形式存在的栏目对象
 *
 * 提供了少数几个必填项字段
 */
export type AppAddColumnForm = RequiredPick<AppAddColumn, "xappName">;
