<template>
	<!-- 角色管理组件 -->
	<div class="main">
		<div class="container">
			<div class="input">
				<!-- 输入框，支持搜索和添加功能 -->
				<search
					theme="outline"
					fill="#000000"
					:strokeWidth="1"
					strokeLinejoin="miter"
					strokeLinecap="square"
					class="search-icon"
				/>
				<el-input v-model="input" placeholder="请输入关键字" class="input-with-select"> </el-input>
				<plus
					theme="outline"
					fill="#000000"
					:strokeWidth="1"
					strokeLinejoin="miter"
					strokeLinecap="square"
					@click="addRole"
					class="add-icon"
				/>
			</div>
			<div>
				<div
					class="role-container"
					:class="{ activeCss: UserNum === item }"
					v-for="(item, index) in roleList"
					:key="index"
					@click="pushToRole(item)"
				>
					<!-- 用户图标 -->
					<el-icon style="margin-left: 1vh">
						<User />
					</el-icon>
					<!-- 用户链接，点击后跳转到用户详情 -->
					<el-link :underline="false" class="role-name">{{ item.name }}</el-link>
					<!-- 删除按钮 -->
					<el-button
						:icon="Delete"
						class="delete-btn"
						@click="roleList.splice(roleList.indexOf(item), 1)"
						v-if="UserNum === item"
					/>
				</div>
			</div>
		</div>
		<!-- 根据选择渲染对应用户视图 -->
		<slot></slot>
	</div>
</template>

<script setup>
import { Delete, User, Search, Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getRoleListApi } from "@/apis/organize/Role";
import { queryPersonListApi } from "@/apis/organize/person";
import { useOrganizeStore } from "@/stores/organize/role";

const organizeStore = useOrganizeStore();
const input = ref("");
// 要渲染的用户视图，默认为第一个。
const UserNum = ref("1");
// 根据选择的模块获取渲染用户列表
const props = defineProps(["cur"]);
// 根据选择用户获取渲染相应的用户视图
const roleList = ref([]);
const infoList = ref([]);

const addRole = () => {
	roleList.value.push(Math.round(Math.random() * 1000));
};
const pushToRole = (item) => {
	organizeStore.selectRoleUniqueId = item.uniqueId;
	organizeStore.selectRole = item.id;
};
// 获取角色列表
const getRoleList = async () => {
	const data = {
		pageIndex: 1,
		pageSize: 10,
		key: input.value,
	};
	try {
		await getRoleListApi(
			data,
			(res) => {
				roleList.value = res.rows.map((item) => {
					return {
						name: item.xname,
						id: item.xid,
						uniqueId: item.xunique,
					};
				});
			},
			() => {
				ElMessage.error("获取角色列表失败");
			},
		);
	} catch (err) {
		ElMessage.error("获取角色列表失败");
	}
};
// 获取个人列表
const getPersonList = async () => {
	const data = {
		pageIndex: 1,
		pageSize: 10,
	};
	try {
		await queryPersonListApi(data, (res) => {
			roleList.value = res.rows.map((item) => {
				return {
					name: item.xname,
					mobile: item.xmobile,
					id: item.xid,
					uniqueId: item.xunique,
				};
			});
		});
	} catch (err) {
		ElMessage.error("获取个人列表失败");
	}
};
onMounted(async () => {
	UserNum.value = props.cur;
	if (props.cur === "4") {
		await getPersonList();
	} else if (props.cur === "3") {
		await getRoleList();
	}
});
</script>

<style scoped>
.role-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 20vh;
	height: 3vh;
}

.role-container:hover {
	background-color: #badef8;
}

.role-name {
	margin-left: 5vh;
	position: absolute;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	width: 30vh;
	.input {
		height: 3vh;
		display: flex;
		.search-icon {
			height: 100%;
			margin-right: 1vh;
			margin-left: 1vh;
		}
		.input {
			width: 10vh;
		}
		.add-icon {
			margin-left: 1vh;
			margin-right: 1vh;
			height: 100%;
		}
	}
}

.main {
	display: flex;
	height: 100%;
}

.activeCss {
	background-color: #badef8;
}
</style>
