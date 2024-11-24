<template>
	<div class="card-header">
		<div class="Logo_icon">
			<img src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/unit70.png" />
		</div>
		<div class="Logo_text">
			<h2>{{ selectedGroup?.name }}</h2>
			<p>{{ selectedGroup.name }}@{{ selectedGroup.id }}@G</p>
		</div>
	</div>
	<div class="card-content">
		<el-tabs v-model="activeTab" class="tabs">
			<el-tab-pane label="群组信息" name="group-info">
				<el-form ref="groupForm" class="form-layout">
					<div class="form-row">
						<el-form-item label="群组名称" class="half-width">
							<input
								:class="isEditing ? 'full-input' : 'readonly-input-line'"
								v-model="selectedGroup.name"
								:readonly="!isEditing"
							/>
						</el-form-item>
						<el-form-item label="唯一编码" class="half-width">
							<input
								:class="isEditing ? 'full-input' : 'readonly-input-line'"
								v-model="selectedGroup.id"
								:readonly="!isEditing"
							/>
						</el-form-item>
					</div>
					<div class="form-row1" :style="{ padding: '0 20px' }">
						<el-form-item label="群组描述">
							<input
								:class="isEditing ? 'full-input' : 'readonly-input-line'"
								v-model="selectedGroup.describe"
								:readonly="!isEditing"
							/>
						</el-form-item>
					</div>
					<div class="centered-button">
						<el-button v-if="!isEditing" type="primary" @click="isEditing = true">编辑群组信息</el-button>
						<el-button v-if="isEditing" type="danger" @click="saveGroupInfo">保存群组信息</el-button>
						<el-button v-if="isEditing" @click="cancelEdit">取消</el-button>
					</div>
				</el-form>
			</el-tab-pane>
			<!-- <el-tab-pane :label="renderLabel('个人成员', 0)" name="individual-members"> -->
			<!-- <el-tab-pane :label="renderLabel('个人成员', personnelData.length)" name="individual-members"> -->
			<el-tab-pane name="individual-members">
				<template #label>
					<el-badge :value="personnelData.length" class="small-badge" type="primary"> 个人成员 </el-badge>
				</template>
				<!-- <el-tab-pane :label="renderLabel('个人成员', personnelData.length)" name="individual-members"> -->
				<!-- <el-tab-pane :label="individualMembersLabel" name="individual-members"> -->
				<div class="group-details">
					<el-table
						v-loading="isLoading"
						:data="personnelData"
						style="width: 100%"
						@selection-change="handleSelectionChange"
					>
						<el-table-column fixed type="selection" width="55"></el-table-column>
						<el-table-column fixed prop="xname" label="人员名称" width="120"></el-table-column>
						<el-table-column prop="xorderNumber" label="人员工号" width="120"></el-table-column>
						<el-table-column prop="xmobile" label="手机号码" width="120"></el-table-column>P
						<el-table-column prop="xmail" label="电子邮件" width="120"></el-table-column>
						<el-table-column min-width="150" class="centered-column">
							<template #header>
								<div class="table-header-actions">
									<el-button class="add-button" type="primary" @click="handleAddPersonnel"
										><el-icon><Plus /></el-icon>添加</el-button
									>
									<el-button :disabled="selectedRows.length === 0" type="danger" @click="deletePerson(row)">
										<el-icon><Delete /></el-icon>删除
									</el-button>
								</div>
							</template>
							<template #default="scope">
								<div class="table-row-actions">
									<el-tooltip class="item" effect="dark" content="详情展开" placement="top">
										<el-icon
											@click="expandDetails(scope.row)"
											style="cursor: pointer; font-size: 24px; margin-left: 70px"
											><FolderOpened
										/></el-icon>
									</el-tooltip>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<!-- <el-tab-pane :label="renderLabel('身份成员', identityMembersData.length)" name="identity-members"> -->
			<!-- <el-tab-pane label="身份成员" name="identity-members"</el-tab-pane>> -->
			<el-tab-pane name="identity-members">
				<template #label>
					<el-badge :value="identityMembersData.length" class="small-badge" type="primary">身份成员</el-badge>
				</template>
				<div class="group-details">
					<el-table v-loading="isLoading" :data="identityMembersData" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="xname" label="人员名称" width="240"></el-table-column>
						<el-table-column prop="xunitLevelName" label="层次名称" width="240"></el-table-column>
						<el-table-column min-width="150">
							<template #header>
								<div class="table-header-actions">
									<el-button class="add-button" type="primary" @click="handleAddIdentityMember"
										><el-icon><Plus /></el-icon>添加</el-button
									>
									<el-button :disabled="selectedRows.length === 0" type="danger" @click="deleteIdentityMember">
										<el-icon><Delete /></el-icon>删除
									</el-button>
								</div>
							</template>
							<template #default="scope">
								<div class="table-row-actions">
									<el-tooltip class="item" effect="dark" content="详情展开" placement="top">
										<el-icon
											@click="expandDetails(scope.row)"
											style="cursor: pointer; font-size: 24px; margin-left: 70px"
											><FolderOpened
										/></el-icon>
									</el-tooltip>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<!-- <el-tab-pane label="群组成员" name="group-members"> -->
			<!-- <el-tab-pane :label="renderLabel('群组成员', groupData.length)" name="group-members"> -->
			<el-tab-pane name="group-members">
				<template #label>
					<el-badge :value="groupData.length" class="small-badge" type="primary"> 群组成员 </el-badge>
				</template>
				<div class="group-details">
					<el-table v-loading="isLoading" :data="groupData" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="name" label="群组名称" width="240"></el-table-column>
						<el-table-column prop="allname" label="群组全称" width="240"></el-table-column>
						<el-table-column min-width="150">
							<template #header>
								<div class="table-header-actions">
									<el-button class="add-button" type="primary" @click="handleAddGroupMember"
										><el-icon><Plus /></el-icon>添加</el-button
									>
									<el-button :disabled="selectedRows.length === 0" type="danger" @click="deleteGroupMember">
										<el-icon><Delete /></el-icon>删除
									</el-button>
								</div>
							</template>
							<template #default="scope">
								<div class="table-row-actions">
									<el-tooltip class="item" effect="dark" content="详情展开" placement="top">
										<el-icon
											@click="expandDetails(scope.row)"
											style="cursor: pointer; font-size: 24px; margin-left: 70px"
											><FolderOpened
										/></el-icon>
									</el-tooltip>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<!-- <el-tab-pane :label="renderLabel('组织成员', organizationData.length)" name="organization-members"> -->
			<el-tab-pane name="organization-members">
				<template #label>
					<el-badge :value="organizationData.length" class="small-badge" type="primary"> 组织成员 </el-badge>
				</template>
				<!-- <el-tab-pane label="组织成员" name="organization-members"> -->
				<div class="group-details">
					<el-table v-loading="isLoading" :data="organizationData" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="name" label="组织名称" width="240"></el-table-column>
						<el-table-column prop="xunitList" label="层次名称" width="240"></el-table-column>
						<el-table-column min-width="150">
							<template #header>
								<div class="table-header-actions">
									<el-button class="add-button" type="primary" @click="handleAddOrganizationMember"
										><el-icon><Plus /></el-icon>添加</el-button
									>
									<el-button :disabled="selectedRows.length === 0" type="danger" @click="deleteOrganizationMember">
										<el-icon><Delete /></el-icon>删除
									</el-button>
								</div>
							</template>
							<template #default="scope">
								<div class="table-row-actions">
									<el-tooltip class="item" effect="dark" content="详情展开" placement="top">
										<el-icon
											@click="expandDetails(scope.row)"
											style="cursor: pointer; font-size: 24px; margin-left: 70px"
											><FolderOpened
										/></el-icon>
									</el-tooltip>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
	<div class="group-info">
		<p>群组的全称为：{{ selectedGroup?.name || "N/A" }}</p>
		<p>群组建立于时间：{{ groupDetails.createTime || "N/A" }}，最后修改时间：{{ groupDetails.updateTime || "N/A" }}</p>
		<!-- <p>最后修改时间：{{ currentTime }}</p> -->
	</div>
	<PeopleTree ref="peopleTreeRef" @save="handleSaveSelectedRoles" :rolesTree="organizationalData" :isMultiple="true" />
	<PublicPeopleTree
		ref="publicPeopleTreeRef"
		@save="handleSavePublicSelectedRoles"
		:rolesTree="publicData"
		:isMultiple="true"
		:title="dialogTitle"
	/>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, nextTick, onMounted, computed, h } from "vue";
