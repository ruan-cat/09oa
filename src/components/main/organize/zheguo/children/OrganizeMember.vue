<script setup>
import { computed, reactive, ref, defineEmits, onMounted } from "vue";
import { UserInformation } from "../mock/mock";
import { Transfer } from "@icon-park/vue-next";
import { Check } from "@element-plus/icons-vue";
import TransferTree from "../component/TransferTree.vue";
import { FilterUser } from "../util/node";
import { getOrgMember, deleteOrgMember, getUserNameListApi, addOrgMemberApi } from "@/apis/organize/index";
import Pinyin from "js-pinyin";

// 实例化emit事件
const emit = defineEmits();
const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	xid: {
		type: String,
		default: "",
	},
});
// 响应式数据结构
const MemberData = reactive({
	// 表格数据
	TableValue: [],
	// 控制弹窗显示隐藏
	dialogTransferVisible: false,
	// 穿梭框数据源
	TransferValue: UserInformation,
	// 保存穿梭框选中之后的用户对象key值
	CheckedUserKey: [],
	// 控制表格排序值列的显示和隐藏
	SortTableColumnShow: false,
	// 返回给父组件的成员数量
	MemberNum: 0,
	// 人员名称列表
	UserNameList: [],
});
const handleEdit = (index, row) => {
	console.log(index, row);
};

onMounted(async () => {
	// 获取组织成员
	await getOrgMember(
		{
			pageIndex: 1,
			pageSize: 10,
			xunitName: props.title,
		},
		() => {
			ElMessage({
				type: "success",
				message: "已获取组织成员",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取组织成员失败",
			});
		},
	).then((res) => {
		console.log(res.data.rows);
		MemberData.TableValue = res.data.rows;
		MemberData.MemberNum = res.data.rows.length;
		emit("submit-MemberNum", MemberData.MemberNum);
	});

	await getUserNameListApi(
		{
			pageIndex: 1,
			pageSize: 10,
			xstatus: "0",
		},
		() => {
			ElMessage({
				type: "success",
				message: "已获取人员列表",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取人员列表失败",
			});
		},
	).then((res) => {
		MemberData.UserNameList = res.data;
		console.log(res.data);
	});
});

/**
 * 点击添加按钮
 * 1. 请求人员数据
 * 2. 打开对话框
 * @event click事件
 */
const dialogIdRef = ref(null);
const onAddClick = () => {
	dialogIdRef.value.showDialog();
};
/**
 * 确定按钮
 * 1.点击之后隐藏对话框
 * 2.将选中的数据添加到组件的TableValue数组中
 * 3.将选中的数据长度保存到响应式数据MemberData.MemberNum中
 * @event click事件
 * @returns MemberData.TableValue
 */
const DialogSureCheckout = () => {
	MemberData.dialogTransferVisible = false;
	MemberData.TableValue = FilterUser(MemberData.TransferValue, MemberData.CheckedUserKey);
	MemberData.MemberNum = MemberData.TableValue.length;
	emit("submit-MemberNum", MemberData.MemberNum);
};

/**
 * 将选中的key值数组保存在响应式数据中
 * @event change事件
 * @param movedKeys 选中后的的key值数组
 * @returns MemberData.CheckedUserKey
 */
const handleChange = (movedKeys) => {
	MemberData.CheckedUserKey = movedKeys;
};

/**
 * 按照拼音排序
 * @event click事件
 * @returns MemberData.TableValue
 */
const sortByPinyin = () => {
	MemberData.TableValue.sort((a, b) => {
		return Pinyin.getFullChars(a.xdistinguishedName).toLowerCase() >
			Pinyin.getFullChars(b.xdistinguishedName).toLowerCase()
			? 1
			: -1;
	});
};

const handleTransferSave = (data) => {
	console.log(data.selectedRoles);

	data.selectedRoles.forEach((item) => {
		MemberData.TableValue.push(item);
	});
	dialogIdRef.value.closeDialog();
};
/**
 * 点击删除表格数据
 * 1. 拿到当前行数据的索引
 * 2. 删除当前行数据
 * 3. 将当前行数据长度保存到响应式数据MemberData.MemberNum中
 * @event 触发submit-MemberNum事件
 * @event click事件
 * @param row 当前行数据
 */
const handleTableDelete = (row) => {
	ElMessageBox.confirm("你确定要删除该成员吗？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "返回",
		type: "warning",
	})
		.then(async () => {
			await deleteOrgMember(
				{
					orgID: props.xid,
					ids: [row.xid],
				},
				() => {
					let index = MemberData.TableValue.findIndex((v) => v.xid === row.xid);
					MemberData.TableValue.splice(index, 1);
					MemberData.MemberNum = MemberData.TableValue.length;
					emit("submit-MemberNum", MemberData.MemberNum);
					ElMessage({
						type: "success",
						message: "已成功删除该成员",
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
</script>
<template>
	<div style="padding: 20px">
		<el-table style="width: 1060px; text-overflow: clip" :data="MemberData.TableValue">
			<el-table-column label="人员名称" prop="xdistinguishedName" width="150" />
			<el-table-column label="人员工号" prop="xemployee" width="150" />
			<el-table-column label="手机号码" prop="xmobile" width="150" />
			<el-table-column label="电子邮件" prop="xmail" width="170" />
			<el-table-column label="排序值" prop="sortavlues" v-if="MemberData.SortTableColumnShow" width="150">
				<template #default="scope">
					<el-input-number controls-position="right" style="width: 130px" size="small" v-model="scope.row.sortvalues" />
				</template>
			</el-table-column>
			<el-table-column align="right" width="250" v-if="MemberData.SortTableColumnShow">
				<template #header>
					<el-button size="small" type="primary" @click="MemberData.SortTableColumnShow = false"> 确定 </el-button>
					<el-button size="small" @click="MemberData.SortTableColumnShow = false"> 取消 </el-button>
				</template>
			</el-table-column>
			<el-table-column align="right" width="400" v-if="!MemberData.SortTableColumnShow">
				<template #header>
					<el-button size="small" @click="MemberData.SortTableColumnShow = !MemberData.SortTableColumnShow">
						修改
					</el-button>
					<el-button size="small" @click="sortByPinyin"> 按拼音排序 </el-button>
					<el-button size="small" @click="onAddClick" type="primary"> 添加 </el-button>
				</template>
				<template #default="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 查看 </el-button>
					<el-button size="small" type="danger" @click="handleTableDelete(scope.row)"> 删除 </el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 对话框 -->
		<TransferTree
			title="选择组织成员"
			:isMultiple="true"
			:rolesTree="MemberData.UserNameList"
			ref="dialogIdRef"
			@save="handleTransferSave"
			label="xname"
			:TreeStructure="{
				label: 'xname',
				children: 'children',
				xmobile: 'xmobile',
				xunique: 'xunique',
				xdistinguishedName: 'xdistinguishedName',
			}"
		/>
	</div>
</template>
<style lang="scss" scoped></style>
