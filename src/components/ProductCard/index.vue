<template>
  <div
    class="bg-white p-2 rounded-xl w-[320px] h-[400px] flex flex-col relative cursor-pointer"
    @click="this.$router.push(`/product/${this.id}`)"
  >
    <div
      class="flex items-end h-[9rem] w-[12.5rem] absolute flex-col mt-[-0.5rem] right-5 justify-stretch"
    >
      <img v-if="isRecommended" :src="Recommend" class="w-14 z-10" />
    </div>

    <div class="px-2">
      <img :src="itemImage" class="rounded-xl h-[215px] w-[297px] bg-cover" />
      <div class="absolute top-[11.8rem] right-[1.4rem]">
        <img v-if="liked" :src="Heartfilled" class="w-10" />
      </div>
    </div>
    <div class="px-4 pt-2">
      <h1 class="text-xl font-semibold pb-2">{{ itemName }}</h1>
      <div class="flex overflow-x-auto mx-auto gap-x-1">
        <div v-for="item in tags" :key="item.id">
          <div
            class="border-[1px] border-black rounded-md px-1 text-center text-sm w-full m-1 hover:bg-secondary hover:cursor-pointer whitespace-nowrap"
            @click="
              (e) => {
                e.stopPropagation();
                tagClick;
              }
            "
          >
            {{ item.label }}
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
              @click="
                (e) => {
                  e.stopPropagation();
                  nameClick;
                }
              "
            >
              {{ sellerName }}
            </p>
          </div>
          <div class="flex mt-1">
            <Rating :rating="rating"/>
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
  Recommend,
  Star,
  Starfilled,
  Starhalffilled,
  Heart,
  Heartfilled,
} from "@/assets/product-card";

import Rating from "../../components/Rating/index.vue"

export default {
  components:{
    Rating
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    likeshow: {
      type: Boolean,
      default: true,
    },
    itemName: {
      type: String,
      default: "placeholderText",
    },
    itemName: {
      type: String,
      default: "placeholderText",
    },
    tags: {
      type: Array,
      default: () => [],
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
    nameClick: {
      type: Function,
      default: null,
    },
    cardClick: {
      type: Function,
      default: null,
    },
    tagClick: {
      type: Function,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    heartClick: {
      type: Function,
      default: null,
    },
  },
  methods: {},
  setup() {},
  data() {
    return {
      Recommend,
      Star,
      Starfilled,
      Starhalffilled,
      Heart,
      Heartfilled,
    };
  },
};
</script>
