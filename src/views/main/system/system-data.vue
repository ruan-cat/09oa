<template>
	<div class="one">
		<div class="one-menu">
			<h2>系统信息</h2>
		</div>
		<div class="two-menu">
			<h3>系统名称</h3>
			<p>您的系统名称，它将会显示在您的登录页面和浏览器标题栏</p>
			<div class="two">
				<div>
					<div v-if="judge_one">
						<input type="text" v-model="system_name_one_api" />
					</div>
					<div v-else>
						<p>{{ system_name_one_api }}</p>
					</div>
				</div>
				<div>
					<div v-if="judge_one">
						<div class="button" @click="clickButton('one')">提交</div>
					</div>
					<div v-else>
						<div class="button" @click="putClickButton('one', 0, 'system_name', 'name', '/modify-title')">修改</div>
					</div>
				</div>
			</div>
		</div>
		<div class="two-menu">
			<h3>系统副标题</h3>
			<p>您的系统副标题，它将会显示在您的登录页面下方</p>
			<div class="two">
				<div v-if="judge_two">
					<input type="text" v-model="system_name_two_api" />
				</div>
				<div v-else>
					<p>{{ system_name_two_api }}</p>
				</div>
				<div v-if="judge_two">
					<div class="button" @click="clickButton('two')">提交</div>
				</div>
				<div v-else>
					<div class="button" @click="putClickButton('two', 0, 'system_title', 'title', '/modify-footer')">修改</div>
				</div>
			</div>
		</div>
		<div class="two-menu">
			<h3>当前系统语言</h3>
			<p>您的系统语言</p>
			<div class="text">
				<p>{{ system_data[0].is_lang }}</p>
			</div>
		</div>
		<div class="two-menu">
			<h3>当前系统版本</h3>
			<div class="text">
				<p>{{ system_data[0].system_v }}</p>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { systemData } from "@/stores/system";
// import { getSystemDataApi } from "@/apis/system";
// 解构store，动态定义store数据
const system = systemData();
const system_data = computed(() => system.system);
// 动态绑定pinia的数据
const system_name_one_api = computed({
	get(): any {
		return system.system[0].system_name;
	},
	set(new_data: string) {
		system.submitSystemData(new_data, "system_name", 0);
	},
});
const system_name_two_api = computed({
	get(): any {
		return system.system[0].system_title;
	},
	set(new_data: string) {
		system.submitSystemData(new_data, "system_title", 0);
	},
});
// 按钮（页面显示）判断
const judge_one = ref(false);
const judge_two = ref(false);

// loc func
function clickButton(num: string) {
	// 用来切换页面显示的div
	if (num == "one") {
		judge_one.value = !judge_one.value;
	} else if (num == "two") {
		judge_two.value = !judge_two.value;
	}
}
function putClickButton(num: string, loc: number, name: string, back_end_name: string, url: any) {
	system.piniaPutSystemDataApi(loc, name, back_end_name, url);
	clickButton(num);
}
// pinia func
// 页面加载时获取最新数据
function loadSystemInfo() {
	system.piniaGetSystemData();
}
// 钩子
onMounted(() => {
	loadSystemInfo();
});
</script>
<style scoped>
.one {
	display: flex;
	flex-direction: column;
	padding-left: 10px;
	border-left: 1px solid black;
	border-top: 1px solid black;
}
.two {
	display: flex;
	justify-content: space-between;
	padding-top: 10px;
}
.button {
	cursor: pointer; /* 添加指针样式 */
	padding: 5px 10px; /* 添加内边距 */
	background-color: #c1c5cad4; /* 设置背景颜色 */
	color: white; /* 设置文本颜色 */
	border: none; /* 移除边框 */
	border-radius: 2px; /* 添加圆角 */
	text-align: center; /* 文本居中 */
	user-select: none; /* 防止文本被选中 */
}
.one-menu,
.two-menu {
	padding-top: 20px;
	padding-bottom: 20px;
}
.two-menu {
	border-top: 1px solid #c1c5cad4;
}
</style>
