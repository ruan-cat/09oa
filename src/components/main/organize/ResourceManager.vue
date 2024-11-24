<script setup>
import { reactive, onMounted } from "vue";
import ResourceMenu from "./zheguo/children/ResourceMenu.vue";
import { getResNameTree, getMenuInfoApi, addMenuApi, deleteMenuApi } from "@/apis/organize";
import ResourceAuthority from "./zheguo/children/ResourceAuthority.vue";
import { Search, Plus, Delete, PriceTag, CirclePlus } from "@element-plus/icons-vue";
import { addMenuChildNode, removeChildNode, clearMenu } from "./zheguo/util/node";
/**
 * 存储架构视图相关数据
 */
const ResourceManager = reactive({
	TreeNodeValue: [],
	input: "",
	menuLevel: null,
	iconMouseOver: "",
	activeName: "menu_info",
	titleMessage: "",
	menuID: "",
	FatherMenuID: "",
	FormDataChildValue: {},
	FatherNodeTitle: "",
	TreeNode: null,
	ListNum: 0,
});
/**
 * 默认的树形结构属性配置
 */
const defaultProps = {
	children: "children",
	label: "menu_name",
	is_button: "is_button",
	level: "level",
	link_url: "link_url",
	menu_id: "menu_id",
	menu_type: "menu_type",
	parent_id: "parent_id",
};

onMounted(async () => {
	const data = await getResNameTree(
		() => {
			ElMessage({
				type: "success",
				message: "已获取数据",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取数据失败",
			});
		},
	).then((res) => {
		ResourceManager.TreeNodeValue = res.data;
	});
});

/**
 * 处理树节点点击事件
 * @param {Object} data - 被点击树节点的数据
 */
const handleTreeNodeClick = async (data) => {
	console.log(data);

	await getMenuInfoApi(
		{
			menu_id: data.data.menu_id,
		},
		() => {
			ElMessage({
				type: "success",
				message: "已获取数据",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取数据失败",
			});
		},
	).then((res) => {
		ResourceManager.FormDataChildValue = res.data;
	});
	ResourceManager.titleMessage = data.data.menu_name || "";
	ResourceManager.menuLevel = data.data.level;
	ResourceManager.FatherNodeTitle = data.parent.data.menu_name || "";
};

/**
 * 处理鼠标悬停事件
 * @param {string} label - 悬停的标签
 */
const handleMouseOver = (label) => {
	ResourceManager.iconMouseOver = label;
};

/**
 * 点击增加子级控件
 * @param {Object} node - 当前节点
 */
const handleAdd = (node) => {
	console.log(node);

	ElMessageBox.confirm("你确定要新增子级节点吗", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(() => {
			ResourceManager.activeName = "menu_info";
			ResourceManager.TreeNode = node.data.children;
			ResourceManager.FatherMenuID = node.data.parent_id;
			ResourceManager.menuID = node.data.menu_id;
			ResourceManager.FormDataChildValue = clearMenu();
			ElMessage({
				type: "success",
				message: "已选中节点",
			});
		})
		.catch(() => {
			ResourceManager.TreeNode = null;
			ElMessage({
				type: "info",
				message: "未选中节点",
			});
		});
};

/**
 * 点击删除控件
 * @param {Object} node - 当前节点
 */
const handleDelete = (node) => {
	ElMessageBox.confirm("你确定要删除该节点吗", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(() => {
			// 删除子级节点
			removeChildNode(node);
			deleteMenuApi(
				{
					menu_id: node.data.menu_id,
				},
				() => {
					ElMessage({
						type: "success",
						message: "已删除该节点",
					});
				},
				() => {
					ElMessage({
						type: "error",
						message: "删除失败",
					});
				},
			).then((res) => {
				console.log(res);
			});
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "已撤销选择",
			});
		});
};

/**
 * 子组件提交的表单数据
 * @param {Object} data - 表单数据
 */
const handleSubmitForm = async (data) => {
	console.log(data);

	// 如果树节点为空对象，则提示错误
	if (ResourceManager.TreeNode === null) {
		ElMessage.error("请选择所属组织，或者创建一个新组织");
		return;
	}

	await ElMessageBox.confirm("你确定要保存信息并提交吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(async () => {
			addMenuChildNode(ResourceManager.TreeNode, data);
			await addMenuApi(
				{
					...data,
					menu_id: ResourceManager.menuID,
					parent_id: ResourceManager.FatherMenuID,
				},
				() => {
					ElMessage({
						type: "success",
						message: "提交成功",
					});
				},
				() => {
					ElMessage({
						type: "error",
						message: "提交失败",
					});
				},
			);
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "已撤销选择",
			});
		});
};

/**
 * 点击增加父级控件
 * @param {Object} TreeNode - 当前节点
 */
