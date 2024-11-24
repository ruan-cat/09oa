const data = [
	{
		label: "兰德网络",
		children: [
			{
				label: "公司领导",
				children: [],
				data: {
					title: "公司领导",
					code: "vxvdvsv",
					category: "1111",
					simple: "vsfsefsf",
					desc: "fsefsefsefs",
					admin: "fsfsef",
					leader: "fsefse",
					num: 2,
				},
			},
			{
				label: "人力行政部",
				children: [],
				data: {
					title: "人力行政部",
					code: "vxvdvsv",
					category: "1111",
					simple: "efsfsefs",
					desc: "fsefsefsef",
					admin: "fsfsef",
					leader: "segsef",
					num: 2,
				},
			},
			{
				label: "战略发展部",
				children: [],
				data: {
					title: "战略发展部",
					code: "vxvdvsv",
					category: "1111",
					simple: "fsegsefgse",
					desc: "segsegsegse",
					admin: "fsfsef",
					leader: "czdvazsdfv",
					num: 2,
				},
			},
			{
				label: "商务支持部",
				children: [],
				data: {
					title: "商务支持部",
					code: "vxvdvsv",
					category: "1111",
					simple: "segsegfsefg",
					desc: "segsegsefgs",
					admin: "fsfsef",
					leader: "sgsegseg",
					num: 2,
				},
			},
			{
				label: "财务部",
				children: [],
				data: {
					title: "财务部",
					code: "vxvdvsv",
					category: "1111",
					simple: "sefsefgsefs",
					desc: "segsegaesfgs",
					admin: "fsfsef",
					leader: "fsegsegseg",
					num: 2,
				},
			},
			{
				label: "研发部",
				children: [],
				data: {
					title: "研发部",
					code: "vxvdvsv",
					category: "1111",
					simple: "segsegseagse",
					desc: "segsegaseagserg",
					admin: "fsfsef",
					leader: "sfgsegseg",
					num: 2,
				},
			},
			{
				label: "办公室",
				children: [],
				data: {
					title: "办公室",
					code: "vxvdvsv",
					category: "1111",
					simple: "fsegsegseg",
					desc: "sgsrgwesgseg",
					admin: "fsfsef",
					leader: "segsegsegseg",
					num: 2,
				},
			},
		],
		data: {
			title: "兰德网络",
			code: "vxvdvsv",
			category: "1111",
			simple: "fsegseg",
			desc: "segsegsegsegf",
			admin: "fsfsef",
			leader: "fsefse",
			num: 1,
		},
	},
];

const sidebars = [
	{
		id: 1,
		name: "组织架构",
		icon: "https://sample.o2oa.net/x_component_Org/$Main/default/icon/org32.png",
	},
	{
		id: 2,
		name: "群组管理",
		icon: "https://sample.o2oa.net/x_component_Org/$Main/default/icon/group32.png",
	},
	{
		id: 3,
		name: "角色管理",
		icon: "https://sample.o2oa.net/x_component_Org/$Main/default/icon/role32.png",
	},
	{
		id: 4,
		name: "个人管理",
		icon: "https://sample.o2oa.net/x_component_Org/$Main/default/icon/person32.png",
	},
	{
		id: 5,
		name: "资源管理",
		icon: "https://sample.o2oa.net/x_component_Org/$Main/default/icon/org32.png",
	},
	{
		id: 6,
		name: "角色导入",
		icon: "https://sample.o2oa.net/x_component_Org/$Main/default/icon/xls32.png",
	},
];

const rulesValue = {
	title: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
	code: [{ required: true, message: "请输入组织编号", trigger: "blur" }],
	simple: [{ required: true, message: "请输入组织简称", trigger: "blur" }],
	desc: [{ required: true, message: "请输入组织描述", trigger: "blur" }],
	admin: [{ required: true, message: "请输入管理员名称", trigger: "blur" }],
	leader: [{ required: true, message: "请输入上级组织", trigger: "blur" }],
	num: [{ required: true, message: "请输入排序值", trigger: "blur" }],
	category: [{ required: true, message: "请选择组织类型", trigger: "blur" }],
};

const rulesMenuValue = {
	menu_name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
	menu_type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
	permission: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
	level: [{ required: true, message: "请输入菜单层级", trigger: "blur" }],
	status: [{ required: true, message: "请选择菜单状态", trigger: "blur" }],
	link_url: [{ required: true, message: "请输入菜单链接", trigger: "blur" }],
	remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
	creator_id: [{ required: true, message: "请输入创建人", trigger: "blur" }],
	updater_id: [{ required: true, message: "请输入修改人", trigger: "blur" }],
	is_button: [
		{
			type: "boolean",
			required: true,
			message: "请选择是否为按钮",
			trigger: "blur",
		},
	],
};
const UserInformation = [
	{
		key: 1,
		label: "系统管理员",
		p_code: 6783265736,
		phone_number: 15678945612,
		email: "3188606474@qq.com",
		sortValue: 1535352,
	},
	{
		key: 2,
		label: "普通用户1",
		p_code: 6783265736,
		phone_number: 15678945612,
		email: "3188606474@qq.com",
		sortValue: 1535352,
	},
	{
		key: 3,
		label: "管理员1",
		p_code: 6783265736,
		phone_number: 15678945612,
		email: "3188606474@qq.com",
		sortValue: 1535352,
	},
	{
		key: 4,
		label: "普通用户2",
		p_code: 6783265736,
		phone_number: 15678945612,
		email: "3188606474@qq.com",
		sortValue: 1535352,
	},
	{
		key: 5,
		label: "管理员2",
		p_code: 6783265736,
		phone_number: 15678945612,
		email: "3188606474@qq.com",
		sortValue: 1535352,
	},
];

export { data, sidebars, rulesValue, UserInformation, rulesMenuValue };
