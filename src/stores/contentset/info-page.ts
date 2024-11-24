import { ElMessage } from "element-plus";
import type { JsonVO } from "types/index";
import type { TitleProps } from "components/main/contentset/title/types";
import type { AppQueryOneColumnDto } from "types/contentset/AppQueryOneColumnDto";

/**
 * 栏目详情页 多个组件共享的store状态
 */
export const useContentsetInfoPageStore = defineStore("contentset-info-page", () => {
	const currentSeletedTitle = ref<TitleProps["title"]>("分类配置");

	function setCurrentSeletedTitle(title: TitleProps["title"]) {
		currentSeletedTitle.value = title;
	}

	/** 栏目id */
	const _id = ref("");

	const id = computed({
		get() {
			return _id.value;
		},

		// TODO: 优化类型声明 导入业务类型来约束这里的类型
		set(value: string) {
			_id.value = value;
		},
	});

	const columnInfo = ref<AppQueryOneColumnDto>({});

	const appQueryOneApiObj = appQueryOneApi({
		onSuccess(data) {
			columnInfo.value = data.data;
		},
		onError(error) {
			const e = <JsonVO<unknown>>error;
			ElMessage.error(e.message);
		},
	});

	function getAppQueryOneApiObj() {
		/**
		 * 查询栏目基础信息 的 接口请求对象
		 * @description
		 * 包括了一系列的请求状态
		 */
		return appQueryOneApiObj;
	}

	async function getColumnInfo() {
		await appQueryOneApiObj
			.execute({
				params: { xid: id.value },
			})
			.catch((error) => {});
	}

	const iconSize = ref("1.4rem");

	const rowHeight = ref("3.5rem");

	const scrollbarWidth = ref("0.35rem");

	return {
		/**
		 * 在栏目详情页内 当前被选择标题
		 * @description
		 * 很多个组件都会被选择标题
		 *
		 * @default "分类配置" 分类配置
		 */
		currentSeletedTitle,

		/** 设置当前被选中的标题 */
		setCurrentSeletedTitle,

		/** 栏目id */
		id,

		/**
		 * 按钮的尺寸
		 * @description
		 * icon按钮的尺寸 在栏目详情页内的多个组件均使用
		 *
		 * 故设计成共享状态
		 */
		iconSize,

		/**
		 * 行信息的行高
		 * @description
		 * 类似于表格的信息 每一行的行高
		 */
		rowHeight,

		/**
		 * 滚动条的宽度
		 */
		scrollbarWidth,

		/**
		 * 栏目详情页 共用的栏目信息
		 */
		columnInfo,

		/**
		 * 获取栏目信息函数
		 * @description
		 * 按照设计，该函数期望在栏目详情页的mounted生命周期内调用
		 */
		getColumnInfo,

		/**
		 * 获取栏目信息的接口对象 用于获取接口请求的相关信息
		 */
		getAppQueryOneApiObj,
	};
});
