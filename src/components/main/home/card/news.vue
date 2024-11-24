<template>
	<div class="card-container">
		<el-card style="width: 100%">
			<!-- 菜单 -->
			<template #header>
				<el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
					<el-menu-item index="0">最新消息</el-menu-item>
					<el-button type="primary" style="margin-left: auto" link>
						<el-icon size="18px">
							<IconCirclePlusFilled />
						</el-icon>
						<span>更多消息</span>
					</el-button>
				</el-menu>
			</template>

			<!-- 内容 -->
			<div class="content-container" style="display: flex">
				<!-- 最新消息 -->
				<!-- <div class="news-container" style="flex: 1; background-color: #f7fbff">
					<!-- TODO: Modify the variables of the judgment statement below 
					<div v-if="true" style="height: 100%; display: flex; flex-direction: column; justify-content: center">
						<!-- 走马灯 
						<el-carousel height="270px" motion-blur>
							<el-carousel-item style="height: 100%" v-for="(img, index) in imgs" :key="index">
								<img :src="img.src" :alt="img.title" />
							</el-carousel-item>
						</el-carousel>
					</div>

					<div class="icon-background" v-else>
						<el-icon size="100px">
							<IconCalendar />
						</el-icon>
						<el-text tag="b" size="large">今日没有日程</el-text>
					</div>
				</div> -->

				<!-- 当前信息 -->
				<div class="message-container" style="flex: 2; margin-block-start: 1px">
					<!-- TODO: Modify the variables of the judgment statement below -->
					<!-- <el-scrollbar v-if="true">
						<el-row v-for="item in sortedNews" :key="item.No">
							<el-button type="primary" size="small" style="margin: 0 10px" circle>{{ item.No }}</el-button>
							<el-link :href="item.link">{{ item.text }}</el-link>
							<el-text style="margin-inline-start: auto">{{ item.date }}</el-text>
						</el-row>
					</el-scrollbar> -->
					<div class="scroll" v-if="news.length > 0">
						<el-row v-for="item in news" :key="item.No">
							<el-button type="primary" size="small" style="margin: 0 10px" circle>{{ item.No }}</el-button>
							<el-link :href="item.link">{{ item.text }}</el-link>
							<el-text style="margin-inline-start: auto">{{ item.date }}</el-text>
						</el-row>
					</div>
					<div v-else>
						<div class="icon-background">
							<el-icon size="100px">
								<IconCalendar />
							</el-icon>
							<el-text tag="b" size="large">今日没有日程</el-text>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { fetchPromulgationMessageInfo } from "@/apis/index/index1.js";
import { ElNotification, ElMessage } from "element-plus";
const activeIndex = ref("0");
const news = ref([]);
const imgs = [
	{
		src: "/imgForTest/pic1.jpeg",
		title: "图片1的说明",
	},
	{
		src: "/imgForTest/pic2.jpg",
		title: "图片2的说明",
	},
	{
		src: "/imgForTest/pic3.jpg",
		title: "图片3的说明",
	},
];
const loadMessages = async () => {
	try {
		const personId = "1852159770479124482";
		const response = await fetchPromulgationMessageInfo({ personId });
		if (response) {
			news.value = response.map((item, index) => ({
				No: index + 1,
				text: item.xtitle,
				date: item.xcreateTime,
				link: "",
			}));
			ElMessage({
				message: "消息数据加载成功",
				type: "success",
				showClose: true,
			});
		} else {
			ElMessage({
				message: "没有新的消息数据",
				type: "info",
				showClose: true,
			});
		}
	} catch (error) {
		console.error("获取信息失败:", error);
		ElMessage({
			message: "获取消息数据失败",
			type: "error",
			showClose: true,
		});
	}
};

// const sortedNews = news.sort((a, b) => a.No - b.No);
onMounted(loadMessages);
</script>

<style scoped lang="scss">
.scroll {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	max-height: 400px;
	/* 自定义滚动条样式 */
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: #f0f2f5;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: #c0c4cc;
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: padding-box;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: #909399;
	}
}
// .el-row {
// 	margin-bottom: 10px;
// 	align-items: center;

// 	&:last-child {
// 		margin-bottom: 0;
// 	}
// }
.el-row {
	display: flex;
	align-items: center;
	// margin-bottom: 10px;
	padding: 10px;
	padding-left: 1px;
	background-color: #f7f7f7;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

	&:last-child {
		margin-bottom: 0;
	}
}

.el-button {
	margin-right: 10px;
}

.el-link {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-decoration: none;
	&:hover {
		text-decoration: none;
	}
}

.el-text {
	margin-left: auto;
}
img {
	object-fit: contain;
	width: 100%;
	height: 100%;

	&::after {
		content: "这是图片的描述";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		background-color: #111;
		z-index: 10;
	}
}
</style>
