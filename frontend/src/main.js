// Imports Vue, Axios, Tailwind
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/tailwind.css";
import store from "./store/index";
import router from "./router/index";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faHouse,
  faCalendarCheck,
  faUser,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHouse,
  faCalendarCheck,
  faUser,
  faRightToBracket,
  faRightFromBracket
);

// Mounts Vue App
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router, axios, VueAxios);
app.use(store);
app.mount("#app");
