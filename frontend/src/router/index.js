import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../pages/HomePage.vue";
import AuthPage from "../pages/AuthPage.vue";
import AboutPage from "../components/AboutPage.vue";
import MyAppointments from "../pages/MyAppointments.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Homepage },
    { path: "/about", name: "About", component: AboutPage },
    { path: "/auth", name: "Auth", component: AuthPage },
    { path: "/appointments", name: "Appointments", component: MyAppointments },
  ],
});

export default router;
