<template>
	<div
		class="sidebars_content"
		v-loading.fullscreen.lock="fullscreenLoading"
		:element-loading-spinner="svg"
		element-loading-svg-view-box="-10, -10, 50, 50"
		element-loading-background="rgba(122, 122, 122, 0.8)"
	>
		<!-- 搜索框 -->
		<SearchBar @update:searchQuery="searchQuery = $event" @addGroup="addGroup" />
		<!-- 群组列表 -->
		<div class="group-list">
			<div
				v-for="group in filteredGroups"
				:key="group.id"
				class="group-item"
				@click="selectGroup(group)"
				:class="{ active: group.id === props.selectedGroup?.id }"
				@mouseover="hoveredGroupId = group.id"
				@mouseleave="hoveredGroupId = null"
			>
				<div class="group-content">
					<div class="group-icon">
						<img src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/group.png" alt="Group Icon" />
					</div>
					<span>{{ group.name }}</span>
				</div>
				<el-icon
					v-if="group.id === props.selectedGroup?.id || group.id === hoveredGroupId"
					@click.stop="deleteGroup(group.id)"
					><Delete
				/></el-icon>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, onUnmounted, defineExpose } from "vue";
import SearchBar from "./SearchBar.vue";
import { Search, Plus, Delete, PriceTag, UserFilled, CirclePlus, FolderOpened, Close } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { fetchGroupListApi, deleteGroupApi } from "@/apis/organize/group";
const props = defineProps({ selectedGroup: Object });
const emits = defineEmits(["select-group", "group-list-updated", "addGroup"]);
const searchQuery = ref("");
const groups = ref([]);
const selectedGroup = ref(null);
const hoveredGroupId = ref(null);
const unmounted = ref(false);
const fullscreenLoading = ref(false);
const openFullScreen1 = () => {
	fullscreenLoading.value = true;
	setTimeout(() => {
		fullscreenLoading.value = false;
	}, 2000);
};
const filteredGroups = computed(() => {
	return groups.value.filter((group) => (group.name ?? "").toLowerCase().includes(searchQuery.value.toLowerCase()));
});
async function loadGroups() {
	fullscreenLoading.value = true;
	console.log("开始加载群组数据");
	const params = {
		pageIndex: 1,
		pageSize: 10,
	};
	try {
		const data = await fetchGroupListApi(params);
		ElMessage({
			message: "数据加载成功",
			type: "success",
			duration: 3000,
		});
		if (!unmounted.value) {
			groups.value = data.rows;
			// selectedGroup.value = groups.value[0];
			// if (groups.value.length > 0) {
			//           selectedGroup.value = groups.value[0];
			//           // emits("select-group", groups.value[0]);
			//       }
			if (groups.value.length > 0) {
				selectGroup(groups.value[0]);
			}
		}
	} catch (error) {
		console.error("加载群组数据失败:", error);
	} finally {
		fullscreenLoading.value = false;
	}
}
function selectGroup(group) {
	selectedGroup.value = group;
	emits("select-group", group);
}
async function deleteGroup(groupId) {
	try {
		const response = await deleteGroupApi(groupId);
		console.log("删除群组响应:", response);
		if (response.code === 10000) {
			ElMessage({
				message: "删除成功",
				type: "success",
				duration: 3000,
			});
			groups.value = groups.value.filter((group) => group.id !== groupId);
			// if (selectedGroup.value?.id === groupId) {
			// 	selectedGroup.value = null;
			// 	emits("select-group", null);
			// }
			if (groups.value.length > 0) {
				selectGroup(groups.value[0]);
			}
		} else {
			ElMessage({
				message: response.message || "删除失败",
				type: "error",
				duration: 3000,
			});
		}
	} catch (error) {
		console.error("删除群组失败:", error);
		ElMessage({
			message: "网络错误或服务器问题",
			type: "error",
			duration: 3000,
		});
	}
}

function addGroup() {
	const newGroup = {
		id: "",
		name: "",
		describe: "",
		isNew: true,
	};
	groups.value.unshift(newGroup);
	selectedGroup.value = groups.value[0];
	emits("select-group", newGroup);
	emits("addGroup");
}

let intervalId;
onMounted(() => {
	loadGroups()
		.then(() => {
			if (groups.value.length > 0) {
				selectGroup(groups.value[0]);
			}
		})
		.catch((error) => {
			console.error("处理加载群组数据时出错:", error);
		});
});
onUnmounted(() => {
	unmounted.value = true;
});
// function updateGroups(newGroups) {
// 	groups.value = newGroups;
// 	emits("group-list-updated", groups.value[0]);
// }
function updateGroups(updateInfo) {
	if (typeof updateInfo === "object" && updateInfo.groups && Array.isArray(updateInfo.groups)) {
		if (updateInfo.type === "fullUpdate") {
			console.log("接收到完整群组列表更新");
			groups.value = updateInfo.groups;
		} else if (updateInfo.type === "singleUpdate") {
			console.log("接收到单个群组更新");
			const index = groups.value.findIndex((g) => g.id === updateInfo.groups[0].id);
			if (index !== -1) {
				groups.value[index] = { ...groups.value[index], ...updateInfo.groups[0] };
			} else {
				groups.value.push(updateInfo.groups[0]);
			}
		}
	} else {
		console.error("更新数据格式不正确或不包含群组信息");
	}
	emits("group-list-updated", groups.value[0]);
}

// export default {
//     updateGroups,
// };
defineExpose({ updateGroups, groups, loadGroups });
</script>
<style scoped lang="scss">
.sidebars_content {
	width: 300px;
	height: 100%;
	background-color: #f8f8f8;

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
}
</style>
