<template>
	<div class="one">
		<div class="one-menu">
			<h2>登陆配置</h2>
		</div>
		<div class="two-menu">
			<h3>启用图片验证码登录</h3>
			<p>启用后登陆时必须正确输入图片验证码</p>
			<div class="two">
				<el-switch v-model="value1" class="mb-2" active-text="启用" inactive-text="禁用" @change="" />
			</div>
		</div>
		<div class="two-menu">
			<h3>启用短信验证码登录</h3>
			<p>启用后允许通过短信验证码登录</p>
			<div class="two">
				<el-switch v-model="value2" class="mb-2" active-text="启用" inactive-text="禁用" @change="" />
			</div>
		</div>
		<div class="two-menu">
			<h3>启用双因素认证登录</h3>
			<p>
				启用后，用户输入账号密码后系统会发送短信验证码，用户再输入短信验证码登录。xadmin和三员管理员不发送短信，在短信验证码界面再次输入密码。双因素认证和短信验证码两种登录方式互斥
			</p>
			<div class="two">
				<el-switch v-model="value3" class="mb-2" active-text="启用" inactive-text="禁用" @change="" />
			</div>
		</div>
		<div class="two-menu">
			<h3>启用扫描二维码登录</h3>
			<p>启用后允许扫描二维码登录</p>
			<div class="two">
				<el-switch v-model="value4" class="mb-2" active-text="启用" inactive-text="禁用" @change="" />
			</div>
		</div>
		<div class="two-menu">
			<h3>启用自助注册</h3>
			<p>此处配置是否允许自助注册成为系统用户，以及自助注册方式</p>
			<div class="two">
				<el-switch
					v-model="value5"
					class="mb-2"
					active-text="启用"
					inactive-text="禁用"
					@change="submitSystemData(value5, options1_value, 'value5', 'options1')"
				/>
			</div>
			<h4 v-if="value5">自动注册方式</h4>
			<div v-if="value5" class="two">
				<el-select
					v-model="options1_value"
					placeholder="Select"
					style="width: 240px"
					@change="submitSystemData(value5, options1_value, 'value5', 'options1')"
				>
					<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
		</div>
		<div class="two-menu">
			<h3>使用门户页面登录</h3>
			<p>系统支持使用定制的门户页面作为登录页，我们在应用市场上提供了登录页应用模板，您可以免费获取</p>
			<div class="two">
				<el-switch
					v-model="value6"
					class="mb-2"
					active-text="启用"
					inactive-text="禁用"
					@change="submitSystemData(value6, options2_value, 'value6', 'options2')"
				/>
			</div>
			<h4 v-if="value6">自动注册方式</h4>
			<div v-if="value6" class="two">
				<el-select
					v-model="options2_value"
					placeholder="Select"
					style="width: 240px"
					@change="submitSystemData(value6, options2_value, 'value6', 'options2')"
				>
					<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
		</div>
		<div class="two-menu">
			<h3>使用门户页面作为系统首页</h3>
			<p>可使用定制的门户页面作为系统首页，登录后打开此页面</p>
			<div class="two">
				<el-switch
					v-model="value7"
					class="mb-2"
					active-text="启用"
					inactive-text="禁用"
					@change="submitSystemData(value7, options3_value, 'value7', 'options3')"
				/>
			</div>
			<h4 v-if="value7">自动注册方式</h4>
			<div v-if="value7" class="two">
				<el-select
					v-model="options3_value"
					placeholder="Select"
					style="width: 240px"
					@change="submitSystemData(value7, options3_value, 'value7', 'options3')"
				>
					<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { systemData } from "@/stores/system";
const user_store = systemData();
let system_data = user_store.system;

// loc data
// 按钮数据
let value1 = ref(system_data[3].value1);
let value2 = ref(system_data[3].value2);
let value3 = ref(system_data[3].value3);
let value4 = ref(system_data[3].value4);
let value5 = ref(system_data[3].value5);
let value6 = ref(system_data[3].value6);
let value7 = ref(system_data[3].value7);
//选项数据
let options1_value = ref(system_data[3].options1);
let options2_value = ref(system_data[3].options2);
let options3_value = ref(system_data[3].options3);
let options1 = [
	{
		value: "通过验证码注册",
		label: "通过验证码注册",
	},
	{
		value: "通过手机注册",
		label: "通过手机注册",
	},
];
let options2 = [
	{
		value: "登陆注册页",
		label: "登陆注册页",
	},
	{
		value: "建党门户",
		label: "建党门户",
	},
	{
		value: "企业网盘",
		label: "企业网盘",
	},
	{
		value: "办公用品管理",
		label: "办公用品管理",
	},
];
let options3 = [
	{
		value: "门户",
		label: "门户",
	},
	{
		value: "登陆",
		label: "登陆",
	},
	{
		value: "通讯录",
		label: "通讯录",
	},
];
// loc func

// pinia func
function submitSystemData(button_new_data: boolean, options_new_data: any, button_name: string, options_name: string) {
	user_store.submitSystemData(button_new_data, button_name, 3);
	user_store.submitSystemData(options_new_data, options_name, 3);
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
	cursor: pointer;
	/* 添加指针样式 */
	padding: 5px 10px;
	/* 添加内边距 */
	background-color: #c1c5cad4;
	/* 设置背景颜色 */
	color: white;
	/* 设置文本颜色 */
	border: none;
	/* 移除边框 */
	border-radius: 2px;
	/* 添加圆角 */
	text-align: center;
	/* 文本居中 */
	user-select: none;
	/* 防止文本被选中 */
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
