import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./handlers/router";
import Textra from "vue-textra";

createApp(App).use(router).mount("#app");