import { Search, Plus, Delete, PriceTag, UserFilled, CirclePlus, FolderOpened, Close } from "@element-plus/icons-vue";
import {
	addGroupApi,
	getGroupInfoApi,
	fetchPersonnelApi,
	deletePersonApi,
	updateGroupApi,
	fetchIDMemberListApi,
	deleteIdentityMemberApi,
	fetchGroupMembersApi,
	deleteGroupMemberApi,
	fetchOrganizationMembersApi,
	deleteOrganizationMemberApi,
	addIdentityMemberApi,
	getPersonListApi,
	addPersonMemberApi,
	fetchGroupListApi,
	addGroupMemberApi,
	getOrgNameTreeApi,
	addUnitMemberApi,
	getPersonListApit,
	getQueryOrgunitMembersApit,
	getIdSelectOrgNameTreeApit,
	getPersonListApit3,
} from "@/apis/organize/group";
import { getQueryOrgunitMembersApi, getIdentityApi, getIdSelectOrgNameTreeApi, getIdGrouplistApi } from "@/apis/public";
import { ElMessage, ElMessageBox } from "element-plus";
import { throttle } from "lodash";
// import PeopleTree from "@/components/main/public/PeopleTree.vue";
import PeopleTree from "./PeopleTree.vue";
import PublicPeopleTree from "@/components/main/public/PeopleTree.vue";
// const isDataLoaded = ref(false);
const isLoading = ref(false);
const personnelData = ref([]);
const activeTab = ref("group-info");
const isEditing = ref(false);
const groupInfo = ref({});
const emits = defineEmits(["update:expandedRow", "update-group-list", "reload-groups"]);
let currentTime = ref(new Date().toLocaleString());
const selectedRows = ref([]);
const groupDetails = ref({});
const props = defineProps({
	selectedGroup: Object,
});
const identityMembersData = ref([]);
const isNewGroup = computed(() => !props.selectedGroup.id);
const groupData = ref([]);
const publicPeopleTreeRef = ref(null);
const publicData = ref([]);
const dialogTitle = ref("");
const organizationData = ref([]);
// const individualMembersLabel = computed(() => {
// 	return `个人成员 ${personnelData.value.length}`;
// });
// function renderLabel(text, count) {
// 	// return () => h(ElBadge, { value: count }, () => h("span", text));
// 	return h(ElBadge, { value: count }, () => text);
// }
function renderLabel(text, count) {
	return h(
		ElBadge,
		{
			value: count,
			class: "small-badge",
			type: "primary",
		},
		() => text,
	);
}
function handleSelectionChange(selection) {
	selectedRows.value = selection;
	// selectedRows.value = selection.length > 0 ? selection[0] : null;
}
function expandDetails(row) {
	// expandedRow.value = row;
	emits("update:expandedRow", row);
}
async function saveGroupInfo() {
	const groupData = {
		id: props.selectedGroup.id,
		name: props.selectedGroup.name,
		describe: props.selectedGroup.describe,
	};
	console.log("群组信息", groupData.id);
	if (props.selectedGroup.isNew) {
		// 添加新群组
		try {
			const response = await addGroupApi(groupData);
			if (response && response.code === 10000) {
				// emits("update-group-list", { groups: response.rows, type: "fullUpdate" }); // 更新整个群组列表
				isEditing.value = false;
				emits("reload-groups");
				// ElMessage({
				// 	message: "群组添加成功",
				// 	type: "success",
				// 	duration: 3000,
				// });
			} else {
				console.error("添加群组信息失败: 返回数据为空或不正确");
			}
		} catch (error) {
			console.error("添加群组信息失败:", error);
		}
	} else {
		// 更新群组信息
		try {
			const response = await updateGroupApi(groupData);
			if (response.code == 10000) {
				ElMessage({
					message: "群组信息修改成功",
					type: "success",
					duration: 3000,
				});
				isEditing.value = false;
				emits("update-group-list", { groups: [groupData], type: "singleUpdate" }); // 更新单个群组信息
			}
		} catch (error) {
			console.error("更新群组信息失败:", error);
		}
	}
}
function cancelEdit() {
	isEditing.value = false;
}

