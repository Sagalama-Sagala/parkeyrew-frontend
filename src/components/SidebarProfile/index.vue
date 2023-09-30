<template>
  <div class="bg-gray-200 md:pt-[120px] pt-[66px] md:block">
    <div
      class="m-2 text-sm md:text-xl ml-0 md:ml-80 pl-4 md:pl-0 md:flex inline-flex items-center z-0 cursor-pointer"
      @click="toggleSidebar"
    >
      <div class="md:hidden w-4 h-4 mr-2">
        <img :src="chevronLeft" alt="back" />
      </div>
      <p class="mr-2">บัญชีผู้ใช้</p>
      <div class="text-primary">
        <div v-if="focusPage === 'record'"><p>/ ประวัติ</p></div>
        <div v-else-if="focusPage === 'address'"><p>/ ที่อยู่</p></div>
        <div v-else-if="focusPage === 'password'">
          <p>/ เปลี่ยนรหัสผ่าน</p>
        </div>
        <div v-else-if="focusPage === 'purchase'"><p>/ การซื้อของฉัน</p></div>
        <div v-else-if="focusPage === 'sales'"><p>/ การขายของฉัน</p></div>
      </div>
    </div>

    <aside
      id="cta-button-sidebar"
      class="fixed h-screen md:left-0 transition-all duration-500 ease-in-out top-0 md:w-fit w-screen z-10"
      :class="isSidebarToggle ? 'left-0' : 'left-[-1000px]'"
      aria-label="Sidebar"
    >
      <div
        class="h-full md:pl-16 pl-8 overflow-y-auto md:text-2xl bg-gray-200 md:pt-24 pt-20"
      >
        <ul class="space-y-2 font-medium text-gray-400">
          <li v-for="(e, index) in navs" class="md:pr-0 pr-10">
            <div
              @click="
                e.childs.length !== 0 ? (e.expand = !e.expand) : handleMenu(e)
              "
              :class="`${
                e.childs.length !== 0
                  ? e.childs?.findIndex((child) => child.page === focusPage) !==
                    -1
                    ? 'text-gray-800'
                    : ''
                  : focusPage === e.page
                  ? 'text-primary'
                  : ''
              }`"
              class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
            >
              <img class="w-6 h-6" :src="e.icon" />
              <span class="flex-1 ml-3 whitespace-nowrap">
                {{ e.title }}
              </span>
              <span class="md:hidden">
                <img :src="chevronRight" alt="forward" class="w-4 h-4" />
              </span>
            </div>

            <ul v-if="e.expand">
              <li v-for="sub in e?.childs">
                <div
                  @click="handleMenu(sub)"
                  :class="`${focusPage === sub.page ? 'text-primary' : ''}`"
                  class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
                >
                  <span class="flex-1 ml-12 whitespace-nowrap">{{
                    sub.title
                  }}</span>
                  <span class="md:hidden">
                    <img :src="chevronRight" alt="forward" class="w-4 h-4" />
                  </span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 md:ml-80 h-screen bg-white md:block z-0">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { chevronLeft, chevronRight } from "@/assets/common";

import { account, cart, cart2 } from "@/assets/profile";
export default {
  setup() {
    const isSidebarToggle = ref(true);
    const toggleSidebar = () => {
      isSidebarToggle.value = !isSidebarToggle.value;
    };
    return { isSidebarToggle, toggleSidebar };
  },
  methods: {
    handleMenu(item) {
      this.focusPage = item.page;
      this.$router.push(item.page);
      this.toggleSidebar();
    },
  },
  data() {
    return {
      chevronLeft,
      chevronRight,
      focusPage: "record", //default
      account,
      cart,
      cart2,
      navs: [
        {
          title: "บัญชีของฉัน",
          icon: account,
          expand: true,
          page: null,
          childs: [
            {
              title: "ประวัติ",
              icon: account,
              page: "record",
            },
            {
              title: "ที่อยู่",
              icon: account,
              page: "address",
            },
            {
              title: "เปลี่ยนรหัสผ่าน",
              icon: account,
              page: "password",
            },
          ],
        },
        {
          title: "การซื้อของฉัน",
          icon: cart,
          expand: false,
          childs: [],
          page: "purchase",
        },
        {
          title: "การขายของฉัน",
          icon: cart2,
          expand: false,
          childs: [],
          page: "sales",
        },
      ],
    };
  },
};
</script>
