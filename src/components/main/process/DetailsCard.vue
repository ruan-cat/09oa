<!-- 点击卡片进入的详情卡片 -->
<template>
	<el-card shadow="never">
		<el-row>
			<el-col :span="4" class="icon-middle">
				<el-image :src="icon" style="width: 40px; height: 40px" />
			</el-col>
			<el-col :span="20">
				<div class="card-content-flex">
					<div class="title-delete">
						<span class="title">{{ title }}</span>
						<div>
							<editIcon
								theme="outline"
								size="20"
								fill="#333"
								:strokeWidth="3"
								@click="handleEdit()"
								style="cursor: pointer; margin-right: 5px"
							/>
							<deleteIcon
								theme="outline"
								size="20"
								fill="#333"
								:strokeWidth="3"
								@click="handleDelete()"
								style="cursor: pointer"
							/>
						</div>
					</div>
					<span class="time">最后一次更新：{{ time }}</span>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup>
import DetailsIcon from "@/assets/process/details_icon.png";
import { useRouter } from "vue-router";
import { Delete as deleteIcon, Edit as editIcon } from "@icon-park/vue-next";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	appId: {
		type: Number,
		required: true,
	},
	icon: {
		type: String,
		default: DetailsIcon,
	},
});
/* 父传子的事件 */
const emits = defineEmits(["edit", "delete"]);
// 修改表单方法
const handleEdit = () => {
	emits("edit", props.id);
};
// 删除表单方法
const handleDelete = () => {
	ElMessageBox.confirm("你确定要删除吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	}).then(() => {
		emits("delete", props.id, props.appId);
	});
};
</script>

<style scoped>
.card-content-flex {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 60px; /* 根据需要调整高度 */
}
.icon-middle {
	display: flex;
	align-items: center;
}
.title-delete {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title {
	font-weight: bold;
}

.time {
	color: gray;
	align-self: flex-end;
}
</style>