async function loadPersonnelData() {
	if (!props.selectedGroup || !props.selectedGroup.id) return;
	try {
		const response = await fetchPersonnelApi({
			GROUP_XID: props.selectedGroup.id,
			pageIndex: 1,
			pageSize: 10,
		});
		if (response && response.rows) {
			personnelData.value = response.rows;
			isLoading.value = false;
			// ElMessage({
			// 	message: "个人成员数据加载成功",
			// 	type: "success",
			// 	duration: 3000,
			// });
			console.log("个人成员数据加载成功：", response);
		} else {
			ElMessage.error("未接收到数据");
		}
	} catch (error) {
		console.error("Failed to load personnel data:", error);
		ElMessage.error("Error loading data");
	}
}

async function loadIdentityMembersData() {
	if (!props.selectedGroup || !props.selectedGroup.id) return;
	try {
		const response = await fetchIDMemberListApi({
			GROUP_XID: props.selectedGroup.id,
			pageIndex: 1,
			pageSize: 10,
		});

		if (response && response.rows) {
			identityMembersData.value = response.rows;
			isLoading.value = false;
			// ElMessage({
			// 	message: "身份成员数据加载成功",
			// 	type: "success",
			// 	duration: 3000,
			// });
			console.log("身份成员数组:", identityMembersData.value);
		} else {
			ElMessage.error("未接收到数据");
		}
	} catch (error) {
		console.error("加载身份成员数据失败:", error);
		ElMessage.error("加载身份成员数据失败");
	}
}
let intervalId;
async function loadGroupInfo() {
	if (props.selectedGroup && props.selectedGroup.id) {
		try {
			const info = await getGroupInfoApi(props.selectedGroup.id);
			groupDetails.value = info;
			// 	ElMessage({
			// 	message: "群组详细信息加载成功",
			// 	type: "success",
			// 	duration: 3000,
			// });
			console.log("群组详细信息加载成功：", info);
		} catch (error) {
			console.error("群组信息获取失败:", error);
		}
	}
}
async function loadGroupMembersData() {
	if (!props.selectedGroup || !props.selectedGroup.id) return;
	try {
		const params = {
			groupxid: props.selectedGroup.id,
			pageIndex: 1,
			pageSize: 10,
		};
		const response = await fetchGroupMembersApi(params);
		if (response && response.rows) {
			groupData.value = response.rows;
			isLoading.value = false;
			// ElMessage({
			// 	message: "群组成员数据加载成功",
			// 	type: "success",
			// 	duration: 3000,
			// });
			console.log("群组成员数据加载成功：", groupData.value);
		} else {
			ElMessage.error("未接收到群组成员数据");
		}
	} catch (error) {
		console.error("加载群组成员数据失败:", error);
		ElMessage.error("加载群组成员数据失败");
	}
}
async function loadOrganizationMembersData() {
	if (!props.selectedGroup || !props.selectedGroup.id) return;
	try {
		const params = {
			groupxid: props.selectedGroup.id,
			pageIndex: 1,
			pageSize: 10,
		};
		const response = await fetchOrganizationMembersApi(params);
		if (response && response.rows) {
			organizationData.value = response.rows;
			isLoading.value = false;
			// ElMessage({
			// 	message: "组织成员数据加载成功",
			// 	type: "success",
			// 	duration: 3000,
			// });
			console.log("组织成员数据加载成功：", organizationData.value);
		} else {
			ElMessage.error("未接收到组织成员数据");
		}
	} catch (error) {
		console.error("加载组织成员数据失败:", error);
		ElMessage.error("加载组织成员数据失败");
	}
}

