import { defineStore } from "pinia";
// import { apiGetSystemDataApi, apiPutSystemDataApi } from "@/apis/system";
import { apiGetSystemDataApi, apiPutSystemData } from "@/apis/system/index";

export const systemData = defineStore("systemData", {
	state: () => ({
		// 用户系统数据
		system: [
			{
				// 系统管理数据
				system_name: "system_name",
				system_title: "system_title",
				is_lang: "( *｀ω´)",
				system_v: "( *｀ω´)",
			},
			{
				// 表单模版管理数据
			},
			{
				// 密码配置数据
				password_input: "(((o(*ﾟ▽ﾟ*)o)))",
				password_end_day: "-1",
				password_len: [5, 20],
				password_way: "手机号后六位",
			},
			{
				// 登陆配置数据
				// 按钮数据
				value1: true, // 启用图片验证码登录
				value2: true, // 启用短信验证码登录
				value3: true, // 启用双因素认证登录
				value4: true, // 启用扫描二维码登录
				value5: true, // 启用自助注册
				value6: true, // 使用门户页面登录
				value7: true, // 使用门户页面作为系统首页
				options1: "", // 自动注册单选框
				options2: "", // 使用门户页面登录单选框
				options3: "", // 使用门户页面作为系统首页单选框
			},
		],
		// 缓存数据
		staging: shallowRef(null),
	}),
	getters: {},
	actions: {
		// 系统配置-更新数据
		/**
		 * 更新 system 数组中指定位置的数据
		 * @param {string} new_data - 新数据
		 * @param {string} name - 新数据的键
		 * @param {number} loc - system 数组的目标位置索引
		 * @returns {void}
		 */
		submitSystemData(new_data, name, loc) {
			if (!this.system || this.system.length === 0) {
				console.warn("System data is not initialized or empty.");
				return;
			}

			if (!(name in this.system[loc])) {
				console.warn(`Property ${name} does not exist in system[0].`);
				return;
			}
			// 确保响应
			this.system[loc][name] = new_data;
			console.log("PINIA: system data:", this.system[loc][name]);
		},
		// api func
		// get api
		async piniaGetSystemData() {
			try {
				// 获取json并剥离无关数据
				const response = await apiGetSystemDataApi();
				this.staging = JSON.parse(JSON.stringify(response.data));
				// 赋值
				this.system[0].system_name = this.staging.name;
				this.system[0].system_title = this.staging.title;
				this.system[0].is_lang = this.staging.supportedLanguages;
				this.system[0].system_v = this.staging.version;
				// 清楚staging缓存
				this.staging = null;

				console.log("PINIA: Get数据:  ", this.staging);
				console.log("system-name: ", this.system[0]);
			} catch (error) {
				console.error(error);
			}
		},
		// put api
		// 系统配置-更新数据
		/**
		 * 从pinia中获取数据并put
		 * @param {number} loc - system 数组的目标位置索引
		 * @param {string} name - 新数据的键
		 * @param {string} back_end_name - 后端API定义的key的命名
		 * @param {url} url - 传递的网址后缀
		 * @returns {void}
		 */
		async piniaPutSystemDataApi(loc, name, back_end_name, url) {
			try {
				const data = {
					back_end_name: this.system[loc].name,
				};
				const response = await apiPutSystemDataApi(data, url);
				// 成功处理响应
				console.log("PINIA: Put数据:  ", data);
				console.log("PINIA: Put: 响应数据:  ", response.data);
			} catch (error) {
				// 捕获并处理错误
				console.error("PINIA: Put: 请求出错: ", error);
			}
		},
	},
});
