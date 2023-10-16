<template>
  <Loading :isLoading="isLoading"/>
  <div class="bg-secondary min-h-screen flex flex-col overflow-hidden relative">
    <div class="relative pt-16">
      <img :src="cover" alt="cover" class="md:h-[166px] h-[130px] w-full object-cover" />
      <div class="absolute inset-0 flex top-[6rem] justify-center">
        <div class="text-center space-y-2">
          <h1 class="text-white text-2xl">ผ้าขี้ริ้วห่อทอง ผ้ามือสองห่อใจ</h1>
          <div class="relative">
            <input
              type="text"
              class="bg-transparent border-[1px] border-white h-10 rounded-xl w-full pr-9 pl-3 text-white focus:outline-none"
              v-model="searchInput"
              @keyup.enter="handleSearch(searchInput)"
            />
            <span
              class="absolute right-3 top-3 h-full cursor-pointer"
              @click="handleSearch(searchInput)"
            >
              <img :src="search" alt="search" class="w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white h-[4.5rem] w-full flex text-black items-center iten font-bold "
    >
      <div
        class="md:mx-20 mx-5 my-1 md:my-3 justify-between w-full flex md:item-end items-center"
      >
        <div class="flex md:text-xl text-[1rem] justify-center ">
          <h1
            class="text-[#949494] hover:cursor-pointer hover:text-[#838383]"
            @click="handleMainClick"
          >
            เลือกซื้อตามหมวดหมู่&nbsp;
          </h1>
          <h1 class="text-primary">/&nbsp;{{ $route.query.keyword }}</h1>
        </div>

        <img :src="filter" class="w-10  rounded-lg md:hidden  " @click="toggleFilterBar" />

        <div class="md:flex gap-2 justify-center items-center hidden">
          <h1>เรียงตาม</h1>
          <select
            name="cars"
            id="cars"
            class="border-[1px] border-black text-[1.2rem] font-normal"
            @change="handleSelect"
          >
            <option value="1">แนะนำ</option>
            <option value="2">ราคาต่ำไปสูง</option>
            <option value="3">ราคาสูงไปต่ำ</option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30 z-30 md:hidden"
      :class="isFilterBarToggle.value ? 'block' : 'hidden'"
      @click="toggleFilterBar"
    ></div>
    <div
      class="bg-white h-screen top- w-9/12 fixed transition-all ease-in duration-300 z-40 md:hidden "
      :class="isFilterBarToggle.value ? 'right-[0px]' : 'right-[-600px]'"
      >
        <div class="flex flex-col gap-5 justify-evenly items-center h-full">
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>แบรนด์</h1>
            </div>
            <div class="flex flex-col  ml-4">
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
                  @click.prevent.stop="handleBrandCheck(Option)"
                />
                <label>{{ Option.label }}</label>
              </div>
            </div>
          </div>
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>ไซต์</h1>
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
            </div>
            <div class="grid ml-5 grid-cols-2 w-[12rem] ">
              <div
                v-for="Option in colorOptions"
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
              <h1>สภาพ</h1>
            </div>
            <div class=" ml-5 flex-wrap h-[2rem]">
              <DoubleRangeSlider :min-Range="conditionSlider.minRange" :max-Range="conditionSlider.maxRange" :unit="conditionSlider.unit"  v-model:m1="conditionSlider.value1" v-model:m2="conditionSlider.value2"/>
            </div>
          </div>
          <div class="w-[16rem] flex flex-col gap-3">
            <div class="flex w-full justify-between">
              <h1>ราคา</h1>
            </div>
            <div class=" ml-5 flex-wrap h-[2rem]">
              <DoubleRangeSlider :min-Range="priceSlider.minRange" :max-Range="priceSlider.maxRange" :unit="priceSlider.unit"  v-model:m1="priceSlider.value1" v-model:m2="priceSlider.value2"/>
            </div>
          </div>
        </div>
    </div>
    

    <div class="flex flex-1 gap-10">
      <div
        class="w-[25rem] bg-white  mt-[1px] text-2xl font-[500] hidden md:block  "
      >
        <div class="flex flex-col gap-14  items-center h-full mb-10   ">
          <div class="w-[20rem] flex flex-col gap-3 mt-10 "
              :class="isBrandDropdown && 'border-b-2'  "
          >
            <div class="flex w-full justify-between">
              <h1>แบรนด์</h1>
              <h1 @click="()=>{isBrandDropdown = !isBrandDropdown}" class="hover:cursor-pointer select-none">{{ isBrandDropdown ? '+' : '-'}}</h1>
            </div>
            <div 
            class="flex flex-col ml-5  overflow-hidden  duration-75"
            :class="isBrandDropdown ? 'h-[0px]' : 'h-[4rem]' "
            >
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
          <div class="w-[20rem] flex flex-col gap-3 "
              :class="isSizeDropdown && 'border-b-2'  "
          >
            <div class="flex w-full justify-between">
              <h1>ไซต์</h1>
              <h1 @click="()=>{isSizeDropdown = !isSizeDropdown}" class="hover:cursor-pointer select-none">{{ isSizeDropdown ? '+' : '-'}}</h1>
            </div>
            <div 
            class="grid grid-cols-2 overflow-hidden ml-5 duration-75"
            :class="isSizeDropdown ? 'h-[0px]' : 'h-[6rem]' "
            >
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
          <div class="w-[20rem] flex flex-col gap-3 "
              :class="isColorDropdown && 'border-b-2'  "
          >
            <div class="flex w-full justify-between">
              <h1>สี</h1>
              <h1 @click="()=>{isColorDropdown = !isColorDropdown}" class="hover:cursor-pointer select-none">{{ isColorDropdown ? '+' : '-'}}</h1>
            </div>
            <div 
            class="grid grid-cols-2 overflow-hidden ml-5 duration-75"
            :class="isColorDropdown ? 'h-[0px]' : 'h-[12rem]' "
            >
              <div
                v-for="Option in colorOptions"
                :key="Option.id"
                class="flex gap-3"
              >
                <input
                  type="checkbox"
                  v-model="Option.isCheck"
                  :value="Option.id"
                  class="w-[1.2rem]"
                  @click="handleColorCheck(Option)"
                />
                <label>{{ Option.label }}</label>
              </div>
            </div>
          </div>
          <div class="w-[20rem] flex flex-col gap-3 "
              :class="isConditionDropdown && 'border-b-2'  "
          >
            <div class="flex w-full justify-between">
              <h1>สภาพ</h1>
              <h1 @click="()=>{isConditionDropdown = !isConditionDropdown}" class="hover:cursor-pointer select-none">{{ isConditionDropdown ? '+' : '-'}}</h1>
            </div>
            <div 
            class=" ml-5 flex-wrap  duration-75"
            :class="isConditionDropdown ? 'h-[0px] overflow-hidden' : 'h-[2rem]'"
            >
              <DoubleRangeSlider :min-Range="conditionSlider.minRange" :max-Range="conditionSlider.maxRange" :unit="conditionSlider.unit"  v-model:m1="conditionSlider.value1" v-model:m2="conditionSlider.value2" @onChange1="handleConditionSliderChange(conditionSlider.value1,conditionSlider.value2)" @onChange2="handleConditionSliderChange(conditionSlider.value1,conditionSlider.value2)"/>
            </div>
          </div>
          <div class="w-[20rem] flex flex-col gap-3 "
              :class="isPriceDropdown && 'border-b-2'  "
          >
            <div class="flex w-full justify-between">
              <h1>ราคา</h1>
              <h1 @click="()=>{isPriceDropdown = !isPriceDropdown}" class="hover:cursor-pointer select-none">{{ isPriceDropdown ? '+' : '-'}}</h1>
            </div>
            <div 
            class=" ml-5 flex-wrap   duration-75"
            :class="isPriceDropdown ? 'h-[0rem] overflow-hidden' : 'h-[2rem]'"
            >
              <DoubleRangeSlider :min-Range="priceSlider.minRange" :max-Range="priceSlider.maxRange" :unit="priceSlider.unit" :step="priceSlider.step"  v-model:m1="priceSlider.value1" v-model:m2="priceSlider.value2" @onChange1="handlePriceSliderChange(priceSlider.value1,priceSlider.value2)" @onChange2="handlePriceSliderChange(priceSlider.value1,priceSlider.value2)"/>
              
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-wrap mx-auto overflow-y-auto ">
        <div v-if="products.length > 0" class="flex flex-wrap mt-10 gap-5 h-[0px] justify-center">
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
          />
        </div>
        <div  v-else class="w-full flex justify-center items-center text-3xl "> Product not found </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref,reactive,watch,onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";
