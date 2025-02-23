<script lang="ts" setup></script>

<template>
	<section class="main-root">
		<!-- <h1>这里是自动化路由的main路由的容器</h1> -->

		<!-- 我们并不需要直接使用该组件 直接复用 layout 组件即可 -->
		<!-- <RouterView></RouterView> -->

		<!-- 
			这里是嵌套路由的入口 嵌套路由的main路径从这里开始渲染
			所需的 RouterView 组件是由 layout 布局组件提供的
		-->
		<ComponentsLayoutLayout></ComponentsLayoutLayout>
	</section>
</template>

<style lang="scss" scoped>
.main-root {
	width: 100%;
	height: 100%;
}
</style>
