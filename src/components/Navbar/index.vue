<script setup></script>

<template>
  <nav class="px-8 py-4 fixed w-full top-0 bg-white z-50">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="md:hidden cursor-pointer">
          <img :src="hamburger" class="w-6 text-black" @click="toggleNav" />
        </div>
        <div class="pr-5 md:pl-0 pl-5">
          <router-link to="/">
            <img :src="logo" alt="logo" class="w-28" />
          </router-link>
        </div>
        <div class="md:block hidden">
          <ul class="flex gap-x-5">
            <li
              v-for="(item, index) in NavItems"
              :key="item.title"
              class="font-semibold text-lg"
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
          <ul class="flex gap-x-5">
            <li v-for="(item, index) in MenuItems" :key="item.icon">
              <router-link :to="item.path">
                <img :src="item.icon" class="w-8 text-black" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="h-screen w-full fixed left-0 top-0 bg-black bg-opacity-50 z-10 md:hidden"
      :class="isNavToggle ? 'block' : 'hidden'"
      @click="toggleNav"
    ></div>
    <div
      class="bg-white h-screen top-0 w-9/12 fixed transition-all ease-in duration-300 z-20 md:hidden"
      :class="isNavToggle ? 'left-0' : 'left-[-400px]'"
    >
      <div class="pl-9 pt-5">
        <ul>
          <li
            v-for="(item, index) in NavItems"
            :key="item.title"
            class="py-2 font-semibold"
            @click="toggleNav"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <div
        class="absolute bottom-0 w-full py-4 border-t-[2px] border-secondary"
      >
        <ul class="flex justify-evenly px">
          <li
            v-for="(item, index) in MenuItems"
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
  close,
} from "@/assets/navbar";

export default {
  setup() {
    const isNavToggle = ref(false);
    const toggleNav = () => {
      isNavToggle.value = !isNavToggle.value;
    };
    return { isNavToggle, toggleNav };
  },
  data() {
    return {
      NavItems: [
        { title: "เลือกซื้อ", path: "/" },
        { title: "ร้านของฉัน", path: "/mystore" },
        { title: "ติดต่อเรา", path: "/contact" },
      ],
      MenuItems: [
        { icon: chat, path: "/chat" },
        { icon: favorite, path: "/favorite" },
        { icon: profile, path: "/profile" },
      ],
      hamburger: hamburger,
      logo: logo,
      close: close,
    };
  },
};
</script>