import DoubleRangeSlider from '@/components/Filter/DoubleRangeSlider/index.vue'
import Loading from "@/components/Loading/index.vue";

import { chat, call } from "@/assets/product";
import { heart } from "@/assets/product";
import { filter } from "@/assets/filter";

import { T1, T2, T3, T4 } from "@/assets/TestImage";
import {
  cover,
  search,
} from "@/assets/home";
export default {
  components: {
    ProductCard,
    Rating,
    DoubleRangeSlider,
    Loading,
  },
  methods: {
    handleMainClick() {
      this.$router.push(`/`);
    },
    storeVariableToUrl(object) {
      const keyword = this.$route.query.keyword || "";
      const queryObject = {
        keyword: keyword,
        ...object,
      };
      this.$router.push({
        path: "/search",
        query: queryObject,
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
    handleColorCheck(value)
    {
      if (Array.isArray(this.urlVariable.color)) {
        if (value.isCheck) {
          this.urlVariable.color = this.urlVariable.color.filter(
            (item) => item !== value.label,
          );
        } else {
          this.urlVariable.color.push(value.label);
        }
        this.storeVariableToUrl(this.urlVariable);
      }
    },
    handlePriceSliderChange(value1,value2) {
      this.urlVariable.price = `${value1}-${value2}`;
      this.storeVariableToUrl(this.urlVariable);
    },
    handleConditionSliderChange(value1,value2) {
      this.urlVariable.condition = `${value1}-${value2}`;
      this.storeVariableToUrl(this.urlVariable);
    },
    toggleFilterBar()
    {
      this.isFilterBarToggle.value = !this.isFilterBarToggle.value
      console.log(this.isFilterBarToggle.value);
    },
    handleSelect(event) {
      switch (event.target.value) {
        case '1':
          this.selectedValue = 1;
          break;
        case '2':
          this.selectedValue = 2;
          break;
        case '3':
          this.selectedValue = 3;
          break;
        default:
          break;
      }
    }
  },
  setup() {
  const products = ref([]);
  const originalProducts = ref([]);
  const route = useRoute();
  const router = useRouter();
  const keyword = route.query.keyword || "";
  const isLoading = ref(true);
  const urlVariable = reactive({
        brand: route.query.brand || [],
        size: route.query.size || [],
        color: route.query.color || [],
        condition: route.query.condition || [],
        price: route.query.price || [],
  });
  const sizeOptions = ref([
        { id: "S", label: "S" ,isCheck: false },
        { id: "M", label: "M" ,isCheck: false},
        { id: "L", label: "L" ,isCheck: false},
        { id: "XL", label: "XL" ,isCheck: false},
        { id: "XXL", label: "XXL" ,isCheck: false},
        { id: "Oversize", label: "Oversize" ,isCheck: false},
      ]);
  const brandOptions = ref([
        { id: 0, label: "ไม่มีแบรนด์", isCheck: false },
        { id: 1, label: "มีแบรนด์", isCheck: false },
      ]);
  const colorOptions = ref([
        { id: 0, label: "ขาว", isCheck: false },
        { id: 1, label: "ดำ", isCheck: false },
        { id: 2, label: "ม่วง", isCheck: false },
        { id: 3, label: "ฟ้า", isCheck: false },
        { id: 4, label: "น้ำเงิน", isCheck: false },
        { id: 5, label: "เขียว", isCheck: false },
        { id: 6, label: "ชมพู", isCheck: false },
        { id: 7, label: "เหลือง", isCheck: false },
        { id: 8, label: "ส้ม", isCheck: false },
        { id: 9, label: "แดง", isCheck: false },
        { id: 10, label: "เทา", isCheck: false },
        { id: 11, label: "น้ำตาล", isCheck: false },
      ]);
  const conditionSlider = reactive({
      minRange: 0,
      maxRange: 100,
      unit: "%",
      value1: 0,
      value2: 100,
  });
  const priceSlider = reactive({
        minRange: 0,
        maxRange: 10000,
        unit: "฿",
        step: 100,
        value1: 0,
        value2: 10000,
    });
  const selectedValue = ref(1)


    const updateUIFromUrl = () => {
      if (urlVariable.brand.length) {
        brandOptions.value.forEach((option) => {
          if (urlVariable.brand.includes(option.label)) {
            option.isCheck = true;
          }
        });
      }
      if (urlVariable.size.length) {
        sizeOptions.value.forEach((option) => {
          if (urlVariable.size.includes(option.label)) {
            option.isCheck = true;
          }
        });
      }
      if (urlVariable.color.length) {
        colorOptions.value.forEach((option) => {
          if (urlVariable.color.includes(option.label)) {
            option.isCheck = true;
          }
        });
      }
          if (!Array.isArray(urlVariable.price)) {
        const priceValues = urlVariable.price.split("-");
        priceSlider.value1 = parseInt(priceValues[0]);
        priceSlider.value2 = parseInt(priceValues[1]);
      }
      if (!Array.isArray(urlVariable.condition)) {
        const conditionValues = urlVariable.condition.split("-");
        conditionSlider.value1 = parseInt(conditionValues[0]);
        conditionSlider.value2 = parseInt(conditionValues[1]);
      }
    };

    const handleSort = (id , product) =>
    {
      if (id === 1) {
        products.value = product.sort((a, b) => b.owner.reviewStar - a.owner.reviewStar);
      } else if (id === 2) {
        products.value = product.sort((a, b) => a.price - b.price);
      } else if (id === 3) {
        products.value = product.sort((a, b) => b.price - a.price);
      }
    }


    axios
      .get("/product")
      .then((response) => {
        originalProducts.value = response.data.filter((item) => {
          const name = item.name.toLowerCase();
          const description = item.description.toLowerCase();
          const searchKeyword = keyword.toLowerCase();
          return name.includes(searchKeyword) || description.includes(searchKeyword);
        });
        handleSort(selectedValue.value , products.value)
        console.log(response.data);
        isLoading.value = false;
      })
      .catch((err) => {
        console.log(err);
        isLoading.value = false;
      });


    const handleSearch=(keyword) => {
      isLoading.value = true;
      if(keyword === null || keyword === "") return;
      router.push(`/search?keyword=${keyword}`);
      axios
        .get("/product")
        .then((response) => {
          originalProducts.value = response.data.filter((item) => {
            const name = item.name.toLowerCase();
            const description = item.description.toLowerCase();
            const searchKeyword = keyword.toLowerCase();
            return name.includes(searchKeyword) || description.includes(searchKeyword);
          });
          products.value = [...originalProducts.value];
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
        });
        
    };

    watch(
      [urlVariable, originalProducts],
      ([newUrlVariable, originalProducts], [oldUrlVariable, oldOriginalProducts]) => {
        let filteredProducts = [...originalProducts];
        
        if (newUrlVariable.brand.length) {
          filteredProducts = filteredProducts.filter(product =>
            newUrlVariable.brand.includes(product.brand)
          );
        }

        if (newUrlVariable.size.length) {
          filteredProducts = filteredProducts.filter(product =>
            newUrlVariable.size.includes(product.size)
          );
        }

        if (newUrlVariable.color.length) {
          filteredProducts = filteredProducts.filter(product =>
            newUrlVariable.color.includes(product.color)
          );
        }

        if(!Array.isArray(newUrlVariable.price))
        {
          const priceValues = newUrlVariable.price.split("-");
          filteredProducts = filteredProducts.filter(product =>
            product.price >= parseInt(priceValues[0]) && product.price <= parseInt(priceValues[1])
          );
        }

        if(!Array.isArray(newUrlVariable.condition))
        {
          const conditionValues = newUrlVariable.condition.split("-");
          filteredProducts = filteredProducts.filter(product =>
            product.condition >= parseInt(conditionValues[0]) && product.condition <= parseInt(conditionValues[1])
          );
        }


    products.value = filteredProducts;
    handleSort(selectedValue.value , products.value)
  },
  { deep: true }
);
    watch(
      [selectedValue],
      ([newSelectedValue], [oldSelectedValue]) => {
        handleSort(newSelectedValue , products.value)
        console.log(newSelectedValue)
        console.log(products.value)
      },
      { deep: true }
    );

    onMounted(() => {
      updateUIFromUrl();
    });
    return { products, isLoading, handleSearch ,urlVariable,colorOptions,sizeOptions,brandOptions ,conditionSlider,priceSlider , selectedValue};
  },
  data() {
    return {
      maginkaow: 1000,
      cover: cover,
      search: search,
      filter: filter,
      ProductImage: [T1, T2, T3, T4, call, chat, heart],
      isOpen: false,
      selectedOption: null,
      isFilterBarToggle: ref({ value: false }),
      isBrandDropdown: true,
      isSizeDropdown: true,
      isColorDropdown: true,
      isConditionDropdown: true,
      isPriceDropdown: true,
      originalProducts: [],
    }
  },
};
</script>