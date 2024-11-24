<template>
	<el-dropdown trigger="hover" @mouseenter="fetchUnreadMessages">
		<el-button class="icon-button">
			<comment theme="filled" size="24" fill="#9e9e9e" :strokeWidth="1" class="icon-notice" />
		</el-button>

		<template #dropdown>
			<div class="control-bar">
				<el-button type="danger" @click="clearTasks">清空信息</el-button>
			</div>
			<div v-for="(task, xid) in paginatedTasks" :key="task.xid">
				<el-descriptions class="margin-top" :column="1" :size="size" @click="markAsRead(task)">
					<el-descriptions-item>
						<div class="item-content">
							<span class="large-text">{{ task.xtitle }}</span>
							<div class="button-container">
								<el-button type="primary" :icon="Delete" @click="deleteTask(task)" />
							</div>
						</div>
					</el-descriptions-item>
					<el-descriptions-item>{{ task.xbody }}</el-descriptions-item>
					<el-descriptions-item label="通知人数">
						<el-tag size="small">{{ task.xperson }}</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="类型">
						<el-tag size="small">{{ task.xtype }}</el-tag>
					</el-descriptions-item>
					<el-descriptions-item class="date">
						<div class="date-container">
							<span>{{ task.xcreateTime }}</span>
							<div class="control-bar" :class="{ read: task.xconsumed }">
								阅读状态：{{ task.xconsumed ? "已读" : "未读" }}
							</div>
						</div>
					</el-descriptions-item>
				</el-descriptions>
			</div>

			<!-- 分页控件 -->
			<el-pagination
				v-if="tasks.length > pageSize"
				@current-change="handlePageChange"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="tasks.length"
				layout="prev, pager, next"
				class="pagination"
			/>
		</template>
	</el-dropdown>
</template>

<script setup>
import { ref, computed } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { Comment } from "@icon-park/vue-next";
import {
	getUnreadMessagesApi,
	modifyMessageStatusApi,
	clearMessagesApi,
	deleteMessageApi,
} from "@/apis/information/index";

const size = ref("default");
const tasks = ref([]);
const currentPage = ref(1); // 当前页
const pageSize = 2; // 每页显示的任务数量

// 计算当前页面显示的任务列表
const paginatedTasks = computed(() => {
	const start = (currentPage.value - 1) * pageSize;
	const end = start + pageSize;
	return tasks.value.slice(start, end);
});

const fetchUnreadMessages = async () => {
	await getUnreadMessagesApi(
		{ pageIndex: currentPage.value, pageSize: 10, xconsumed: false },
		(data) => {
			tasks.value = data;
		},
		() => {
			console.error("获取未读消息失败");
		},
	);
};

// 处理页码变更
const handlePageChange = (newPage) => {
	currentPage.value = newPage;
	fetchUnreadMessages();
};
// 标记任务为已读并发送更新到 API
const markAsRead = async (task) => {
	task.xconsumed = true; // 在本地标记任务为已读
	// 构建数据对象，包含消息 ID 和状态
	const data = { xid: task.xid, xconsumed: task.xconsumed };
	// 调用 API 更新消息状态
	await modifyMessageStatusApi(
		data,
		() => {
			console.log(`消息 ID ${task.xid} 状态更新为 ${task.xconsumed ? "已读" : "未读"}`);
		},
		() => {
			console.error("消息状态更新失败");
		},
	);
};

// 删除任务并调用 API
const deleteTask = async (task) => {
	// 找到任务在 `tasks` 中的索引
	const taskIndex = tasks.value.findIndex((t) => t.xid === task.xid);
	if (taskIndex === -1) {
		console.error("任务不存在，无法删除");
		return;
	}
	// 调用 API 删除消息
	//tasks.value.splice(taskIndex, 1);
	await deleteMessageApi(
		{ xid: task.xid },
		() => {
			// 确保 API 删除成功后，再移除任务
			 tasks.value.splice(taskIndex, 1);
			console.log(`消息 ID ${task.xid} 已成功删除`);
		},
		() => {
			console.error("消息删除失败");
		},
	);
};

// 清空所有任务并调用 API
const clearTasks = async () => {
	const xIds = tasks.value.map((task) => task.xid); // 获取所有任务的 ID 列表
	tasks.value = []; // 本地清空任务数组

	// 调用 API 清空消息
	await clearMessagesApi(
		xIds,
		(clearedIds) => {
			console.log(`消息 ID ${clearedIds} 已清空`);
		},
		() => {
			console.error("清空消息失败");
		},
	);
};

// 点击事件处理函数
const handleClick = () => {
	console.log("Icon button clicked!");
	// 在这里处理按钮点击的逻辑
};

// 合并的点击事件处理函数
const handleClickAndFetchMessages = () => {
	handleClick(); // 调用原有的处理逻辑
	fetchUnreadMessages(); // 获取未读消息
};
</script>

<style scoped>
.control-bar {
	display: flex;
	justify-content: flex-end; /* 将内容推到右侧 */
	width: 100%; /* 占满整行 */
}
.margin-top {
	margin-top: 10px; /* 整体上边距 */
}

.item-content {
	display: flex;
	justify-content: space-between; /* 左侧文本与右侧按钮对齐 */
	align-items: center; /* 垂直居中对齐 */
	width: 100%; /* 占满整行 */
}

.large-text {
	font-size: 33px; /* 调整文本大小 */
	font-weight: bold; /* 加粗文本 */
	white-space: nowrap; /* 避免换行 */
	color: rgb(100, 150, 200);
}

.button-container {
	margin-left: auto; /* 将按钮推到右侧 */
}
.el-button {
	margin-left: 10px; /* 按钮之间增加间距 */
}

.date-container {
	display: flex;
	justify-content: space-between; /* 左侧日期与右侧阅读状态对齐 */
	align-items: center;
	font-size: 14px; /* 小一些的日期字体 */
	color: #666; /* 灰色文本 */
}

.date {
	margin-top: 10px;
}

.read {
	color: green; /* 已读状态显示为绿色 */
}

.no-tasks {
	text-align: center; /* 提示信息居中 */
	font-size: 18px; /* 提示文字的大小 */
	color: #999; /* 灰色字体 */
	margin-top: 20px; /* 与顶部有一定间距 */
}
.icon-button {
	padding: 0; /* 移除按钮的内边距 */
	margin: 0; /* 移除按钮的外边距 */
	border: none; /* 移除按钮的边框 */
	background: none; /* 移除按钮的背景色 */
	width: auto; /* 自动调整按钮宽度，确保仅限图标 */
	height: auto; /* 自动调整按钮高度 */
	outline: none; /* 移除按钮点击时的默认外框 */
	cursor: pointer; /* 鼠标悬浮时显示手型光标 */
	z-index: 999;
}

.icon-notice {
	width: 24px; /* 设置图标宽度 */
	height: 24px; /* 设置图标高度 */
	margin: 0; /* 确保图标没有额外的边距 */
	z-index: 999;
}
/* 额外移除可能的伪类 */
.icon-button::before,
.icon-button::after {
	content: none; /* 移除按钮的伪元素，防止出现小方框 */
}
</style>
