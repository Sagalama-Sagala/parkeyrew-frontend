
<template>
  <Loading v-if="isLoading" />
  <div class="h-screen bg-secondary pt-16">
    <div class="relative">
      <img :src="cover" alt="cover" class="h-[166px] w-full object-cover" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center space-y-2">
          <h1 class="text-white text-2xl">ผ้าขี้ริ้วห่อทอง ผ้ามือสองห่อใจ</h1>
          <div class="relative">
            <input
              type="text"
              class="bg-transparent border-[1px] border-white h-10 rounded-xl w-full pr-9 pl-3 text-white focus:outline-none"
              v-model="searchInput"
              @keyup.enter="handleSearch"
            />
            <span
              class="absolute right-3 top-3 h-full cursor-pointer"
              @click="handleSearch"
            >
              <img :src="search" alt="search" class="w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="md:px-8 px-0 py-5 bg-white w-full">
      <h2 class="md:px-0 px-8 font-semibold text-xl">เลือกซื้อตามหมวดหมู่</h2>
      <ul
        class="flex md:flex-wrap md:gap-x-4 gap-x-3 gap-y-3 pt-6 md:overflow-hidden overflow-x-auto"
      >
        <li
          v-for="(item, index) in types"
          :key="item.title"
          class="border-[2px] border-primary rounded-lg flex justify-center items-center px-5 md:py-4 text-xl font-semibold md:gap-x-3 cursor-pointer hover:text-white hover:bg-primary duration-500 md:h-[80px] h-[60px] whitespace-nowrap first:ml-5 first:md:ml-0 last:mr-5 last:md:mr-0"
          @click="handleFilterType(item.title)"
        >
          <span>
            <img :src="item.icon" :alt="item.title" class="w-12" />
          </span>
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="bg-secondary w-full px-8 py-5">
      <h2 class="text-xl font-semibold pb-5 md:text-start text-center">
        สินค้าล่าสุดที่ถูกลงขาย
      </h2>
      <div
        class="grid md:[grid-template-columns:repeat(auto-fill,_minmax(18rem,3fr))] gap-7 md:justify-start justify-center"
      >
        <ProductCard
          v-for="(item, index) in products"
          :id="item._id"
          :key="item.title"
          :is-recommended="item.recommended"
          :item-name="item.name"
          :item-price="item.price"
          :item-image="item.productImage"
          :rating="item.owner.reviewStar"
          :seller-image="item.sellerImage"
          :seller-name="item.owner.username"
          :liked="item.liked"
          :color="item.color"
          :size="item.size"
          :brand="item.brand"
          :condition="item.condition"
          :owner-id="item.owner._id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  cover,
  search,
  bag,
  bikini,
  dress,
  jumpsuit,
  shirt,
  shirt2,
  shoes,
  skirt,
  sweater,
  trousers,
} from "@/assets/home";
import ProductCard from "@/components/ProductCard/index.vue";
import Loading from "@/components/Loading/index.vue";

import { ref } from "vue";
import axios from "axios";


export default {
  setup() {
    const products = ref([]);
    const isLoading = ref(true);
    axios
      .get("/product")
      .then((response) => {
        console.log(response.data);
        products.value = response.data;
        isLoading.value = false;
      })
      .catch((err) => {
        console.log(err);
      });

    return { products ,isLoading};
  },
  components: {
    ProductCard,
    Loading,
  },
  methods: {
    handleSearch() {
      if(this.searchInput === null || this.searchInput === "") return;
      this.$router.push(`/search?keyword=${this.searchInput}`);
    },
    handleFilterType(type) {
      this.$router.push(`/filter/${type}`);
    },
  },
  data() {
    return {
      cover: cover,
      search: search,
      searchInput: null,
      types: [
        { icon: dress, title: "เดรส" },
        { icon: shirt, title: "ท็อปส์" },
        { icon: trousers, title: "กางเกง" },
        { icon: sweater, title: "เสื้อกันหนาว" },
        { icon: skirt, title: "กระโปรง" },
        { icon: bag, title: "กระเป๋า" },
        { icon: bikini, title: "ชุดว่ายน้ำ" },
        { icon: shirt2, title: "ชุดทำงาน" },
        { icon: shoes, title: "รองเท่้า" },
        { icon: jumpsuit, title: "จั๊มป์สูท" },
      ],
    };
  },
};
</script>
