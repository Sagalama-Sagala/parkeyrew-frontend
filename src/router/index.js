import { createRouter, createWebHistory } from "vue-router";

const Home = import("../views/Home.vue");

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => Home,
      },
      {
        path: "mystore",
        name: "MyStore",
        component: () => import("../views/MyStore.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("../views/Contact.vue"),
      },
      {
        path: "favorite",
        name: "Favorite",
        component: () => import("../views/Favorite.vue"),
      },
      {
        path: "chat",
        name: "Chat",
        component: () => import("../views/Chat.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
