<template>
  <button
    class="border-[0.05rem] border-primary px-2 py-1 text-sm md:text-xl md:px-4 md:py-2 rounded-lg text-primary hover:bg-primary hover:text-white duration-500"
    @click="showModal = true"
  >
    {{ isReviewed ? "ดูรีวิว" : "รีวิวร้านค้า" }}
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
        <div class="flex justify-between">
          <p class="text-lg md:text-2xl font-bold">รีวิวผู้ขาย</p>
          <p class="text-xl md:text-sm font-bold">{{ shopName }}</p>
        </div>

        <div class="flex mt-8 px-24 flex-col">
          <p class="text-md md:text-xl font-bold">เรทติ้ง</p>
          <div class="flex justify-center">
            <!-- {{ reviewStar }} -->
            <Rating
              class="mt-4"
              :isReviewed="isReviewed"
              :rating="reviewStar"
              :clickable="true"
              @setRating="(e) => (reviewStar = e)"
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
              v-model="text"
            />
          </div>
        </div>

        <div class="mt-8 justify-end flex" v-if="isReviewed === false">
          <button
            class="px-4 py-2 mx-1 rounded-lg md:hover:bg-gray-100"
            @click="showModal = false"
          >
            ยกเลิก
          </button>
          <chompu-button
            class="border-[0.05rem] border-black px-4 py-2 mx-1 rounded-lg md:hover:shadow-md"
            @click="submitReview"
            text="ยืนยัน"
            :loading="loading"
          >
          </chompu-button>
        </div>
        <div class="mt-8 justify-end flex" v-else>
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
import Rating from "@/components/Profile/Purchase/Review/Rating/index.vue";
import ChompuButton from "@/components/ChompuButton/index.vue";
import axios from "axios";

export default {
  setup() {},
  components: { Rating, ChompuButton },
  props: { shop: null, historyId: null, review: null, shopName: "" },
  data() {
    return {
      showModal: false,
      reviewStar: 5,
      text: "",
      loading: false,
    };
  },
  mounted() {
    // console.log(this.shop, this.historyId);
    if (this.review) {
      this.reviewStar = this.review?.revireStar;
      this.text = this.review?.text;
    }
  },
  computed: {
    isReviewed() {
      return this.review !== undefined;
    },
  },
  methods: {
    async submitReview() {
      console.log(this.shop, this.reviewStar, this.text, this.historyId);
      if (this.loading) return;

      this.loading = true;
      await axios({
        url: `/review/create-review`,
        method: "POST",
        data: {
          shop: this.shop,
          reviewStar: this.reviewStar,
          text: this.text,
          historyId: this.historyId,
        },
      });
      this.showModal = false;
      this.text = "";
      this.reviewStar = 5;
      this.loading = false;
    },
  },
};
</script>
