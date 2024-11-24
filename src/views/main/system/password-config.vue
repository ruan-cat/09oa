<template>
	<div class="one">
		<div class="one-menu">
			<h2>密码配置</h2>
		</div>
		<div class="two-menu">
			<h3>新建用户的初始密码</h3>
			<p>创建新建用户时，会按以下设定生成用户初始密码，用户可登录系统后自行修改</p>
			<div class="two">
				<el-select v-model="password_way" placeholder="Select" style="width: 240px">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<p>在下面的输入框中输入的密码，将作为新创建用户的初始密码</p>
			<div class="two">
				<div>
					<el-input
						v-model="password_input"
						style="width: 240px"
						type="password"
						placeholder="Please input password"
						show-password
					/>
				</div>
				<div>
					<div class="button" @click="clickPassword(password_input, password_way)">提交</div>
				</div>
			</div>
		</div>
		<div class="two-menu">
			<h3>密码过期天数</h3>
			<p>超过此设定天数未修改密码的用户，登录后会强制要求修改密码，否则无法进入系统。设置为 -1 表示密码永不过期</p>
			<div class="two">
				<div>
					<input type="text" v-model="password_end_day" />
				</div>
				<div>
					<div class="button" @click="submitSystemData(password_end_day, 'password_end_day')">提交</div>
				</div>
			</div>
		</div>
		<div class="two-menu">
			<h3>密码复杂度</h3>
			<p>设置用户密码复杂度要求</p>
			<div class="two">
				<div class="button-len">
					<div class="slider-demo-block">
						<el-slider v-model="password_len" range show-stops :max="30" />
					</div>
				</div>
				<div>
					<div class="button" @click="submitSystemData(password_len, 'password_len')">提交</div>
				</div>
			</div>
			<div>
				<!-- <p>密码范围: {{ password_len[0] }} ---- {{ password_len[1] }}</p> -->
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { systemData } from "@/stores/system";
import { computed } from "vue";
// 解构store，动态定义store数据
const user_store = systemData();
const system_data = computed(() => user_store.system);

// loc data
function clickPassword(new_password: any, password_type: any) {
	user_store.submitSystemData(new_password, "password_input", 2);
	user_store.submitSystemData(password_type, "password_way", 2);
}
// 密码值 & 密码相关值
let password_input = ref(system_data.value[2].password_input);
let password_end_day = ref(system_data.value[2].password_end_day);
let password_len = ref(system_data.value[2].password_len);
// 单选选择器值
const password_way = ref(system_data.value[2].password_way);
const options = [
	{
		value: "手机号后六位",
		label: "手机号后六位",
	},
	{
		value: "员工编码后六位",
		label: "员工编码后六位",
	},
	{
		value: "员工号",
		label: "员工号",
	},
	{
		value: "邀请码",
		label: "邀请码",
	},
];
// pinia func
function submitSystemData(new_data: any, name: string) {
	user_store.submitSystemData(new_data, name, 0);
}
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
.slider-demo-block {
	max-width: 600px;
	display: flex;
	align-items: center;
}
.slider-demo-block .el-slider {
	margin-top: 0;
	margin-left: 12px;
}
.button-len {
	width: 50%;
}
</style>
