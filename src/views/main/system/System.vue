<template>
	<div class="main">
		<div class="asides">
			<el-row class="tac">
				<el-col :span="3">
					<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						<el-sub-menu index="1">
							<template #title>
								<el-icon><Setting /></el-icon>
								<span>基础配置</span>
							</template>
							<el-menu-item-group>
								<RouterLink to="/system/systemdata"><el-menu-item index="1-1">系统信息</el-menu-item></RouterLink>
								<RouterLink to="/system/template"><el-menu-item index="1-2">模板管理</el-menu-item></RouterLink>
							</el-menu-item-group>
						</el-sub-menu>
						<el-sub-menu index="2">
							<template #title>
								<el-icon><Setting /></el-icon>
								<span>安全配置</span>
							</template>
							<el-menu-item-group>
								<RouterLink to="/system/password"><el-menu-item index="2-1">密码配置</el-menu-item></RouterLink>
								<RouterLink to="/system/login"><el-menu-item index="2-2">登录配置</el-menu-item></RouterLink>
							</el-menu-item-group>
						</el-sub-menu>
					</el-menu>
				</el-col>
			</el-row>
		</div>
		<div class="extention">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
// 导入pinia数据
import { userStore } from "@/stores/user";
const user_store = userStore();
let system_data = user_store.system;

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu-vertical-demo {
	border-top: 1px solid black;
	background-color: gainsboro;
	width: 100%;
}

.el-menu-item {
	border-bottom: 1px solid rgba(0, 0, 0, 0.28);
}

.el-col {
	max-width: 100%;
}

.main {
	display: flex !important;
	width: 100%;
}

.asides {
	max-width: 20%;
}
.extention {
	flex-grow: 1;
}
</style>
