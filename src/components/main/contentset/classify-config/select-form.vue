<!-- 
	选择分类表单
-->
<script lang="ts" setup>
import { Add, Help, Edit, Eyes, Delete } from "@icon-park/vue-next";

/** 编辑表单的颜色 */
const editColor = ref("#3C76B7");

/** 阅读表单颜色 */
const readColor = ref("#50E3C2");

/**
 * 计算色块的颜色
 *
 * TODO: 实现根据类型计算色块
 */
function pieceColor() {
	return {
		background: `linear-gradient(to bottom, ${editColor.value} 50%, ${readColor.value} 50%)`,
	};
}
</script>

<template>
	<section class="select-form-root">
		<ComponentInMainContentsetCard title="选择分类表单">
			<template #btns>
				<section style="height: 100%">
					<Add size="100%"></Add>
				</section>
			</template>

			<template #default>
				<ComponentInMainContentsetRowItem v-for="num in 5" :key="num">
					<section class="form-item">
						<section class="left">
							<section class="color-piece" :style="pieceColor()"></section>

							<section class="icon">
								<Help size="100%"></Help>
							</section>

							<section class="title">XXXX阅读表单</section>
						</section>

						<section class="right">
							<section class="date">
								{{ "2021-09-09" }}
							</section>

							<section class="btns">
								<Edit size="100%"></Edit>
								<Eyes size="100%"></Eyes>
								<Delete size="100%"></Delete>
							</section>
						</section>
					</section>
				</ComponentInMainContentsetRowItem>
			</template>
		</ComponentInMainContentsetCard>
	</section>
</template>

<style lang="scss" scoped>
.select-form-root {
	height: 100%;
	width: 100%;

	.form-item {
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			justify-content: start;
			align-items: center;
			height: 100%;

			.color-piece {
				height: 100%;
				width: 0.5rem;
			}

			.icon {
				height: 2rem;
				width: 2rem;
				margin: 0.5rem;
			}

			.title {
				font-size: 1.1rem;
			}
		}

		.right {
			display: flex;
			justify-content: start;
			align-items: center;
			height: 100%;

			.date {
				font-size: 0.9rem;
				margin-right: 2rem;
			}

			.btns {
				height: 1.2rem;
				display: flex;
				gap: 0.2rem;

				// 为未来的滚动条预留距离
				margin-right: 1.2rem;
			}
		}
	}
}
</style>
