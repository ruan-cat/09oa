import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "element-plus/es/components/message/style/css";
import "./assets/main.css";
// 引入 form-create 组件库
import formCreate from "@form-create/element-ui";
// 使用ElementPlus和FcDesigner
import FcDesigner from "@form-create/designer";

const app = createApp(App);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

// 使用 form-create 插件
app.use(formCreate);

// 使用ElementPlus和FcDesigner

app.use(FcDesigner);

app.mount("#app");

// 安装HTTP中间件
import installHttp from "./plugins/http";
installHttp(router);

// 安装 vueuse 版本的接口请求工具
import { installAxiosWithVueUse } from "tools/request-with-useAxios.ts";
installAxiosWithVueUse(router);

// 安装ElIcon
import installElIcon from "./plugins/el-icon";
installElIcon(app);

// 全局注册 Element Plus 图标
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

app.use(ElementPlus);

// 引用全局样式
import "./styles/global.css";
