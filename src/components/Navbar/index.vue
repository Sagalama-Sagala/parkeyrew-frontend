<template>
  <nav
    class="fixed w-full top-0 z-20 transition-all duration-500 ease-in-out"
    :class="isNavColorPrimary() ? 'bg-primary' : 'bg-white'"
  >
    <div class="flex justify-between items-center px-8 py-3 h-16">
      <div class="flex items-center">
        <div class="md:hidden cursor-pointer">
          <img
            :src="isNavColorPrimary() ? hamburgerWhite : hamburger"
            class="w-6"
            @click="toggleNav"
          />
        </div>
        <div class="pr-5 md:pl-0 pl-5">
          <router-link to="/">
            <img
              :src="isNavColorPrimary() ? logoWhite : logo"
              alt="logo"
              class="w-28"
            />
          </router-link>
        </div>
        <div v-if="!isAuthPage()" class="md:block hidden">
          <ul class="flex gap-x-5">
            <li
              v-for="(item, index) in NavItems"
              :key="item.title"
              class="font-semibold text-lg"
              :class="isNavColorPrimary() ? 'text-white' : 'text-black'"
            >
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="md:block hidden">
          <div v-if="isAuthPage()" class="font-semibold md:text-lg">
            {{ MenuItemAuthPage }}
          </div>
          <ul v-else class="flex items-center gap-x-5">
            <li
              v-if="isLogin"
              v-for="(item, index) in MenuItemsAuth"
              :key="item.icon"
            >
              <router-link :to="item.path">
                <img
                  :src="isNavColorPrimary() ? item.icon_white : item.icon"
                  class="w-8"
                />
              </router-link>
            </li>
            <li
              v-if="!isLogin"
              v-for="(item, index) in MenuItemsUnauth"
              :key="item.title"
              :class="item.class"
              class="font-semibold md:text-lg"
            >
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30 z-10 md:hidden"
      :class="isNavToggle ? 'block' : 'hidden'"
      @click="toggleNav"
    ></div>
    <div
      class="bg-white h-screen top-0 w-9/12 fixed transition-all ease-in duration-300 z-20 md:hidden"
      :class="isNavToggle ? 'left-0' : 'left-[-600px]'"
    >
      <div
        class="pt-5 divide-secondary"
        :class="!isAuthPage() ? 'divide-y-2' : 'divide-y-0'"
      >
        <ul class="pl-9 pb-4">
          <li v-if="isAuthPage()" class="py-2 font-semibold">
            {{ MenuItemAuthPage }}
          </li>
          <li
            v-else
            v-for="(item, index) in NavItems"
            :key="item.title"
            class="py-2 font-semibold"
            @click="toggleNav"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
        <ul v-if="!isLogin && !isAuthPage()" class="pl-9 pt-4">
          <li
            v-for="(item, index) in MenuItemsUnauth"
            :key="item.title"
            class="py-2 font-semibold"
            @click="toggleNav"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <div
        v-if="isLogin"
        class="absolute bottom-0 w-full py-4 border-t-[2px] border-secondary"
      >
        <ul class="flex justify-evenly px">
          <li
            v-for="(item, index) in MenuItemsAuth"
            :key="item.title"
            @click="toggleNav"
          >
            <router-link :to="item.path">
              <img :src="item.icon" class="w-8" />
            </router-link>
          </li>
        </ul>
      </div>
      <div
        class="absolute top-0 right-[-40px] cursor-pointer"
        @click="toggleNav"
      >
        <img :src="close" class="w-10" />
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import {
  chat,
  favorite,
  profile,
  hamburger,
  logo,
  logoWhite,
  close,
  hamburgerWhite,
  chatWhite,
  favoriteWhite,
  profileWhite,
} from "@/assets/navbar";

export default {
  setup() {
    const isNavToggle = ref(false);
    const toggleNav = () => {
      isNavToggle.value = !isNavToggle.value;
    };
    return { isNavToggle, toggleNav };
  },
  methods: {
    isNavColorPrimary() {
      let curPath = this.$route.path.slice(0, 5).toLowerCase();
      if (curPath === "/chat") {
        return true;
      }
      return false;
    },
    isAuthPage() {
      let curPath = this.$route.path.toLowerCase();
      if (curPath === "/login" || curPath === "/register") {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      NavItems: [
        { title: "เลือกซื้อ", path: "/" },
        { title: "ร้านของฉัน", path: "/mystore" },
        { title: "ติดต่อเรา", path: "/contact" },
      ],
      MenuItemsAuth: [
        { icon: chat, icon_white: chatWhite, path: "/chat" },
        { icon: favorite, icon_white: favoriteWhite, path: "/favorite" },
        { icon: profile, icon_white: profileWhite, path: "/profile" },
      ],
      MenuItemsUnauth: [
        { title: "สมัครใหม่", path: "/register", class: "" },
        {
          title: "เข้าสู่ระบบ",
          path: "/login",
          class: "border-[1px] border-black px-2 py-1 rounded",
        },
      ],
      MenuItemAuthPage: "ต้องการความช่วยเหลือ ?",
      hamburger,
      hamburgerWhite,
      logo,
      logoWhite,
      close,
      isLogin: false,
    };
  },
};
</script>
