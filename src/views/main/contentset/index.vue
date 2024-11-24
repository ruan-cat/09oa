<script lang="ts" setup>
import { isFunction, toString } from "lodash-es";

import { Toaster, toast } from "vue-sonner";

import { AlignTextBoth, FolderClose, Search, AddOne } from "@icon-park/vue-next";
import type { Icon } from "@icon-park/vue-next/lib/runtime";

import { type TabPaneProps, type TabPaneName, ElMessage, ElSelect } from "element-plus";

import type { JsonVO } from "types/index";
import type { AppQueryConditionVo } from "types/contentset/AppQueryConditionVo";
import type { ColumnTypeDTO_Required } from "types/contentset/ColumnType";
import type { ColumnsProps } from "types/contentset/Column";
import type { AppAddColumn } from "types/contentset/AppAddColumn";

/** 根据条件查询栏目 qureyVo */
const appQueryConditionVo = ref<AppQueryConditionVo>({});

/**
 * 全部栏目
 * @description
 * 固定名称
 */
const allColumnName = <const>"全部栏目";
type AllColumnName = typeof allColumnName;

/** 是全部栏目的字符串 */
function isAllColumnName(name: string): name is AllColumnName {
	return name === allColumnName;
}

/** 当前激活的tab名称 */
const activeTabName = ref<TabPaneName | AllColumnName>(allColumnName);

/**
 * 栏目类型对象
 * @description
 * 导航栏的栏目类型
 *
 * 这里显示出全部栏目的名称，和可用的栏目数目
 */
const columnTypeDTOs = ref<ColumnTypeDTO_Required[]>([]);

/**
 * 栏目类型对象
 * @description
 * 拓展的对象 增加了许多用于渲染的属性
 */
interface ColumnTypeDTO_Required_toRender extends ColumnTypeDTO_Required {
	/**
	 * 栏目类型
	 * @description
	 * 多出了额外的固定名称
	 */
	xappType: string | AllColumnName;

	/** icon组件 用于实现渲染 */
	icon: Icon;
}

/**
 * 全部栏目
 * @description
 * 固定的取值，用于默认渲染第一项
 */
const columnTypeDTO_Required_all: ColumnTypeDTO_Required_toRender = {
	xappCount: 0,
	xappType: allColumnName,
	icon: AlignTextBoth,
};

/**
 * 栏目类型名称 生成函数
 * @description
 * 顶部的tab栏有着不同的名称，根据不同的类型 拼接生成不同的tab栏名称
 */
function columnTypeName(columnTypeDTO_render: ColumnTypeDTO_Required_toRender) {
	const { xappCount, xappType } = columnTypeDTO_render;

	/**
	 * 全部栏目不需要显示数量
	 * 其他栏目 需要显示出数量
	 */
	return isAllColumnName(xappType) ? xappType : `${xappType}(${xappCount})`;
}

/** 根据条件查询栏目 */
const queryConditionApiObj = queryConditionApi({
	onSuccess(data) {},
	onError(error) {},
});

/** 正在加载 根据条件查询栏目 */
const isQueryConditionApiLoading = queryConditionApiObj.isLoading;

/** 根据条件查询栏目 */
async function executeQueryConditionApi() {
	await queryConditionApiObj
		.execute({
			params: appQueryConditionVo.value,
		})
		.catch(() => {});
}

/** 查询所有的栏目类型 */
const appQueryAllTypeApiObj = appQueryAllTypeApi({
	async onSuccess(data) {
		// console.log(" ????  appQueryAllTypeApiObj ", data);

		// 保存全部的栏目类型 保存tab栏数据
		columnTypeDTOs.value = data.data;

		// 查询完毕全部栏目类型后 按照条件查询栏目信息
		await executeQueryConditionApi();
	},
	onError() {},
});

/** 正在加载 查询所有的栏目类型 */
const isAppQueryAllTypeLoading = appQueryAllTypeApiObj.isLoading;

/**
 * 切换tab栏
 * @description
 * 切换tab栏的时候，需要重新查询栏目信息
 */
async function tabChange(name: TabPaneName) {
	const _name = toString(name);

	// 如果是全部栏目 就不需要查询
	if (isAllColumnName(_name)) {
		// 清空掉上次提供的查询条件 传递空内容
		appQueryConditionVo.value.xappType = undefined;
		await executeQueryConditionApi();
		return;
	}

	// 否则就是根据栏目类型查询
	appQueryConditionVo.value.xappType = _name;
	await executeQueryConditionApi();
}

/**
 * 栏目类型对象
 * @description
 * 具体参与渲染的对象 开头有默认置顶的全部类型 作为默认的tab
 */
