<template>
  <div
    class="bg-white p-2 rounded-xl md:w-[300px] w-[150px] md:h-[360px] h-[180px] flex flex-col relative cursor-pointer z-0"
    @click="handleClick()"
  >
    <div
      class="flex items-end md:h-[9rem] h-[4.5rem] md:w-[12.5rem] w-[6rem] absolute flex-col mt-[-0.5rem] right-5 justify-stretch"
    >
      <img
        v-if="isRecommended(rating)"
        :src="recommend"
        class="md:w-14 w-7 z-10"
      />
    </div>

    <div class="md:px-2 relative">
      <img
        :src="itemImage"
        class="rounded-xl md:h-[215px] h-[108px] md:w-[297px] w-[150px] object-cover"
      />
      <div
        class="absolute bottom-4 right-3 z-10"
        @click.stop="$emit('toggleLike', id)"
      >
        <img v-if="liked" :src="heartfilled" class="md:w-10 w-5" />
      </div>
    </div>
    <div class="md:px-4 px-2 pt-2">
      <h1 class="md:text-xl text-xs font-semibold pb-1 md:block hidden">
        {{ formatProductName(itemName, false) }}
      </h1>
      <h1 class="md:text-xl text-xs font-semibold pb-1 md:hidden block">
        {{ formatProductName(itemName, true) }}
      </h1>
      <div class="flex overflow-x-auto mx-auto gap-x-1">
        <div v-for="item in getTags(brand, size, condition, color)" :key="item">
          <div
            class="md:block hidden border-[1px] border-black rounded-md px-1 text-center text-sm w-full m-1 whitespace-nowrap"
          >
            {{ item }} {{ item == condition ? "%" : "" }}
          </div>
        </div>
      </div>
      <div
        class="flex justify-between absolute bottom-1 w-full left-0 md:px-6 px-3"
      >
        <div>
          <div class="flex items-center gap-2">
            <img
              :src="
                !sellerImage || sellerImage === ''
                  ? 'https://placehold.co/600x400'
                  : sellerImage
              "
              class="rounded-full md:w-[20px] w-[10px] md:h-[20px] h-[10px] border-2"
            />
            <p
              class="text-[0.8rem] hover:underline hover:cursor-pointer md:w-fit w-[60px] overflow-hidden overflow-ellipsis"
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
          <h1 class="md:text-4xl text-base leading-4 font-bold">
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
import { useMyStoreStore } from "@/store/my-store.store.js";
import { formatProductName } from "@/common/js/utils.js";

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
    formatProductName,
    handleSellerClick() {
      this.$emit("sellerClick");

      //รอBackend แก้ขัดไปก่อน
      if (this.sellerName == this.myStoreStore.mystore.username) {
        this.$router.push("/mystore");
      } else {
        this.$router.push(`/store/${this.ownerId}`);
      }
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
  setup() {
    const myStoreStore = useMyStoreStore();
    return { myStoreStore };
  },
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
