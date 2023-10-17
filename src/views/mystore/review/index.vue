<template>
  <div
    class="text-black flex flex-col w-full items-center justify-center pt-2 text-lg"
  >
    <div
      v-for="(item, index) in creview" :key="index"
      class="flex md:flex-row flex-col items-center justify-start border-b-2 border-black gap-5 pl-5 py-1 pr-5"
    >
      <img
        alt="user profile"
        :src="item.profileURL"
        class="rounded-full w-[5.5rem] h-[5.5rem] border-[1px] border-black"
      />
      <div class="flex flex-col md:w-[24rem] w-full gap-2">
        <div
          class="flex flex-row md:w-[24rem] w-full justify-start gap-20 text-[#707070]"
        >
          <b class="text-black md:w-[10rem] w-full">{{ item.customer }}</b>
          <div class="md:block hidden">{{ formatDate(item.createdAt) }}</div>
        </div>
        {{ item.text }}
      </div>
      <Rating :rating="item.reviewStar" />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";
import { editIcon, shareIcon } from "@/assets/mystore";
import {ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import { formatDate } from "@/common/js/utils.js";

export default {
  components: {
    ProductCard,
    Rating,
  },
  setup()
  {
    const route = useRoute();
    const creview = ref([]);

    axios.get(`review/get-review-by-userId`).then((res) => {
      console.log(res.data);
      creview.value = res.data;
    }).catch((err) => {
      console.log(err);
    });
    
    return {
      creview,
    };
  },
  data() {
    return {
      editIcon,
      shareIcon,
    };
  },
  methods: {
    routeTomyStore() {
      this.$router.push(`/mystore/store`);
    },
    routeToReview() {
      this.$router.push(`/mystore/review`);
    },
    formatDate,
  },
};
</script>
