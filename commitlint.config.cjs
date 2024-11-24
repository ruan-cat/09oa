// @ts-check
/**
 * @description
 * 这个配置文件不能使用ts格式 ts不被支持
 *
 * @see https://cz-git.qbb.sh/zh/config/#中英文对照模板
 * @see https://cz-git.qbb.sh/zh/recipes/#
 */

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
const scopes = scopesConfigs.map((conf) => {
	return {
		name: `${conf.businessEn} | ${conf.businessCn}`,
		value: conf.businessEn,
	};
});

// .commitlintrc.js
/** @type {import("cz-git").UserConfig} */
module.exports = {
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
	},
	prompt: {
		alias: { fd: "docs: fix typos" },

		messages: {
			type: "选择你要提交的类型 :",
			scope: "选择一个提交范围（可选）:",
			customScope: "请输入自定义的提交范围 :",
			subject: "填写简短精炼的变更描述 :\n",
			body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			footerPrefixesSelect: "选择关联issue前缀（可选）:",
			customFooterPrefix: "输入自定义issue前缀 :",
			footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
			confirmCommit: "是否提交或修改commit ?",
		},

		/** 提交范围域 */
		scopes,

		// https://cz-git.qbb.sh/zh/recipes/#多选模式
		enableMultipleScopes: true,
		scopeEnumSeparator: ",",

		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: "bottom",
		customScopesAlias: "custom",
		emptyScopesAlias: "empty",

		types: [
			{ value: "✨ feat", name: "✨ feat:     新增功能 | A new feature" },
			{ value: "🐞 fix", name: "🐞 fix:      修复缺陷 | A bug fix" },
			{ value: "📃 docs", name: "📃 docs:     文档更新 | Documentation only changes" },
			{ value: "🌈 style", name: "🌈 style:    代码格式 | Changes that do not affect the meaning of the code" },
			{
				value: "🦄 refactor",
				name: "🦄 refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature",
			},
			{ value: "🎈 perf", name: "🎈 perf:     性能提升 | A code change that improves performance" },
			{ value: "🧪 test", name: "🧪 test:     测试相关 | Adding missing tests or correcting existing tests" },
			{
				value: "🔧 build",
				name: "🔧 build:    构建相关 | Changes that affect the build system or external dependencies",
			},
			{ value: "🐎 ci", name: "🐎 ci:       持续集成 | Changes to our CI configuration files and scripts" },
			{ value: "🎉 init", name: "🎉 init:     初始化 | 项目初始化。" },
			{ value: "↩ revert", name: "↩ revert:   回退代码 | Revert to a commit" },
			{ value: "🐳 chore", name: "🐳 chore:    其他修改 | Other changes that do not modify src or test files" },
			{
				value: "🤔 save-file",
				name: "🤔 save-file:    保存文件 | 文件保存类型。仅仅是为了保存文件。有时候会需要紧急提交，并快速切换分支。此时就需要提交代码。并保存文件。",
			},
			{ value: "⚙️ config", name: "⚙️ config:    更新配置 | 配置更新。通用性的配置更新。" },
			{ value: "✋ main-pull-update", name: "✋ main-pull-update:    主分支拉取更新 | 主分支拉取更新。" },
			{ value: "🗑 del", name: "🗑 del:    删除垃圾 | 删除无意义的东西，注释，文件，代码段等。" },
			{ value: "⏩ mark-progress", name: "⏩ mark-progress:    标记进度 | 标记进度。" },
		],
		useEmoji: true,
		emojiAlign: "center",
		useAI: false,
		aiNumber: 1,
		themeColorCode: "",

		upperCaseSubject: false,
		markBreakingChangeMode: false,
		allowBreakingChanges: ["feat", "fix"],
		breaklineNumber: 100,
		breaklineChar: "|",
		skipQuestions: [],
		issuePrefixes: [
			// 如果使用 gitee 作为开发管理
			{ value: "link", name: "link:     链接 ISSUES 进行中" },
			{ value: "closed", name: "closed:   标记 ISSUES 已完成" },
		],
		customIssuePrefixAlign: "top",
		emptyIssuePrefixAlias: "skip",
		customIssuePrefixAlias: "custom",
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		scopeOverrides: undefined,
		defaultBody: "",
		defaultIssues: "",
		defaultScope: "",
		defaultSubject: "",
	},
};
