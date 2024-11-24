<!-- 
	类似于表格行的容器组件
	本组件仅仅是一个样式化的 容器组件

	仅仅负责表现出交互样式

	1 提供一个默认插槽
	2 提供hover默认交互样式
-->
<script lang="ts" setup>
const contentsetInfoPageStore = useContentsetInfoPageStore();
const { rowHeight } = storeToRefs(contentsetInfoPageStore);
</script>

<template>
	<section class="row-item-root">
		<slot></slot>
	</section>
</template>

<style lang="scss" scoped>
.row-item-root {
	height: v-bind(rowHeight);
	width: 100%;

	&:nth-child(odd) {
		background-color: white;
	}

	&:nth-child(even) {
		background-color: rgb(247, 247, 247);
	}

	&:hover {
		background-color: rgb(240, 240, 240);
	}
}
</style>
