<template>
	<div class="group">
		<!-- 侧边栏内容区域 -->
		<div class="sidebars_content">
			<!-- 搜索框 -->
			<div class="search_box">
				<el-input v-model="searchQuery.value" size="large" placeholder="请输入关键字..." :suffix-icon="Search" />
				<el-icon>
					<CirclePlus @click="addGroup" />
				</el-icon>
			</div>
			<div class="group-list">
				<div
					v-for="group in filteredGroups"
					:key="group.id"
					class="group-item"
					@click="selectGroup(group)"
					:class="{ active: group.id === selectedGroup?.id }"
					@mouseover="hoveredGroupId = group.id"
					@mouseleave="hoveredGroupId = null"
				>
					<div class="group-content">
						<div class="group-icon">
							<img src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/group.png" alt="Group Icon" />
						</div>
						<span>{{ group.nickname }}</span>
					</div>
					<el-icon
						v-if="group.id === selectedGroup?.id || group.id === hoveredGroupId"
						@click.stop="deleteGroup(group.id)"
						><Delete
					/></el-icon>
				</div>
			</div>
		</div>
		<div v-if="selectedGroup" class="details">
			<div class="card" v-if="!expandedRow">
				<div class="card-header">
					<div class="Logo_icon">
						<img src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/unit70.png" />
					</div>
					<div class="Logo_text">
						<h2>{{ selectedGroup?.nickname }}</h2>
						<p>{{ selectedGroup.nickname }}@{{ selectedGroup.id }}@G</p>
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
											v-model="selectedGroup.description"
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
						<el-tab-pane label="个人成员" name="individual-members">
							<div class="group-details">
								<el-table :data="personnelData" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column fixed type="selection" width="55"></el-table-column>
									<el-table-column fixed prop="name" label="人员名称" width="120"></el-table-column>
									<el-table-column prop="employeeNumber" label="人员工号" width="120"></el-table-column>
									<el-table-column prop="phoneNumber" label="手机号码" width="120"></el-table-column>
									<el-table-column prop="email" label="电子邮件" width="120"></el-table-column>
									<el-table-column min-width="150" class="centered-column">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
						<el-tab-pane label="身份成员" name="identity-members">
							<div class="group-details">
								<el-table :data="organizationData" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="organizationName" label="人员名称"></el-table-column>
									<el-table-column prop="hierarchyName" label="层次名称"></el-table-column>
									<el-table-column min-width="150">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
						<el-tab-pane label="群组成员" name="group-members">
							<div class="group-details">
								<el-table :data="groupData" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="groupName" label="群组名称"></el-table-column>
									<el-table-column prop="groupFullName" label="群组全称"></el-table-column>
									<el-table-column min-width="150">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
						<el-tab-pane label="组织成员" name="organization-members">
							<div class="group-details">
								<el-table :data="organizationData" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="organizationName" label="组织名称"></el-table-column>
									<el-table-column prop="hierarchyName" label="层次名称"></el-table-column>
									<el-table-column min-width="150">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
			</div>

			<div v-else-if="expandedRow" class="card2">
				<div class="card-header">
					<div class="close-icon">
						<el-icon @click="closeExpandedView"><Close /></el-icon>
					</div>
					<div class="Logo_icon">
						<img src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/unit70.png" />
					</div>
					<div class="Logo_text">
						<h2>{{ expandedRow.nickname }} ({{ expandedRow.employeeNumber }})</h2>
						<div class="user-actions">
							<el-button type="warning">禁用用户</el-button>
							<el-button type="danger">锁定用户</el-button>
							<el-button type="info">密码到期时间</el-button>
							<el-button type="success">重置密码</el-button>
						</div>
					</div>
				</div>
				<div class="card-content">
					<el-tabs v-model="activeTab" class="tabs">
						<el-tab-pane label="人员信息" name="group-info">
							<el-form ref="groupForm" class="form-layout">
								<div class="form-row">
									<el-form-item label="人员名称" class="half-width">
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
								<div class="form-row">
									<el-form-item label="手机号码" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="人员工号" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="form-row">
									<el-form-item label="性别" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="汇报对象" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="form-row">
									<el-form-item label="电子邮件" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="微信号" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="form-row">
									<el-form-item label="QQ号码" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="办公电话" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="form-row">
									<el-form-item label="入职时间" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="出生日期" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="form-row">
									<el-form-item label="登录IP" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="描述" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="form-row">
									<el-form-item label="密码标识" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.name"
											:readonly="!isEditing"
										/>
									</el-form-item>
									<el-form-item label="状态" class="half-width">
										<input
											:class="isEditing ? 'full-input' : 'readonly-input-line'"
											v-model="selectedGroup.id"
											:readonly="!isEditing"
										/>
									</el-form-item>
								</div>
								<div class="centered-button">
									<el-button v-if="!isEditing" type="primary" @click="isEditing = true">编辑人员信息</el-button>
									<el-button v-if="isEditing" type="danger" @click="saveGroupInfo">保存人员信息</el-button>
									<el-button v-if="isEditing" @click="cancelEdit">取消</el-button>
								</div>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="个人属性" name="individual-members">
							<div class="group-details">
								<el-table :data="personnelData" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column fixed type="selection" width="55"></el-table-column>
									<el-table-column fixed prop="name" label="属性" width="120"></el-table-column>
									<el-table-column prop="employeeNumber" label="值" width="120"></el-table-column>
									<el-table-column prop="phoneNumber" label="描述" width="120"></el-table-column>
									<el-table-column min-width="150" class="centered-column">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
						<el-tab-pane label="个人身份" name="identity-members">
							<div class="group-details">
								<el-table :data="organizationData" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="organizationName" label="属性"></el-table-column>
									<el-table-column prop="organizationName" label="值"></el-table-column>
									<el-table-column prop="hierarchyName" label="描述"></el-table-column>
									<el-table-column min-width="150">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
						<el-tab-pane label="个人角色" name="group-members">
							<div class="group-details">
								<el-table :data="groupData" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="groupName" label="角色名称"></el-table-column>
									<el-table-column prop="groupFullName" label="角色全称"></el-table-column>
									<el-table-column prop="groupFullName" label="描述"></el-table-column>
									<el-table-column min-width="150">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
						<el-tab-pane label="组织成员" name="organization-members">
							<div class="group-details">
								<el-table :data="organizationData" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="organizationName" label="组织名称"></el-table-column>
									<el-table-column prop="hierarchyName" label="层次名称"></el-table-column>
									<el-table-column min-width="150">
										<template #header>
											<div class="table-header-actions">
												<el-button class="add-button" type="primary"
													><el-icon><Plus /></el-icon>添加</el-button
												>
												<el-button :disabled="!selectedRow" type="danger"
													><el-icon><Delete /></el-icon>删除</el-button
												>
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
			</div>
			<div class="group-info">
				<p>群组的全称为：{{ selectedGroup?.nickname }}</p>
				<p>群组建立于时间：{{ selectedGroup?.creationDate }}，最后修改时间：{{ selectedGroup?.lastModifiedDate }}</p>
				<!-- <p>最后修改时间：{{ currentTime }}</p> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import { Search, Plus, Delete, PriceTag, UserFilled, CirclePlus, FolderOpened, Close } from "@element-plus/icons-vue";
