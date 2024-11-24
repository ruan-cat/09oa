<script setup>
import { reactive, ref, onMounted } from "vue";
import Information from "./zheguo/children/information.vue";
import OrganizeMember from "./zheguo/children/OrganizeMember.vue";
import OrganizeProps from "./zheguo/children/OrganizeProps.vue";
import OrganizeJob from "./zheguo/children/OrganizeJob.vue";
import { GetOrgNameTreeApi, GetOrgInfoApi, deleteOrgApi } from "@/apis/organize/index";
import { Search, Plus, Delete, PriceTag, CirclePlus } from "@element-plus/icons-vue";
import { addChildNode, removeChildNode, clearForm } from "./zheguo/util/node";
/**
 * 默认的树形结构属性配置
 */
const defaultProps = {
	children: "children",
	label: "xname",
	xunique: "xunique",
	xlevel: "xlevel",
	xlevelname: "xlevelname",
	xlevelOrderNumber: "xlevelOrderNumber",
};

/**
 * 存储架构视图相关数据
 */
const TreeNodeValue = ref();
const ArchitectureValue = reactive({
	input: "",
	FormValue: {},
	iconMouseOver: "",
	activeName: "info",
	titleMessage: "",
	organizeXid: "",
	orgXunique: "",
	FormDataChildValue: {},
	TreeNode: null,
	MemberNum: 0,
	JobNum: 0,
	PropNum: 0,
	FatherNodeTitle: "",
});

/**
 * 获取侧边栏树形数据
 */

onMounted(async () => {
	const res = await GetOrgNameTreeApi(
		() => {
			ElMessage({
				type: "success",
				message: "已获取组织架构数据",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取组织架构数据失败",
			});
		},
	);

	TreeNodeValue.value = res.data;
});

/**
 * 处理树节点点击事件
 * @param {Object} data - 被点击树节点的数据
 */
const handleTreeNodeClick = (data) => {
	// 获取组织信息
	GetOrgInfoApi(
		{ xname: data.label },
		() => {
			ElMessage({
				type: "success",
				message: "已获取组织信息",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取组织信息失败",
			});
		},
	).then((res) => {
		console.log("返回的数据:", res.data);
		let val = res.data;
		ArchitectureValue.titleMessage = val.xname || "";
		ArchitectureValue.organizeXid = val.xid || "";
		ArchitectureValue.orgXunique = val.xunique || "";
		ArchitectureValue.FatherNodeTitle = data.parent.label || "";
		console.log(val);

		ArchitectureValue.FormDataChildValue = {
			...val,
		};
	});
};

/**
 * 处理鼠标悬停事件
 * @param {string} label - 悬停的标签
 */
const handleMouseOver = (label) => {
	ArchitectureValue.iconMouseOver = label;
};

/**
 * 点击增加子级控件
 * @param {Object} node - 当前节点
 */
