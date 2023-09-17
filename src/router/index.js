import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/index.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/index/index.vue"),
      },
      {
        path: "mystore",
        name: "MyStore",
        component: () => import("@/views/mystore/index.vue"),
      },
      {
        path: "favorite",
        name: "Favorite",
        component: () => import("@/views/favorite/index.vue"),
      },
      {
        path: "chat",
        name: "Chat",
        component: () => import("@/views/chat/index.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/contact/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
