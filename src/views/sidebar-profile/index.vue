<template>
    <div class=" text-base px-16 overflow-y-auto pt-[20px] mt-[60px] bg-secondary h-screen">
        <ul class="space-y-2 font-medium text-gray-800 ">
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
                            : focusPage === e.page
                            ? 'text-gray-800'
                            : ''
                    }`"
                    class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
                >
                    <img class="w-6 h-6" :src="e.icon" />
                    <span class="flex-1 ml-3 whitespace-nowrap ">
                        {{ e.title }}
                    </span>
                    <span v-if="e.title !== 'บัญชีของฉัน' " > > </span>
                </div>

                <li v-for="sub in e?.childs">
                    <div
                        @click="focusPage = sub.page"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer my-4"
                    >
                        <span
                            class="flex-1 ml-12 whitespace-nowrap"
                            >{{ sub.title }}</span
                        >
                        <span>></span>
                    </div>
                </li>
            </li>
        </ul>
    </div>

</template>

<script>


import { account, cart, cart2 } from "@/assets/profile";
export default {
    components: {

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
            if (window.innerWidth > 768) {
                this.$router.push("/profile");
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

