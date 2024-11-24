import { defineStore } from "pinia";

export const useOrganizeStore = defineStore("organize", () => {
	const selectRole = ref("");
	const selectRoleUniqueId = ref("");
	const selectPersonId = ref("");
	const rolePersonalMember = ref([
		{
			id: "512312",
			name: "张三",
			num: "123456",
			phone: "13800000000",
			email: "123456@qq.com",
		},
		{
			id: "512313",
			name: "李四",
			num: "123457",
			phone: "13800000001",
			email: "123457@qq.com",
		},
		{
			id: "512314",
			name: "王五",
			num: "123458",
			phone: "13800000002",
			email: "123458@qq.com",
		},
	]);
	const roleGroupMember = ref([
		{
			id: "512315",
			name: "群组1",
			fullName: "群组1-あ",
			description: "群组1描述",
		},
		{
			id: "512316",
			name: "群组2",
			fullName: "群组2-い",
			description: "群组2描述",
		},
	]);
	return {
		selectRole,
		selectRoleUniqueId,
		selectPersonId,
		rolePersonalMember,
		roleGroupMember,
	};
});
