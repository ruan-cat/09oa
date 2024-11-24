<template>
	<div class="group">
		<div class="sidebars_content">
			<SidebarsContent
				ref="sidebarsContentRef"
				:selectedGroup="selectedGroup"
				@select-group="handleSelectGroup"
				@group-list-updated="handleGroupListUpdated"
				@addGroup="handleAddGroup"
			/>
		</div>
		<div class="details" v-if="selectedGroup">
			<div class="card" v-if="!expandedRow">
				<TabTables
					ref="tabTablesRef"
					@update-group-list="handleUpdateGroupList"
					:selectedGroup="selectedGroup"
					@reload-groups="handleReloadGroups"
				/>
			</div>
			<div v-else-if="expandedRow" class="card2">
				<ExpandedRowDetails :row="expandedRow" @close="expandedRow = null" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import TabTables from "./components/TabTables.vue";
import ExpandedRowDetails from "./components/ExpandedRowDetails.vue";
import SidebarsContent from "./components/SidebarsContent.vue";
const selectedGroup = ref(null);
const sidebarsContentRef = ref(null); // 使用 ref 来引用 SidebarsContent 组件
const tabTablesRef = ref(null);
function handleSelectGroup(group) {
	selectedGroup.value = group;
	// if (tabTablesRef.value) {
	// 	tabTablesRef.value.enableEditing();
	// }
	// if (!group.nickname) {
	// 	TabTablesProps.isEditing = true;
	// }
}
async function handleUpdateGroupList(newGroups) {
	console.log(sidebarsContentRef.value);
	await nextTick();
	if (sidebarsContentRef.value || typeof sidebarsContentRef.value.updateGroups === "function") {
		sidebarsContentRef.value.updateGroups(newGroups);
	} else {
		console.error("updateGroups 方法未定义或 sidebarsContentRef.value 未正确引用");
	}
}
function handleReloadGroups() {
	if (sidebarsContentRef.value) {
		sidebarsContentRef.value.loadGroups(); // 调用加载群组列表的方法
	}
}
async function handleAddGroup() {
	await nextTick();
	if (tabTablesRef.value || typeof tabTablesRef.value.enableEditing === "function") {
		tabTablesRef.value.enableEditing();
	} else {
		console.error("enableEditing 方法未定义或 tabTablesRef.value 未正确引用");
	}
}
function handleGroupListUpdated(newSelectedGroup) {
	selectedGroup.value = newSelectedGroup;
}
const expandedRow = ref(null);
function updateExpandedRow(row) {
	expandedRow.value = row;
}
</script>
<style scoped>
.group {
	display: flex;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	.sidebars_content {
		width: 300px;
		height: 100%;
		background-color: #f8f8f8;
	}
	.details {
		width: calc(100% - 200px);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.card {
			flex-grow: 1;
			width: 100%;
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
		}
		.card2 {
			flex-grow: 1;
			width: 100%;

			background-color: #ffffff;
			flex-direction: column;
		}
	}
}
</style>
