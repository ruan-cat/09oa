<!-- 
	表单配置页面
-->

<script lang="ts" setup>
import { Help, Delete } from "@icon-park/vue-next";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";

import type { JsonVO } from "types/index";
import type { ColumnFormVO } from "types/contentset/ColumnFormVO";

const contentsetInfoPageStore = useContentsetInfoPageStore();
const { id: columnId } = storeToRefs(contentsetInfoPageStore);

/** ColumnFormVO，CMS表单视图对象 */
const columnFormVOs = ref<ColumnFormVO[]>([]);

const isColumnFormVOsEmpty = computed(() => isEmpty(columnFormVOs.value));

const formQueryAllApiObj = formQueryAllApi({
	onSuccess(data) {
		columnFormVOs.value = data.data;
	},
	onError(error) {
		const e = <JsonVO<unknown>>error;
		ElMessage.error(e.message);
	},
});

// 每次进入到该页面时 就做接口请求
onActivated(async () => {
	// 调用方式 采用仅仅传递唯一的url参数 不传递整个config对象
	await formQueryAllApiObj.execute(`/form/query-all/${columnId.value}`).catch(() => {});
});

function format(d: string) {
	return dayjs(d).format("YYYY-MM-DD HH:mm:ss");
}
</script>

<template>
	<section class="form-config-root">
		<ComponentInMainContentsetCard title="表单配置页面" v-loading="formQueryAllApiObj.isLoading.value">
			<template #default>
				<template v-if="isColumnFormVOsEmpty">
					<ElEmpty description="暂无表单配置，请点击上方的添加按钮"></ElEmpty>
				</template>

				<template v-else>
					<ComponentInMainContentsetRowItem v-for="columnFormVO in columnFormVOs" :key="columnFormVO.xid">
						<section class="form-item">
							<section class="left">
								<section class="icon">
									<Help size="100%"></Help>
								</section>

								<section class="title">{{ columnFormVO.xname }}</section>

								<section class="alias">{{ columnFormVO.xalias }}</section>

								<section class="date">
									{{ format(columnFormVO.xcreateTime) }}
								</section>
							</section>

							<section class="right">
								<section class="btns">
									<!-- <Edit size="100%"></Edit>
								<Eyes size="100%"></Eyes> -->
									<Delete size="100%"></Delete>
								</section>
							</section>
						</section>
					</ComponentInMainContentsetRowItem>
				</template>
			</template>
		</ComponentInMainContentsetCard>
	</section>
</template>

<style lang="scss" scoped>
.form-config-root {
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

			.icon {
				height: 2rem;
				width: 2rem;
				margin: 0.5rem;
			}

			.title {
				font-size: 1.1rem;
			}

			.alias {
				font-size: 0.8rem;
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
