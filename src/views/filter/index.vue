<template>
  <div class="bg-secondary min-h-screen flex flex-col overflow-hidden relative">
    <div
      class="bg-white md:h-[8rem] h-[8rem] w-full flex text-black items-end iten font-bold"
    >
      <div
        class="md:mx-20 mx-10 my-1 md:my-3 justify-between w-full flex md:item-end items-center"
      >
        <div class="flex md:text-xl text-[1rem] justify-center">
          <h1
            class="text-[#949494] hover:cursor-pointer hover:text-[#838383]"
            @click="handleMainClick"
          >
            เลือกซื้อตามหมวดหมู่&nbsp;
          </h1>
          <h1 class="text-primary">/&nbsp;{{ $route.params.id }}</h1>
        </div>

        <img :src="filter" class="w-[3rem] border-2 rounded-lg md:hidden" />

        <div class="md:flex gap-2 justify-center items-center hidden">
          <h1>เรียงตาม</h1>
          <select
            name="cars"
            id="cars"
            class="border-[1px] border-black text-[1.2rem] font-normal"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-1 gap-10">
      <div
        class="w-[25%] bg-white hidden md:block mt-[1px] text-2xl font-[500]"
      >
        <div class="flex flex-col gap-5 justify-evenly items-center h-full">
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>แบรนด์</h1>
              <h1>+</h1>
            </div>
            <div class="flex flex-col justify-around ml-5">
              <div
                v-for="Option in brandOptions"
                :key="Option.id"
                class="flex gap-3"
              >
                <input
                  type="checkbox"
                  v-model="Option.isCheck"
                  :value="Option.id"
                  class="w-[1.2rem]"
                  @click="handleBrandCheck(Option)"
                />
                <label>{{ Option.label }}</label>
              </div>
            </div>
          </div>
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>ไซต์</h1>
              <h1>+</h1>
            </div>
            <div class="flex flex-col ml-5 flex-wrap h-[6rem]">
              <div
                v-for="Option in sizeOptions"
                :key="Option.id"
                class="flex gap-3"
              >
                <input
                  type="checkbox"
                  v-model="Option.isCheck"
                  :value="Option.id"
                  class="w-[1.2rem]"
                  @click="handleSizeCheck(Option)"
                />
                <label>{{ Option.label }}</label>
              </div>
            </div>
          </div>
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>สี</h1>
              <h1>+</h1>
            </div>
            <div class="flex ml-5 flex-wrap w-[12rem] gap-4">
              <div
                v-for="color in colorOptions"
                :key="color.id"
                class="flex gap-3"
              >
                <div
                  class="w-[1.2rem] aspect-square rounded-full hover:opacity-[0.5] hover:border-[2px] border-black"
                  :style="{ backgroundColor: color.label }"
                ></div>
              </div>
            </div>
          </div>
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>สภาพ</h1>
              <h1>+</h1>
            </div>
            <div class="flex flex-col ml-5 flex-wrap h-[2rem]">
              <input type="range" id="volume-slider" />
            </div>
          </div>
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>ราคา</h1>
              <h1>+</h1>
            </div>
            <div class="flex flex-col ml-5 flex-wrap h-[2rem]">
              <input type="range" id="volume-slider" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-wrap mx-auto overflow-y-auto">
        <div
          class="flex flex-wrap mt-10 gap-5 h-[0px] justify-center md:justify-start"
        >
          <ProductCard
            class="w-[16rem]"
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
    <button @click="console.log(brand)">test</button>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";

import { chat, call } from "@/assets/product";
import { heart } from "@/assets/product";
import { filter } from "@/assets/filter";

import { T1, T2, T3, T4 } from "@/assets/TestImage";

export default {
  components: {
    ProductCard,
    Rating,
  },
  methods: {
    handleMainClick() {
      this.$router.push(`/`);
    },
    storeVariableToUrl(object) {
      this.$router.push({
        path: `/filter/${this.$route.params.id}`,
        query: object,
      });
    },

    handleBrandCheck(value) {
      if (value.isCheck) {
        this.urlVariable.brand = this.urlVariable.brand.filter(
          (item) => item !== value.label,
        );
      } else {
        this.urlVariable.brand.push(value.label);
      }
      this.storeVariableToUrl(this.urlVariable);
    },
    handleSizeCheck(value) {
      if (Array.isArray(this.urlVariable.size)) {
        if (value.isCheck) {
          this.urlVariable.size = this.urlVariable.size.filter(
            (item) => item !== value.label,
          );
        } else {
          this.urlVariable.size.push(value.label);
        }
        this.storeVariableToUrl(this.urlVariable);
      }
    },
  },
  data() {
    return {
      filter: filter,
      ProductImage: [T1, T2, T3, T4, call, chat, heart],
      isOpen: false,
      selectedOption: null,
      sizeOptions: [
        { id: "S", label: "S" ,isCheck: false },
        { id: "M", label: "M" ,isCheck: false},
        { id: "L", label: "L" ,isCheck: false},
        { id: "XL", label: "XL" ,isCheck: false},
        { id: "XXL", label: "XXL" ,isCheck: false},
        { id: "Oversize", label: "Oversize" ,isCheck: false},
      ],
      brandOptions: [
        { id: 0, label: "ไม่มี", isCheck: false },
        { id: 1, label: "มีแบรนด์", isCheck: false },
      ],
      colorOptions: [
        { id: 0, label: "#000000", isCheck: false },
        { id: 1, label: "#1FFC11", isCheck: false },
        { id: 2, label: "#6F3222", isCheck: false },
        { id: 3, label: "#F14131", isCheck: false },
        { id: 4, label: "#123456", isCheck: false },
        { id: 5, label: "#555555", isCheck: false },
      ],
      urlVariable: {
        brand: this.$route.query.brand || [],
        size: this.$route.query.size || [],
        color: this.$route.query.color || [],
      },
      products: [
        {
          id: "a0000001",
          recommended: true,
          title: "ขdsยะ",
          price: 300,
          productImage:
            "https://i.kym-cdn.com/photos/images/newsfeed/002/652/421/280.jpg",
          rating: 4.45,
          sellerImage:
            "https://i0.wp.com/leaguealertsofficial.com/wp-content/uploads/2020/04/shaq.png",
          liked: true,
          tags: [
            { id: 0, label: "สีขาว" },
            { id: 1, label: "เล็ก" },
            { id: 2, label: "50%" },
            { id: 0, label: "no-brand" },
          ],
          category: "0",
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
  created() {
    const updateOptions = (urlVariable, options) => {
      if (Array.isArray(urlVariable)) {
        options.forEach((option) => {
          option.isCheck = urlVariable.includes(option.label);
        });
      }
    };
    updateOptions(this.urlVariable.brand, this.brandOptions);
    updateOptions(this.urlVariable.size, this.sizeOptions);
    updateOptions(this.urlVariable.color, this.colorOptions);
  },
};
</script>
