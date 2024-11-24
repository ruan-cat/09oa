<!-- 新建表单页面 -->
<template>
	<div class="form-container">
		<el-form :model="form" label-width="auto" style="max-width: 600px">
			<el-button @click="handleClose">关闭</el-button>
			<el-button @click="handlePost">发布</el-button>
			<el-button type="primary" @click="handleSave">保存</el-button>
			<el-button @click="handelDelete">删除</el-button>
			<el-form-item label="创建人">
				<el-input v-model="form.xcreatorName" />
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="form.xcreateTime" />
			</el-form-item>
			<el-form-item label="标题">
				<el-input v-model="form.xfieldTitle" />
			</el-form-item>
			<el-form-item label="表单数据">
				<el-input v-model="form.xdata" />
			</el-form-item>
			<el-form-item label="描述">
				<el-input v-model="form.description" />
			</el-form-item>
			<el-button @click="handleClose">关闭</el-button>
			<el-button @click="handlePost">发布</el-button>
			<el-button type="primary" @click="handleSave">保存</el-button>
			<el-button @click="handelDelete">删除</el-button>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getNewMessageApi, postNewMessageApi, deleteMessageApi, postTempMessageApi } from "@/apis/contentindex";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const category = ref("");
const form = reactive({
	xcreateTime: "",
	xcreatorName: "",
	xdata: "",
	xfieldTitle: "无标题",
	description: "",
});
// 获取路由字段id 若存在则为编辑 否则为新建
// const id = computed(() => {
// 	return route.query.id ? route.query.id : null;
// });
const id = ref(null);
const categoryId = computed(() => {
	return route.query.categoryId ? route.query.categoryId : null;
});
// 暂不使用，因为fetchFormInfo时已获取application
const appId = computed(() => {
	return route.query.appId ? route.query.appId : null;
});

const handleSave = async () => {
	await postTempMessageApi(
		{
			documentXid: id,
			xdata: form.value,
			xfieldTitle: form.xfieldTitle,
		},
		() => {
			ElMessage.success("保存成功");
		},
		() => {
			ElMessage.error("保存失败");
		},
	);
};
const handlePost = async () => {
	await postNewMessageApi(
		{
			// xappId: appId, //应用id
			// xcategoryId: categoryId,
			xappId: "471c81a5-2e8b-4fbc-884f-5f85697fe6fc",
			xappName: "新闻",
			xcategoryId: "22db7c1a-f833-4f0b-804f-814df4bf7341",
			xcategoryName: "新闻",
			xid: "d7a5521d-4ab9-413a-8e5a-cb1d669c19be",
			xcreateTime: form.xcreateTime,
			xtitle: form.xfieldTitle,
			xcreatorPerson: form.xcreatorName,
		},
		() => {
			ElMessage.success("发布消息成功");
		},
		() => {
			ElMessage.error("发布消息失败");
		},
	);
};
const handelDelete = async () => {
	await deleteMessageApi(
		{
			ids: "2aaf413f-24aa-47e7-912f-29a670b3d151",
		},
		() => {
			ElMessage.success("删除成功");
		},
		() => {
			ElMessage.error("删除失败");
		},
	);
};

//关闭
const handleClose = () => {
	router.push("/contentindex/FixedAsset");
};

//获取新建消息编辑
const fetchMessage = async () => {
	if (id) {
		await getFixedMessageApi(
			{
				xid: 1,
			},
			(data) => {
				form.xcreateTime = data.xcreateTime;
				form.xcreatorName = data.xcreatorName;
				form.xdata = data.xdata;
				form.xfieldTitle = data.xfieldTitle;
				ElMessage.success("查询修改信息成功");
			},
			() => {
				ElMessage.error("查询修改信息失败");
			},
		);
	} else {
		await getNewMessageApi(
			{
				xid: 1,
			},
			(data) => {
				form.xcreateTime = data.xcreateTime;
				form.xcreatorName = data.xcreatorName;
				form.xdata = data.xdata;
				form.xfieldTitle = data.xfieldTitle;
				ElMessage.success("获取新建消息编辑成功");
			},
			() => {
				ElMessage.error("获取新建消息编辑失败");
			},
		);
	}
};
onMounted(async () => {
	await fetchMessage();
});
</script>

<style scoped>
body,
html,
.el-main {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	/* 使页面充满视口高度 */
	width: 100%;
	margin: 0;
	/* 移除默认的 margin */
}

.form-container {
	display: flex;
	flex-direction: column;
	border: 1px solid #ccc;
	/* 边框颜色和样式 */
	border-radius: 8px;
	/* 圆角边框 */
	padding: 20px;
	/* 内边距 */
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	/* 阴影效果 */
	background-color: #fff;
	/* 背景颜色 */
	width: 100%;
	/* 容器宽度 */
	max-width: 600px;
	/* 最大宽度 */
	margin-top: auto;
	justify-content: center;
}
</style>
