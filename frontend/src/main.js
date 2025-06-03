import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers";
import "leaflet/dist/leaflet.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(Toast);
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
