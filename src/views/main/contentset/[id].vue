<!-- 
	栏目详情页
	这个页面是一个很大的修改页 会提供很多信息以供修改。
	栏目的各种信息都在这里被修改

	嵌套多个页面的容器页面
-->

<script lang="ts" setup>
import type { ParamValue } from "vue-router";

/**
 * @see https://github.com/antoniandre/splitpanes
 */
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const contentsetInfoPageStore = useContentsetInfoPageStore();
const { id: columnId } = storeToRefs(contentsetInfoPageStore);
const { getColumnInfo, getAppQueryOneApiObj } = contentsetInfoPageStore;

const appQueryOneApiObj = getAppQueryOneApiObj();

// TODO: 作为容器页面 这里的重定向不好做 不好传递有意义的id值
// definePage({
// 	redirect: () => {
// 		return `/main/contentset/${columnId}/classify-config`;
// 	},
// 	// "/main/contentset/:id/classify-config",
// });

const router = useRouter();
const { params } = useRoute();

// 直接做类型泛型约束 直接指定说明有id这个值。
// const { id } = <{ id: string }>params;
const { id } = <{ id: ParamValue<false> }>params;

// 初始化栏目id 供给其他组件使用
columnId.value = id;

const asideMinWidth = ref(15);
const asideMaxWidth = ref(25);
const mainMinWidth = computed(() => {
	return 100 - asideMaxWidth.value;
});
const mainMaxWidth = computed(() => {
	return 100 - asideMinWidth.value;
});

const isLoading = computed(() => {
	return appQueryOneApiObj.isLoading.value;
});

// 用手动跳转的方式 实现重定向的需求
// 该容器页面 会默认展示第一个子页面
onMounted(async () => {
	// 获取栏目信息 做唯一的一次初始化数据
	await getColumnInfo();

	router.push({
		name: "main-contentset-[id]-classify-config",
		params: { id },
	});
});
</script>

<template>
	<section class="contentset-id-root">
		<Splitpanes style="height: 100%; width: 100%">
			<!-- 作为侧边栏 -->
			<Pane :min-size="asideMinWidth" :max-size="asideMaxWidth">
				<ComponentInMainContentsetInfoPageAside />
			</Pane>

			<!-- 
				作为主要展示内容 嵌套展示各种子页面

				参考资料
				https://vscode.dev/github/vbenjs/vue-vben-admin/blob/main/packages/effects/layouts/src/authentication/form.vue#L12-L23
			-->
			<Pane>
				<RouterView v-slot="{ Component, route }" v-loading="isLoading">
					<Transition appear mode="out-in" name="slide-right">
						<KeepAlive>
							<component :is="Component" :key="route.fullPath" />
						</KeepAlive>
					</Transition>
				</RouterView>
			</Pane>
		</Splitpanes>
	</section>
</template>

<style lang="scss" scoped>
.contentset-id-root {
	// background-color: rgba(gray, 0.1);
	// background-color: rgba(gray, 0.1);
	// height: 100vh;
	height: 100%;
	width: 100%;

	.splitpanes__pane {
		// font-family: Helvetica, Arial, sans-serif;
		// color: rgba(255, 255, 255, 0.6);
		// font-size: 5em;
	}
}

.contentset-id-root :deep(.splitpanes) {
	/** 
		根据官方文档设置样式
		https://antoniandre.github.io/splitpanes/
	*/
	.splitpanes__pane {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// 全部边界线设置
	.splitpanes__splitter {
		$size: 0.5rem;
		min-width: $size;
		min-height: $size;
		background-color: rgba(gray, 0.2);
	}
}

// 从 vben-admin 中拷贝过来的动画效果
// https://vscode.dev/github/vbenjs/vue-vben-admin/blob/main/packages/@core/base/design/src/css/transition.css#L46
.slide-right-enter-active,
.slide-right-leave-active {
	transition: 0.25s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.slide-right-move {
	transition: transform 0.3s;
}
.slide-right-enter-from,
.slide-right-leave-to {
	opacity: 0;
	transform: translate(15px);
}
</style>
