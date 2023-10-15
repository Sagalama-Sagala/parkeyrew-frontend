<template>
  <div
    class="bg-white p-2 rounded-xl w-[320px] h-[400px] flex flex-col relative cursor-pointer z-0"
    @click="handleClick()"
  >
    <div
      class="flex items-end h-[9rem] w-[12.5rem] absolute flex-col mt-[-0.5rem] right-5 justify-stretch"
    >
      <img v-if="isRecommended(rating)" :src="recommend" class="w-14 z-10" />
    </div>

    <div class="px-2 relative">
      <img :src="itemImage" class="rounded-xl h-[215px] w-[297px] bg-cover" />
      <div
        class="absolute bottom-4 right-3 z-10"
        @click.stop="$emit('toggleLike', id)"
      >
        <img v-if="liked" :src="heartfilled" class="w-10" />
      </div>
    </div>
    <div class="px-4 pt-2">
      <h1 class="text-xl font-semibold pb-2">{{ itemName }}</h1>
      <div class="flex overflow-x-auto mx-auto gap-x-1">
        <div v-for="item in getTags(brand, size, condition, color)" :key="item">
          <div
            class="border-[1px] border-black rounded-md px-1 text-center text-sm w-full m-1 whitespace-nowrap"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="flex justify-between absolute bottom-4 w-full left-0 px-6">
        <div>
          <div class="flex items-center gap-2">
            <img
              :src="sellerImage"
              class="rounded-full w-[20px] h-[20px] border-2"
            />
            <p
              class="text-[0.8rem] hover:underline hover:cursor-pointer"
              @click.stop="handleSellerClick()"
            >
              {{ sellerName }}
            </p>
          </div>
          <div class="flex mt-1">
            <Rating :rating="rating" />
          </div>
        </div>
        <div class="flex items-end justify-end flex-col">
          <h1 class="text-4xl leading-4 font-bold">
            {{ itemPrice }}
          </h1>
          <h1 class="text-[0.7rem]">บาท</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  recommend,
  star,
  starfilled,
  starhalffilled,
  heart,
  heartfilled,
} from "@/assets/product_card";

import Rating from "../../components/Rating/index.vue";
import axios from "axios";

export default {
  components: {
    Rating,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    likeshow: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      default: "no-brand",
    },
    color: {
      type: String,
      default: "ไม่ระบุสี",
    },
    size: {
      type: String,
      default: "ไม่ระบุไซส์",
    },
    itemName: {
      type: String,
      default: "placeholderText",
    },
    itemImage: {
      type: String,
      default: "https://placehold.co/600x400",
    },
    sellerImage: {
      type: String,
      default: "https://placehold.co/600x400",
    },
    itemPrice: {
      type: Number,
      default: 0,
    },
    sellerName: {
      type: String,
      default: "Seller Name",
    },
    rating: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: Number,
      default: 50,
    },
    ownerId: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleSellerClick() {
      this.$emit("sellerClick");
      this.$router.push(`/store/${this.ownerId}`);
    },
    isRecommended(rating) {
      if (rating > 3) {
        return true;
      }
      return false;
    },
    getTags(brand, size, condition, color) {
      return [brand, size, condition, color];
    },
    handleClick() {
      this.$router.push(`/product/${this.id}`);
    },
  },
  setup() {},
  data() {
    return {
      recommend,
      star,
      starfilled,
      starhalffilled,
      heart,
      heartfilled,
    };
  },
};
</script>
