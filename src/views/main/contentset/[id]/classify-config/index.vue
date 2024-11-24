<!-- 
	分类配置页面
-->

<script lang="ts" setup>
/**
 * @see https://github.com/antoniandre/splitpanes
 */
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
</script>

<template>
	<section class="classify-config-root">
		<!-- TODO: 调整样式 -->
		<Splitpanes style="height: 100%; width: 100%" :horizontal="true">
			<Pane :min-size="30">
				<Splitpanes style="height: 100%; width: 100%">
					<Pane :min-size="30">
						<!-- 选择分类表单 -->
						<ComponentInMainContentsetClassifyConfigSelectForm />
					</Pane>

					<Pane :min-size="30">
						<!-- 分类展现 -->
						<ComponentInMainContentsetClassifyConfigShow />
					</Pane>
				</Splitpanes>
			</Pane>

			<Pane :min-size="30">
				<!-- 分类属性 -->
				<ComponentInMainContentsetClassifyConfigAttribute />
			</Pane>
		</Splitpanes>
	</section>
</template>

<style lang="scss" scoped>
.classify-config-root {
	height: 100%;
	width: 100%;
}

.classify-config-root :deep(.splitpanes) {
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
</style>
