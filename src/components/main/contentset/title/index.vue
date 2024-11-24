<!-- 
	栏目详情页的侧边栏 每一行的标题 作为主要被点击的标题

	只提供简单的渲染 不提供过多的内置功能
-->
<script lang="ts" setup>
import type { TitleProps } from "./types";

import { Help, Add } from "@icon-park/vue-next";

const { isSuffix = true, isPrefix = true, isActivatedFlag = "", title } = defineProps<TitleProps>();

const contentsetInfoPageStore = useContentsetInfoPageStore();
const { iconSize } = storeToRefs(contentsetInfoPageStore);

/**
 * 是否被点击激活？
 * @description
 * 外部传递的标题名称，和本组件的名称相同时，则认为本组件被选中了
 */
const isActivated = computed(() => {
	return title === isActivatedFlag;
});

/**
 * 动态计算类名
 */
const isActivatedClass = computed(() => {
	return isActivated.value ? "isActivated" : "";
});
</script>

<template>
	<section class="title-root" :class="isActivatedClass">
		<section class="prefix-icon">
			<slot name="prefix-icon" v-if="isPrefix">
				<Help :size="iconSize"></Help>
			</slot>
		</section>

		<section class="title">
			{{ title }}
		</section>

		<section class="suffix-icon">
			<slot name="suffix-icon" v-if="isSuffix">
				<Add :size="iconSize"></Add>
			</slot>
		</section>
	</section>
</template>

<style lang="scss" scoped>
/** icon标签放大的交互动效 */
@mixin iconScale() {
	transform: scale(1.2);
}

.title-root {
	$gap: 0.7rem;

	padding: $gap;

	display: flex;
	gap: $gap;
	align-items: center;

	height: fit-content;
	width: 100%;

	font-size: 1rem;

	color: #333333;

	// 待优化 实现比较平滑稳定的 背景色变色效果
	transition:
		background-color 0.15s ease,
		transform 0.15s ease;

	&:hover {
		background-color: rgba(gray, 0.2);
		cursor: pointer;

		.prefix-icon {
			@include iconScale();
		}

		.suffix-icon {
			@include iconScale();
		}
	}

	// 被激活时的样式
	&.isActivated {
		background-color: rgb(60, 118, 183);
		color: snow;
	}

	.prefix-icon {
		display: flex;
		justify-content: end;
		gap: $gap;

		height: v-bind(iconSize);
		// 提供占位位置 当没有插槽时 也占据一定的空间 保证样式美观
		// 默认设计成占据2个icon的宽度
		width: calc((2 * v-bind(iconSize)) + $gap);
		// margin-left: 1.5rem;
	}

	.title {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}

	.suffix-icon {
		display: flex;
		justify-content: start;
		gap: $gap;

		height: v-bind(iconSize);
		// 提供占位位置 当没有插槽时 也占据一定的空间 保证样式美观
		width: v-bind(iconSize);
	}
}
</style>
