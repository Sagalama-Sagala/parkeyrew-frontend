<template>
  <div
    class="text-black flex flex-col w-full items-center justify-between pt-2 text-lg bg-secondary  px-4"
  >
    <div
      v-for="(item, index) in creview" :key="index"
      class="flex  items-center justify-start border-b-2 border-slate-400 gap-5 pl-5 py-1 pr-5 w-fit  "
    >
      <img
        alt="user profile"
        :src="item.customer.profileImage"
        class="rounded-full md:w-[5.5rem] md:h-[5.5rem] w-[2.5rem] h-[2.5rem] border-[1px] border-black my-2"
      />
      <div class="flex flex-col md:w-[24rem] w-full gap-2">
        <div
          class="flex flex-row md:w-[24rem] w-full justify-start gap-20 text-[#707070]"
        >
          <b class="text-black md:w-[10rem] w-full">{{ item.customer.username }}</b>
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
    const storeId = route.params.id;
    const creview = ref([]);

    axios.get(`review/get-review-by-shopId/${storeId}`).then((res) => {
      console.log(res.data);
      creview.value = res.data;
    }).catch((err) => {
      console.log(err);
    });
    
    console.log(storeId)
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