// 添加个人成员 获取人员名称列表
const handleAddPersonnel = async () => {
	dialogTitle.value = "选择人员";
	const requestData = {
		pageIndex: 1,
		pageSize: 10,
	};
	try {
		const response = await getPersonListApit3(requestData);
		const personnelList = response.rows;
		// 转换数据为树形结构
		publicData.value = personnelList.map((person) => ({
			id: person.xid, // 使用手机号作为唯一ID
			label: person.xname,
			icon: person.xicon,
			// xid: person.xid,
			children: [], // 个人成员不具有子节点，但结构需要保持一致
		}));
		publicPeopleTreeRef.value.showDialog();
		// ElMessage({
		// 	message: "获取个人成员列表成功",
		// 	type: "success",
		// 	duration: 3000,
		// });
	} catch (error) {
		console.error("获取个人成员列表失败:", error);
		ElMessage.error("获取个人成员列表失败");
	}
};

const peopleTreeRef = ref(null);
const organizationalData = ref([]); // 存储从API获取的组织数据
const peopleTree = ref(null);
const showPeopleTree = () => {
	// peopleTreeRef 是 PeopleTree 组件的引用
	peopleTreeRef.value.showDialog();
};
//添加身份成员 获取组织成员名称树
const handleAddIdentityMember = async () => {
	// peopleTree.value.showDialog();
	const requestData = {};
	const handleSuccess = (data) => {
		console.log("获取组织成员名称树成功", data);
		organizationalData.value = data; // 确保数据被设置
		peopleTreeRef.value.showDialog("选择身份");
		ElMessage({
			message: "获取组织成员名称树成功",
			type: "success",
			duration: 3000,
		});
	};
	const handleFail = () => {
		ElMessage.error("获取组织成员名称树失败");
	};
	// const data = await getQueryOrgunitMembersApi(requestData, handleSuccess, handleFail);
	// organizationalData.value = data;
	// await getQueryOrgunitMembersApi(requestData, handleSuccess, handleFail);
	await getQueryOrgunitMembersApit(requestData, handleSuccess, handleFail);
};
const handleSaveSelectedRoles = async (selectedRoles) => {
	// let xidentityList;
	// // let groupxid;
	// selectedRoles.forEach((role) => {
	// 	// 	identityMembersData.value.push({
	// 	// 		xname: role.mamName, // 人员名称绑定到 label
	// 	// 		xunitLevelName: role.level, // 层次名称绑定到 levelName
	// 	// 		// mam_unique: role.id, //成员的唯一标识。
	// 	// 		// unique: role.unique, //组织的唯一标识。
	// 	// 	});
	// 	xidentityList = role.id;
	// 	// groupxid = props.selectedGroup.id;
	// });
	const xidentityList = selectedRoles.map((role) => role.id);
	try {
		const response = await addIdentityMemberApi({
			groupxid: props.selectedGroup.id,
			xidentityList: xidentityList,
		});
		if (response) {
			console.log("添加身份成员成功:", response);
			await loadIdentityMembersData();
			ElMessage({
				message: "新增身份成员成功,重新获取渲染身份成员列表",
				type: "success",
				duration: 3000,
			});
		}
	} catch (error) {
		console.error("添加身份成员失败:", error);
		ElMessage.error("添加身份成员失败");
	}
};
//添加群组成员  获取群组名称列表
const handleAddGroupMember = async () => {
	dialogTitle.value = "选择群组";
	const params = {
		pageIndex: 1,
		pageSize: 10,
		// id: props.selectedGroup.id,
		// name: props.selectedGroup.name,
	};
	try {
		const response = await fetchGroupListApi(params);
		if (response && response.rows) {
			publicData.value = response.rows.map((group) => ({
				id: group.id,
				label: group.name,
				children: [],
			}));
			publicPeopleTreeRef.value.showDialog();
			ElMessage({
				message: "获取群组列表成功",
				type: "success",
				duration: 3000,
			});
		} else {
			console.error("没有接收到数据");
		}
	} catch (error) {
		console.error("获取群组列表失败:", error);
	}
};

