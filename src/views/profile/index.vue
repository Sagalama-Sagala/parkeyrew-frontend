<template  >
    <div class="bg-gray-200 md:pt-[120px] pt-[80px] ">
        <div class="m-2 text-sm md:text-xl ml-0 md:ml-80 flex pl-4 md:pl-0">
            <p class="mr-2">บัญชีผู้ใช้</p>
            <div class="text-primary">
                <div v-if="focusPage === 'record'"><p> / ประวัติ</p></div>
                <div v-else-if="focusPage === 'address'"><p>/ ที่อยู่</p></div>
                <div v-else-if="focusPage === 'chagepass'"><p>/ เปลี่ยนรหัสผ่าน</p></div>
                <div v-else-if="focusPage === 'mybuy'"><p>/ การซื้อของฉัน</p></div>
                <div v-else-if="focusPage === 'mysell'"><p>/ การขายของฉัน</p></div>
            </div>
        </div>
        
        <aside
            id="cta-button-sidebar"
            class="fixed left-0 h-screen md:block hidden"
            aria-label="Sidebar"
        >
            <div class="h-full px-16 overflow-y-auto text-2xl">
                <ul class="space-y-2 font-medium text-gray-400">
                    <li v-for="e in navs">
                        <div
                            @click="
                                e.childs.length !== 0
                                    ? (e.expand = !e.expand)
                                    : (focusPage = e.page)
                            "
                            :class="`${
                                e.childs.length !== 0
                                    ? e.childs?.findIndex(
                                        (child) => child.page === focusPage
                                    ) !== -1
                                        ? 'text-gray-800'
                                        : ''
                                    : focusPage === e.page
                                    ? 'text-primary'
                                    : ''
                            }`"
                            class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
                        >
                            <img class="w-6 h-6" :src="e.icon" />
                            <span class="flex-1 ml-3 whitespace-nowrap ">
                                {{ e.title }}
                            </span>
                        </div>

                        <ul v-if="e.expand">
                            <li v-for="sub in e?.childs">
                                <div
                                    @click="focusPage = sub.page"
                                    :class="`${
                                        focusPage === sub.page
                                            ? 'text-primary'
                                            : ''
                                    }`"
                                    class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
                                >
                                    <span
                                        class="flex-1 ml-12 whitespace-nowrap"
                                        >{{ sub.title }}</span
                                    >
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>

        
        <div class="p-4 md:ml-80 h-screen bg-white">
            <!-- focusPage {{ focusPage }} -->
            <div v-if="focusPage === 'record'"><Myrecord /></div>
            <div v-else-if="focusPage === 'address'"><Address /></div>
            <div v-else-if="focusPage === 'chagepass'"><Changepass /></div>
            <div v-else-if="focusPage === 'mybuy'"><Mybuy /></div>
            <div v-else-if="focusPage === 'mysell'"><Mysell /></div>
        </div>
    </div>
</template>

<script>
import Address from "@/components/Profile/Address/index.vue";
import Changepass from "@/components/Profile/Changepass/index.vue";
import Mybuy from "@/components/Profile/Mybuy/index.vue";
import Mysell from "@/components/Profile/Mysell/index.vue";
import Myrecord from "@/components/Profile/Myrecord/index.vue";

import { account, cart, cart2 } from "@/assets/profile";
export default {
    components: {
        Address,
        Changepass,
        Mybuy,
        Mysell,
        Myrecord,
        isResponsive() {
            return window.innerWidth <= 768; 
        },

    },
    mounted() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            if (window.innerWidth <= 768) {
                this.$router.push("/sidebar-profile");
            } 
        },
    },
    
    data() {
        return {
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
                            page: "chagepass",
                        },
                    ],
                },
                {
                    title: "การซื้อของฉัน",
                    icon: cart,
                    expand: false,
                    childs: [],
                    page: "mybuy",
                },
                {
                    title: "การขายของฉัน",
                    icon: cart2,
                    expand: false,
                    childs: [],
                    page: "mysell",
                },
            ],
        };
    },
};
</script>

