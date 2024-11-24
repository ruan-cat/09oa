<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import EditLocationDialog from "./EditLocationDialog.vue";
import { deleteLocationApi } from "@/apis/meeting";

const visible = ref(false);
const emit = defineEmits(["deleteSuccess"]);

const props = defineProps({
	location: {
		type: Object,
		required: true,
	},
});

const editLocationDialog = ref();
const handleEdit = () => {
	editLocationDialog.value.open(props.location);
};

const handleDelete = () => {
	visible.value = false;
	deleteLocation();
};

//是否能删除会议室位置的条件判断在前端还是后端？
const deleteLocation = async () => {
	await putLocationModifyApi(
		location.mettingbuild,
		() => {
			ElMessage.success("删除成功");
			emit("deleteSuccess");
		},
		() => {
			ElMessage.error("删除失败");
		},
	);
};
</script>

<template>
	<el-popover v-model:visible="visible" trigger="hover" placement="top" width="200">
		<div class="icon-popover-content">
			<p>{{ location.mettingbuild }}</p>
			<div class="icon-box">
				<el-icon @click="handleEdit" :size="20" class="icon">
					<Edit />
				</el-icon>
				<el-icon @click="handleDelete" :size="20" class="icon">
					<Delete />
				</el-icon>
			</div>
			<EditLocationDialog ref="editLocationDialog" />
		</div>
		<template #reference>
			<slot></slot>
		</template>
	</el-popover>
</template>

<style scoped>
.icon-box {
	display: flex;
	justify-content: flex-end;
}
.icon:hover {
	color: #4a90e2;
	cursor: pointer;
}
</style>