//处理函数
const transformData = (data) => {
	return data.map((item) => ({
		id: item.xid,
		label: item.xname,
		children: item.children ? transformData(item.children) : [],
	}));
};

//添加组织成员 获取组织名称树  展示真实后端数据
const handleAddOrganizationMember = async () => {
	dialogTitle.value = "选择组织";
	const handleSuccess = (data) => {
		console.log("获取组织名称树成功", data);
		publicData.value = transformData(data);
		publicPeopleTreeRef.value.showDialog();
		ElMessage({
			message: "获取组织名称树成功",
			type: "success",
			duration: 3000,
		});
	};
	const handleFail = (error) => {
		ElMessage.error("获取组织名称树失败：", error);
	};
	// await getIdSelectOrgNameTreeApi({}, handleSuccess, handleFail);
	await getIdSelectOrgNameTreeApit({}, handleSuccess, handleFail);
};
//mock
// const handleAddOrganizationMember = async () => {
//     dialogTitle.value = "选择组织";
//     try {
//         const response = await getOrgNameTreeApi();
//         if (response && response.data) {
//             publicData.value = response.data;
//             publicPeopleTreeRef.value.showDialog();
//             ElMessage({
//                 message: "获取组织名称树成功",
//                 type: "success",
//                 duration: 3000,
//             });
//         } else {
//             ElMessage.error("获取组织名称树失败: " + response.message);
//         }
//     } catch (error) {
//         console.error("获取组织名称树失败:", error);
//         ElMessage.error("获取组织名称树失败");
//     }
// };

