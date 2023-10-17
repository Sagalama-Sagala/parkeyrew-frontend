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
              v-if="isAuth()"
              v-for="(item, index) in MenuItemsAuth"
              :key="item.icon"
              @click="item.next"
              class="cursor-pointer"
            >
              <img
                :src="isNavColorPrimary() ? item.icon_white : item.icon"
                class="w-8"
              />
            </li>
            <li
              v-else
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
          <div
            class="h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30 z-10"
            :class="isProfileToggle ? 'block' : 'hidden'"
            @click="toggleProfile"
          ></div>
          <div
            class="z-20 fixed top-[64px] right-[30px] px-8 bg-white py-5 rounded w-[200px] duration-500 transition-all ease-in-out"
            :class="isProfileToggle ? 'block' : 'hidden'"
          >
            <ul class="space-y-3">
              <li
                v-for="(item, index) in ProfileMenu"
                :key="item.title"
                @click="item.next"
                class="cursor-pointer"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
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
        <ul v-if="!isAuth() && !isAuthPage()" class="pl-9 pt-4">
          <li
            v-for="(item, index) in MenuItemsUnauth"
            :key="item.title"
            class="py-2 font-semibold"
            @click="toggleNav"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
        <ul v-if="isAuth() && !isAuthPage()" class="pl-9 pt-4">
          <li
            class="py-2 font-semibold cursor-pointer"
            @click="handleLogoutSidebar()"
          >
            ออกจากระบบ
          </li>
        </ul>
      </div>
      <div
        v-if="isAuth()"
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
  <MessageNoti
    :is-noti="isNotiMessage"
    :room-id="notiMessage?.roomId"
    :text="notiMessage?.text"
    :username="notiMessage?.username"
    @close-message-noti="closeMessageNoti"
  />
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
import MessageNoti from "@/components/MessageNoti/index.vue";
import { getLocal } from "@/common/js/utils.js";
import { removeLocal } from "@/common/js/utils.js";
import { socket } from "@/socket";

export default {
  setup() {
    const isNotiMessage = ref(false);
    const isNavToggle = ref(false);
    const notiMessage = ref({});
    const isProfileToggle = ref(false);
    const toggleNav = () => {
      isNavToggle.value = !isNavToggle.value;
    };
    const toggleProfile = () => {
      isProfileToggle.value = !isProfileToggle.value;
    };

    socket.on("notiMessage", (response) => {
      console.log(response);
      notiMessage.value = response;
      isNotiMessage.value = true;
      setTimeout(() => {
        isNotiMessage.value = false;
      }, 5000);
    });

    return {
      isNavToggle,
      toggleNav,
      isProfileToggle,
      toggleProfile,
      isNotiMessage,
      notiMessage,
    };
  },
  components: {
    MessageNoti,
  },
  methods: {
    closeMessageNoti() {
      this.isNotiMessage = false;
    },
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
    isAuth() {
      if (getLocal("token")) {
        return true;
      }
      return false;
    },
    pushPage(path) {
      this.$router.push(path);
    },
    handleLogout() {
      removeLocal("token");
      // Force clear all local storage -> to remove pinia persist
      localStorage.clear();

      this.$router.push("/login");
      this.toggleProfile();
    },
    handleLogoutSidebar() {
      removeLocal("token");

      // Force clear all local storage -> to remove pinia persist
      localStorage.clear();

      this.$router.push("/login");
      this.toggleNav();
    },
    pushProfilePage() {
      this.$router.push("/profile/record");
      this.toggleProfile();
    },
  },
  data() {
    return {
      NavItems: [
        { title: "เลือกซื้อ", path: "/" },
        { title: "ร้านของฉัน", path: "/mystore" },
        { title: "ติดต่อเรา", path: "/contact" },
      ],
      ProfileMenu: [
        { title: "บัญชีผู้ใช้", next: this.pushProfilePage },
        { title: "ออกจากระบบ", next: this.handleLogout },
      ],
      MenuItemsAuth: [
        {
          icon: chat,
          icon_white: chatWhite,
          path: "/chat",
          next: () => this.pushPage("/chat"),
        },
        {
          icon: favorite,
          icon_white: favoriteWhite,
          path: "/favorite",
          next: () => this.pushPage("/favorite"),
        },
        {
          icon: profile,
          icon_white: profileWhite,
          path: "/profile/record",
          next: this.toggleProfile,
        },
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
    };
  },
};
</script>
