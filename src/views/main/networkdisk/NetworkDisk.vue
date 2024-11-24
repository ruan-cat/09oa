<script lang="ts" setup>
import NetworkdiskAside from "@/components/main/networkdisk/Aside.vue";
</script>

<template>
	<div class="common-layout" style="height: 100vh">
		<el-container style="height: 100%">
			<el-aside style="width: 10vw">
				<NetworkdiskAside />
			</el-aside>
			<el-main style="padding: 0px">
				<router-view />
			</el-main>
		</el-container>
	</div>
</template>

<style scoped></style>
