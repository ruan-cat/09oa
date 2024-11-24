<!-- 
	简易的折叠栏面板 用于实现指定样式的折叠栏效果

	目前默认作为 分类配置
-->

<script lang="ts" setup>
import type { RouteMap } from "vue-router";
import type { CollapseProps } from "./types";
import type { TitleProps } from "components/main/contentset/title/types";

import { sleep } from "@antfu/utils";

import { DownOne, RightOne, Help } from "@icon-park/vue-next";

const contentsetInfoPageStore = useContentsetInfoPageStore();
const { currentSeletedTitle, id, iconSize } = storeToRefs(contentsetInfoPageStore);
const { setCurrentSeletedTitle } = contentsetInfoPageStore;

const props = defineProps<CollapseProps>();

interface Render extends TitleProps {
	/**
	 * 路由名称
	 * @description
	 * 这里特指类型化路由的名称
	 *
	 * @default main-contentset-[id]-classify-config 页面是固定的 故这里的默认值是固定的
	 */
	// routerName?: keyof RouteMap;
	routerName?: "main-contentset-[id]-classify-config";
}

/** 创建被渲染的对象 */
function createRender(params: Partial<Render>): Render {
	return {
		title: "",
		isSuffix: false,
		isPrefix: false,
		routerName: "main-contentset-[id]-classify-config",
		...params,
	};
}

// TODO: 从后端获取数据 这些都是固定写死的数据
const renders = ref<Render[]>(
	[
		{ title: "固定资产" },
		{ title: "领用记录" },
		{ title: "借用记录" },
		{ title: "归还记录" },
		{ title: "退库记录" },
		{ title: "调拨记录" },
		{ title: "报修记录" },
		{ title: "报废记录" },
		{ title: "盘点记录" },
	].map(createRender),
);

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

/**
 * 是否折叠？
 * @description
 * 默认是折叠的
 */
const isCollapse = ref(true);

/** 切换折叠效果 */
const toggleCollapse = useToggle(isCollapse);

/**
 * 第一次打开此页面时 处理折叠动效
 */
onMounted(async () => {
	// 待优化 有没有更加好的方式，实现这里的动效？

	toggleCollapse(true);
	// 等待一秒后 默认展开
	// TODO: 接口请求完数据后 展开本组件
	await sleep(1000, () => {
		toggleCollapse(false);
	});
});
</script>

<template>
	<section class="collapse-root">
		<section class="title">
			<ComponentInMainContentsetTitle :is-activated="false" :title="props.title" @click="toggleCollapse()">
				<template #prefix-icon>
					<DownOne :size="iconSize" v-if="isCollapse"></DownOne>
					<RightOne :size="iconSize" v-else></RightOne>

					<Help :size="iconSize"></Help>
				</template>
			</ComponentInMainContentsetTitle>
		</section>

		<!-- 
			参考资料 https://www.bilibili.com/video/BV1C54y1E7Hd/
		-->
		<ElCollapseTransition>
			<section class="box" v-show="!isCollapse">
				<template v-for="render in renders" :key="render.title">
					<ComponentInMainContentsetTitle
						v-bind="render"
						@click="clickTitle(render)"
						:is-activated-flag="currentSeletedTitle"
					></ComponentInMainContentsetTitle>
				</template>
			</section>
		</ElCollapseTransition>
	</section>
</template>

<style lang="scss" scoped>
.collapse-root {
	height: fit-content;
	width: 100%;

	.title {
	}

	.box {
	}
}
</style>
