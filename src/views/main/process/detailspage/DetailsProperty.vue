<!-- 应用属性子组件 -->
<template>
	<el-row :gutter="20" style="margin-top: 20px">
		<!-- 应用属性模块 -->
		<el-col :span="24">
			<div class="title-container">
				<el-row>
					<!-- 动态调整标题区域的栅格 -->
					<el-col :span="isEditing ? 20 : 22">
						<span class="title">应用属性</span>
					</el-col>
					<!-- 动态调整按钮区域的栅格 -->
					<el-col :span="isEditing ? 4 : 2">
						<div v-if="isEditing" class="edit-buttons">
							<el-button type="primary" size="small" @click="saveChanges">保存</el-button>
							<el-button size="small" @click="cancelEdit">取消</el-button>
						</div>
						<div v-else>
							<el-button size="small" @click="toggleEdit">编辑</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-row>
				<el-col :span="4" />
				<el-col :span="20">
					<div class="label-container">
						<span class="label">应用名称: </span>
						<template v-if="isEditing">
							<el-input class="edit-input" v-model="editableAppName" size="small" />
						</template>
						<template v-else>
							{{ appName }}
						</template>
					</div>
					<div class="label-container">
						<span class="label">应用别名: </span>
						<template v-if="isEditing">
							<el-input class="edit-input" v-model="editableAppAlias" size="small" />
						</template>
						<template v-else>
							{{ appAlias }}
						</template>
					</div>
					<div class="label-container">
						<span class="label">应用描述: </span>
						<template v-if="isEditing">
							<el-input class="edit-input" v-model="editableAppDescription" size="small" />
						</template>
						<template v-else>
							{{ appDescription }}
						</template>
					</div>
					<div class="label-container">
						<span class="label">应用类型: </span>
						<template v-if="isEditing">
							<el-input class="edit-input" v-model="editableAppType" size="small" />
						</template>
						<template v-else>
							{{ appType }}
						</template>
					</div>
					<div class="label-container">
						<span class="label">默认表单: </span>
						<template v-if="isEditing">
							<el-select v-model="editableDefaultForm" placeholder="选择默认表单" size="small" class="edit-input">
								<el-option v-for="item in formOptions" :key="item.xid" :label="item.xname" :value="item.xid" />
							</el-select>
						</template>
						<template v-else>
							{{ defaultForm }}
						</template>
					</div>
					<div class="label-container">
						<span class="label">应用标识: </span>
						{{ appId }}
					</div>
				</el-col>
			</el-row>
		</el-col>
		<!-- 应用图标模块 -->
		<el-col :span="24">
			<div class="title-container">
				<span class="title">应用图标</span>
			</div>
			<el-row>
				<el-col :span="4" />
				<el-col :span="20" class="icon-container">
					<el-image style="width: 80px; height: 80px" :src="iconUrl" />
					<el-button @click="changeIcon" style="margin-left: 20px">更改图标</el-button>
				</el-col>
			</el-row>
		</el-col>
		<!-- 可用范围模块 -->
		<el-col :span="24">
			<div class="title-container">
				<span class="title">可用范围</span>
			</div>
			<el-row style="margin-left: 20px">
				<template v-for="(item, index) in identity" :key="index.xorderColumn">
					<el-tag style="margin-right: 10px" size="large" type="info">{{ item.xavailableIdentityList }}</el-tag>
				</template>
				<template v-for="(item, index) in organize" :key="index.xorderColumn">
					<el-tag style="margin-right: 10px" size="large" type="info">{{ item.xavailableUnitList }}</el-tag>
				</template>
			</el-row>
			<el-row>
				<el-button @click="setIdentity" class="mg-20">设置可用身份</el-button>
				<el-button @click="setOrganization" class="mg-20">设置可用组织</el-button>
			</el-row>
			<PeopleTree
				ref="dialogIdRef"
				@save="handleIdSave"
				@openDialog="handleIdDialog"
				:title="`设置应用可用身份`"
				:rolesTree="idRolesTree"
			/>
			<PeopleTree
				ref="dialogOrganRef"
				@save="handleOrganSave"
				@openDialog="handleOrganDialog"
				:title="`设置应用可用组织`"
				:rolesTree="organRolesTree"
			/>
		</el-col>
		<!-- 管理者模块 -->
		<el-col :span="24">
			<div class="title-container">
				<span class="title">管理者</span>
			</div>
			<el-row style="margin-left: 20px">
				<template v-for="(item, index) in manager" :key="index.xorderColumn">
					<el-tag style="margin-right: 10px" size="large" type="info">{{ item.xcontrollerList }}</el-tag>
				</template>
			</el-row>
			<el-row>
				<el-button @click="setManager" class="mg-20">设置管理者</el-button>
			</el-row>
			<PeopleTree
				ref="dialogManagerRef"
				@save="handleManagerSave"
				@openDialog="handleManagerDialog"
				:title="`设置应用可用管理者`"
				:rolesTree="managerRolesTree"
			/>
		</el-col>
		<!-- 流程维护人模块 -->
		<el-col :span="24">
			<div class="title-container">
				<span class="title">流程维护人</span>
			</div>
			<el-row style="margin-left: 20px">
				<el-tag style="margin-right: 10px" size="large" type="info" v-if="maintainer">{{ maintainer }}</el-tag>
			</el-row>
			<el-row>
				<el-button @click="setMaintainer" class="mg-20">设置流程维护人</el-button>
			</el-row>
			<PeopleTree
				ref="dialogMaintainerRef"
				@save="handleMaintainerSave"
				@openDialog="handleMaintainerDialog"
				:title="`设置应用流程维护人`"
				:rolesTree="maintainerRolesTree"
				:isMultiple="false"
			/>
		</el-col>
	</el-row>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus"; // 用于提示消息（可选）
