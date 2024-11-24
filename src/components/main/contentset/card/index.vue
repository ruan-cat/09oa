<!-- 
	简单的卡片容器组件

	提供标题、右上角的按钮栏、以及中间的内容区域
-->
<script lang="ts" setup>
interface CardProps {
	title: string;
}

const props = defineProps<CardProps>();
</script>

<template>
	<section class="card-root">
		<section class="top">
			<section class="title">
				{{ props.title ?? "警告！你必须传递有意义的标题！" }}
			</section>

			<span class="btns">
				<slot name="btns"> </slot>
			</span>
		</section>

		<section class="main">
			<slot>
				<!-- <ElEmpty description="警告，你没有传递默认的中间内容区域！"></ElEmpty> -->
				警告，你没有传递默认的中间内容区域！
			</slot>
		</section>
	</section>
</template>

<style lang="scss" scoped>
.card-root {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.top {
		display: flex;
		justify-content: space-between;

		background-color: rgb(247, 247, 247);
		font-size: 1.3rem;

		padding: 1rem;

		height: 4rem;
		width: 100%;

		.title {
			width: fit-content;
			flex: 0 0 auto;
		}

		.btns {
			display: inline-block;
			width: fit-content;
			flex: 0 0 auto;
		}
	}

	.main {
		width: 100%;
		// 默认撑开下面全部的内容
		flex-grow: 1;
	}
}
</style>
