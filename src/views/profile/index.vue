<template>
    <div class="">
        <aside
            id="cta-button-sidebar"
            class="fixed left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                <ul class="space-y-2 font-medium">
                    <li>
                        <a
                            class="flex items-center p-2 text-gray-900 rounded-lg group cursor-pointer"
                        >
                            <img class="w-6 h-6" :src="account" />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                บัญชีของฉัน
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                        >
                            <span class="flex-1 ml-12 whitespace-nowrap"
                                >ประวัติ</span
                            >
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                        >
                            <span class="flex-1 ml-12 whitespace-nowrap"
                                >ที่อยู่</span
                            >
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                        >
                            <span class="flex-1 ml-12 whitespace-nowrap"
                                >เปลี่ยนรหัสผ่าน</span
                            >
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            ><img class="w-6 h-6" :src="cart" />
                            <span class="flex-1 ml-3 whitespace-nowrap">
                                การซื้อของฉัน
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            ><img class="w-6 h-6" :src="cart2" />
                            <span class="flex-1 ml-3 whitespace-nowrap"
                                >การขายของฉัน
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

        <div class="p-4 sm:ml-64 h-screen bg-gray-400 mt-16">
            ขก.ละ ขอยาดนอน
        </div>
    </div>
</template>

<script>
import { account, cart, cart2 } from "@/assets/profile";
export default {
    methods: {},
    data() {
        return {
            account,
            cart,
            cart2,
        };
    },
};
</script>

