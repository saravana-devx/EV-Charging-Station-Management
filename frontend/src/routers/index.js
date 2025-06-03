import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ChargerList from "../views/ChargerList.vue";
import ChargerMap from "../views/ChargerMap.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ChargerList, // or a layout that includes Navbar + list/map switch
  },
  {
    path: "/map",
    name: "Map",
    component: ChargerMap,
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
