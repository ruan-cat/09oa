import type { DialogProps, FormProps, DialogEmits, InputProps } from "element-plus";

export type DialogPropsPartial = Partial<DialogProps>;
export type FormPropsPartial = Partial<FormProps>;
export type DialogEmitsPartial = Partial<DialogEmits>;
export type InputPropsPartial = Partial<InputProps>;

/**
 * 栏目弹框组件 配置对象
 * @description
 */
export interface ColumnDialogProps {
	dialog?: DialogPropsPartial;
}
