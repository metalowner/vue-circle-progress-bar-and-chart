// src/router/index.js
import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ChartView from "@/views/ChartView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/chart",
    name: "Chart",
    component: ChartView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use HTML5 history mode
  routes, // short for `routes: routes`
});

export default router;
