<template>
	<!-- 用户界面主容器 -->
	<div class="user-container">
		<!-- 用户基本信息区域：头像和用户名称 -->
		<div style="display: flex; align-items: center; justify-content: center; margin-top: 1vh">
			<!-- 用户头像 -->
			<div style="margin-right: 50px">
				<el-avatar :size="50" :src="circleUrl" />
			</div>
			<!-- 用户名称和角色信息 -->
			<div>
				<div>{{ information.name }}</div>
				<div>{{ information.fullName }}</div>
			</div>
		</div>
		<div>
			<!-- 顶部导航菜单：用于切换不同的信息展示页面 -->
			<el-menu
				:default-active="activeIndex"
				class="el-menu"
				mode="horizontal"
				style="display: flex; justify-content: center; margin-top: 1vh"
				@select="handleSelect"
			>
				<el-menu-item index="1">角色信息</el-menu-item>
				<el-menu-item index="2">个人成员</el-menu-item>
				<el-menu-item index="3">群组成员</el-menu-item>
			</el-menu>
			<!-- 角色信息表单区域 -->
			<template v-if="activeIndex === '1'">
				<el-descriptions class="margin-top" :column="2" size="large">
					<!-- 角色名称输入框 -->
					<el-descriptions-item label="角色名称:">
						<el-input
							v-model="information.name"
							style="width: 240px"
							placeholder="information.Name"
							:disabled="isEdit"
						/>
					</el-descriptions-item>
					<!-- 角色描述输入框 -->
					<el-descriptions-item label="角色描述:">
						<el-input
							v-model="information.refer"
							style="width: 240px"
							placeholder="information.Description"
							:disabled="isEdit"
						/>
					</el-descriptions-item>
					<!-- 角色编码输入框 -->
					<el-descriptions-item label="角色编码:">
						<el-input v-model="information.key" style="width: 74vh" placeholder="information.key" :disabled="isEdit" />
					</el-descriptions-item>
				</el-descriptions>
				<!-- 编辑/保存按钮 -->
				<div style="width: 100%" class="margin-btn">
					<el-button type="info" plain @click="handleEdit()">{{ isEdit ? "编辑信息" : "保存信息" }}</el-button>
				</div>
			</template>
			<!-- 个人成员列表区域 -->
			<template v-if="activeIndex === '2'">
				<el-table :data="person" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="name" label="人员名称" width="180" />
					<el-table-column prop="employee" label="人员工号" width="180" />
					<el-table-column prop="phone" label="手机号码" width="180" />
					<el-table-column prop="mailbox" label="电子邮件" width="180" />
					<!-- 操作按钮列 -->
					<el-table-column align="right">
						<template #header>
							<el-button size="small" @click="handleAdd()">添加</el-button>
							<el-button size="small" type="danger" @click="handleDelete()">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 群组成员列表区域 -->
			<template v-if="activeIndex === '3'">
				<el-table :data="group" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="groupname" label="群组名称" width="180" />
					<el-table-column prop="groupnameA" label="群组全称" width="180" />
					<el-table-column prop="groupdes" label="群组描述" />
					<!-- 操作按钮列 -->
					<el-table-column align="right">
						<template #header>
							<el-button size="small" @click="handleAdd()">添加</el-button>
							<el-button size="small" type="danger" @click="handleDelete()">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 成员选择对话框 -->
			<PeopleTree ref="peopleTreeRef" title="选择成员" @save="handleSaveSelection" :rolesTree="tree" />
		</div>
		<div class="user-container-bottom">
			<div>用户的全称为：{{ information.fullName }}</div>
			<div>用户创建于：{{ information.startTime }}, 用户更新于：{{ information.endTime }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { reactive, toRefs } from "vue";
import "@/apis/organize/Role";
import PeopleTree from "@/components/main/public/PeopleTree.vue";
import { useOrganizeStore } from "@/stores/organize/role";
import { queryPersonListApi as getPersonApi } from "@/apis/organize/person";

const tree = ref<any[]>([]);
// pinia
const organizeStore = useOrganizeStore();
// 定义响应式状态
const state = reactive({
	circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const { circleUrl } = toRefs(state);

// 当前激活的菜单项索引
const activeIndex = ref("1");

// 角色信息对象
const information = ref({
	name: "",
	key: "",
	refer: "",
	fullName: "",
	startTime: "",
	endTime: "",
});

// 添加类型定义
interface PersonItem {
	name: string;
	employee: string;
	phone: string;
	mailbox: string;
	id: string;
}

interface GroupItem {
	groupname: string;
	groupnameA: string;
	groupdes: string;
	id: string;
}

// 修改数据定义，添加类型
const person = ref<PersonItem[]>([]);
const group = ref<GroupItem[]>([]);

// 控制编辑状态
const isEdit = ref(true);

// 存储表格选中的行
const multipleSelection: any = ref([]);

// 组件挂载时执行的函数
onMounted(async () => {
	await getPersonList();
	await getGroupList();
	await getRoleList();
});

// 获取个人成员列表
const getPersonList = async () => {
	const data = {
		pageIndex: 1,
		pageSize: 10,
		xunique: organizeStore.selectRoleUniqueId,
	};
	try {
		await queryPersonListApi(
			data,
			(response: any) => {
				person.value = response.rows;
			},
			() => {
				ElMessage.error("哎呀，出错了。");
			},
		);
	} catch (error) {
		ElMessage.error("Error to get list!");
	}
};

// 获取群组成员列表
const getGroupList = async () => {
	const data = {
		pageIndex: 1,
		pageSize: 10,
		ROLE_XID: organizeStore.selectRole,
	};
	try {
		await queryGroupListApi(
			data,
			(response: any) => {
				group.value = response.rows.map((item: any) => ({
					groupname: item.xname,
					groupnameA: item.xdistinguishedName,
					groupdes: item.xdescription,
					id: item.xgroupList,
				}));
			},
			() => {
				ElMessage.error("哎呀，出错了。");
			},
		);
	} catch (error) {
		ElMessage.error("Error to get list!");
	}
};
// 获取角色信息
const getRoleList = async () => {
	try {
		const data = {
			id: organizeStore.selectRoleUniqueId,
		};
		await getRoleInformationApi(
			data,
			(response: any) => {
				information.value = response;
			},
			() => {
				ElMessage.error("未能获取角色信息");
			},
		);
	} catch (error) {
		ElMessage.error("未能获取角色信息");
	}
};

// 理菜单选择
const handleSelect = (key: string) => {
	activeIndex.value = key;
};

// 处理添加成员
const handleAdd = async () => {
	peopleTreeRef.value?.showDialog();
	if (activeIndex.value === "2") {
		await getPersonApi(
			{
				pageIndex: 1,
				pageSize: 10,
			},
			(response: any) => {
				if (response) {
					tree.value = response.rows.map((item: any) => ({
						label: item.xname,
						id: item.xid,
						phone: item.xmobile,
					}));
				} else {
					ElMessage.error("未能获取人员名称列表");
				}
			},
			() => {
				ElMessage.error("未能获取人员名称列表");
			},
		);
	} else if (activeIndex.value === "3") {
		await getAllGroupMemberApi(
			{
				pageIndex: 1,
				pageSize: 10,
			},
			(response: any) => {
				if (response) {
					tree.value = response.rows.map((item: any) => ({
						label: item.name,
						id: item.id,
						description: item.describe,
					}));
				} else {
					ElMessage.error("未能获取人员名称列表");
				}
			},
			() => {
				ElMessage.error("未能获取人员名称列表");
			},
		);
	}
};

// 处理表格选择变化
const handleSelectionChange = (val: any) => {
	multipleSelection.value = val;
};

// 处理删除成员
const handleDelete = () => {
	if (multipleSelection.value.length === 0) {
		ElMessage.warning("请选择要删除的数据");
		return;
	}

	ElMessageBox.confirm("确认删除选中的数据吗?", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(async () => {
			try {
				if (activeIndex.value === "2") {
					const data = {
						xpersonList: multipleSelection.value.map((item: any) => item.xpersonList),
						role_xid: organizeStore.selectRole,
					};
					// 删除个人成员
					await deletePersonApi(
						data,
						async () => {
							ElMessage.success("删除成功");
							// 重新获取个人成员列表
							await getPersonList();
						},
						() => {
							ElMessage.error("删除失败");
						},
					);
				} else if (activeIndex.value === "3") {
					const data = {
						idList: multipleSelection.value.map((item: any) => item.id),
						roleId: organizeStore.selectRole,
					};
					// 删除群组成员
					await deleteGroupMemberApi(
						data,
						async () => {
							ElMessage.success("删除成功");
							// 重新获取群组列表
							await getGroupList();
						},
						() => {
							ElMessage.error("删除失败");
						},
					);
				}
			} catch (error) {
				ElMessage.error("删除操作失败");
			}
		})
		.catch(() => {
			// 取消删除操作
		});
};

// 处理编辑状态切换
const handleEdit = async () => {
	if (isEdit.value === false) {
		await changeRoleInformationApi(
			information.value,
			() => {
				ElMessage.success("修改成功");
			},
			() => {
				ElMessage.error("修改失败");
			},
		);
	}
	isEdit.value = !isEdit.value;
};

// 添加处理保存选择的方法
const handleSaveSelection = async (selectedRoles: any[]) => {
	if (activeIndex.value === "2") {
		// 处理个人成员，转换数据格式
		const newPersons = selectedRoles.map((role) => ({
			name: role.label,
			employee: role.num,
			phone: role.phone,
			mailbox: role.email,
			id: role.id,
		}));
		const data = {
			xpersonList: newPersons.map((item) => item.id),
			role_xid: organizeStore.selectRole,
		};
		// 添加个人成员
		await addPersonApi(
			data,
			async () => {
				ElMessage.success("添加成功");
				await getPersonList();
			},
			() => {
				ElMessage.error("添加失败");
			},
		);
	} else if (activeIndex.value === "3") {
		// 处理群组成员，转换数据格式
		const newGroups = selectedRoles.map((role) => ({
			groupname: role.label,
			groupnameA: role.fullName,
			groupdes: role.description,
			id: role.id,
		}));
		const data = {
			idList: newGroups.map((item) => item.id),
			roleId: organizeStore.selectRole,
		};
		// 添加群组成员
		await addGroupMemberApi(
			data,
			async () => {
				ElMessage.success("添加成功");
				await getGroupList();
			},
			() => {
				ElMessage.error("添加失败");
			},
		);
	}
	peopleTreeRef.value?.closeDialog();
};

// 在script部分添加 peopleTreeRef 的定义
const peopleTreeRef = ref<InstanceType<typeof PeopleTree> | null>(null);

// 添加对 selectRole 的监听
watch(
	() => organizeStore.selectRole,
	async (newValue) => {
		if (newValue) {
			await getRoleList();
			await getGroupList();
			await getPersonList();
		}
	},
);
</script>

<style scoped>
/* 用户容器样式 */
.user-container {
	display: flex;
	flex-direction: column;
	height: 80vh;
	width: 150vh;
	margin-left: 10px;
	background-color: #fff;
}

/* 菜单样式 */
.el-menu {
	background-color: #fff;
	border-bottom: 1px solid #eee;
	width: 100%;
}

/* 上边距样式 */
.margin-top {
	display: flex;
	flex-direction: column;
	align-items: between;
	justify-content: center;
	width: 80%;
	margin-top: 3vh;
	margin-left: 30vh;
}

/* 按钮边距样式 */
.margin-btn {
	width: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 5vh;
}

.user-container-bottom {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>
