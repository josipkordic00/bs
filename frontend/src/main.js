import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/tailwind.css";

import Homepage from "./pages/HomePage.vue";
import AboutPage from "./components/AboutPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Homepage },
    { path: "/about", name: "About", component: AboutPage },
  ],
});

const app = createApp(App);
app.use(router, axios, VueAxios);
app.mount("#app");
