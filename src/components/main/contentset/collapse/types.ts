import type { TitleProps } from "components/main/contentset/title/types";

/**
 * 折叠栏的props传参
 * @description
 * 折叠栏是特殊的标题栏，所以继承了标题栏的props
 */

export interface CollapseProps extends TitleProps {
	/**
	 * 折叠栏的显示标题
	 * @default 分类配置
	 */
	title: string;
}
