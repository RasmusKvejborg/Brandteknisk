import { createRouter, createWebHistory } from "vue-router";
import Project from "../views/Project.vue";
import About from "../views/About.vue";
import Form from "../views/Form.vue";
import FormProjektering from "../views/FormProjektering.vue";
import FormUdforsel from "../views/FormUdforsel.vue";

import Result from "../views/Result.vue";

import Home from "../views/Home.vue";
import Forklaring from "../views/Forklaring.vue";

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
    name: "form-page",
    component: Form, // Use a dedicated component for dynamic pages
    props: true, // Pass route parameters as props to the component
  },
  {
    path: "/FormProjektering/:parameter",
    name: "projektform-page",
    component: FormProjektering,
    props: true,
  },
  {
    path: "/FormUdforsel/:parameter",
    name: "FormUdforsel-page",
    component: FormUdforsel,
    props: true,
  },
  {
    path: "/forklaring",
    name: "forklaring",
    component: Forklaring,
  },
  {
    path: "/result/:parameter", // Define a dynamic route with a parameter named "parameter"
    name: "result-page",
    component: Result, // Use a dedicated component for dynamic pages
    props: true, // Pass route parameters as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
