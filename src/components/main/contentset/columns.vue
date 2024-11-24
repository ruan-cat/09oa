<script lang="ts" setup>
import type { ColumnsProps } from "types/contentset/Column";

const props = defineProps<ColumnsProps>();
</script>

<template>
	<section class="all-column-root">
		<section class="main">
			<ComponentInMainContentsetColumn
				class="ContentsetColumn"
				v-for="column in props.columns"
				:key="column.xid"
				v-bind="column"
			/>
		</section>
	</section>
</template>

<style lang="scss" scoped>
// TODO: 这里的布局方案仍旧不合适 应该是确定每个块的固定宽度，然后根据视口宽度实现布局
// 去找好用的布局组件库
.all-column-root {
	/* 每行元素数量 */
	--column: 6;

	/* 间距 */
	--gap: 1.5rem;

	.main {
		width: 100%;
		height: 100%;

		padding: 1rem 8rem;

		display: grid;
		grid-template-columns: repeat(var(--column), 1fr);
		gap: var(--gap);

		.ContentsetColumn {
			/* 包括padding和border在内计算宽度 */
			box-sizing: border-box;
		}
	}
}
</style>
