import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ChargerList from "../views/ChargerList.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: ChargerList,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
