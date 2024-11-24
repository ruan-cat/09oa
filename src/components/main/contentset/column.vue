<script lang="ts" setup>
// import { type Column } from "models/Column";
import type { Column } from "types/contentset/Column";
import type { ColumnDialogProps } from "components/main/contentset/column-dialog/types";

import { Help, Edit, Delete } from "@icon-park/vue-next";

// const
const router = useRouter();

const props = defineProps<Column>();

const columnRootDom = useTemplateRef("columnRootDom");
const { isOutside } = useMouseInElement(columnRootDom);

/**
 * 是否显示按钮栏
 * @description
 * 鼠标不在元素的外面，在元素的里面，就显示按钮组
 */
const isShowBtns = computed(() => !isOutside.value);

/** 分类栏的按钮 */
const typeBtns = computed(() => {
	return isUndefined(props.xappType) ? ["没有任何分类"] : [props.xappType];
});

/** 表单栏的按钮 */
const formBtns = computed(() => {
	return isUndefined(props.xeditName) || isUndefined(props.xpublishName)
		? ["没有任何表单"]
		: [props.xeditName, props.xpublishName];
});

const dialog = useTemplateRef("dialog");

/** 编辑栏目信息 */
async function editColumn() {
	const data = await dialog
		.value!.open({
			dialog: {
				title: "编辑栏目",
			},
		})
		.catch(() => {});

	console.log(" 查看编辑后的返回值 = ", data);

	//  updateAppinfoApi()
}

/**
 * 跳转到栏目信息页
 * @description
 * 在栏目信息页 修改栏目的各种信息
 */
function toColumnInfoPage() {
	router.push({
		name: "main-contentset-[id]",
		params: {
			id: props.xid,
		},
	});
}
</script>

<template>
	<!-- 栏目组件 -->
	<section class="column-root" ref="columnRootDom" @click="toColumnInfoPage">
		<ComponentInMainContentsetColumnDialog ref="dialog" />

		<section class="bg-box"></section>

		<section class="btns-box" v-show="isShowBtns">
			<section class="btns">
				<Edit size="1.1rem" fill="#fff" @click.stop="editColumn()" />
				<Delete size="1.1rem" fill="#fff" @click.stop="" />
			</section>
		</section>

		<section class="top">
			<section class="title">{{ props.xappAlias }}</section>

			<section class="icon-box">
				<!-- TODO: 换成图片 -->
				<Help theme="outline" size="64px" fill="#333" class="icon" />
			</section>

			<section class="desc">{{ props.xdescription }}</section>
		</section>

		<section class="btm">
			<ComponentInMainContentsetColumnBtm :btns="typeBtns" title="分类" />
			<ComponentInMainContentsetColumnBtm :btns="formBtns" title="表单" />
		</section>
	</section>
</template>

<style lang="scss" scoped>
.column-root {
	--border-radius: 0.5rem;

	// width: 100%;
	// height: 100%;
	// box-sizing: content-box;

	display: flex;
	flex-direction: column;
	align-items: center;
	// 两端对齐
	justify-content: space-between;
	position: relative;

	box-shadow: rgb(238, 238, 238) 0px 0px 0px;
	background-color: rgb(255, 255, 255);
	cursor: pointer;
	position: relative;
	// 不要边距 位置难以控制
	// border: var(--border-radius) solid rgb(238, 238, 238);
	border-radius: var(--border-radius);

	// 不需要手动提供间距了
	// gap: 1rem;

	&:hover {
		box-shadow: rgb(153, 153, 153) 0px 0px 18px;
		// 不要边距 位置难以控制
		// border: 2px solid rgb(60, 118, 183);
	}

	.bg-box {
		position: absolute;
		top: 0;
		width: 100%;
		height: 5rem;

		background-color: rebeccapurple;
		border-radius: 0.5rem;

		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.btns-box {
		--gap: 0.4rem;

		position: absolute;
		top: var(--gap);
		right: var(--gap);

		.btns {
			// 让按钮可以被点击 调高层级
			z-index: 1;
			display: flex;
			gap: var(--gap);
		}
	}

	.top {
		display: flex;
		flex-direction: column;

		min-height: 5rem;

		.title {
			color: white;
			font-size: 18px;
			padding-top: 24px;
			text-align: center;
			padding-left: 20px;
			padding-right: 20px;
		}

		.icon-box {
			display: flex;
			justify-content: center;

			.icon {
				width: 64px;
				height: 64px;
				border-radius: 50px;
				background-color: rgb(255, 255, 255);
				border: 1px solid rgb(57, 142, 255);
				opacity: 0.5;
			}
		}

		.desc {
			margin: 1rem;

			color: rgb(153, 153, 153);
			line-height: 20px;
			font-family: "Microsoft YaHei";
			font-size: 13px;
		}
	}

	.btm {
		display: flex;
		flex-direction: column;

		padding-bottom: 1rem;
	}
}
</style>
