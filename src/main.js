import { createApp } from "vue";
import "@/common/style/style.css";
import router from "./router";
import { createPinia } from "pinia";
import "@/config/axios.js";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");

