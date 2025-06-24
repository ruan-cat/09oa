// @ts-check

/**
 * 业务名称分类 由组长对业务名称划分，并提供英文命名规范
 *
 * 暂时不考虑用 i18n 来配置。
 *
 * 暂时不考虑拆分移植该配置。
 *
 * @type { import("@ruan-cat/commitlint-config").ScopesItemWithDesc[] }
 */
const userScopes = [
	{
		code: "process",
		value: "流程应用管理",
		desc: "流程应用管理",
	},
	{
		code: "personal",
		value: "个人设置",
		desc: "个人设置",
	},
	{
		code: "login",
		value: "登录系统",
		desc: "登录系统",
	},
	{
		code: "information",
		value: "消息通知",
		desc: "消息通知",
	},
	{
		code: "schedule",
		value: "日程安排",
		desc: "日程安排",
	},
	{
		code: "system",
		value: "系统配置",
		desc: "系统配置",
	},
	{
		code: "layout",
		value: "导航栏组件",
		desc: "导航栏组件",
	},
	{
		code: "contentset",
		value: "内容管理设置",
		desc: "内容管理设置",
	},
	{
		code: "contentset-info-page",
		value: "内容管理设置",
		desc: "内容管理设置",
	},
	{
		code: "contentindex",
		value: "内容管理首页",
		desc: "内容管理首页",
	},
	{
		code: "organize",
		value: "组织管理",
		desc: "组织管理",
	},
	{
		code: "index",
		value: "系统首页",
		desc: "系统首页",
	},
	{
		code: "index",
		value: "系统首页",
		desc: "系统首页",
	},
	{
		code: "meeting",
		value: "会议管理",
		desc: "会议管理",
	},
	{
		code: "office",
		value: "办公中心",
		desc: "办公中心",
	},
	{
		code: "networkdisk",
		value: "企业网盘",
		desc: "企业网盘",
	},
];

module.exports = require("@ruan-cat/commitlint-config").getUserConfig({
	userScopes,
	config: {
		isPrintScopes: false,
	},
});
