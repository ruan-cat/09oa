<template>
	<div>
		<el-table
			ref="dataTable"
			:data="dataSource.list || []"
			:height="tableHeight"
			:stripe="option.stripe"
			:border="option.border"
			haeder-row-class-name="table-header-row"
			heightlight-current-row
			@row-click="handleRowClick"
			@selecttion-change="handleSelectionChange"
		>
			<!-- selection选择框 -->
			<el-table-column
				v-if="option.selectType && option.selectType == 'checkbox'"
				type="selection"
				width="50"
				align="center"
			></el-table-column>
			<!-- 序号 -->
			<el-table-column v-if="options.showIndex" label="序号" type="index" width="60" align="center"></el-table-column>
			<!-- 数据列 -->
			<template v-for="(column, index) in column">
				<template v-if="column.scopedSlots">
					<el-table-column
						:key="index"
						:prop="column.prop"
						:label="column.label"
						:align="column.align || 'left'"
						:width="column.width"
					>
						<template #default>
							<slot :name="column.scopedSlots" :index="scope.$index" :row="scope.row"> </slot>
						</template>
					</el-table-column>
				</template>
				<template v-else>
					<el-table-column
						:key="index"
						:prop="column.prop"
						:label="column.label"
						:align="column.align || 'left'"
						:width="column.width"
						:fixed="column.fixed"
					>
					</el-table-column>
				</template>
			</template>
		</el-table>
		<!-- 分页 -->
		<div class="pagination" v-if="showPagination">
			<el-pagination
				v-if="dataSource.totalCount"
				background
				:total="dataSource.totalCount"
				:page-sizes="[15, 30, 50, 100]"
				:page-size="dataSource.pageSize"
				:current-page.sync="dataSource.pageNo"
				:layout="layout"
				@size-change="handlePageSizeChange"
				@current-change="handlePageNoChange"
				style="text-align: right"
			></el-pagination>
		</div>
	</div>
</template>

<script setup>
import { MapContentTypeUpType } from "@/tools/request-with-useAxios";
import { DataScreen } from "@icon-park/vue-next";
import { columns } from "element-plus/es/components/table-v2/src/common.mjs";
import { type } from "os";
import { ref, computed } from "vue";

const emit = defaultEmits(["rowSelect", "rowClick"]);
const props = defineProps({
	dataSource: Object,
	showPagination: {
		type: Boolean,
		default: true,
	},
	showPageSize: {
		type: Boolean,
		default: true,
	},
	options: {
		type: Object,
		default: {
			extHeight: 0,
			showIndex: false,
		},
	},
	columns: Array,
	fetch: Function, //获取数据的函数
	initFetch: {
		type: Boolean,
		default: true,
	},
});

const layout = computed(() => {
	return `total, ${props.showPageSize ? "size" : ""}, prev,pager,next,jumper`;
});
//顶部60，内容区域距离顶部 20，内容上下间距15*2 分页区域高度 46
const topHeight = 60 + 30 + 20 + 46;

const tableHeight = ref(
	props.options.tableHeight ? props.options.tableHeight : window.innerHeight - topHeight - props.options.extHeight,
);

//初始化
const init = () => {
	if (props.initFetch && props.fetch) {
		props.fetch();
	}
};
init();

const dataTable = ref();
//清楚选中
const clearSelection = () => {
	dataTable.value.clearSelection();
};

//设置行选中
const setCurrentRow = (rowKey, rowValue) => {
	let row = props.dataSource.list.find((item) => {
		return item[rowKey] === rowValue;
	});
	dataTable.value.setCurrentRow(row);
};
// 将子组件暴漏出去，否则父组件无法调用和

defineExpose({ setCurrentRow, clearSelection });
//行点击
const handleRowClick = (row) => {
	emit("rowClick", row);
};

//多选
const handleSelectionChange = (row) => {
	emit("rowSelected", row);
};

//切换每页大小
const handlePageSizeChange = (size) => {
	props.dataSource.pageSize = size;
	props.dataSource.pageNo = 1;
	props.fetch();
};
</script>

<style lang="scss" scoped>
.pageination {
	padding-top: 10px;
	padding-right: 10px;
}
.el-pagination {
	justify-content: right;
}
:deep .el-table_cell {
	padding: 4px 0px;
}
</style>
