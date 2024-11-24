<!-- 创建表单页面 -->
<template>
	<fc-designer ref="designerRef" height="88vh" class="form" :config="designerConfig" @save="handleSave">
		<template #handle>
			<el-upload :show-file-list="false" :before-upload="handleImport" accept=".json">
				<el-button link>导入</el-button>
			</el-upload>
			<el-button link @click="handleExport">导出</el-button>
			<el-button type="info" size="small" :icon="Star" plain @click="handleSaveTemplate">保存为表单模板</el-button>
			<el-button type="danger" size="small" :icon="DocumentDelete" plain @click="handleDeleteTemplate"
				>删除为表单模板</el-button
			>
		</template>
	</fc-designer>
</template>
<script setup>
import "element-plus/dist/index.css";
import { ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
	putFormFixApi,
	postFormCreateApi,
	getFormSituationApi,
	getTemplateInfoApi,
	putTemplateInfoApi,
	deleteTemplateApi,
} from "@/apis/process/form.js";
import { postTemplateBuiltApi } from "@/apis/public";
import { useRoute } from "vue-router";
import { useUtilsStore } from "@/stores/utils";
import { Star, DocumentDelete } from "@element-plus/icons-vue";
// 获取工具函数
const utilsStore = useUtilsStore();
// 获取路由参数
const route = useRoute();
// 设计器响应
const designerRef = ref(null);
// 初始化字段数据
const signRef = ref(""); // 表单标识
const nameRef = ref(""); // 表单名称
const classifyRef = ref(""); // 表单分类
const describeRef = ref(""); // 表单描述
const readRef = ref("否"); // 表单是否只读
const iconRef = ref(""); // 表单图标
const aliasRef = ref(""); // 别名
// 获取路由字段id 若存在则为编辑 否则为新建
const id = computed(() => {
	return route.query.id ? route.query.id : null;
});
const templateId = computed(() => {
	return route.query.templateId ? route.query.templateId : null;
});
// 暂不使用，因为fetchFormInfo时已获取application
const appId = computed(() => {
	return route.query.appId ? route.query.appId : null;
});
const application = ref(""); // 应用标识
watch(
	() => iconRef,
	() => {
		console.log(iconRef.value);
	},
);
// 进入页面时
onMounted(async () => {
	// 从卡片进入表单
	if (id.value) {
		console.log("进入卡片表单");
		await fetchFormInfo();
	}
	// 从模板进入表单
	else if (templateId.value) {
		console.log("进入模板表单");
		// 发送表单模板api
		await fetchTemplateInfo();
	}
	// 新建表单
	else {
		console.log("进入新建表单");
	}
});
// 获取表单详细信息
const fetchFormInfo = async () => {
	await getFormSituationApi(
		{ xid: id.value },
		(data) => {
			signRef.value = data.xid;
			nameRef.value = data.xname;
			aliasRef.value = data.xalias;
			classifyRef.value = data.xcategory;
			describeRef.value = data.xdescription;
			application.value = data.xapplication;
			designerRef.value.setRule(data.xdata);
			ElMessage.success("获取表单信息成功");
		},
		() => {
			ElMessage.error("获取表单信息失败");
		},
	);
};
// 获取表单模板详情
const fetchTemplateInfo = async () => {
	await getTemplateInfoApi(
		{ id: templateId.value },
		(data) => {
			signRef.value = data.xid; // 表单标识
			nameRef.value = data.xname;
			aliasRef.value = data.xalias; // 别名
			classifyRef.value = data.xcategory; // 分类
			describeRef.value = data.xdescription;
			designerRef.value.setRule(data.xdata);
			ElMessage.success("获取模板信息成功");
		},
		() => {
			ElMessage.error("获取模板信息失败");
		},
	);
};
// 保存表单
const handleSave = async () => {
	const formData = designerRef.value.getOptions();

	// 解析并重构 formData
	const newFormData = {
		alias: formData.form.alias, // 别名
		description: formData.form.describe, // 描述
		category: formData.form.classify, // 分类
		application: application.value, // 应用标识
		hasMobile: false, // 暂不使用移动端
		name: formData.form.name, // 名称
		data: designerRef.value.getJson(), // 表单数据
		...(id.value ? { id: id.value } : {}), // 条件性添加 id 字段
	};
	if (id.value) {
		await putFormFixApi(
			newFormData,
			() => {
				ElMessage.success("修改成功");
			},
			() => {
				ElMessage.error("修改失败");
			},
		);
	} else {
		await postFormCreateApi(
			newFormData,
			() => {
				ElMessage.success("创建成功");
			},
			() => {
				ElMessage.error("创建失败");
			},
		);
	}
};
// 保存为表单模板
const handleSaveTemplate = async () => {
	const formData = designerRef.value.getOptions();
	if (templateId.value) {
		await putTemplateInfoApi(
			{
				xid: templateId.value,
				xname: formData.form.name,
				xalias: formData.form.alias,
				xdescription: formData.form.describe,
				xcategory: formData.form.classify,
				xdata: designerRef.value.getJson(),
			},
			() => {
				ElMessage.success("修改模板成功");
			},
			() => {
				ElMessage.error("修改模板失败");
			},
		);
	} else {
		await postTemplateBuiltApi(
			{
				xname: formData.form.name, // 名称
				xalias: formData.form.alias, // 别名
				xdescription: formData.form.describe, // 描述
				xcategory: formData.form.classify, // 分类
				xdata: designerRef.value.getJson(), // 数据
			},
			() => {
				ElMessage.success("保存模板成功");
			},
			() => {
				ElMessage.error("保存模板失败");
			},
		);
	}
};
// 删除表单模板
const handleDeleteTemplate = async () => {
	if (templateId.value) {
		ElMessageBox.confirm("确定删除该模板吗？", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		}).then(async () => {
			await deleteTemplateApi(
				templateId.value,
				() => {
					ElMessage.success("删除成功");
				},
				() => {
					ElMessage.error("删除失败");
				},
			);
		});
	} else {
		ElMessage.error("该表单不是模板");
	}
};
/* 导入导出JSON表单 https://pro.form-create.com/doc/render */
// 导入表单
const handleImport = (file) => {
	// 检查文件类型是否为 JSON
	const isJson = file.type === "application/json";
	if (!isJson) {
		ElMessage.error("请上传 JSON 格式的文件!");
		return false; // 阻止上传
	}
	// 使用 FileReader 读取文件内容
	const reader = new FileReader();
	// reader.onload 事件会在文件读取成功时触发
	reader.onload = (event) => {
		try {
			// 解析 JSON 数据
			const jsonData = JSON.parse(event.target.result);
			// 将数据传递给表单设计器
			designerRef.value.setRule(jsonData);
			ElMessage.success("导入成功");
		} catch (error) {
			console.error("解析 JSON 文件时出错:", error);
			ElMessage.error("解析 JSON 文件时出错，请检查文件格式!");
		}
	};
	// reader.onerror 事件会在读取文件过程中发生错误时触发
	reader.onerror = (error) => {
		console.error("读取文件时出错:", error);
		ElMessage.error("读取文件时出错，请重试!");
	};
	// 开始读取文件
	reader.readAsText(file);
	return false; // 阻止自动上传
};

