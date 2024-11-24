<template>
	<!-- 用户界面容器 -->
	<div class="user-container">
		<!-- 用户头像和名称展示 -->
		<div style="display: flex; align-items: center; justify-content: center; margin-top: 1vh">
			<div style="margin-right: 50px">
				<el-avatar :size="50" :src="circleUrl" />
			</div>
			<div>
				<div>{{ information.find((item) => item.name === "人员名称:")?.value }}</div>
				<div>{{ information.find((item) => item.name === "唯一编码:")?.value }}</div>
			</div>
		</div>
		<div>
			<!-- 导航菜单 -->
			<el-menu
				:default-active="activeIndex"
				class="el-menu"
				mode="horizontal"
				style="display: flex; justify-content: center; margin-top: 1vh"
				@select="handleSelect"
			>
				<el-menu-item index="1">人员信息</el-menu-item>
				<el-menu-item index="2">个人属性</el-menu-item>
				<el-menu-item index="3">个人身份</el-menu-item>
				<el-menu-item index="4">个人角色</el-menu-item>
			</el-menu>
			<!-- 角色信息展示 -->
			<template v-if="activeIndex === '1'">
				<el-descriptions class="margin-top" :column="2" size="large">
					<el-descriptions-item :label="item.name" v-for="item in information">
						<el-input v-model="item.value" style="width: 250px" placeholder="item.value" :disabled="isEdit" />
					</el-descriptions-item>
				</el-descriptions>
				<div style="width: 100%" class="margin-btn">
					<el-button type="info" plain @click="handleEdit()">{{ isEdit ? "编辑信息" : "保存信息" }}</el-button>
				</div>
			</template>
			<!-- 个人成员信息展示 -->
			<template v-if="activeIndex === '2'">
				<el-table :data="attribute" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="attribute" label="属性" width="180" />
					<el-table-column prop="key" label="值" width="180" />
					<el-table-column prop="describe" label="描述" width="180" />
					<el-table-column align="right">
						<template #header>
							<el-button size="small" @click="handleAdd()"> 添加 </el-button>
							<el-button size="small" type="danger" @click="handleDelete()"> 删除 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 群组成员信息展示 -->
			<template v-if="activeIndex === '3'">
				<el-table :data="Identy" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="Name" label="身份名称" width="180" />
					<el-table-column prop="Organ" label="所在组织" width="180" />
					<el-table-column prop="Code" label="唯一编码" width="180" />
					<el-table-column prop="Post" label="担任职位" width="180" />
					<el-table-column prop="Ide" label="主身份" width="180" />
					<el-table-column align="right">
						<template #header>
							<el-button size="small" @click="handleAdd()"> 添加 </el-button>
							<el-button size="small" type="danger" @click="handleDelete()"> 删除 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 个人角色信息展示 -->
			<template v-if="activeIndex === '4'">
				<el-table :data="Role" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="Name" label="角色名称" width="180" />
					<el-table-column prop="FullName" label="角色全称" width="180" />
					<el-table-column prop="Discription" label="角色描述" />
					<el-table-column align="right">
						<template #header>
							<el-button size="small" @click="handleAdd()"> 添加 </el-button>
							<el-button size="small" type="danger" @click="handleDelete()"> 删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 对话框 -->
			<PeopleTree
				ref="peopleTreeRef"
				:title="activeIndex === '2' ? '选择属性' : activeIndex === '3' ? '选择身份' : '选择角色'"
				@save="handleSaveSelection"
			/>
		</div>
		<div class="user-container-bottom">
			<div>用户的全称为：{{ information.find((item) => item.name === "人员名称:")?.value }}</div>
			<div>
				用户创建于：{{ attribute.find((item) => item.attribute === "xcreateTime")?.key }}, 用户更新于：{{
					attribute.find((item) => item.attribute === "xupdateTime")?.key
				}}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { reactive, toRefs } from "vue";
import PeopleTree from "@/components/main/public/PeopleTree.vue";
import { useOrganizeStore } from "@/stores/organize/role";
import "@/apis/organize/person";

