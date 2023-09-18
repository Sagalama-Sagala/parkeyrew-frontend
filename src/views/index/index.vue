<template>
  <div class="h-screen bg-secondary pt-16">
    <div class="relative">
      <img :src="cover" alt="cover" class="h-[166px] w-full" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center space-y-2">
          <h1 class="text-white text-2xl">ผ้าขี้ริ้วห่อทอง ผ้ามือสองห่อใจ</h1>
          <div class="relative">
            <input
              type="text"
              class="bg-transparent border-[1px] border-white h-10 rounded-xl w-full pr-9 pl-3 text-white focus:outline-none"
              v-model="searchInput"
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
          class="border-[2px] border-primary rounded-lg flex justify-center items-center px-5 md:py-4 text-xl font-semibold md:gap-x-3 cursor-pointer hover:text-white hover:bg-primary duration-500 md:h-[80px] h-[60px] whitespace-nowrap"
          :class="{
            'ml-5 md:ml-0': index === 0,
            'mr-5 md:mr-0': index === types.length - 1,
          }"
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
        class="flex flex-wrap gap-x-2 gap-y-2 md:justify-start justify-center"
      >
        <ProductCard
          v-for="(item, index) in products"
          :id="item.id"
          :key="item.title"
          :is-recommended="item.recommended"
          :item-name="item.title"
          :tags="item.tags"
          :item-price="item.price"
          :item-image="item.productImage"
          :rating="item.rating"
          :seller-image="item.sellerImage"
          :liked="item.liked"
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

export default {
  setup() {},
  components: {
    ProductCard,
  },
  methods: {
    handleSearch() {
      console.log("Search... ", this.searchInput);
    },
    handleFilterType(type) {
      this.$router.push(`/filter/${type}`)
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
      products: [
        {
          id: "a0000001",
          recommended: true,
          title: "ขยะ",
          price: 300,
          productImage:
            "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
          rating: 4.55,
          sellerImage:
            "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
          liked: false,
          tags: [
            { id: 0, label: "สีขาว" },
            { id: 1, label: "เล็ก" },
            { id: 2, label: "50%" },
            { id: 0, label: "no-brand" },
          ],
        },
        {
          id: "a0000002",
          recommended: true,
          title: "ขยะ",
          price: 300,
          productImage:
            "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
          rating: 4.55,
          sellerImage:
            "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
          liked: false,
          tags: [
            { id: 0, label: "สีขาว" },
            { id: 1, label: "เล็ก" },
            { id: 2, label: "50%" },
            { id: 2, label: "เล็กมาก" },
            { id: 2, label: "ถูกเกิน" },
            { id: 2, label: "ลดได้อีกๆ" },
          ],
        },
        {
          id: "a0000003",

          recommended: true,
          title: "ขยะ",
          price: 300,
          productImage:
            "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
          rating: 4.55,
          sellerImage:
            "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
          liked: false,
          tags: [
            { id: 0, label: "สีขาว" },
            { id: 1, label: "เล็ก" },
            { id: 2, label: "50%" },
            { id: 2, label: "เล็กมาก" },
            { id: 2, label: "ถูกเกิน" },
            { id: 2, label: "ลดได้อีกๆ" },
          ],
        },
        {
          id: "a0000004",
          recommended: true,
          title: "ขยะ",
          price: 300,
          productImage:
            "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
          rating: 4.55,
          sellerImage:
            "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
          liked: true,
          tags: [
            { id: 0, label: "สีขาว" },
            { id: 1, label: "เล็ก" },
            { id: 2, label: "50%" },
            { id: 2, label: "เล็กมาก" },
            { id: 2, label: "ถูกเกิน" },
            { id: 2, label: "ลดได้อีกๆ" },
          ],
        },
      ],
    };
  },
};
</script>
