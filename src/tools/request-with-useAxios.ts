/**
 * 关于axios的实例封装，以及常见请求类型工具的封装
 *
 * @author f1-阮喵喵
 * @description
 * 本文件封装以下内容
 *
 * 本文件分装的是一个全新的，独立的 axios 请求实例
 *
 * - axios接口请求实例
 * - 常见请求类型的请求函数
 * - 常见请求返回值的处理函数
 *
 * TODO: 正在拆分 准备拆分出一个跨项目的 最纯粹的请求工具 对 useAxios 做尽可能简单的二次封装。
 */

import type { PartialPick } from "type-plus";
import axios from "axios";
import type { AxiosRequestConfig, Method, AxiosInstance, AxiosResponse } from "axios";
import { AxiosError } from "axios";

import qs from "qs";
import { merge, isNil } from "lodash-es";
import type { UseAxiosOptions } from "@vueuse/integrations/useAxios";

import { ElMessage } from "element-plus";

import { userStore } from "stores/user";
import type { Router } from "vue-router";

import type { JsonVO } from "types/JsonVO";

import { useAxiosWrapper } from "@ruan-cat/utils/vueuse";
import type {
	KeyAxiosRequestConfig,
	CreateAxiosRequestConfig,
	UseAxiosWrapperParams,
	KeyHelper,
} from "@ruan-cat/utils/vueuse";

/**
 * 数据上传数据类型
 * @description
 * 一个标记工具，用来控制上传数据的格式
 *
 * 目前没有发现axios有类似的上传类型声明
 */
export enum UpType {
	/** 表单类型 */
	form = 0,

	/** json类型 */
	json = 1,

	/** 文件类型 */
	file = 3,

	/** 文件流类型 */
	stream = 4,
}

/**
 * HTTP状态码
 * @description
 * 待优化 未来可以直接复用axios内提供的值 不需要额外地封装工具
 */
export enum HttpCode {
	/** 暂未登录或TOKEN已经过期 */
	UNAUTHORIZED = 401,
	/** 没有相关权限 */
	FORBIDDEN = 403,
	/** 访问页面未找到 */
	NOT_FOUND = 404,
	/** 服务器错误 */
	SERVER_ERROR = 9994,
	/** 上传参数异常 */
	PARAMS_INVALID = 9995,
	/** ContentType错误 */
	CONTENT_TYPE_ERR = 9996,
	/** 功能尚未实现 */
	API_UN_IMPL = 9997,
	/** 服务器繁忙 */
	SERVER_BUSY = 9998,
	/** 操作失败 */
	FAIL = 9999,
	/** 操作成功 */
	SUCCESS = 10000,
}

/**
 * 上传类型-请求体类型 枚举
 * @description
 * 待优化 未来可以直接复用axios内提供的值 不需要额外地封装工具
 */
export enum MapContentTypeUpType {
	"application/json;charset=UTF-8" = UpType.json,
	"multipart/form-data" = UpType.file,
	"application/octet-stream" = UpType.stream,
	"application/x-www-form-urlencoded;charset=UTF-8" = UpType.form,
}

type ContentType = keyof typeof MapContentTypeUpType;

/**
 * 创建axios实例
 */
export function createAxiosInstance() {
	const instance = axios.create({
		// 直接请求 不经过任何反向代理
		// https:// xxxxXXXXX
		// baseURL: import.meta.env.VITE_base_url,

		/**
		 * 请求的基础路径为特定的字符串 该字符串会被vite反向代理
		 * 在开发环境下 完成vite的反向代理
		 * 在生产环境下 完成nginx的反向代理
		 *
		 * 这里也可以直接填写特定的地址 不经过任何反向代理 直接请求目标地址
		 * baseURL: import.meta.env.VITE_base_url,
		 */
		baseURL: import.meta.env.VITE_proxy_prefix,

		/** 请求超时时间 */
		timeout: 10000,

		/** 允许跨域 */
		withCredentials: true,
	});

	// 使用qs序列化参数params参数
	instance.defaults.paramsSerializer = function (params) {
		return qs.stringify(params);
	};

	return instance;
}

/**
 * useAxios 版本专用的 接口请求实例对象
 * @description
 * 项目内的默认实例不一样。是另外一套独立的实例。
 */
export const axiosInstance = createAxiosInstance();

/**
 * 根据数据上传类型 重设请求头类型
 * @description
 * 不同的数据上传数据类型 要使用不同的接口请求方式
 */
