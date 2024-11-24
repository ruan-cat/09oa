<!-- 
	栏目弹框
	
	用于处理栏目信息的新增和修改
-->

<script lang="ts" setup>
import { FileFailedOne, FileSuccessOne } from "@icon-park/vue-next";
import type { FormRules } from "element-plus";
import type { TemplatePromiseProps } from "@vueuse/core";

import type { AppAddColumn, AppAddColumnForm } from "types/contentset/AppAddColumn";
import type {
	ColumnDialogProps,
	DialogPropsPartial,
	FormPropsPartial,
	DialogEmitsPartial,
	InputPropsPartial,
} from "./types";

/**
 * 输入栏的基础配置
 * @description
 * FIXME: 设计成响应式数据时，统一提供v-bind绑定数据时 会报错无限递归。
 */
const baseInputProps: InputPropsPartial = {
	clearable: true,
	showWordLimit: true,
};

/** 本组件内的表单对象 */
const form = ref<AppAddColumnForm>({
	xappName: "",
});

/** 校验规则 */
const rules = ref<FormRules<AppAddColumnForm>>({
	xappName: [
		{ required: true, message: "请输入栏目名称", trigger: "blur" },
		{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
	],
});

const formProps = ref<FormPropsPartial>({
	model: form.value,
	rules: rules.value,
	labelSuffix: ":",
});

const formFef = useTemplateRef("elFormRef");

/** 执行校验 */
async function doValidate() {
	return await formFef.value!.validate((isValid, invalidFields) => {});
}

/** 重置表单信息 */
function doResetFields() {
	formFef.value?.resetFields();
}

/**
 * 确认按钮
 * @description
 * 点击确认按钮 只做单纯的校验
 * 校验通过就关闭窗口
 */
async function doConfirm() {
	const res = await doValidate();
	toggleValidate(res);
	if (res) {
		toggleOpen(false);
	}
}

/**
 * 取消按钮
 * @description
 * 直接关闭弹框
 */
function doCancel() {
	toggleOpen(false);
}

type OnDialogCloseParams = Pick<TemplatePromiseProps<AppAddColumn, [ColumnDialogProps]>, "resolve" | "reject">;

/** 弹框组件关闭时的回调函数 */
function onDialogClose({ resolve, reject }: OnDialogCloseParams) {
	/**
	 * 对多种弹框关闭情形做统一处理
	 *
	 * 校验通过 就返回表单数据 返回深克隆的新数据 避免稍后的重置表单改变了数据
	 * 不通过 就直接返回 undefined
	 */
	isValidate.value ? resolve(cloneDeep(form.value)) : reject(void 0);
	doResetFields();
	return true;
}

/**
 * 弹框组件打开时的回调函数
 * @description
 * 有疑惑 目前没有办法启动该函数 该函数似乎不生效
 */
function onDialogOpen() {
	return true;
}

const TemplatePromise = createTemplatePromise<AppAddColumn, [ColumnDialogProps]>();

// 维护弹框的显示与打开属性 是为了触发弹框的回调事件函数
const [isOpen, toggleOpen] = useToggle(false);
const [isValidate, toggleValidate] = useToggle(false);

/**
 * 默认弹框属性
 * @description
 * 默认弹框属性不设置频繁变更的属性 比如弹框的显示与打开属性
 */
const defDialogProps = ref<DialogPropsPartial>({
	// modelValue: isOpen.value,
	draggable: true,
	closeOnClickModal: false,
});

/**
 * 打开弹框
 * @description
 * 对外暴露的打开弹框组件
 *
 * 这里仅仅在完成了 resolve 之后，才会继续执行。
 *
 * 只有执行了 start 函数，才会开始渲染组件。
 *
 * 本函数不能代表弹框组件的打开生命周期。
 */
async function open(params: ColumnDialogProps) {
	const _columnDialogConfig = merge<ColumnDialogProps, ColumnDialogProps>(
		// 基础信息
		{
			dialog: defDialogProps.value,
		},
		// 外部传值
		params,
	);

	toggleOpen(true);
	toggleValidate(false);
	const res = await TemplatePromise.start(_columnDialogConfig);
	return res;
}

defineExpose({
	open,
});

/**
 * 创建弹框属性
 * @description
 * 由于设计原因 这里要设计成函数
 */
function createDialogProps(dialogProps?: DialogPropsPartial) {
	const res = merge<DialogPropsPartial, DialogPropsPartial, DialogPropsPartial>(
		{},
		defDialogProps.value,
		isUndefined(dialogProps) ? {} : dialogProps,
	);
	return res;
}
</script>

<template>
	<TemplatePromise v-slot="{ promise, resolve, reject, args }">
		<ElDialog
			v-bind="createDialogProps(args[0]?.dialog)"
			:model-value="isOpen"
			@close="onDialogClose({ resolve, reject })"
			@open="onDialogOpen"
			class="column-dialog-root"
		>
			<template #default>
				<ElForm v-bind="formProps" ref="elFormRef">
					<ElFormItem label="栏目名称" prop="xappName">
						<ElInput v-model="form.xappName" v-bind="baseInputProps" />
					</ElFormItem>

					<ElFormItem label="栏目别名" prop="xappAlias">
						<ElInput v-model="form.xappAlias" v-bind="baseInputProps" />
					</ElFormItem>

					<ElFormItem label="栏目描述" prop="xdescription">
						<ElInput v-model="form.xdescription" v-bind="baseInputProps" />
					</ElFormItem>

					<ElFormItem label="栏目类型" prop="xappType">
						<ElInput v-model="form.xappType" v-bind="baseInputProps" />
					</ElFormItem>

					<!-- FormTemplateDialog.vue -->
					<ElFormItem label="默认编辑表单"></ElFormItem>

					<ElFormItem label="默认阅读表单"></ElFormItem>

					<!-- TODO: 上传图片 -->
					<ElFormItem label="栏目图标"></ElFormItem>
				</ElForm>
			</template>

			<template #footer>
				<ElButton type="primary" @click="doConfirm" :icon="FileSuccessOne"> 确定 </ElButton>
				<ElButton type="info" @click="doCancel" :icon="FileFailedOne"> 取消 </ElButton>
			</template>
		</ElDialog>
	</TemplatePromise>
</template>

<style lang="scss" scoped>
.column-dialog-root {
}
</style>
