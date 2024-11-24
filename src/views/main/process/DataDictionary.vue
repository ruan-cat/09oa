<template>
	<div class="page-container">
		<!-- 左侧菜单 -->
		<aside class="sidebar">
			<h3>数据字典</h3>
			<ul>
				<li @click="createDataConfig">新建数据字典</li>
				<li v-for="(data, index) in dataList" :key="index" @click="fetchDataConfigDetail(data.id)">
					{{ data.name }}
				</li>
			</ul>
		</aside>

		<!-- JSON 编辑器 -->
		<main class="editor-container">
			<h3>新建数据字典</h3>
			<div class="editor-buttons">
				<el-button type="primary" @click="createDataConfig">创建数据配置</el-button>
				<el-button type="danger" @click="deleteDataConfig(formId)">删除数据配置</el-button>
				<el-button type="warning" @click="modifyDataConfig">修改数据配置</el-button>
				<el-button type="success" @click="fetchDataConfigList(formId)">获取数据配置列表</el-button>
				<el-button type="info" @click="fetchDataConfigDetail(formId)">获取数据配置详情</el-button>
			</div>
			<div ref="jsonEditorRef" class="json-editor"></div>
		</main>

		<!-- 属性编辑表单 -->
		<aside class="properties-container">
			<h3>属性</h3>
			<div class="tab-menu">
				<el-button type="primary" @click="activeTab = 'properties'">属性</el-button>
				<el-button type="primary" @click="activeTab = 'json'">JSON</el-button>
				<el-button type="primary" @click="activeTab = 'text'">TEXT</el-button>
			</div>
			<div v-if="activeTab === 'properties'" class="properties-form">
				<label>应用ID(不能为空)：</label>
				<el-input v-model="formData.application" />

				<label>名称(不能为空)：</label>
				<el-input v-model="formData.name" />

				<label>别名(不能为空)：</label>
				<el-input v-model="formData.alias" />

				<label>描述：</label>
				<el-input type="textarea" v-model="formData.description" />

                <label>日期及时间：</label>
				<el-input type="textarea" v-model="formData.datetimevalue" />
				<el-button type="primary" @click="confirmData">确认</el-button>
				<label>修改或查找的ID</label>
				<el-input type="textarea" v-model="formId" />
			</div>
			<div v-else-if="activeTab === 'json'">
				<pre>{{ jsonPreview }}</pre>
			</div>
			<div v-else-if="activeTab === 'text'">
				<el-input type="textarea" v-model="textPreview"></el-input>
			</div>
		</aside>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import {
	createDataConfigApi,
	modifyDataConfigApi,
	deleteDataConfigApi,
	getDataConfigDetailApi,
	getDataConfigListApi,
} from "@/apis/process/data";

const jsonEditorRef = ref(null);
let editor = null;
const formData = ref({
	// name: "",
	// alias: "",
	// application: "",
	// description: "",
	// datetimevalue:"",


"name": "name",
  "alias": "alias",
  "sequence": "string",
  "description": "",
  "application": " ",
  "distributefactor": 0,
  "text": "string",
  "booleanvalue": true,
  "datetimevalue": "2000/1/1 00:00",
  "datevalue": "2000/1/1",
  "itemprimitivetype": "o",
  "itemstringvaluetype": "s",
  "itemtype": "o",
  "numbervalue": 0,
  "timevalue": "00:00",
  "category": " ",
  "data": "string"
});

const activeTab = ref("properties");
const jsonPreview = ref("{}");
const textPreview = ref("");
const formId = ref([]); // 示例表单 ID，可以替换为实际数据
const dataList = ref([]); // 用于存储数据配置列表
onMounted(() => {
	editor = new JSONEditor(jsonEditorRef.value, {
		mode: "code",
		onChange: () => {
			jsonPreview.value = editor.getText();
		},
	});
	editor.set(formData.value);
});

onBeforeUnmount(() => {
	if (editor) {
		editor.destroy();
	}
});

function confirmData() {
	jsonPreview.value = JSON.stringify(formData.value, null, 2);
	textPreview.value = Object.entries(formData.value)
		.map(([key, val]) => `${key}: ${val}`)
		.join("\n");
}

// API 方法
const createDataConfig = async () => {
	const data = formData.value;
	console.log(data);
	await createDataConfigApi(
		data,
		(resData) => {
			console.log("数据配置创建成功:", resData);
		},
		() => {
			console.error("创建数据配置失败");
		},
	);
};

const modifyDataConfig = async () => {
	const data = formData.value;
	await modifyDataConfigApi(
		data,
		(resData) => {
			console.log("数据配置修改成功:", resData);
		},
		() => {
			console.error("修改数据配置失败");
		},
	);
};

const deleteDataConfig = async (formId) => {
	await deleteDataConfigApi(
		{ id: formId },
		(resData) => {
			console.log(`数据配置 ID ${configId} 删除成功`);
		},
		() => {
			console.error("删除数据配置失败");
		},
	);
};

const fetchDataConfigDetail = async (formId) => {
	await getDataConfigDetailApi(
		{dataid:formId},
		(resData) => {
			console.log("数据配置详情获取成功:", resData);
		},
		() => {
			console.error("获取数据配置详情失败");
		},
	);
};
const fetchDataConfigList = async (formId) => {
	await getDataConfigListApi(
		{pageIndex: 1, pageSize: 5, appid:formId},
		(resData) => {
			dataList.value = resData; // 将返回的数据赋值给 dataList
			console.log("数据配置列表获取成功:", resData);
		},
		() => {
			console.error("获取数据配置列表失败");
		},
	);
};
</script>

<style scoped>
.page-container {
	display: flex;
	height: 100vh;
}

.sidebar {
	width: 200px;
	padding: 10px;
	border-right: 1px solid #ddd;
	background-color: #f4f4f4;
}

.sidebar ul {
	list-style: none;
	padding: 0;
}

.sidebar li {
	padding: 8px;
	cursor: pointer;
}

.editor-container {
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

.editor-buttons {
	margin-bottom: 10px;
	display: flex;
	gap: 8px;
}

.json-editor {
	width: 100%;
	height: calc(100vh - 60px);
	border: 1px solid #ddd;
	background-color: #fff;
}

.properties-container {
	width: 300px;
	padding: 10px;
	border-left: 1px solid #ddd;
	background-color: #f9f9f9;
}

.tab-menu {
	display: flex;
	justify-content: space-around;
	margin-bottom: 10px;
}

.properties-form label {
	display: block;
	margin-top: 10px;
}

.properties-form input,
.properties-form textarea {
	width: 100%;
	padding: 5px;
	margin-top: 5px;
	box-sizing: border-box;
}
</style>
