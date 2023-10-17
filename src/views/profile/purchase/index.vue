<template>
    <div class="md:text-2xl text-lg my-2 font-semibold">การซื้อของฉัน</div>
    <div v-if="profileStore.purchase.length === 0">
        <p class="text-center mt-10">ไม่พบรายการ</p>
    </div>
    <div
        v-for="(purchase, index) in profileStore.purchase"
        class="w-full items-center justify-start my-8 md:px-16 text-lg font-medium"
        :key="index"
    >
        <!-- <pre> {{ purchase }}</pre> -->
        <div class="md:text-2xl text-lg my-8">
            จากผู้ขาย {{ purchase?.shop?.firstname }}
            {{ purchase?.shop?.lastname }} >
        </div>

        <!-- desktop scale -->
        <div class="hidden md:block">
            <div class="w-full flex justify-around">
                <img
                    class="w-28 h-28 flex justify-center bg-gray-300 items-center mx-4 rounded-lg"
                    :src="purchase?.product?.productImage[0]"
                />
                <!-- รูป -->

                <div class="w-3/5 flex mx-4">
                    <div class="w-1/4">
                        <p class="mb-4">ชื่อสินค้า</p>
                        <p class="mb-4">ซื้อเมื่อ</p>
                        <p class="mb-4">สถานะ</p>
                    </div>
                    <div>
                        <p class="mb-4 text-gray-500 line-clamp-1">
                            {{ purchase?.product?.name }}
                        </p>
                        <p class="mb-4 text-gray-500">
                            {{ purchase?.product?.createdAt }}
                        </p>
                        <p class="mb-4 text-gray-500">
                            {{ purchase.status }}
                        </p>
                    </div>
                </div>
                <div class="w-1/5 flex">
                    <div class="w-1/2">
                        <p class="mb-4">ราคาสินค้า</p>
                        <p class="mb-4">ค่าส่ง</p>
                        <p class="mb-4 text-2xl">รวม</p>
                    </div>
                    <div class="w-1/2 items-end flex flex-col">
                        <p class="mb-4">฿ {{ purchase?.product?.price }}</p>
                        <p class="mb-4">
                            ฿ {{ purchase?.product.deliveryFee }}
                        </p>
                        <p class="mb-4 text-2xl">
                            ฿
                            {{
                                purchase?.product?.price +
                                purchase?.product?.deliveryFee
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- mobile scale -->
        <div class="md:hidden">
            <div class="flex">
                <div
                    class="w-1/2 my-6 flex justify-center bg-gray-300 items-center rounded-lg"
                >
                    รูป
                </div>
                <div class="ml-4 text-black text-base font-normal">
                    <div>
                        <p class="mb-2 line-clamp-2">
                            {{ purchase.productName }}
                        </p>
                    </div>
                    <div class="flex justify-between pr-4">
                        <div
                            class="w-1/2 flex flex-col justify-around text-gray-500"
                        >
                            <p class="mb-2">
                                {{ purchase.time }}
                            </p>
                            <p class="mb-2">
                                {{ purchase.status }}
                            </p>
                        </div>
                        <div class="w-1/2">
                            <div class="mb-1 flex justify-between text-sm">
                                <div>ราคาสินค้า</div>
                                <div>฿ {{ purchase.price }}</div>
                            </div>
                            <div class="mb-1 flex justify-between text-sm">
                                <div>ค่าส่ง</div>
                                <div>฿ {{ purchase.deliveryFee }}</div>
                            </div>
                            <div
                                class="mb-1 flex justify-between font-semibold"
                            >
                                <div>รวม</div>
                                <div>
                                    ฿
                                    {{ purchase.price + purchase.deliveryFee }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-2 mr-4 md:mr-0 relative">
            <review-modal
                :review="purchase?.review"
                :shop="purchase?.shop?._id"
                :history-id="purchase?._id"
                :shopName="`${purchase?.shop?.firstname}
            ${purchase?.shop?.lastname}`"
            />
        </div>

        <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    </div>
</template>

<script>
import { useProfileStore } from "@/store/profile.store.js";
import ReviewModal from "@/components/Profile/Purchase/Review/Rating/index.vue";

export default {
    components: { ReviewModal },
    setup() {
        const profileStore = useProfileStore();

        return { profileStore };
    },
    async mounted() {
        // fetch data
        try {
            await this.profileStore.fetchMyPurchase();
            // console.log(this.profileStore?.purchase);
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            // purchaseInfo: [
            //     {
            //         from: "aaa",
            //         productName:
            //             "โอดีบีโอ ซิกเนเจอร์ อายแชโดว์ พาเลท ทาตา 4.8g OD276 odbo Signature Eyeshadow Palette",
            //         time: "12/12/12",
            //         status: "สำเร็จแล้ว",
            //         price: 2234,
            //         deliveryFee: 45,
            //     },
            //     {
            //         from: "bbb",
            //         productName:
            //             "โอดีบีโอ เอ็กซ์เทนชั่น มาสคาร่า สองหัว OD922 กันน้ำ ติดทน 4g+4g odbo Extra Extension Mascara",
            //         time: "01/23/45",
            //         status: "กำลังจัดส่ง",
            //         price: 99,
            //         deliveryFee: 30,
            //     },
            // ],
        };
    },
    methods: {},
};
</script>