const columnTypeDTOs_toRender = computed(() => {
	/** 最后被渲染用的数组 默认有最开始的全部栏目信息 */
	const res = [columnTypeDTO_Required_all];

	// 遍历全部的内容 生成渲染用数组
	columnTypeDTOs.value.forEach((columnTypeDTO) => {
		const columnTypeDTO_Required_toRender: ColumnTypeDTO_Required_toRender = {
			...columnTypeDTO,
			icon: FolderClose,
		};
		res.push(columnTypeDTO_Required_toRender);
	});

	return res;
});

/** 栏目组件的props对象 */
const columnsProps = computed<ColumnsProps>(() => {
	return {
		columns: queryConditionApiObj.data.value?.data.rows ?? [],
	};
});

/** 栏目组件是不是空的？没有数据？ */
const isColumnsPropsEmpty = computed(() => isEmpty(columnsProps.value));

onMounted(async () => {
	await appQueryAllTypeApiObj.execute().catch(() => {});
});

const dialog = useTemplateRef("dialog");

/** 新建栏目 接口对象 */
const addColumnApiObj = addColumnApi({
	onSuccess(data) {
		ElMessage.success("新建栏目成功");
		// if (data.code === HttpCode.SUCCESS) {
		// 	ElMessage.success("新建栏目成功");
		// } else {
		// 	ElMessage.error(data.message);
		// }
	},
	onError(error) {
		const e = <JsonVO<unknown>>error;
		ElMessage.error(e.message);
	},
});

/** 新建栏目 */
async function addColumn() {
	try {
		// toast.warning("你已取消刚才的新建栏目", {
		// 	duration: Infinity,
		// });
		// toast.warning("你已取消刚才的新建栏目", {
		// 	duration: Infinity,
		// });

		const data = await dialog.value!.open({
			dialog: {
				title: "新建栏目",
			},
		});

		console.log(" ？？？ 栏目  ", data);

		if (!isUndefined(data)) {
			// toast.warning("你已取消刚才的新建栏目");
			// toast.warning("你已取消刚才的新建栏目");
			// toast.warning("你已取消刚才的新建栏目");
			// toast.warning("你已取消刚才的新建栏目");

			toast.promise(
				() =>
					addColumnApiObj
						.execute({
							data,
						})
						.catch((error) => {
							console.log(error);
						}),
				{
					loading: "正在新建栏目，请稍后。期间，你可以继续新建新的栏目。撤回刚才的提交。",
					action: {
						label: "撤销提交",
						onClick() {
							addColumnApiObj.cancel();
							// toast.warning("你已取消刚才的新建栏目");
						},
					},
					// TODO: 这里的成功判断 无法捕获code200，但是业务码失败的情形。
					success(data: any) {
						// return `新建栏目成功`;
					},
					error(data: any) {
						return "Error";
					},
				},
			);

			// ElMessage.warning("");
			// await addColumnApiObj
			// 	.execute({
			// 		params: data,
			// 	})
			// 	.catch(() => {});
		}
	} catch (error) {}
}
</script>

<template>
	<section class="ContentSet-root" v-loading="isAppQueryAllTypeLoading">
		<ComponentInMainContentsetColumnDialog ref="dialog" />

		<ElTabs v-model="activeTabName" @tab-change="tabChange" :addable="true">
			<template #add-icon>
				<ElInput placeholder="搜索栏目" :suffix-icon="Search"></ElInput>

				<ElButton type="primary" :icon="AddOne" @click="addColumn"> 新建栏目 </ElButton>
			</template>

			<!-- 全部栏目 -->
			<ElTabPane
				v-for="(columnTypeDTOs, indx) in columnTypeDTOs_toRender"
				:key="columnTypeDTOs.xappType"
				:name="columnTypeDTOs.xappType"
			>
				<template #label>
					<span>
						<component :is="columnTypeDTOs.icon" theme="outline" fill="#333" />
						<span>{{ columnTypeName(columnTypeDTOs) }}</span>
					</span>
				</template>

				<template #default>
					<template v-if="isColumnsPropsEmpty">
						<ElEmpty description="暂无数据">
							<ElButton type="warning" @click="executeQueryConditionApi()"> 重新加载栏目信息 </ElButton>
						</ElEmpty>
					</template>

					<template v-else>
						<ComponentInMainContentsetColumns v-loading="isQueryConditionApiLoading" v-bind="columnsProps" />
					</template>
				</template>
			</ElTabPane>
		</ElTabs>
	</section>
</template>

<style lang="scss" scoped>
.ContentSet-root {
	background-color: rgb(238, 238, 238);
	height: 100%;
}

// 设置tab栏容器的样式
// 让内容自动撑开容器，容器本身不提供多余的样式
.ContentSet-root :deep(.el-tabs__new-tab) {
	display: inline-flex;
	width: fit-content;
	height: fit-content;
	margin: 0;
}
</style>