// 处理从 PublicPeopleTree 组件保存选中的角色
const handleSavePublicSelectedRoles = async (selectedRoles) => {
	if (dialogTitle.value === "选择人员") {
		const Data = {
			GROUP_XID: props.selectedGroup.id,
			xpersonList: selectedRoles.map((role) => role.label),
		};

		try {
			const response = await addPersonMemberApi(Data);
			if (response) {
				// selectedRoles.forEach((role) => {
				// 	personnelData.value.push({
				// 		xmobile: role.id,
				// 		xname: role.label,
				// 		xorderNumber: "",
				// 		xmail: "",
				// 	});
				// });
				await loadPersonnelData();
				ElMessage({
					message: "新增个人成员成功,重新获取渲染数据",
					type: "success",
					duration: 3000,
				});
			} else {
				ElMessage.error(response.message);
			}
		} catch (error) {
			console.error("新增个人成员失败:", error);
			ElMessage.error("新增个人成员失败");
		}
	} else if (dialogTitle.value === "选择群组") {
		const Data = {
			gruopId: props.selectedGroup.id,
			groupList: Array.from(selectedRoles.map((role) => role.xid)),
		};

		try {
			const response = await addGroupMemberApi(Data);
			console.log("新增群组成员:", response);
			if (response) {
				// selectedRoles.forEach((role) => {
				// 	groupData.value.push({
				// 		groupId: role.id,
				// 		name: role.label,
				// 		allname: "",
				// 	});
				// });
				groupData.value = response.map((group) => ({
					name: group.groupName,
					allname: group.distinguishedName,
					groupId: group.groupId,
				}));
				ElMessage({
					message: "新增群组成员成功，渲染返回数据",
					type: "success",
					duration: 3000,
				});
			} else {
				ElMessage.error(response.message);
			}
		} catch (error) {
			console.error("新增群组成员失败:", error);
			ElMessage.error("新增群组成员失败");
		}
	} else if (dialogTitle.value === "选择组织") {
		const Data = {
			groupId: props.selectedGroup.id,
			unitList: selectedRoles.map((role) => role.id),
		};

		try {
			const response = await addUnitMemberApi(Data);
			console.log("新增组织成员:", response);
			if (response) {
				// selectedRoles.forEach((role) => {
				// 	groupData.value.push({
				// 		groupId: role.id,
				// 		name: role.label,
				// 		allname: "",
				// 	});
				// });
				organizationData.value = response.map((item) => ({
					name: item.unitName,
					xunitList: item.levelName,
				}));
				ElMessage({
					message: "新增组织成员成功，渲染返回数据",
					type: "success",
					duration: 3000,
				});
			} else {
				ElMessage.error(response.message);
			}
		} catch (error) {
			console.error("新增组织成员失败:", error);
			ElMessage.error("新增组织成员失败");
		}
	}
};

const deletePerson = async () => {
	if (selectedRows.value.length === 0) {
		ElMessage.warning("没有选中的成员");
		return;
	}

	try {
		await ElMessageBox.confirm("确定要删除选中的个人成员吗?", "确认删除", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		});
		const allDeletes = selectedRows.value.map((person) => deletePersonApi({ group_person: `${person.xorderNumber}` }));
		await Promise.all(allDeletes);
		// 从personnelData中移除已删除的成员
		// const remainingPersons = personnelData.value.filter(
		// 	(p) => !selectedRows.value.some((selected) => selected.xorderNumber === p.xorderNumber),
		// );
		// personnelData.value = remainingPersons;
		// selectedRows.value = []; // 清空选中行
		await loadPersonnelData();
		ElMessage.success("删除成功，重新渲染个人成员列表");
	} catch (error) {
		if (error === "cancel") {
			ElMessage.info("取消删除");
		} else {
			console.error("删除个人成员失败:", error);
			ElMessage.error("删除操作失败");
		}
	}
};

