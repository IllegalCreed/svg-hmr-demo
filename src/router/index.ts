import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ErrorView from "../views/ErrorView.vue";
import HomeViewV2 from "@/views/V2/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/error",
      name: "error",
      component: ErrorView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/homeV2",
      name: "homeV2",
      component: HomeViewV2,
    },
    {
      path: "/news/:type",
      name: "news",
      component: () => import("@/views/NewsListView.vue"),
    },
    {
      path: "/genuine",
      name: "genuine",
      component: () => import("@/views/GenuineListView.vue"),
    },
  ],
});

export default router;