const AddNode = () => {
	ElMessageBox.confirm("你确定要新增父级节点吗", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(() => {
			ResourceManager.activeName = "menu_info";
			ResourceManager.TreeNode = ResourceManager.TreeNodeValue;
			ResourceManager.FormDataChildValue = clearForm();
			ElMessage({
				type: "success",
				message: "已选中节点",
			});
		})
		.catch(() => {
			ResourceManager.TreeNode = null;
			ElMessage({
				type: "info",
				message: "未选中节点",
			});
		});
};

/**
 * 显示子组件成员数量
 * @param num
 */
const handleListNum = (num) => {
	ResourceManager.ListNum = num;
};
</script>
<template>
	<div class="Architecture">
		<!-- 侧边栏内容区域 -->
		<div class="sidebars_content">
			<!-- 搜索框 -->
			<div class="search_box">
				<el-input v-model="ResourceManager.input" size="large" placeholder="请输入关键字..." :suffix-icon="Search" />
				<el-icon>
					<CirclePlus @click="AddNode" />
				</el-icon>
			</div>
			<!-- 树形控件 -->
			<div>
				<el-tree
					:default-expand-all="true"
					style="max-width: 600px; font-size: 18px"
					:data="ResourceManager.TreeNodeValue"
					:props="defaultProps"
				>
					<template #default="{ node }">
						<p
							class="custom-tree-node"
							@mouseover="handleMouseOver(node.label)"
							@mouseleave="ResourceManager.iconMouseOver = false"
						>
							<span style="width: 70%" @click="handleTreeNodeClick(node)">
								<span>
									<img
										style="width: 20px; height: 20px; margin-top: 2px"
										src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/unit70.png"
									/>
								</span>
								{{ node.label }}</span
							>
							<span v-show="node.label === ResourceManager.iconMouseOver">
								<el-icon>
									<Plus @click="handleAdd(node)" />
								</el-icon>
								<el-icon>
									<Delete @click="handleDelete(node)" />
								</el-icon>
							</span>
						</p>
					</template>
				</el-tree>
			</div>
		</div>
		<!-- 表单内容区域 -->
		<div class="Form_content">
			<div class="Form_content_top_bg">
				<!-- 标题区域 -->
				<div class="Form_title_bg">
					<div class="Logo_icon">
						<img src="https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/unit70.png" />
					</div>
					<div class="Logo_text">
						<h2>{{ ResourceManager.titleMessage }}</h2>
						<p>{{ ResourceManager.FatherNodeTitle + "/" + ResourceManager.titleMessage }}</p>
					</div>
				</div>
				<!-- 表单区域 -->
				<div class="Form_card_content">
					<el-tabs v-model="ResourceManager.activeName" class="demo-tabs" type="border-card">
						<el-tab-pane name="menu_info">
							<template #label>
								<span>菜单信息</span>
							</template>
							<ResourceMenu
								@submit-FormValue="handleSubmitForm"
								:FormDataChildValue="ResourceManager.FormDataChildValue"
							/>
						</el-tab-pane>
						<el-tab-pane name="authority">
							<template #label>
								<span>权限列表({{ ResourceManager.ListNum }})</span>
							</template>
							<ResourceAuthority @submit-ListNum="handleListNum" />
						</el-tab-pane>
					</el-tabs>
				</div>
				<!-- 组织信息展示区域 -->
				<div style="margin-top: 20px">
					<div style="height: 30px; color: rgb(102, 102, 102); line-height: 30px; font-size: 14px; text-align: center">
						组织的全称为：{{ ResourceManager.titleMessage }}@U
					</div>
					<div style="height: 30px; color: rgb(102, 102, 102); line-height: 30px; font-size: 14px; text-align: center">
						此组织为第<span>{{ ResourceManager.menuLevel }}</span
						>层级，层级名为：{{ ResourceManager.FatherNodeTitle + "/" + ResourceManager.titleMessage }}
					</div>
					<div style="height: 30px; color: rgb(102, 102, 102); line-height: 30px; font-size: 14px; text-align: center">
						组织创建于2021-07-20 16:17:15，最后修改于：2024-10-17 05:00:22
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.Architecture {
	width: 100%;
	height: 100%;
	display: flex;

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
				color: #898d90;
				font-size: 20px;
			}

			.el-icon:hover {
				color: #378abc;
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

	.Form_content {
		width: 100%;
		height: 100%;
		background-color: #f1f1f1;

		.Form_title_bg {
			width: 100%;
			height: 120px;
			display: flex;
			align-items: center;
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

		.Form_card_content {
			width: 100%;
			margin: 0 auto;
			background: white;

			.demo-tabs {
				height: 460px;
				overflow: auto;
			}
		}
	}
}
</style>
