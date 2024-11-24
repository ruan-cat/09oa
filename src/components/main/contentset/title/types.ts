/**
 * 简单的标题栏组件 props
 */
export interface TitleProps {
	/** 标题 */
	title: string;

	/**
	 * 是否被激活的标记
	 * @description
	 * 根据外部传递的值，做出改动。内部的判断算法，根据此值做出判断。
	 *
	 * @default "" 默认为空字符串
	 */
	isActivatedFlag?: TitleProps["title"];

	/**
	 * 是否是被激活的 被点击的
	 * @description
	 * 非必填
	 *
	 * 如果外部组件强制给出配置 那么就根据此配置调整为被激活状态
	 *
	 * 否则组件内部自己计算是否被激活。
	 *
	 * @deprecated 暂时废弃 设计冗余
	 */
	isActivated?: boolean;

	/**
	 * 是否需要后缀插槽？
	 * @description
	 * 非必填 默认需要
	 *
	 * @default true
	 */
	isSuffix?: boolean;
	/** 是否需要前缀插槽？ */
	isPrefix?: boolean;
}