import iconUrl from "@/assets/process/office.png";
import PeopleTree from "@/components/main/public/PeopleTree.vue";
import { getQueryOrgunitMembersApi, getIdSelectOrgNameTreeApi, getIdentityApi } from "@/apis/public/index.js";
import { getAppPropertiesApi, putFixAppPropertiesApi } from "@/apis/process/appproperty.js";
import { useRoute } from "vue-router";
const route = useRoute();
// 原始数据
const appName = ref("");
const appAlias = ref("");
const appDescription = ref("");
const appType = ref("");
const defaultForm = ref("");
const appId = route.params.id;
const formOptions = ref([]);
// 应用其他属性
const identity = ref([]); // 身份
const organize = ref([]); // 组织
const manager = ref([]); // 管理者
const maintainer = ref(); // 流程维护人
// 编辑状态
const isEditing = ref(false);
// 编辑时的临时数据
const editableAppName = ref(appName.value);
const editableAppAlias = ref(appAlias.value);
const editableAppDescription = ref(appDescription.value);
const editableAppType = ref(appType.value);
const editableDefaultForm = ref(defaultForm.value);
// 切换编辑模式
const toggleEdit = () => {
	if (isEditing.value) {
		cancelEdit();
	} else {
		isEditing.value = true;
	}
};
// 保存更改
const saveChanges = async () => {
	await putFixAppPropertiesApi(
		{
			xid: appId,
			xdefaultForm: editableDefaultForm.value,
			xname: editableAppName.value,
			xalias: editableAppAlias.value,
			xdescription: editableAppDescription.value,
			xapplicationCategory: editableAppType.value,
		},
		async () => {
			isEditing.value = false;
			ElMessage.success("修改应用属性成功");
			await fetchAppProperties();
		},
		() => {
			isEditing.value = false;
			ElMessage.error("修改应用属性失败");
		},
	);
};
// 取消编辑
const cancelEdit = () => {
	editableAppName.value = appName.value;
	editableAppAlias.value = appAlias.value;
	editableAppDescription.value = appDescription.value;
	editableAppType.value = appType.value;
	editableDefaultForm.value = defaultForm.value;
	isEditing.value = false;
};
// 触发更改图标的逻辑
const changeIcon = () => {};

//获取应用属性数据的api
const fetchAppProperties = async () => {
	await getAppPropertiesApi(
		{
			id: appId,
		},
		(data) => {
			appName.value = data.xname;
			appAlias.value = data.xalias;
			appDescription.value = data.xdescription;
			appType.value = data.xapplicationCategory;
			defaultForm.value = data.xdefaultForm;
			// 获得其他属性
			identity.value = data.xavailableIdentityList;
			organize.value = data.xavailableUnitList;
			manager.value = data.xcontrollerList;
			maintainer.value = data.maintenanceIdentity;
			// 修改v-model的值
			editableAppName.value = appName.value;
			editableAppAlias.value = appAlias.value;
			editableAppDescription.value = appDescription.value;
			editableAppType.value = appType.value;
			editableDefaultForm.value = defaultForm.value;
			ElMessage.success("获取应用属性成功");
		},
		() => {
			ElMessage.error("获取应用属性失败");
		},
	);
};
//表单属性
const fetchFormList = async (page, size, categoryId) => {
	await getFormListApi(
		{
			pageIndex: page,
			pageSize: size,
			xcategory: categoryId,
			xapplication: appId,
		},
		(data) => {
			// 成功回调
			formOptions.value = data.rows;
			ElMessage.success("获取数据成功");
		},
		() => {
			// 失败回调
			ElMessage.error("获取数据失败，请稍后再试");
		},
	);
};
onMounted(async () => {
	await fetchAppProperties();
	await fetchFormList();
});