const organizeStore = useOrganizeStore();
const state = reactive({
	circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const { circleUrl } = toRefs(state);
const activeIndex = ref("1");

const attribute = ref<any[]>([]);
const Identy = ref<any[]>([]);
const Role = ref<any[]>([]);
const props = defineProps(["roleID"]);
const isEdit = ref(true);
// 添加类型定义
interface FieldMapping {
	[key: string]: string;
}
// 添加字段映射对象
const fieldMapping: FieldMapping = {
	xname: "人员名称:",
	xunique: "唯一编码:",
	xmobile: "手机号码:",
	xemployee: "人员工号:",
	xgenderType: "性别:",
	xsuperior: "汇报对象:",
	xmail: "电子邮件:",
	xweixin: "微信号:",
	xqq: "QQ号码:",
	xofficePhone: "办公电话:",
	xboardDate: "入职时间:",
	xbirthDate: "出生日期:",
	xbirthday: "登录IP:",
	xdescription: "描述:",
	xsubjectSecurityClearance: "密级标识:",
	xstatus: "状态:",
	xid: "ID:",
};

// 添加反向字段映射对象
const reverseFieldMapping: FieldMapping = {
	"人员名称:": "xname",
	"唯一编码:": "xunique",
	"手机号码:": "xmobile",
	"人员工号:": "xemployee",
	"性别:": "xgenderType",
	"汇报对象:": "xsuperior",
	"电子邮件:": "xmail",
	"微信号:": "xweixin",
	"QQ号码:": "xqq",
	"办公电话:": "xofficePhone",
	"入职时间:": "xboardDate",
	"出生日期:": "xbirthday",
	"登录IP:": "xipAddress",
	"描述:": "xdescription",
	"密级标识:": "xsubjectSecurityClearance",
	"状态:": "xstatus",
	"ID:": "xid",
};

// 添加信息项接口
interface InformationItem {
	name: string;
	value: string;
}
// 修改information的类型
const information = ref<InformationItem[]>([]);
const multipleSelection = ref<any[]>([]);

// 处理表格选择变化
const handleSelectionChange = (val: any) => {
	multipleSelection.value = val;
};
const handleSelect = (key: string) => {
	activeIndex.value = key;
};
const handleAdd = () => {
	peopleTreeRef.value?.showDialog();
};
// 处理删除成员
const handleDelete = () => {
	if (multipleSelection.value.length === 0) {
		ElMessage.warning("请选择要删除的数据");
		return;
	}

	ElMessageBox.confirm("确认删除选中的数据吗?", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(() => {
			if (activeIndex.value === "2") {
				attribute.value = attribute.value.filter((item: any) => !multipleSelection.value.includes(item));
			} else if (activeIndex.value === "3") {
				Identy.value = Identy.value.filter((item: any) => !multipleSelection.value.includes(item));
			} else if (activeIndex.value === "4") {
				Role.value = Role.value.filter((item: any) => !multipleSelection.value.includes(item));
			}
			ElMessage.success("删除成功");
		})
		.catch(() => {
			// 取消删除操作
		});
};

const handleEdit = () => {
	isEdit.value = !isEdit.value;
	if (isEdit.value) {
		updatePersonInfo();
	}
};

// 获取个人详情
const queryPersonInfo = async () => {
	const data: string = organizeStore.selectRoleUniqueId;
	try {
		await queryPersonInfoApi(
			data,
			(res: any) => {
				console.log(res);
				// 使用映射转换字段名
				information.value = Object.entries(res).map(([key, value]) => ({
					name: fieldMapping[key] || key, // 如果没有映射则使用原字段名
					value: String(value),
				}));
			},
			() => {
				ElMessage.error("获取个人详情失败1");
			},
		);
	} catch (err) {
		ElMessage.error("获取个人详情失败");
	}
};
// 获取个人角色
const queryPersonRole = async () => {
	const data = {
		pageIndex: 1,
		pageSize: 10,
		xid: organizeStore.selectRole,
	};
	try {
		await queryPersonRoleApi(
			data,
			(res: any) => {
				Role.value = res.rows.map((item: any) => ({
					Name: item.xname,
					FullName: item.xdistinguishedName,
					Discription: item.xdescription,
				}));
			},
			() => {
				ElMessage.error("获取个人角色失败1");
			},
		);
	} catch (err) {
		ElMessage.error("获取个人角色失败");
		console.log(err);
	}
};
// 获取个人属性
const queryPersonProps = async () => {
	try {
		await queryPersonPropsApi(
			organizeStore.selectRoleUniqueId,
			(res: any) => {
				attribute.value.push({
					attribute: "xcreateTime",
					key: res.xcreateTime,
					describe: "创建时间",
				});
				attribute.value.push({
					attribute: "xupdateTime",
					key: res.xupdateTime,
					describe: "更新时间",
				});
			},
			() => {
				ElMessage.error("获取个人属性失败2");
			},
		);
	} catch (err) {
		ElMessage.error("获取个人属性失败");
	}
};
// 获取个人身份
const queryPersonIdenty = async () => {
	try {
		const data = {
			pageIndex: 1,
			pageSize: 10,
			xid: organizeStore.selectRole,
		};
		await queryPersonIdentyApi(
			data,
			(res: any) => {
				Identy.value = res.rows.map((item: any) => ({
					Name: item.xname,
					Organ: item.xunitName,
					Code: item.xunique,
					Post: item.xmajor,
					Ide: item.xdistinguishedName,
				}));
			},
			() => {
				ElMessage.error("获取个人身份失败3");
			},
		);
	} catch (err) {
		ElMessage.error("获取个人身份失败");
	}
};
// 修改个人信息
const updatePersonInfo = async () => {
	try {
		// 将数组转换为API所需的对象格式
		const apiData = information.value.reduce((acc: any, curr) => {
			const apiField = reverseFieldMapping[curr.name];
			if (apiField) {
				// 对密级标识进行特殊处理，转换为数字
				if (apiField === "xsubjectSecurityClearance") {
					acc[apiField] = parseInt(curr.value) || 0;
				} else {
					acc[apiField] = curr.value;
				}
			}
			return acc;
		}, {});

		await updatePersonInfoApi(
			apiData,
			(res: any) => {
				ElMessage.success("修改个人信息成功");
			},
			() => {
				ElMessage.error("修改个人信息失败");
			},
		);
	} catch (err) {
		ElMessage.error("修改个人信息失败");
	}
};
onMounted(async () => {
	await queryPersonInfo();
	await queryPersonRole();
	await queryPersonProps();
	await queryPersonIdenty();
});

// 添加 peopleTreeRef
const peopleTreeRef = ref<InstanceType<typeof PeopleTree> | null>(null);

// 添加处理保存选择的方法
const handleSaveSelection = (selectedRoles: any[]) => {
	// 根据当前激活的标签处理不同类型的数据
	if (activeIndex.value === "2") {
		// 处理个人属性
		attribute.value = [
			...attribute.value,
			...selectedRoles.map((role) => ({
				attribute: role.label,
				key: role.id,
				describe: role.label,
			})),
		];
	} else if (activeIndex.value === "3") {
		// 处理个人身份
		Identy.value = [
			...Identy.value,
			...selectedRoles.map((role) => ({
				Name: role.label,
				Organ: "",
				Code: role.id,
				Post: "",
				Ide: role.label,
			})),
		];
	} else if (activeIndex.value === "4") {
		// 处理个人角色
		Role.value = [
			...Role.value,
			...selectedRoles.map((role) => ({
				Name: role.label,
				FullName: role.label,
				Discription: "",
			})),
		];
	}
	peopleTreeRef.value?.closeDialog();
};

watch(
	() => organizeStore.selectRole,
	async (newValue) => {
		if (newValue) {
			await queryPersonInfo();
			await queryPersonRole();
			await queryPersonProps();
			await queryPersonIdenty();
		}
	},
);
</script>

<style scoped>
.user-container {
	display: flex;
	flex-direction: column;
	height: 80vh;
	width: 150vh;
	margin-left: 10px;
	background-color: #fff;
}
.el-menu {
	background-color: #fff;
	border-bottom: 1px solid #eee;
	width: 100%;
}
.margin-top {
	display: flex;
	flex-direction: column;
	align-items: between;
	justify-content: center;
	width: 80%;
	margin-top: 3vh;
	margin-left: 30vh;
}
.margin-btn {
	width: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 5vh;
}
.user-container-bottom {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>
