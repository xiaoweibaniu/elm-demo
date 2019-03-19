import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import City from "./views/City";
import Login from "./views/Login";
import Forget from "./views/Forget";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/city/:cityId",
      name: "city",
      component: City
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/forget",
      name: "forget",
      component: Forget
    }
  ]
});
