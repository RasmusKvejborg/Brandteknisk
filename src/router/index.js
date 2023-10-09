import { createRouter, createWebHistory } from "vue-router";
import Project from "../views/ProjectView.vue";
import About from "../views/AboutView.vue";
import DynamicPage from "../views/DynamicPage.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/project/:parameter",
    name: "project",
    component: Project,
    props: true,
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
