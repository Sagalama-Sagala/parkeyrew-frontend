import { createRouter, createWebHistory } from "vue-router";
import { getLocal } from "@/common/js/utils.js";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/index.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/index/index.vue"),
        meta: { auth: false },
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: { auth: false },
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/register/index.vue"),
        meta: { auth: false },
      },
      {
        path: "mystore",
        component: () => import("@/layouts/mystore/index.vue"),
        meta: { auth: true },
        children: [
          {
            path: "",
            name: "MyStoreProducts",
            component: () => import("@/views/mystore/store/index.vue"),
          },
          {
            path: "review",
            name: "MyStoreReview",
            component: () => import("@/views/mystore/review/index.vue"),
          },
        ],
      },
      {
        path: "store/:id",
        component: () => import("../layouts/otherstore/index.vue"),
        meta: { auth: false },
        children: [
          {
            path: "",
            name: "StoreProducts",
            component: () => import("@/views/otherstore/store/index.vue"),
          },
          {
            path: "review",
            name: "StoreReview",
            component: () => import("@/views/otherstore/review/index.vue"),
          },
        ],
      },
      {
        path: "favorite",
        name: "Favorite",
        component: () => import("@/views/favorite/index.vue"),
        meta: { auth: true },
      },
      {
        path: "chat",
        name: "Chat",
        component: () => import("@/views/chat/index.vue"),
        meta: { auth: true },
      },
      {
        path: "chat/:id",
        name: "PrivateChat",
        component: () => import("@/views/chat-private/index.vue"),
        meta: { auth: true },
      },

      {
        path: "profile",
        component: () => import("@/layouts/profile/index.vue"),
        meta: { auth: true },
        children: [
          {
            path: "record",
            name: "Record",
            component: () => import("@/views/profile/account/record/index.vue"),
          },
          {
            path: "address",
            name: "Address",
            component: () =>
              import("@/views/profile/account/address/index.vue"),
          },
          {
            path: "password",
            name: "Password",
            component: () =>
              import("@/views/profile/account/password/index.vue"),
          },
          {
            path: "purchase",
            name: "Purchase",
            component: () => import("@/views/profile/purchase/index.vue"),
          },
          {
            path: "sales",
            name: "Sales",
            component: () => import("@/views/profile/sales/index.vue"),
          },
        ],
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/contact/index.vue"),
        meta: { auth: false },
      },
      {
        path: "product/:id",
        name: "ProductInfo",
        component: () => import("@/views/product/index.vue"),
        meta: { auth: true },
      },
      {
        path: "filter/:id",
        name: "Filter",
        component: () => import("@/views/filter/index.vue"),
        meta: { auth: false },
      },
      {
        path: "/search",
        name: "Search",
        component: () => import("@/views/search/index.vue"),
        meta: { auth: false },
        props: (route) => ({ keyword: route.query.keyword })
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

router.beforeEach(async (to) => {
  if (to.meta.auth) {
    if (!getLocal("token")) {
      return { path: "login" };
    }
  }
});

export default router;