const deleteIdentityMember = async () => {
	if (selectedRows.value.length === 0) {
		ElMessage.warning("没有选中的身份成员");
		return;
	}

	try {
		await ElMessageBox.confirm("确定要删除选中的身份成员吗?", "确认删除", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		});

		const idsToDelete = selectedRows.value.map((member) => member.xidentityList);
		await deleteIdentityMemberApi({ xidentityList: idsToDelete });

		// 从identityMembersData中移除已删除的成员
		// identityMembersData.value = identityMembersData.value.filter(
		// 	(member) => !idsToDelete.includes(member.xidentityList),
		// );

		// selectedRows.value = []; // 清空选中行
		await loadIdentityMembersData();
		ElMessage.success("删除成功,重新渲染身份成员列表");
	} catch (error) {
		if (error === "cancel") {
			ElMessage.info("取消删除");
		} else {
			console.error("删除身份成员失败:", error);
			ElMessage.error("删除操作失败");
		}
	}
};
const deleteGroupMember = async () => {
	if (selectedRows.value.length === 0) {
		ElMessage.warning("没有选中的群组成员");
		return;
	}

	try {
		await ElMessageBox.confirm("确定要删除选中的群组成员吗?", "确认删除", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		});

		const groupMemberIds = selectedRows.value.map((member) => member.xgroupList);
		const groupId = props.selectedGroup.id;
		await deleteGroupMemberApi({ groupList: groupMemberIds, groupId: groupId });
		await loadGroupMembersData();
		ElMessage.success("删除成功,重新渲染群组成员列表");
	} catch (error) {
		if (error === "cancel") {
			ElMessage.info("取消删除");
		} else {
			console.error("删除群组成员失败:", error);
			ElMessage.error("删除操作失败");
		}
	}
};
const deleteOrganizationMember = async () => {
	if (selectedRows.value.length === 0) {
		ElMessage.warning("没有选中的组织成员");
		return;
	}

	try {
		await ElMessageBox.confirm("确定要删除选中的组织成员吗?", "确认删除", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		});

		const unitList = selectedRows.value.map((member) => member.groupxid);
		const groupId = props.selectedGroup.id;
		await deleteOrganizationMemberApi({ unitList, gruopId: groupId });

		// 从organizationData中移除已删除的成员
		// organizationData.value = organizationData.value.filter((member) => !unitList.includes(member.groupxid));

		// selectedRows.value = []; // 清空选中行
		await loadOrganizationMembersData();
		ElMessage.success("删除成功,重新渲染组织成员列表");
	} catch (error) {
		if (error === "cancel") {
			ElMessage.info("取消删除");
		} else {
			console.error("删除组织成员失败:", error);
			ElMessage.error("删除操作失败");
		}
	}
};

// async function loadDataOnDemand(tabName) {
// 	// if (isDataLoaded.value) {
// 	// 	console.log("数据已加载，无需重复加载");
// 	// 	return;
// 	// }
// 	isLoading.value = true;
// 	try {
// 		switch (tabName) {
// 			case "group-members":
// 				if (groupData.value.length === 0) {
// 					isLoading.value = true;
// 					await loadGroupMembersData();
// 				}
// 				break;
// 			case "organization-members":
// 				if (organizationData.value.length === 0) {
// 					isLoading.value = true;
// 					await loadOrganizationMembersData();
// 				}
// 				break;
// 			case "individual-members":
// 				if (personnelData.value.length === 0) {
// 					isLoading.value = true;
// 					await loadPersonnelData();
// 				}
// 				break;
// 			case "identity-members":
// 				if (identityMembersData.value.length === 0) {
// 					isLoading.value = true;
// 					await loadIdentityMembersData();
// 				}
// 				break;
// 		}
// 	} finally {
// 		isLoading.value = false;
// 	}
// }