/* 设置可用身份 */
const dialogIdRef = ref(null);
const idRolesTree = ref([]);
const setIdentity = () => {
	dialogIdRef.value.showDialog();
};
// 映射数组,递归获得
const idMapData = (data) => {
	return data.map((item) => ({
		label: item.name,
		id: item.unique,
		children: [
			// 映射成员作为子节点
			...item.members.map((member) => ({
				label: member.name,
				id: member.unique,
			})),
			// 递归映射下级组织
			...idMapData(item.subordinates),
		],
	}));
};
// 处理打开弹窗时获取数据
const handleIdDialog = async () => {
	await getQueryOrgunitMembersApi(
		null,
		(data) => {
			idRolesTree.value = idMapData(data);
			ElMessage.success("获取成功");
		},
		() => {
			ElMessage.error("获取失败");
		},
	);
};
// 处理保存事件
const handleIdSave = async (selectedRoles) => {
	const roles = selectedRoles.map((item) => ({
		// xorderColumn: item.id,
		xorderColumn: 1,
		xavailableIdentityList: item.label,
	}));
	await putFixAppPropertiesApi(
		{
			xid: appId,
			xavailableIdentityList: roles,
		},
		async () => {
			ElMessage.success("保存可用身份成功");
			await fetchAppProperties();
		},
		() => {
			ElMessage.error("保存可用身份失败");
		},
	);
};

/* 设置可用组织 */
const dialogOrganRef = ref(null);
const organRolesTree = ref([]);
const setOrganization = () => {
	dialogOrganRef.value.showDialog();
};
// 映射数组,递归获得
const organizeMapData = (data) => {
	return data.map((item) => ({
		label: item.xname,
		id: item.xunique,
		children: [
			// 递归映射子组织
			...organizeMapData(item.children),
		],
	}));
};
// 获得组织名称
const handleOrganDialog = async () => {
	await getIdSelectOrgNameTreeApi(
		null,
		(data) => {
			organRolesTree.value = organizeMapData(data);
			ElMessage.success("获取成功");
		},
		() => {
			ElMessage.error("获取失败");
		},
	);
};
const handleOrganSave = async (selectedRoles) => {
	const roles = selectedRoles.map((item) => ({
		// xorderColumn: item.id,
		xorderColumn: 1,
		xavailableUnitList: item.label,
	}));
	await putFixAppPropertiesApi(
		{
			xid: appId,
			xavailableUnitList: roles,
		},
		async () => {
			ElMessage.success("保存可用组织成功");
			await fetchAppProperties();
		},
		() => {
			ElMessage.error("保存可用组织失败");
		},
	);
};

/* 设置管理者 */
const dialogManagerRef = ref(null);
const managerRolesTree = ref([]);
const setManager = () => {
	dialogManagerRef.value.showDialog();
};
// 映射数组,递归获得
const managerMapData = (data) => {
	return data.rows.map((item) => ({
		label: item.xname,
		id: item.xid,
	}));
};
// 获得人员名称列表
const handleManagerDialog = async () => {
	await getIdentityApi(
		null,
		(data) => {
			managerRolesTree.value = managerMapData(data);
			ElMessage.success("获取人员名称列表成功");
		},
		() => {
			ElMessage.error("获取人员名称列表失败");
		},
	);
};
const handleManagerSave = async (selectedRoles) => {
	const roles = selectedRoles.map((item) => ({
		// xorderColumn: item.id,
		xorderColumn: 1,
		xcontrollerList: item.label,
	}));
	await putFixAppPropertiesApi(
		{
			xid: appId,
			xcontrollerList: roles,
		},
		async () => {
			ElMessage.success("设置管理者成功");
			await fetchAppProperties();
		},
		() => {
			ElMessage.error("设置管理者失败");
		},
	);
};

/* 设置流程维护人 */
const dialogMaintainerRef = ref(null);
const maintainerRolesTree = ref([]);
const setMaintainer = () => {
	dialogMaintainerRef.value.showDialog();
};

// 映射数组,递归获得
const maintainerMapData = (data) => {
	return data.map((item) => ({
		label: item.name,
		id: item.unique,
		children: [
			// 映射成员作为子节点
			...item.members.map((member) => ({
				label: member.name,
				id: member.unique,
			})),
			// 递归映射下级组织
			...maintainerMapData(item.subordinates),
		],
	}));
};
// 获取流程维护人列表
const handleMaintainerDialog = async () => {
	await getQueryOrgunitMembersApi(
		null,
		(data) => {
			maintainerRolesTree.value = maintainerMapData(data);
			ElMessage.success("获取人员名称列表成功");
		},
		() => {
			ElMessage.error("获取人员名称列表失败");
		},
	);
};
const handleMaintainerSave = async (selectedRoles) => {
	const roles = selectedRoles[0].label;
	await putFixAppPropertiesApi(
		{
			xid: appId,
			maintenanceIdentity: roles,
		},
		async () => {
			ElMessage.success("设置流程维护人成功");
			await fetchAppProperties();
		},
		() => {
			ElMessage.error("设置流程维护人失败");
		},
	);
};
</script>
<style scoped>
.title-container {
	margin-bottom: 10px;
	border-bottom: 1px solid gray;
}

.title {
	font-size: 20px;
	font-weight: bold;
}

.label-container {
	margin: 10px;
}

.label {
	color: rgb(218, 116, 41);
}

.icon-container {
	display: flex;
	align-items: center;
}

.mg-20 {
	margin: 5px 20px;
}

.edit-input {
	width: 50%;
}
</style>