import { fetchGroupListApi } from "@/apis/organize/group";
// const groups = ref([
// { id: 1, name: 'Group 1', creationDate: '2023-10-25 16:58:23', lastModifiedDate: '2023-10-25 16:58:23' },
// { id: 2, name: 'Group 2', creationDate: '2023-10-25 16:58:23', lastModifiedDate: '2023-10-25 16:58:23' },
// { id: 3, name: 'Group 3', creationDate: '2023-10-25 16:58:23', lastModifiedDate: '2023-10-25 16:58:23' },
// { id: 4, name: 'Group 4', creationDate: '2023-10-25 16:58:23', lastModifiedDate: '2023-10-25 16:58:23' }
// ]);
const hoveredGroupId = ref(null);
const groups = ref([]);
const searchQuery = ref("");
const selectedGroup = ref(null);
const activeTab = ref("group-info");
const currentTime = ref(new Date().toLocaleString());
const isEditing = ref(false);
const editGroup = reactive({ id: "", name: "", description: "" });
const expandedRow = ref(null);
function loadGroups() {
	console.log("开始加载群组数据");
	const params = {
		pageIndex: 1,
		pageSize: 10,
		id: "1234",
		name: "zhangsan",
	};
	// console.log("调用 API 参数:", params);
	fetchGroupListApi(
		params,
		(data) => {
			// console.log("API 调用成功，数据:", data);
			groups.value = data.rows;
		},
		(error) => {
			console.error("加载群组数据失败:", error);
			console.error("API 调用失败:", error);
		},
	);
}

function expandDetails(row) {
	expandedRow.value = row;
}
function closeExpandedView() {
	expandedRow.value = null;
}
const filteredGroups = computed(() => {
	return groups.value.filter((group) => (group.nickname ?? "").toLowerCase().includes(searchQuery.value.toLowerCase()));
});
const selectedRow = ref(null);
const personnelData = ref([
	{ name: "John Doe", employeeNumber: "123", phoneNumber: "1234567890", email: "john.doe@example.com" },
	{ name: "Jane Smith", employeeNumber: "456", phoneNumber: "0987654321", email: "jane.smith@example.com" },
	{ name: "John Doe", employeeNumber: "123", phoneNumber: "1234567890", email: "john.doe@example.com" },
	{ name: "Jane Smith", employeeNumber: "456", phoneNumber: "0987654321", email: "jane.smith@example.com" },
]);

const groupData = ref([
	{ groupName: "Group A", groupFullName: "Full Group A" },
	{ groupName: "Group B", groupFullName: "Full Group B" },
]);

