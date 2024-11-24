<!-- 刚进入 Process 页面时，展示的卡片 -->
<template>
	<el-card class="card-container" shadow="hover">
		<!-- 右上角的未分类应用文字 -->
		<div class="top-right-text">{{ type ? type : "未分类应用" }}</div>
		<div class="bottom-right-icon">
			<el-button :icon="Delete" link @click="handleDelete()" />
		</div>
		<div class="card-content">
			<div class="left-section" @click="openDetail()">
				<el-image style="width: 50px; height: 50px" :src="icon" fit="fill" />
				<span class="left-text">{{ name }}</span>
				<span class="desc-text">{{ desc ? desc : "此应用没有描述" }}</span>
			</div>
			<div class="right-section">
				<div class="right-item">
					【表单】
					<span class="right-text">
						<!-- 渲染表单标签 -->
						<el-tag
							v-for="form in formList"
							:key="form.xid"
							type="info"
							class="form-tag"
							@click="handleFormTag(form.xid)"
						>
							{{ form.xname }}
							<!-- 显示表单名称 -->
						</el-tag>
						<span v-if="formList.length === 0">此应用没有表单，点击此处创建新表单</span>
					</span>
				</div>
				<div class="right-item" style="margin-top: 20px">
					【流程】
					<span class="right-text">此应用没有流程，点击此处创建新流程</span>
				</div>
			</div>
		</div>
	</el-card>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import icon from "@/assets/process/office.png";
import { deleteApplicationDeleteApi } from "@/apis/process/index.js";
import { getFormListApi } from "@/apis/process/form.js";
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
const router = useRouter();
const props = defineProps({
	name: String, // 应用名称
	desc: String, // 应用描述
	type: String, // 应用类型
	id: Number, // 应用id
});
const formList = ref([]);
// 打开卡片详情页
const openDetail = () => {
	router.push(`/process/details/${props.id}`);
};
const handleFormTag = (id) => {
	router.push({
		name: "FormManage",
		query: { id },
	});
};
// 删除应用卡片
const handleDelete = () => {
	ElMessageBox.confirm("确定要删除此应用吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	}).then(async () => {
		await deleteApplicationDeleteApi(
			props.id,
			() => {
				ElMessage.success("删除成功");
			},
			() => {
				ElMessage.error("删除失败");
			},
		);
	});
};
// 获取表单列表
const fetchFormList = async () => {
	await getFormListApi(
		{ pageIndex: 1, pageSize: 6, xapplication: props.id },
		(data) => {
			formList.value = data.rows;
		},
		() => {
			console.log("获取表单列表失败，请稍后再试");
		},
	);
};
onMounted(async () => {
	await fetchFormList();
});
</script>
<style scoped>
.card-container {
	height: 180px;
	position: relative; /* 使子元素的绝对定位基于此容器 */
	min-width: 510px;
}
/* 右上角的未分类应用文字样式 */
.top-right-text {
	width: 80px;
	position: absolute;
	top: 10px; /* 距离顶部的距离，根据需要调整 */
	right: 0px; /* 距离右侧的距离，根据需要调整 */
	font-size: 11px;
	color: #333;
	background-color: #f0f0f0;
	padding: 0 5px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	text-align: center;
	height: 20px;
	line-height: 20px;
}
.bottom-right-icon {
	width: 80px;
	position: absolute;
	bottom: 10px; /* 距离顶部的距离，根据需要调整 */
	right: 0px; /* 距离右侧的距离，根据需要调整 */
	font-size: 11px;
	padding: 0 5px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	text-align: center;
	height: 20px;
	line-height: 20px;
}
:deep(.el-card__body) {
	height: 100%;
}
.card-content {
	height: 100%;
	display: flex;
	align-items: center;
}
/* 左侧占30%，并添加右边框作为分隔线 */
.left-section {
	cursor: pointer;
	flex: 0 0 30%;
	border-right: 1px solid #e6e6e6; /* 分隔线颜色 */
	padding-right: 20px; /* 分隔线右侧的内边距，避免内容紧贴分隔线 */
	box-sizing: border-box; /* 确保内边距不影响总宽度 */
	display: flex;
	flex-direction: column;
	align-items: center; /* 水平居中 */
	justify-content: center; /* 垂直居中 */
	text-align: center; /* 文本居中 */
}
/* 右侧占70% */
.right-section {
	flex: 0 0 70%;
	padding-left: 20px; /* 分隔线左侧的内边距，避免内容紧贴分隔线 */
	box-sizing: border-box;

	display: flex;
	flex-direction: column; /* 纵向排列 */
	justify-content: center; /* 垂直居中 */
	gap: 10px; /* 子元素之间的间距 */
}

/* 右侧子项样式 */
.right-item {
	font-size: 16px;
	color: #333;
	display: flex;
	align-items: center;
}

.left-text {
	margin-top: 10px; /* 图标与文字之间的间距 */
	font-size: 16px;
	color: #333;
}
.desc-text {
	margin-top: 10px;
	font-size: 12px;
	color: #999999;
}
.right-text {
	font-size: 14px;
	color: rgb(153, 153, 153);
}
.form-tag {
	margin-right: 10px;
	cursor: pointer;
}
</style>