const handleAdd = (node) => {
	ElMessageBox.confirm("你确定要新增子级节点吗", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(() => {
			ArchitectureValue.activeName = "info";
			ArchitectureValue.titleMessage = node.label || "";
			ArchitectureValue.FatherNodeTitle = node.parent.label || "";
			ArchitectureValue.TreeNode = node.data.children;
			console.log(node);
			ArchitectureValue.FormDataChildValue = clearForm();
			ElMessage({
				type: "success",
				message: "已选中节点",
			});
		})
		.catch(() => {
			ArchitectureValue.TreeNode = null;
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
	console.log(node);

	ElMessageBox.confirm("你确定要删除该节点吗", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(() => {
			// 删除子级节点
			deleteOrgApi(
				{
					xid: node.data.xid,
				},
				() => {
					removeChildNode(node);
					ElMessage({
						type: "success",
						message: "删除成功",
					});
				},
				() => {
					ElMessage({
						type: "error",
						message: "删除失败",
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
 * 子组件提交的表单数据
 * @param {Object} data - 表单数据
 */
const handleSubmitForm = (data) => {
	// 如果树节点为空对象，则提示错误
	if (ArchitectureValue.TreeNode === null) {
		ElMessage.error("请选择所属组织，或者创建一个新组织");
		return;
	}
	ArchitectureValue.FormValue = data;
	addChildNode(ArchitectureValue.TreeNode, ArchitectureValue.FormValue);
	ElMessage({
		type: "success",
		message: "已添加节点",
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
			ArchitectureValue.activeName = "info";
			ArchitectureValue.TreeNode = TreeNodeValue.value;
			ArchitectureValue.FormDataChildValue = clearForm();
			ElMessage({
				type: "success",
				message: "已选中节点",
			});
		})
		.catch(() => {
			ArchitectureValue.TreeNode = null;
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
const handleMemberNum = (num) => {
	ArchitectureValue.MemberNum = num;
};
const handleJobNum = (num) => {
	ArchitectureValue.JobNum = num;
};
const handleProps = (num) => {
	ArchitectureValue.PropNum = num;
};
</script>
<template>
	<div class="Architecture">
		<!-- 侧边栏内容区域 -->
		<div class="sidebars_content">
			<!-- 搜索框 -->
			<div class="search_box">
				<el-input v-model="ArchitectureValue.input" size="large" placeholder="请输入关键字..." :suffix-icon="Search" />
				<el-icon>
					<CirclePlus @click="AddNode" />
				</el-icon>
			</div>
			<!-- 树形控件 -->
			<div>
				<el-tree
					:default-expand-all="true"
					style="max-width: 600px; font-size: 18px"
					:data="TreeNodeValue"
					:props="defaultProps"
				>
					<template #default="{ node }">
						<p
							class="custom-tree-node"
							@mouseover="handleMouseOver(node.label)"
							@mouseleave="ArchitectureValue.iconMouseOver = ''"
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
							<span v-show="node.label === ArchitectureValue.iconMouseOver">
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
						<h2>{{ ArchitectureValue.titleMessage }}</h2>
						<p>{{ ArchitectureValue.FatherNodeTitle + "/" + ArchitectureValue.titleMessage }}</p>
					</div>
				</div>
				<!-- 表单区域 -->
				<div class="Form_card_content">
					<el-tabs v-model="ArchitectureValue.activeName" class="demo-tabs" type="border-card">
						<el-tab-pane name="info">
							<template #label>
								<span>组织信息</span>
							</template>
							<Information
								@submit-FormValue="handleSubmitForm"
								:FormDataChildValue="ArchitectureValue.FormDataChildValue"
							/>
						</el-tab-pane>
						<el-tab-pane name="member">
							<template #label>
								<span>组织成员({{ ArchitectureValue.MemberNum }})</span>
							</template>
							<OrganizeMember
								:xid="ArchitectureValue.organizeXid"
								:title="ArchitectureValue.titleMessage"
								@submit-MemberNum="handleMemberNum"
							/>
						</el-tab-pane>
						<el-tab-pane name="job">
							<template #label>
								<span>组织职务({{ ArchitectureValue.JobNum }})</span>
							</template>
							<OrganizeJob @submit-Job="handleJobNum" />
						</el-tab-pane>
						<el-tab-pane name="option">
							<template #label>
								<span>组织属性({{ ArchitectureValue.PropNum }})</span>
							</template>
							<OrganizeProps :xid="ArchitectureValue.orgXunique" @submit-Props="handleProps" />
						</el-tab-pane>
					</el-tabs>
				</div>
				<!-- 组织信息展示区域 -->
				<div style="margin-top: 20px">
					<div style="height: 30px; color: rgb(102, 102, 102); line-height: 30px; font-size: 14px; text-align: center">
						组织的全称为：{{ ArchitectureValue.FormDataChildValue.xname }}@{{
							ArchitectureValue.FormDataChildValue.xdistinguishedName
						}}@U
					</div>
					<div style="height: 30px; color: rgb(102, 102, 102); line-height: 30px; font-size: 14px; text-align: center">
						此组织为第<span>{{ ArchitectureValue.FormDataChildValue.xlevel }}</span
						>层级，层级名为：{{ ArchitectureValue.FatherNodeTitle + "/" + ArchitectureValue.titleMessage }}
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
			background-image: url("https://sample.o2oa.net/x_component_Org/$Explorer/default/icon/unit_bg.png");

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
				min-height: 460px;
				overflow: auto;
			}
		}
	}
}
</style>