async function loadDataOnDemand(tabName, forceLoad = false) {
	isLoading.value = true;
	try {
		switch (tabName) {
			case "group-members":
				if (forceLoad || groupData.value.length === 0) {
					await loadGroupMembersData();
				}
				break;
			case "organization-members":
				if (forceLoad || organizationData.value.length === 0) {
					await loadOrganizationMembersData();
				}
				break;
			case "individual-members":
				if (forceLoad || personnelData.value.length === 0) {
					await loadPersonnelData();
				}
				break;
			case "identity-members":
				if (forceLoad || identityMembersData.value.length === 0) {
					await loadIdentityMembersData();
				}
				break;
		}
	} finally {
		isLoading.value = false;
	}
}
const throttledLoadData = throttle(loadDataOnDemand, 3000, { trailing: false });
watch(
	() => props.selectedGroup,
	async (newVal, oldVal) => {
		if (newVal && newVal.id !== oldVal?.id) {
			console.log("选中的群组变更，加载新的群组详细信息...");
			await loadGroupInfo();
			// loadDataOnDemand(activeTab.value);
			loadDataOnDemand("group-members", true);
			loadDataOnDemand("organization-members", true);
			loadDataOnDemand("individual-members", true);
			loadDataOnDemand("identity-members", true);
		}
	},
	{ immediate: true },
);
// watch(activeTab, async (newTab, oldTab) => {
// 	console.log(`Tab变化从 ${oldTab} 到${newTab}`);
// 	// isDataLoaded.value = false;
// 	// await throttledLoadData(newTab);
// 	// if (isLoading.value == true) {
// 	// 	await throttledLoadData(activeTab.value);
// 	// }
// 	// loadDataOnDemand(activeTab.value);
// 	loadDataOnDemand(newTab);
// });
onMounted(async () => {
	if (props.selectedGroup && props.selectedGroup.id) {
		await loadGroupInfo();
		// if (isLoading.value == true) {
		// 	await throttledLoadData(activeTab.value);
		// }
		// loadDataOnDemand(activeTab.value);
		loadDataOnDemand("group-members", true);
		loadDataOnDemand("organization-members", true);
		loadDataOnDemand("individual-members", true);
		loadDataOnDemand("identity-members", true);
	}
});
function enableEditing() {
	isEditing.value = true;
}
function unableEditing() {
	isEditing.value = false;
}
defineExpose({ enableEditing, unableEditing });
</script>

<style scoped>
::v-deep .el-tabs__header {
	justify-content: center;
	display: flex;
	width: 800px;
}
::v-deep .el-tabs__nav-wrap {
	justify-content: center;
	display: flex;
	width: 800px;
}
::v-deep .el-tabs__nav {
	justify-content: center;
	display: flex;
	width: 800px;
}
::v-deep .el-tabs__nav-scroll {
	width: 800px;
	overflow: hidden;
	justify-content: center;
	display: flex;
}

.card-header {
	width: 100%;
	height: 120px;
	display: flex;
	align-items: center;
	font-size: 20px;
	margin-bottom: 10px;
	background-image: url("https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/group_bg.png");
	.Logo_icon {
		width: 80px;
		margin-left: 200px;
		background-color: white;
		height: 80px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Logo_text {
		height: 80px;
		border-left: 2px solid #ccc;
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;

		h2 {
			margin-left: 20px;
			font-weight: bold;
			color: #666666;
		}

		p {
			margin-left: 20px;
			color: #666666;
		}
	}
}
.card-content {
	width: 800px;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	height: 360px;
	/* overflow: scroll; */
	margin-bottom: 30px;
	.el-table--enable-row-transition .el-table__body td.el-table__cell:last-child .el-icon {
		font-size: 24px;
		cursor: pointer;
	}
	.form-row {
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	}

	.half-width {
		flex: 1;
		margin-right: 20px;
	}

	.half-width:last-child {
		margin-right: 0;
	}
	.readonly-input-line {
		width: 100%;
		border: none;
		border-bottom: 1px solid #ccc;
		padding: 8px 0;
		background-color: transparent;
		cursor: pointer;
		cursor: not-allowed;
		cursor: not-allowed;
	}

	.readonly-input-line:focus {
		outline: none;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
		cursor: not-allowed;
	}

	.full-input {
		border: 1px solid #ccc;
		padding: 8px;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 15px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		font-size: 14px;
		color: #606266;
		background-color: #fff;
		background-image: none;
		outline: none;
		transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	.full-input:focus {
		border-color: #409eff;
	}
	.centered-button {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.group-form {
		.form-input {
			border: none;
			border-bottom: 1px solid #ccc;
			width: 100%;
			padding: 8px 0;
			outline: none;
		}

		.form-input[readonly] {
			background-color: transparent;
			color: #666;
			cursor: default;
		}

		.form-row {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 20px;
		}

		label {
			margin-right: 10px;
		}
	}
}
.group-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 150px;
	margin-top: auto;
	background-color: #f4f4f4;
	width: 100%;
	margin-bottom: 40px;
	font-size: 16px;
	height: 25%;
	padding: 10px;
	p {
		margin: 5px 0;
		width: 100%;
		text-align: center;
	}
}
::v-deep .table-row-actions .el-icon {
	cursor: pointer;
	font-size: 24px;
	color: #43ccf2;
	margin-left: 70px;
	transition:
		transform 0.3s ease,
		color 0.3s ease;
}

::v-deep .table-row-actions .el-icon:hover {
	transform: scale(1.1);
}
</style>