// 导出表单
const handleExport = () => {
	const data = designerRef.value.getJson();
	utilsStore.download("form.json", data);
	console.log(data);
	ElMessage.success("导出成功");
};
//表单对应规则
const designerConfig = {
	showSaveBtn: true,
	// 表单配置
	formRule: {
		rule: () => [
			{
				type: "input",
				field: "sign",
				title: "标识：",
				value: signRef,
			},
			{
				type: "input",
				field: "name",
				title: "名称：",
				value: nameRef,
			},
			{
				type: "input",
				field: "alias",
				title: "别名：",
				value: aliasRef,
			},
			{
				type: "input",
				field: "describe",
				title: "描述：",
				value: describeRef,
			},
			{
				type: "input",
				field: "classify",
				title: "分类：",
				value: classifyRef,
			},
			// {
			// 	type: "radio",
			// 	field: "read",
			// 	title: "是否只读",
			// 	value: readRef,
			// 	options: [
			// 		{
			// 			value: "是",
			// 			name: "read",
			// 		},
			// 		{
			// 			value: "否",
			// 			name: "read",
			// 		},
			// 	],
			// },
			// {
			// 	type: "upload",
			// 	field: "graph",
			// 	title: "图标：",
			// 	value: iconRef,
			// 	props: {
			// 		action: "/test", // 上传的接口地址
			// 		headers: {}, // 上传时需要附带的请求头
			// 		multiple: false, // 是否支持多文件上传
			// 	},
			// },
		],
	},
	// 组件配置
	componentRule: {
		default: {
			prepend: true,
			rule: () => [
				{
					type: "input",
					field: "name-item",
					title: "名称",
				},
				{
					type: "input",
					field: "describe-item",
					title: "描述：",
				},
			],
		},
	},
};
</script>
<style scoped>
.form :deep(._fc-m-tools-r) > div:first-child {
	display: flex;
	align-items: center;
}
</style>