const organizationData = ref([
	{ organizationName: "Org 1", hierarchyName: "Hierarchy 1" },
	{ organizationName: "Org 2", hierarchyName: "Hierarchy 2" },
]);

function handleSelectionChange(selection) {
	selectedRow.value = selection.length > 0 ? selection[0] : null;
}

function selectGroup(group) {
	selectedGroup.value = group;
}
// function addGroup() {
// const newId = groups.value.length + 1;
// groups.value.push({ id: newId, name: `Group ${newId}` });
// }
/**
 * 点击增加新控件
 * @param {Object} TreeNode - 当前节点
 */
const addGroup = () => {
	// ArchitectureValue.TreeNode = TreeNodeValue.value;
	// ArchitectureValue.FormDataChildValue = clearForm();
	const newId = groups.value.length + 1;
	groups.value.push({ id: newId, name: `Group ${newId}` });
};

function deleteGroup(groupId) {
	groups.value = groups.value.filter((group) => group.id !== groupId);
	if (selectedGroup.value?.id === groupId) {
		selectedGroup.value = null;
	}
}

function saveGroupInfo() {
	//Object.assign(selectedGroup.value, editGroup);
	isEditing.value = false;
}
function cancelEdit() {
	isEditing.value = false;
}
let intervalId;
onMounted(() => {
	loadGroups();
	intervalId = setInterval(() => {
		currentTime.value = new Date().toLocaleString();
	}, 1000);
	selectedGroup.value = groups.value[0];
});

onUnmounted(() => {
	clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.readonly-input .el-input__wrapper {
	border: none;
	border-bottom: 1px solid #dcdfe6;
	border-radius: 0;
}

.readonly-input .el-input__inner:hover {
	border-color: #c0c4cc;
}

.readonly-input .el-input__inner:focus {
	border-color: #409eff;
}
::v-deep .el-input__inner {
	border: none;
}
.group-details {
	overflow: auto;
	height: calc(100vh - 200px);
	.centered-column {
		.table-header-actions,
		.table-row-actions {
			left: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

.group {
	display: flex;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	.sidebars_content {
		width: 300px;
		height: 100%;
		background-color: #f8f8f8;

		.search_box {
			margin: 10px;
			width: 280px;
			align-items: center;
			justify-content: space-between;
			display: flex;

			.el-input {
				width: 240px;
			}

			.el-icon {
				cursor: pointer;
				color: #c0c4cc;
				font-size: 30px;
			}

			.el-icon:hover {
				color: #378abc;
			}
		}
		.group-item:hover {
			background-color: #e3ecf5;
			cursor: pointer;
			color: #898d90;
			.el-icon {
				cursor: pointer;
				color: #8ec6f1;
				font-size: 20px;
				font-weight: bold;
			}
		}
		.group-list {
			display: flex;
			flex-direction: column;
			.group-item {
				padding: 10px;
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				align-items: center;
				transition: background-color 0.3s;
				cursor: pointer;
				.group-icon {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 10px;
					img {
						width: 100%;
						height: auto;
					}
				}
				.group-content {
					display: flex;
					align-items: center;
					.group-icon {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						overflow: hidden;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 10px;
						img {
							width: 100%;
							height: auto;
						}
					}
				}
				&.active {
					background-color: #4a90e2;
					color: white;
					.el-icon {
						color: white;
						font-size: 20px;
					}
					&:hover {
						background-color: #4a90e2;
					}
				}
			}
		}
		.custom-tree-node {
			display: flex;
			justify-content: space-between;
			width: 100%;

			.el-icon {
				cursor: pointer;
				color: #898d90;
				margin-right: 10px;
			}

			.el-icon:hover {
				color: #378abc;
			}
		}
	}
}

.details {
	width: calc(100% - 200px);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.tabs {
		.el-button {
			margin-right: 10px;
		}
		margin: 0 auto;
		.el-tabs__header {
			justify-content: center;
		}
		::v-deep .el-tabs__header {
			justify-content: center;
			display: flex;
			width: 100%;
		}
		::v-deep .el-tabs__nav-wrap {
			justify-content: center;
			display: flex;
			width: 100%;
		}
	}
	.card {
		flex-grow: 1;
		width: 100%;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
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
			overflow: scroll;
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
	}
	.card2 {
		flex-grow: 1;
		width: 100%;

		background-color: #ffffff;
		flex-direction: column;
		.card-header {
			width: 100%;
			height: 120px;
			display: flex;
			align-items: center;
			font-size: 20px;
			margin-bottom: 10px;
			background-image: url("https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/person_bg.png");
			.close-icon {
				position: absolute;
				top: 5px;
				left: 10px;
				font-size: 30px;
				cursor: pointer;
			}
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
			overflow: scroll;
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
	}
	.group-info {
		font-size: 16px;
		height: 25%;
		padding: 10px;
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
	}

	.group-info p {
		margin: 5px 0;
		width: 100%;
		text-align: center;
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
}
</style>
