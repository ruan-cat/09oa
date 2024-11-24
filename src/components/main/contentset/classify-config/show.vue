<!-- 
	分类展现
-->
<script lang="ts" setup>
import { Add } from "@icon-park/vue-next";
</script>

<template>
	<section class="show-root">
		<ComponentInMainContentsetCard title="分类展现">
			<template #btns>
				<span class="btns">
					<span class="btn">
						<section class="icon">
							<Add size="100%"></Add>
						</section>
						<span>选择列表</span>
					</span>

					<span class="btn">
						<section class="icon">
							<Add size="100%"></Add>
						</section>
						<span>选择视图</span>
					</span>
				</span>
			</template>
		</ComponentInMainContentsetCard>
	</section>
</template>

<style lang="scss" scoped>
.show-root {
	height: 100%;
	width: 100%;

	.btns {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 0.9rem;
		font-size: 1.1rem;
		height: 100%;

		.btn {
			display: inline-flex;

			height: 100%;
			flex-wrap: nowrap;
			align-items: center;

			.icon {
				height: 100%;
				width: fit-content;
			}
		}
	}
}
</style>
