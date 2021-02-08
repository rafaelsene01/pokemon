import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");

const Pokemon = () =>
  import(/* webpackChunkName: "Pokemon" */ "@/views/Pokemon.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:id",
    name: "Pokemon",
    component: Pokemon,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
