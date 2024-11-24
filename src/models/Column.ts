/**
 * 可点击的链接配置
 * @description
 * 用于描述一个可点击按钮、链接的基本信息
 *
 * - 前端展示的名称
 * - 路由地址
 * - 路由名称
 * - icon取值
 *
 * @deprecated 不需要这样的配置 无意义
 */

/**
 * @deprecated 不需要
 */

export interface ClickableLinkConfig {
	/** 可点击配置的id */
	id: string;

	/** 用于前端显示的按钮名称、或链接名称 */
	name: string;

	/** 路由地址 */
	url?: string;

	/** 路由名称 */
	routeName?: string;

	/** icon取值 */
	icon?: string;
}

/**
 * 栏目信息
 *
 * @author 阮喵喵
 *
 * 内容管理设置内 每一个栏目所展示的信息
 *
 * TODO: 对接口 实现有意义的栏目信息展示
 */

export interface Column {
	/** 栏目id */
	id: string;

	/** 栏目标题 */
	title: string;

	/** 栏目描述 */
	desc: string;

	/** 标题分类 */
	classify: ClickableLinkConfig[];

	/** 表单链接 */
	form: ClickableLinkConfig[];
}
