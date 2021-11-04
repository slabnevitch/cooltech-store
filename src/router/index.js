import Vue from "vue";
import VueRouter from "vue-router";
import {store} from "@/store";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Catalog",
    // component: List,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Catalog.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: authGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/login",
    name: "Login",
    // beforeEnter: routeDefend,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

function authGuard(from, to, next) {
  console.log('auth in router ' + store.getters.isAuth)
  firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged!')
      if(user) {
        next()
      }else{
        next('/login')
      }
    });
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
