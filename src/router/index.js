import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import DynamicPage from "../views/DynamicPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/form/:parameter", // Define a dynamic route with a parameter named "parameter"
    name: "dynamic-page",
    component: DynamicPage, // Use a dedicated component for dynamic pages
    props: true, // Pass route parameters as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
