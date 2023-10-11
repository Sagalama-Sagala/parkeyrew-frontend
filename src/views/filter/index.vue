<template>
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
          <h1 class="text-primary">/&nbsp;{{ $route.params.id }}</h1>
        </div>

        <img :src="filter" class="w-10  rounded-lg md:hidden  " @click="toggleFilterBar" />

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
                  @click="handleBrandCheck(Option)"
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
              <DoubleRangeSlider :min-Range="conditionSlider.minRange" :max-Range="conditionSlider.maxRange" :unit="conditionSlider.unit"  v-model:m1="conditionSlider.value1" v-model:m2="conditionSlider.value2"/>
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
              <DoubleRangeSlider :min-Range="priceSlider.minRange" :max-Range="priceSlider.maxRange" :unit="priceSlider.unit" :step="priceSlider.step"  v-model:m1="priceSlider.value1" v-model:m2="priceSlider.value2"/>
              
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
        <div  v-else> Oh no</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";
import DoubleRangeSlider from '@/components/Filter/DoubleRangeSlider/index.vue'

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
    DoubleRangeSlider
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
    toggleFilterBar()
    {
      this.isFilterBarToggle.value = !this.isFilterBarToggle.value
      console.log(this.isFilterBarToggle.value);
    },

  },
  setup(){
    const products = ref([]);
    const route = useRoute();
    const category = route.params.id;
    axios
      .get("/product")
      .then((response) => {
        products.value = response.data.filter(item => item.category === category);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return { products };
  },
  data() {
    return {
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
      priceSlider:ref({minRange:0, maxRange:5000, step:100,unit:"฿", value1:0,value2:5000}),
      conditionSlider:{minRange:0, maxRange:100, step:1,unit:"%", value1:0,value2:100},
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
      ],
      urlVariable: {
        brand: this.$route.query.brand || [],
        size: this.$route.query.size || [],
        color: this.$route.query.color || [],
      },
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