<script lang="ts" setup>
// 栏目组件 下面的一小部分

interface ColumnBtmProps {
	/** 按钮栏的标题 */
	title: string;

	/** 按钮的名称 */
	btns: string[];

	// clickableLinkConfigs: ClickableLinkConfig[];
}

const props = defineProps<ColumnBtmProps>();

function handleClick() {
	console.log("handleClick");
}
</script>

<template>
	<section class="column-btm-root">
		<section class="title">
			{{ props.title }}
		</section>

		<section class="btns">
			<ElButton class="btn" v-for="btn in props.btns" :key="btn" :link="true" @click="handleClick">
				{{ btn }}
			</ElButton>
		</section>
	</section>
</template>

<style lang="scss" scoped>
.column-btm-root {
	background-color: rgb(250, 250, 250);

	.title {
		padding: 18px 20px 0px;
		color: rgb(51, 51, 51);
		font-size: 16px;
	}

	.btns {
		// 要显示出全部的按钮
		margin: 3px 10px 5px;
		font-size: 13px;

		.btn {
			padding: 0px 6px;
			height: 22px;
			line-height: 22px;
			color: rgb(102, 102, 102);
			background-color: rgb(250, 250, 250);
			border-radius: 5px;
		}

		:deep(.el-button):hover {
			background-color: rgb(60, 118, 183);
			color: white;
		}
	}
}
</style>
