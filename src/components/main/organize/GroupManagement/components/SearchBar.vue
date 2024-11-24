<template>
	<div class="search_box">
		<el-input v-model="searchQuery" size="large" placeholder="请输入关键字..." :suffix-icon="Search" />
		<el-icon>
			<CirclePlus @click="emitAddGroup" />
		</el-icon>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { Search, CirclePlus } from "@element-plus/icons-vue";

const searchQuery = ref("");
const emit = defineEmits(["update:searchQuery", "addGroup"]);
watch(searchQuery, (newQuery) => {
	emit("update:searchQuery", newQuery);
});
function emitAddGroup() {
	emit("addGroup");
}
</script>

<style scoped>
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
</style>
