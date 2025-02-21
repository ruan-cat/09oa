<script lang="ts" setup>
import { Toaster } from "vue-sonner";
</script>

<template>
	<section class="contentset-for-RouterView-root">
		<!-- <h1> contentset 路由的入口 </h1> -->
		<RouterView></RouterView>

		<!-- 还是不行 定位混乱 -->
		<!-- <Toaster
			:expand="true"
			:richColors="true"
			:closeButton="true"
			:visibleToasts="3"
			:position="'bottom-right'"
		></Toaster> -->
	</section>
</template>

<style lang="scss" scoped>
// 顶部导航栏的高度 是一个固定值
$headerHeight: 70px;

.contentset-for-RouterView-root {
	width: 100%;

	// 自动减去顶部导航栏的高度即可
	height: calc(100vh - #{$headerHeight});
}
</style>
