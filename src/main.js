import { createApp } from "vue";
import "@/common/style/style.css";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "@/config/axios.js";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
app.use(ToastPlugin);

