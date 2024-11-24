<script setup>
import { computed, reactive, ref, defineEmits, onMounted } from "vue";
import { UserInformation } from "../mock/mock";
import { Transfer } from "@icon-park/vue-next";
import { Check } from "@element-plus/icons-vue";
import TransferTree from "../component/TransferTree.vue";
import { FilterUser } from "../util/node";
import Pinyin from "js-pinyin";
import { queryMenuPermissionsApi } from "@/apis/organize/index";

// 实例化emit事件
const emit = defineEmits();

// 响应式数据结构
const AuthListData = reactive({
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
	ListNum: 0,
});

onMounted(async () => {
	await queryMenuPermissionsApi(
		{
			role_id: 1,
		},
		() => {
			ElMessage({
				type: "success",
				message: "获取数据成功",
			});
		},
		() => {
			ElMessage({
				type: "error",
				message: "获取数据失败",
			});
		},
	).then((res) => {
		AuthListData.TableValue = res.data.rows;
	});
});
/**
 * 确定按钮
 * 1.点击之后隐藏对话框
 * 2.将选中的数据添加到组件的TableValue数组中
 * 3.将选中的数据长度保存到响应式数据AuthListData.ListNum中
 * @event click事件
 * @returns AuthListData.TableValue
 */
const DialogSureCheckout = () => {
	AuthListData.dialogTransferVisible = false;
	AuthListData.TableValue = FilterUser(AuthListData.TransferValue, AuthListData.CheckedUserKey);
	AuthListData.ListNum = AuthListData.TableValue.length;
	emit("submit-ListNum", AuthListData.ListNum);
};

/**
 * 将选中的key值数组保存在响应式数据中
 * @event change事件
 * @param movedKeys 选中后的的key值数组
 * @returns AuthListData.CheckedUserKey
 */
const handleChange = (movedKeys) => {
	AuthListData.CheckedUserKey = movedKeys;
};

/**
 * 点击删除表格数据
 * 1. 拿到当前行数据的索引
 * 2. 删除当前行数据
 * 3. 将当前行数据长度保存到响应式数据AuthListData.ListNum中
 * @event 触发submit-ListNum事件
 * @event click事件
 * @param row 当前行数据
 */
const handleTableDelete = (row) => {
	let index = AuthListData.TableValue.findIndex((v) => v.key === row.key);
	AuthListData.TableValue.splice(index, 1);
	AuthListData.ListNum = AuthListData.TableValue.length;
	emit("submit-ListNum", AuthListData.ListNum);
};
</script>
<template>
	<div style="padding: 20px">
		<el-table style="width: 1060px; text-overflow: clip" :data="AuthListData.TableValue">
			<el-table-column label="人员ID" prop="role_id" />
			<el-table-column label="菜单权限" prop="menulist" />
			<el-table-column label="排序值" prop="xorderColumn" />
			<el-table-column align="right" width="250" v-if="AuthListData.SortTableColumnShow">
				<template #header>
					<el-button size="small" type="primary" @click="AuthListData.SortTableColumnShow = false"> 确定 </el-button>
					<el-button size="small" @click="AuthListData.SortTableColumnShow = false"> 取消 </el-button>
				</template>
			</el-table-column>
			<el-table-column align="right" width="400" v-if="!AuthListData.SortTableColumnShow">
				<template #header>
					<el-button size="small" @click="AuthListData.SortTableColumnShow = !AuthListData.SortTableColumnShow">
						修改
					</el-button>
					<el-button size="small" @click="AuthListData.dialogTransferVisible = true" type="primary"> 添加 </el-button>
				</template>
				<template #default="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 查看 </el-button>
					<el-button size="small" type="danger" @click="handleTableDelete(scope.row)"> 删除 </el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 对话框 -->
		<el-dialog v-model="AuthListData.dialogTransferVisible" :show-close="false" width="700" height="400">
			<div style="margin-left: 20px">
				<!-- 穿梭框 -->
				<TransferTree :TransferValue="AuthListData.TransferValue" @submit-CheckedUserKey="handleChange" />
			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="AuthListData.dialogTransferVisible = false">返回</el-button>
					<el-button type="primary" @click="DialogSureCheckout"> 确定 </el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped></style>
