<template>
    <div class="mt-16">
        <aside
            id="cta-button-sidebar"
            class="fixed left-0 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-200"
            aria-label="Sidebar"
        >
            <div class="bg-gray-200 h-20 w-screen absolute"></div>
            <div class="h-full px-12 overflow-y-auto text-xl mt-20 bg-gray-200">
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
                                        ? 'text-[#204E8F]'
                                        : ''
                                    : focusPage === e.page
                                    ? 'text-[#204E8F]'
                                    : ''
                            }`"
                            class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
                        >
                            <img class="w-8 h-8" :src="e.icon" />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                {{ e.title }}
                            </span>
                        </div>

                        <ul v-if="e.expand">
                            <li v-for="sub in e?.childs">
                                <div
                                    @click="focusPage = sub.page"
                                    :class="`${
                                        focusPage === sub.page
                                            ? 'text-[#204E8F]'
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

        <div class="bg-white h-screen pl-80 pt-28">
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
    },
    methods: {},
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

