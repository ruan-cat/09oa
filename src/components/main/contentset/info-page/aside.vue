<!-- 
	栏目详情页的侧边栏

	主要负责跳转路由
-->

<script lang="ts" setup>
import type { RouteMap } from "vue-router";

import { Help, Add } from "@icon-park/vue-next";

import type { TitleProps } from "components/main/contentset/title/types";

const contentsetInfoPageStore = useContentsetInfoPageStore();
const { currentSeletedTitle, id, scrollbarWidth, columnInfo } = storeToRefs(contentsetInfoPageStore);
const { setCurrentSeletedTitle } = contentsetInfoPageStore;

/** 按钮的尺寸 */
const iconSize = ref("4rem");

interface Render extends TitleProps {
	/**
	 * 路由名称
	 * @description
	 * 这里特指类型化路由的名称
	 */
	// routerName?: keyof RouteMap;
	// TODO: 将各个路由 枚举出来 直接配置写死的字符串
	routerName?: "main-contentset-[id]-form-config";
}

const router = useRouter();

const renders = computed<Render[]>(() => {
	return [
		{
			title: "表单配置",
			routerName: "main-contentset-[id]-form-config",
		},
		{
			title: "列表配置",
			isSuffix: false,
		},
		{
			title: "数据配置",
		},
		{
			title: "脚本配置",
		},
		{
			title: "资源文件",
		},
		{
			title: "栏目属性",
			isSuffix: false,
		},
		{
			title: "查找设计",
			isSuffix: false,
		},
	];
});

/** 点击标题 */
function clickTitle(render: Render) {
	// 设置当前选中的标题
	setCurrentSeletedTitle(render.title);

	// 然后跳转路由
	router.push({
		name: render.routerName,
		params: { id: id.value },
	});
}

columnInfo;

/** 左侧侧边栏显示的栏目名称 */
const columnTitle = computed(() => {
	return `${columnInfo.value?.xappName ?? "暂无栏目名称"}设置`;
});
</script>

<template>
	<section class="aside-root">
		<section class="top" ref="topRef">
			<section class="icon">
				<Help :size="iconSize"></Help>
			</section>
			<section class="title">
				{{ columnTitle }}
			</section>
		</section>

		<ElScrollbar>
			<section class="btm">
				<ComponentInMainContentsetCollapse title="分类配置"></ComponentInMainContentsetCollapse>

				<template v-for="render in renders" :key="render.title">
					<ComponentInMainContentsetTitle
						v-bind="render"
						@click="clickTitle(render)"
						:is-activated-flag="currentSeletedTitle"
					></ComponentInMainContentsetTitle>
				</template>
			</section>
		</ElScrollbar>
	</section>
</template>

<style lang="scss" scoped>
.aside-root {
	height: 100%;
	width: 100%;
	background-color: #f7f7f7;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;

	.top {
		display: flex;
		flex-direction: row;
		justify-content: start;

		height: fit-content;
		width: 100%;

		$toBtm: 0.3rem;
		// 不需要 避免误导
		// margin-bottom: $toBtm;
		border-bottom: $toBtm solid rgb(60, 118, 183);
		box-sizing: border-box;

		.icon {
			// 高度由其他的配置写死决定
			height: v-bind(iconSize);
			margin: 0.5rem;
		}

		.title {
			$font-size: 1.3rem;

			flex-grow: 1;
			height: 100%;
			font-size: $font-size;

			display: flex;
			align-items: center;
			justify-content: start;
		}
	}

	// 设置滚动条的宽度
	& :deep(.el-scrollbar) {
		width: 100%;

		.el-scrollbar__wrap {
			width: 100%;
		}

		.el-scrollbar__bar {
			right: v-bind(scrollbarWidth);
			width: v-bind(scrollbarWidth);

			.el-scrollbar__thumb {
				&:hover {
					background-color: rgb(9, 46, 89);
					cursor: grab;
				}
			}
		}
	}

	.btm {
		flex-grow: 1;
		width: 100%;
	}
}
</style>