export function handleHeadersByUpType(config: AxiosRequestConfig, upType: UpType) {
	const contentType = MapContentTypeUpType[upType] as ContentType;

	if (contentType) {
		config = merge<AxiosRequestConfig, AxiosRequestConfig>(config, {
			headers: {
				"Content-Type": contentType,
			},
		});
	}

	if (!isNil(config.data) && upType === UpType.form) {
		config.data = qs.stringify(config.data, { arrayFormat: "repeat" });
	}

	return config;
}

/**
 * 是否是 axios的实例对象？
 * @see https://github.com/axios/axios/issues/737
 */
export function isAxiosInstance(p: any): p is AxiosInstance {
	return !!p?.request;
}

type UrlParams = Extract<KeyAxiosRequestConfig, "url" | "params">;
type UrlData = Extract<KeyAxiosRequestConfig, "url" | "data">;

type UrlMethodData = Extract<KeyAxiosRequestConfig, "url" | "method" | "data">;

type RemoveUrl<T extends KeyAxiosRequestConfig> = Exclude<T, "url">;

// 有疑惑 期望实现类型约束 但是这里无法有效约束
// declare module "@vueuse/integrations/useAxios" {
// 	interface UseAxiosOptions<T = any> {
// 		/**
// 		 * Callback when error is caught.
// 		 */
// 		onError?: (e: T) => void;
// 	}
// }

/**
 * url必填的axios请求配置
 */
export type AxiosRequestConfigUrl<D = any> = CreateAxiosRequestConfig<"url", D>;

/**
 * 带有 json 数据格式的 useAxios 选项配置
 */
export interface UseAxiosOptionsJsonVO<T = any> extends UseAxiosOptions<JsonVO<T>> {}

/**
 * useAxios的选项配置 且默认带有immediate属性 不立刻执行
 */
export interface UseAxiosOptionsImmediate<T = any> extends UseAxiosOptionsJsonVO<T> {
	/**
	 * 必填项
	 * @default
	 * 默认为 false 不立刻执行
	 */
	immediate: boolean;
}

/** 针对 useAxios 传参的，接口请求函数的参数类型 */
export interface RequestForUseAxiosParameter<
	/**
	 * 业务数据类型
	 * @description
	 * 必须先填写业务类型
	 */
	T = any,
	/**
	 * AxiosRequestConfig 默认必填的字段
	 * @description
	 * 用于约束其他类型的字段
	 *
	 * 然后才能填写必传的参数类型
	 *
	 * 默认为 必填url请求地址的 config 请求配置
	 */
	K extends KeyAxiosRequestConfig<D> = "url",
	/**
	 * AxiosRequestConfig 用的类型
	 * @description
	 * 最后才可以传递此类型
	 */
	D = any,
> {
	/**
	 * axios的配置类型
	 * @description
	 * 默认为 必填url请求地址的 config 请求配置
	 */
	config: CreateAxiosRequestConfig<K, D>;

	/**
	 * axios实例
	 * @description
	 * 可以不必填 因为这些函数都是专门封装的 没必要考虑到兼容其他axios实例。
	 */
	instance?: AxiosInstance;

	/** useAxios 的选项配置 */
	options?: UseAxiosOptionsJsonVO<T>;
}

/** 生成默认的选项配置 */
function createDefaultUseAxiosOptions<T = any>(): UseAxiosOptionsImmediate<T> {
	return {
		immediate: false,
	};
}

/**
 * 设置默认的值
 * @description
 * 设置 immediate 的值
 *
 * 如果外部没有传递 immediate 属性，那么就使用默认的值
 */
function setDefaultUseAxiosOptions(options: UseAxiosOptions) {
	const _options = createDefaultUseAxiosOptions();
	options.immediate = options?.immediate ?? _options.immediate;
}

/**
 * 对 UseAxiosWrapperParams 做一层业务性质的封装
 * - 预设必填url参数
 * - 不必填instance实例
 * - 不必填选项配置
 */
export interface UseAxiosOAParams<T = any, K extends KeyAxiosRequestConfig<D> = "url", D = any>
	extends PartialPick<UseAxiosWrapperParams<T, K, UseAxiosOptions<JsonVO<T>>, D>, "instance" | "options"> {}

/**
 * 在本OA项目中，预期作为万能的请求函数
 */
