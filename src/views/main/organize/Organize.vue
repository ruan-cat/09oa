<template>
	<!-- 菜单容器 -->
	<div class="container">
		<div>
			<!-- 左侧垂直菜单 -->
			<el-menu default-active="2" class="el-menu-vertical-demo sidebars" :collapse="isCollapse" @select="handleSelect">
				<el-menu-item v-for="item in sidebars" :index="String(item.id)" :key="item.id">
					<img :src="item.icon" alt="" />
					<template #title>{{ item.name }}</template>
				</el-menu-item>
			</el-menu>
		</div>
		<div style="width: 100%; overflow: hidden">
			<!-- 根据 componentId 渲染角色组件 -->
			<OrganizationalStructure v-if="componentId === '1'" />
			<GroupManagement v-if="componentId === '2'" />
			<SideBar v-if="componentId === '3'" :cur="componentId">
				<UserView />
			</SideBar>
			<SideBar v-if="componentId === '4'" :cur="componentId">
				<PersonView />
			</SideBar>
			<ResourceManager v-if="componentId === '5'" />
			<CustomImport v-if="componentId === '6'" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import GroupManagement from "@/components/main/organize/GroupManagement/GroupManagement.vue";
import SideBar from "@/components/main/organize/SideBar.vue";
import OrganizationalStructure from "@/components/main/organize/OrganizationalStructure.vue";
import ResourceManager from "@/components/main/organize/ResourceManager.vue";
import CustomImport from "@/components/main/organize/CustomImport.vue";
import { sidebars } from "../../../components/main/organize/zheguo/mock/mock";
import UserView from "@/components/main/organize/User.vue";
import PersonView from "@/components/main/organize/Person.vue";

const isCollapse = ref(true);
const componentId = ref("1");

const handleSelect = (index) => {
	componentId.value = index;
};
</script>

<style scoped>
.container {
	width: 100%;
	height: 100vh;
	display: flex;
}

.sidebars {
	background-color: #333333;
	list-style: none;
	width: 80px;
	height: 100%;
	text-align: center;
}

.sidebars > p {
	width: 100%;
	margin: 10px 0;
	color: antiquewhite;
	cursor: pointer;
	text-align: center;
}

.sidebars > p:hover {
	color: #fff;
}

.el-icon {
	color: #f5a725;
}
</style>
