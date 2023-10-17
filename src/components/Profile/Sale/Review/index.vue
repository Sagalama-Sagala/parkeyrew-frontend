<template>
    <button
        class="border-[0.05rem] border-primary px-2 py-1 text-sm md:text-xl md:px-4 md:py-2 rounded-lg text-primary"
        @click="showModal = true"
        :disabled="!isReviewed"
    >
        {{ isReviewed ? "ดูรีวิว" : "ยังไม่มีรีวิวจากผู้ซื้อ" }}
    </button>
    <div
        v-if="showModal"
        class="z-20 h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30"
        @click="showModal = false"
    ></div>
    <div class="absolute bg-red-300 left-0">
        <div
            class="z-30 fixed top-[20%] h-[500px] md:py-5 md:pr-12 md:pl-12 ml-4 px-12 pt-8 bg-white rounded shadow-xl md:text-base text-sm md:w-1/2"
            :class="showModal ? 'block' : 'hidden'"
        >
            <div class="p-10">
                <div class="flex justify-between items-center">
                    <p class="text-lg md:text-2xl font-bold">รีวิวจากผู้ซื้อ</p>
                    <p class="text-xl md:text-sm font-bold">
                        {{ customerName }}
                    </p>
                </div>

                <div class="flex mt-8 px-24 flex-col">
                    <p class="text-md md:text-xl font-bold">เรทติ้ง</p>
                    <div class="flex justify-center">
                        <!-- {{ reviewStar }} -->
                        <Rating
                            class="mt-4"
                            :isReviewed="isReviewed"
                            :rating="review?.reviewStar"
                        />
                    </div>
                </div>

                <div class="flex mt-8 px-24 flex-col">
                    <p class="text-md md:text-xl font-bold">รีวิว</p>
                    <div class="flex justify-center mt-2">
                        <textarea
                            :readonly="isReviewed === true"
                            class="w-full border border-black p-2"
                            rows="4"
                            :value="review?.text"
                        />
                    </div>
                </div>

                <div class="mt-8 justify-end flex">
                    <button
                        class="px-4 py-2 mx-1 rounded-lg md:hover:bg-gray-100"
                        @click="showModal = false"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Rating from "@/components/Profile/Sale/Review/Rating/index.vue";
import ChompuButton from "@/components/ChompuButton/index.vue";

export default {
    setup() {},
    components: { Rating, ChompuButton },
    props: { review: null, customerName: "" },
    data() {
        return {
            showModal: false,
        };
    },
    mounted() {},
    computed: {
        isReviewed() {
            return this.review !== undefined;
        },
    },
    methods: {},
};
</script>