function useAxiosOA<T = any, K extends KeyAxiosRequestConfig = "url", D = any>(params: UseAxiosOAParams<T, "url", D>) {
	const {
		config,
		options = {
			immediate: false,
		},
		instance = axiosInstance,
	} = params;

	setDefaultUseAxiosOptions(options);

	return useAxiosWrapper<JsonVO<T>, RemoveUrl<K>, D>({
		config,
		instance,
		options,
	});
}

/**
 * useAxios 版本的 get 请求
 * @description
 * 传参要传递 config.params
 */
export function getUseAxios<T = any, K extends KeyAxiosRequestConfig = UrlParams>(p: RequestForUseAxiosParameter<T>) {
	const {
		config: { url },
		config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	config.method = "get";
	return useAxiosOA<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * useAxios 版本的 post 请求
 * @description
 * 传参要传递 config.data
 *
 * 默认情况下 post 请求是body传参的。
 *
 */
export function postUseAxios<T, K extends KeyAxiosRequestConfig = UrlData>(p: RequestForUseAxiosParameter<T>) {
	const {
		config: { url },
		config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	config.method = "post";
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * useAxios 版本的 put 请求
 * @description
 * 传参要传递 config.data
 */
export function putUseAxios<T, K extends KeyAxiosRequestConfig = UrlData>(p: RequestForUseAxiosParameter<T>) {
	const {
		config: { url },
		config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	config.method = "put";
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * useAxios 版本的 patch 请求
 * @description
 * 传参要传递 config.data
 */
export function patchUseAxios<T, K extends KeyAxiosRequestConfig = UrlData>(p: RequestForUseAxiosParameter<T>) {
	const {
		config: { url },
		config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	config.method = "patch";
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * useAxios 版本的 delete 请求
 * @description
 * 传参要传递 config.params
 */
export function deleteUseAxios<T, K extends KeyAxiosRequestConfig = UrlParams>(p: RequestForUseAxiosParameter<T>) {
	const {
		config: { url },
		config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	config.method = "delete";
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * useAxios 版本的 发送表单请求
 * @description
 * 仅仅是为form请求和传参做了封装
 *
 * 传参要传递 config.params
 */
export function requestFormUseAxios<T, K extends KeyAxiosRequestConfig = UrlMethodData>(
	// FIXME: 这里的泛型传参 不能直接传递K，导致报错
	p: RequestForUseAxiosParameter<T, UrlMethodData>,
) {
	const {
		config: { url, data, method },
		// 重命名为中间变量的配置对象
		config: _config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	// 经过加工后最终参与的配置对象
	const config = handleHeadersByUpType(_config, UpType.form);
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * useAxios 版本的 requestJson
 * @description
 * 传参要传递 config.data
 */
export function requestJsonUseAxios<T, K extends KeyAxiosRequestConfig = UrlMethodData>(
	p: RequestForUseAxiosParameter<T, UrlMethodData>,
) {
	const {
		config: { url, data, method },
		// 重命名为中间变量的配置对象
		config: _config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);
	// 经过加工后最终参与的配置对象
	const config = handleHeadersByUpType(_config, UpType.json);
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * @description
 * 传参要传递 config.data
 */
export function postFileUseAxios<T, K extends KeyAxiosRequestConfig = UrlData>(p: RequestForUseAxiosParameter<T>) {
	const {
		config: { url, data },
		// 重命名为中间变量的配置对象
		config: _config,
		instance = axiosInstance,
		options = createDefaultUseAxiosOptions(),
	} = p;
	setDefaultUseAxiosOptions(options);

	// 警告 这里的传值 很有可能不生效。有意义的传值都要求用户另外传递的。
	// 这里的加工很可能无意义。
	// 将data转换成FormData对象
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	_config.data = formData;

	// 仅为post请求
	_config.method = "post";

	// 经过加工后最终参与的配置对象
	const config = handleHeadersByUpType(_config, UpType.file);
	return useAxios<JsonVO<T>, RemoveUrl<K>>(url, config, instance, options);
}

/**
 * 注册 useAxios 版本的 axios 实例对象
 * @description
 * 本函数主要实现拦截器的配置
 */
export function registerAxiosInstanceWithUseAxiosHook(router: Router) {
	// 请求拦截处理
	axiosInstance.interceptors.request.use(
		function onFulfilled(config) {
			// 提交的时候携带登录凭证
			let store = userStore();
			// @ts-ignore
			let token = store.getToken;

			/** 临时token */
			const tempToken = import.meta.env.VITE_temp_token;

			/** 如果存在有意义的临时token 就赋值 */
			if (tempToken) {
				token = tempToken;
			}

			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}

			/** 处理反向代理的虚拟地址问题 */
			function _handleBaseUrl(config: AxiosRequestConfig) {
				/**
				 * 请求前缀配置
				 * @description
				 * 后端的接口请求中 其生产环境的是特殊的
				 * 有特定的虚拟前缀 故需要在请求的时候特殊处理
				 */
				const cfg = [
					{
						regExps: ["/app", "/columnattribute"],
						target: "/j3-cms-base",
					},
					{
						regExps: ["/sortallocation", "/dataconfig", "/form", "/resourcefile"],
						target: "/j3-cms-setting",
					},
				];

				for (const item of cfg) {
					for (const regExp of item.regExps) {
						if (new RegExp("^" + regExp).test(<string>config.url)) {
							/** 请求前缀 */
							// let prefix = "";
							// 如果是开发环境 这需要增加反向代理的前缀
							// 开发环境需要反向代理
							// 在生产环境，也需要nginx提供的反向代理
							// if (import.meta.env.MODE === "development") {
							// 	prefix = import.meta.env.VITE_proxy_prefix;
							// } else {
							// 	prefix = "";
							// }
							// config.baseURL = `${prefix}${item.target}`;

							// 增加虚拟前缀
							config.baseURL = `${import.meta.env.VITE_proxy_prefix}${item.target}`;
							break;
						}
					}
				}
			}
			_handleBaseUrl(config);

			return config;
		},

		function onRejected(error) {
			return Promise.reject(error);
		},
	);

	// 响应拦截处理
	axiosInstance.interceptors.response.use(
		async function onFulfilled(response) {
			/**
			 * 不解包的原始数据
			 * @description
			 * useAxios 会默认解包一层数据 所以本回调函数在任何情况下，均不应该默认解包一次
			 *
			 * 在成功的回调内 不做解包数据
			 *
			 * 在业务失败的回调内 解包数据
			 */
			const _nowrapData = response;

			// HTTP响应状态码正常
			if (response.status === 200) {
				if ("code" in response.data) {
					let store = userStore();
					const data = response.data;

					if (data.code === HttpCode.SUCCESS) {
						// 将数据继续传递下去
						return Promise.resolve(_nowrapData);
					}

					if (data.code === HttpCode.FORBIDDEN) {
						// 权限不足
						ElMessage.error("权限不够，请联系管理员");
						// 将数据继续传递下去
						return Promise.reject(_nowrapData.data);
					}

					if (data.code === HttpCode.UNAUTHORIZED) {
						// 判断是否是超时
						if (typeof data.data === "string" && data.data.indexOf("Jwt expired at") >= 0) {
							// 刷新凭证
							// @ts-ignore
							await store.reloadToken();
							// 设置为未加载
							// @ts-ignore
							store.setLoaded(false);
							// 跳转到主页
							router.push("/home");
						} else {
							// 没有登录或登录已失效
							router.push("/");
							// 重置数据
							// @ts-ignore
							store.resetSaveData();
						}
						// 将数据继续传递下去
						return Promise.reject(_nowrapData.data);
					}

					if (data.code === HttpCode.NOT_FOUND) {
						ElMessage.warning(data.message || "404访问页面不存在");
						return Promise.reject(_nowrapData.data);
					}

					if (
						isConditionsSome([
							() => data.code === HttpCode.CONTENT_TYPE_ERR,
							() => data.code === HttpCode.PARAMS_INVALID,
						])
					) {
						ElMessage.warning(data.message || "请求参数或请求头错误");
						return Promise.reject(_nowrapData.data);
					}

					// 显示操作失败提示
					// ElMessage.error(data.message || '操作失败!!!')
					return Promise.reject(_nowrapData.data);
				}

				return Promise.reject(_nowrapData.data);
			}

			// 接口404的情况
			else if (response.status === 404) {
				ElMessage.warning("404访问页面不存在");
				return Promise.reject(_nowrapData.data);
			}

			// 其他情况
			else {
				return Promise.reject(_nowrapData.data);
			}
		},

		function onRejected(error) {
			if (
				isConditionsSome([() => error.code === AxiosError.ECONNABORTED, () => error.code === AxiosError.ERR_NETWORK])
			) {
				ElMessage.error("连接服务器失败!!!");
			}

			return Promise.reject(error);
		},
	);
}

export const installAxiosWithVueUse = registerAxiosInstanceWithUseAxiosHook;
