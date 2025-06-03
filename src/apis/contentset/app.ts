import type { AppAddColumn } from "types/contentset/AppAddColumn";
import type { AppQueryConditionVo } from "types/contentset/AppQueryConditionVo";
import type { AppQueryOneColumnDto } from "types/contentset/AppQueryOneColumnDto";
import type { Column } from "types/contentset/Column";
import type { ColumnTypeDTO_Required } from "types/contentset/ColumnType";

import { useRequest } from "@/composables/use-request";

/**
 * 新建栏目接口参数
 */
export interface AddColumnParams {
	/** 是否所有人可发布 */
	xallPeoplePublish?: boolean;
	/** 是否所有人可见 */
	xallPeopleView?: boolean;
	/** 是否允许匿名 */
	xanonymousAble?: boolean;
	/** 栏目别名 */
	xappAlias?: string;
	/** 栏目图标，默认为空 */
	xappIcon?: string;
	/** 栏目排序 */
	xappInfoSeq?: string;
	/** 栏目备忘录 */
	xappMemo?: string;
	/** 栏目名称 */
	xappName?: string;
	/** 栏目类型 */
	xappType?: string;
	/** 栏目创建时间 */
	xcreateTime?: string;
	/** 栏目创建者身份 */
	xcreatorIdentity?: string;
	/** 栏目创建者 */
	xcreatorPerson?: string;
	/** 栏目创建者顶部单位名称 */
	xcreatorTopUnitName?: string;
	/** 栏目创建者单位名称 */
	xcreatorUnitName?: string;
	/** 默认编辑表单标识id */
	xdefaultEditForm?: string;
	/** 默认阅读表单标识id */
	xdefaultReadForm?: string;
	/** 栏目描述 */
	xdescription?: string;
	/** 栏目分布因子，默认为空 */
	xdistributeFactor?: number;
	/** 文档类型 */
	xdocumentType?: string;
	/** 栏目图标颜色，默认为空 */
	xiconColor?: string;
	/** 栏目唯一标识 */
	xid?: string;
	/** 是否发送通知 */
	xsendNotify?: boolean;
	/** 栏目序列号 */
	xsequence?: string;
	/** 是否显示所有文档视图 */
	xshowAllDocuments?: boolean;
	/** 栏目最近更新时间 */
	xupdateTime?: string;
	/** 文件上传 */
	file?: File;
}

/**
 * 新建栏目接口
 * @description
 * 创建新的栏目，支持文件上传和各种栏目配置参数
 */
export function addColumn<T = string>(options: UseAxiosOptionsJsonVO<T>) {
	return useRequest<ParamsBodyKey, T, AddColumnParams>({
		url: "/app/add-column",
		options,
		httpParamWay: "body",
		upType: UpType.file,
		config: {
			method: "POST",
			data: {},
		},
	});
}

/**
 * 更新栏目基础信息接口参数
 */
export interface UpdateColumnParams {
	/** 阅读表单 */
	readForm?: string[];
	/** 编辑表单 */
	writeForm?: string[];
	/** 栏目别名 */
	xappAlias?: string;
	/** 栏目图标 */
	xappIcon?: string;
	/** 栏目排序 */
	xappInfoSeq?: string;
	/** 栏目名称 */
	xappName?: string;
	/** 栏目类型 */
	xappType?: string;
	/** 栏目描述 */
	xdescription?: string;
	/** 编号 */
	xid?: string;
	/** 文件上传 */
	file?: File;
}

/**
 * 更新栏目基础信息接口
 * @description
 * 更新已存在栏目的基础信息，支持文件上传和表单配置
 */
export function updateColumnInfo<T = string>(options: UseAxiosOptionsJsonVO<T>) {
	return useRequest<ParamsBodyKey, T, UpdateColumnParams>({
		url: "/app/update-appinfo",
		options,
		httpParamWay: "body",
		upType: UpType.file,
		config: {
			method: "PUT",
			data: {},
		},
	});
}
