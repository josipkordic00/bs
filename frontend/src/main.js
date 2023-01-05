import App from "./App.vue";
import "./assets/tailwind.css";

import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";

const app = Vue.createApp(App).mount("#app");
app.use(VueAxios, axios);
