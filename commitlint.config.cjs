// @ts-check

/**
 * 其他范围配置
 * @description
 * 该配置是为了提供更多的范围配置，以便于更好的管理提交范围。
 *
 * 这里罗列一些高频更改配置的文件，并定位为专门的提交范围。
 */
const otherScopesConfigs = [
	{
		businessEn: "config",
		businessCn: "各种配置文件",
	},
	{
		businessEn: "root",
		businessCn: "根目录",
	},
	{
		businessEn: "package.json",
		businessCn: "包配置",
	},
	{
		businessEn: "vite.config.js/ts",
		businessCn: "vite打包工具配置",
	},
	{
		businessEn: "commitlint.config.cjs",
		businessCn: "cz配置，即git提交工具的配置",
	},
	{
		businessEn: "tsconfig",
		businessCn: "typescript项目配置",
	},
	{
		businessEn: "router",
		businessCn: "路由配置",
	},
	{
		businessEn: "vscode/settings.json",
		businessCn: "vscode配置",
	},
];

/**
 * 业务名称分类 由组长对业务名称划分，并提供英文命名规范
 *
 * 暂时不考虑用 i18n 来配置。
 *
 * 暂时不考虑拆分移植该配置。
 */
const businessScopesConfigs = [
	{
		businessEn: "process",
		businessCn: "流程应用管理",
	},
	{
		businessEn: "personal",
		businessCn: "个人设置",
	},
	{
		businessEn: "login",
		businessCn: "登录系统",
	},
	{
		businessEn: "information",
		businessCn: "消息通知",
	},
	{
		businessEn: "schedule",
		businessCn: "日程安排",
	},
	{
		businessEn: "system",
		businessCn: "系统配置",
	},
	{
		businessEn: "layout",
		businessCn: "导航栏组件",
	},
	{
		businessEn: "contentset",
		businessCn: "内容管理设置",
	},
	{
		businessEn: "contentset-info-page内容管理详情页",
		businessCn: "内容管理详情页",
	},
	{
		businessEn: "contentindex",
		businessCn: "内容管理首页",
	},
	{
		businessEn: "organize",
		businessCn: "组织管理",
	},
	{
		businessEn: "index",
		businessCn: "系统首页",
	},
	{
		businessEn: "meeting",
		businessCn: "会议管理",
	},
	{
		businessEn: "office",
		businessCn: "办公中心",
	},
	{
		businessEn: "networkdisk",
		businessCn: "企业网盘",
	},
];

const scopesConfigs = [...otherScopesConfigs, ...businessScopesConfigs];

/** @type {import("cz-git").ScopesType} */
const userScopes = scopesConfigs.map((conf) => {
	return {
		name: `${conf.businessEn} | ${conf.businessCn}`,
		value: conf.businessEn,
	};
});

module.exports = require("@ruan-cat/commitlint-config").getUserConfig(userScopes);
