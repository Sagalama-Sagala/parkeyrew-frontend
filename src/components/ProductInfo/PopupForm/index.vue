<template>
  <div v-if="isModalOpen" class="fixed w-full h-[100%] z-50">
    <div class="w-full h-full flex justify-center items-center fixed z-40">
      <div
        class="fixed w-full h-[100%] bg-black bg-opacity-50 z-30 cursor-pointer"
        @click="handleClose"
      ></div>
      <div
        class="w-[40rem] md:h-[40rem] h-[30rem] bg-white py-2 rounded-xl flex flex-col items-center mx-10 overflow-auto scrollable-container fixed z-40"
      >
        <div class="flex flex-col md:items-start">
          <div class="md:mt-[0rem] mt-[1rem]">
            <div>
              <h1 class="text-xl my-5">รูปภาพสินค้า</h1>
              <div class="flex ml-5">
                <div class="grid md:grid-cols-5 grid-cols-2 gap-2 mr-2">
                  <div v-for="(image, index) in imageList" :key="index">
                    <div class="relative">
                      <img
                        :src="image"
                        class="w-[5rem] h-[5rem] object-cover border-black border-[1px]"
                      />
                      <button
                        class="absolute top-0 right-0 bg-red-400 w-[1rem] h-[1rem] leading-3 text-white"
                        @click="deleteImage(index)"
                      >
                        x
                      </button>
                    </div>
                  </div>
                  <label
                    for="upload"
                    class="flex flex-col justify-center items-center"
                    v-if="!(imageList.length === 4)"
                  >
                    <img :src="imageHolder" class="w-[5rem]" />
                    <label class="text-gray-600">
                      {{ imageList.length }}/4</label
                    >
                  </label>
                  <input
                    id="upload"
                    type="file"
                    @change="onFileChange"
                    style="display: none"
                    multiple
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 class="text-xl">ข้อมูลสินค้า</h1>
              <div class="flex flex-col md:items-center">
                <div
                  class="flex flex-col md:w-[24rem] justify-center items-center"
                >
                  <div class="flex flex-col md:flex-row my-5">
                    <h1 class="md:w-[8rem]">ชื่อสินค้า</h1>
                    <input
                      class="border-[1px] border-black md:w-[20rem] w-[10rem] rounded px-2"
                      v-model="infoProducts.name"
                      placeholder="ชื่อสินค้า"
                    />
                  </div>
                  <div class="flex flex-col md:flex-row">
                    <h1 class="md:w-[8rem]">คำอธิบายสินค้า</h1>
                    <textarea
                      class="border-[1px] border-black md:w-[20rem] w-[10rem] rounded px-2"
                      v-model="infoProducts.description"
                      placeholder="ชื่อสินค้า"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1 class="text-xl">หมวดหมู่</h1>
              <div class="flex justify-center">
                <div class="flex md:w-[24rem] justify-center my-5 flex-col">
                  <select
                    class="border-[1px] border-black w-[10rem] rounded px-1"
                    v-model="infoProducts.category"
                    :class="
                      infoProducts.category === '0' ? 'text-gray-400' : ''
                    "
                  >
                    <option disabled selected value="0">เลือกหมวดหมู่</option>
                    <option
                      v-for="option in categoryOptions.CATEGORY"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h1 class="text-xl">รายละเอียด</h1>
              <div class="flex md:justify-center md:flex-row flex-col gap-0">
                <div class="md:w-[12rem]">
                  <div class="flex item-center my-5 justify-center">
                    <h1 class="w-[4rem]">แบรนด์</h1>
                    <select
                      class="border-[1px] border-black w-[6rem] rounded px-1"
                      v-model="infoProducts.brand"
                      :class="infoProducts.brand === '0' ? 'text-gray-400' : ''"
                    >
                      <option disabled selected value="0">เลือกแบรนด์</option>
                      <option
                        v-for="option in brandOptions.BRAND"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>

                  <div class="flex items-center my-5 justify-center">
                    <h1 class="w-[4rem]">สี</h1>
                    <select
                      class="border-[1px] border-black w-[6rem] rounded px-1"
                      v-model="infoProducts.color"
                      :class="infoProducts.color === '0' ? 'text-gray-400' : ''"
                    >
                      <option disabled selected value="0">เลือกสี</option>
                      <option
                        v-for="option in colorOptions.COLOR"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                  <div class="flex items-center md:my-5 justify-center">
                    <h1 class="w-[4rem]">สภาพ</h1>
                    <input
                      type="number"
                      class="border-[1px] border-black w-[6rem] rounded px-2"
                      v-model.number="infoProducts.condition"
                    />
                  </div>
                </div>
                <div class="md:w-[12rem]">
                  <div class="flex items-center my-5 justify-center">
                    <h1 class="w-[4rem]">ราคา</h1>
                    <input
                      type="number"
                      class="border-[1px] border-black w-[6rem] rounded px-2"
                      v-model.number="infoProducts.price"
                    />
                  </div>
                  <div class="flex items-center my-5 justify-center">
                    <h1 class="w-[4rem]">จำนวน</h1>
                    <div class="flex gap-5">
                      <button
                        @click="handleDecrese"
                        class="w-6 h-6 border-[1px] rounded-md border-black leading-3"
                      >
                        -
                      </button>
                      <h1>{{ infoProducts.remain }}</h1>
                      <button
                        @click="handleIncrese"
                        class="w-6 h-6 border-[1px] rounded-md border-black leading-3"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center my-5 justify-center">
                    <h1 class="w-[4rem]">ไซต์</h1>
                    <select
                      class="border-[1px] border-black w-[6rem] rounded px-1"
                      v-model="infoProducts.size"
                      :class="infoProducts.size === '0' ? 'text-gray-400' : ''"
                    >
                      <option disabled selected value="0">เลือกไซต์</option>
                      <option
                        v-for="option in sizeOptions.SIZE"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <h1 class="text-xl">รายละเอียดการจัดส่ง</h1>
              <div class="flex justify-center flex-col md:flex-row gap-3">
                <div class="flex items-center justify-center md:my-5 w-[12rem]">
                  <h1 class="w-[4rem]">ส่งจาก</h1>
                  <select
                    class="border-[1px] border-black w-[6rem] rounded px-1"
                    v-model="infoProducts.sendFrom"
                    :class="
                      infoProducts.sendFrom === '0' ? 'text-gray-400' : ''
                    "
                  >
                    <option disabled selected value="0">เลือกจังหวัด</option>
                    <option
                      v-for="option in thaiProvinces.RECORDS"
                      :key="option.name_th"
                      :value="option.name_th"
                    >
                      {{ option.name_th }}
                    </option>
                  </select>
                </div>
                <div class="flex items-center justify-center w-[12rem]">
                  <h1 class="w-[4rem]">ค่าส่ง</h1>
                  <input
                    type="number"
                    v-model.number="infoProducts.deliveryFee"
                    class="border-[1px] border-black w-[6rem] rounded px-1"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center">
              <label
                class="text-red-400 text-sm"
                v-for="text in warnings"
                :key="text"
              >
                {{ text }}
              </label>
            </div>
            <div class="flex gap-6 h-[2.5rem] md:justify-end justify-center">
              <button
                @click="handleClose"
                class="text-[#969696] hover:text-black duration-100"
              >
                ยกเลิก
              </button>
              <button
                @click="handleOk"
                class="text-primary border-[1px] border-primary hover:bg-primary hover:text-white duration-100 rounded-lg px-4"
              >
                ลงขาย
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imageHolder } from "@/assets/product";
import { watchEffect, ref, reactive } from "vue";
import {
  thaiProvinces,
  brandOptions,
  categoryOptions,
  colorOptions,
  sizeOptions,
} from "@/constants";
import { useMyStoreStore } from "@/store/my-store.store.js";
export default {
  setup() {
    const myStoreStore = useMyStoreStore();
    myStoreStore.fetchMyStore();
    return { myStoreStore };
  },
  name: "PopupForm",
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    productData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files;
      if (this.imageList.length < 4) {
        const remainingSlots = 4 - this.imageList.length;
        for (let i = 0; i < Math.min(remainingSlots, files.length); i++) {
          this.imageList.push(URL.createObjectURL(files[i]));
        }
      }
    },
    deleteImage(index) {
      this.imageList.splice(index, 1);
    },
    handleToggleModal() {
      this.$emit("toggleModal");
    },
    handleOk() {
      if (this.validateData()) {
        this.$emit("handleOk", this.infoProducts, this.handleReset);
      }
    },
    handleReset() {
      this.infoProducts.brand = "0";
      this.infoProducts.category = "0";
      this.infoProducts.condition = 0;
      this.infoProducts.sendFrom = "0";
      this.infoProducts.size = "0";
      this.infoProducts.price = 0;
      this.infoProducts.description = "";
      this.infoProducts.name = "";
      this.infoProducts.remain = 0;
      this.infoProducts.deliveryFee = 0;
      this.infoProducts.color = "0";
      this.warnings = [];
    },
    handleIncrese() {
      this.infoProducts.remain += 1;
    },
    handleDecrese() {
      if (this.infoProducts.remain > 0) {
        this.infoProducts.remain -= 1;
      }
    },
    handleClose() {
      this.handleToggleModal();
      this.handleReset();
    },
    validateData() {
      let isValid = true;
      const warnings = [];
      //NAME
      if (!this.infoProducts.name) {
        warnings.push("Please enter the product name.");
        isValid = false;
      }
      //Description
      if (!this.infoProducts.description) {
        warnings.push("Please enter the product description.");
        isValid = false;
      }
      //Category
      if (this.infoProducts.category === "0") {
        warnings.push("Please select a category.");
        isValid = false;
      }
      //Brand
      if (this.infoProducts.brand === "0") {
        warnings.push("Please select a brand.");
        isValid = false;
      }
      //Color
      if (this.infoProducts.color === "0") {
        warnings.push("Please select a color.");
        isValid = false;
      }
      //Condition
      if (this.infoProducts.condition === 0) {
        warnings.push("Please enter the product condition.");
        isValid = false;
      } else if (this.infoProducts.condition < 51) {
        warnings.push("Please enter the product condition more than 51%.");
        isValid = false;
      } else if (this.infoProducts.condition > 100) {
        warnings.push("Please enter the product condition less than 100%.");
        isValid = false;
      }
      //Price
      if (
        this.infoProducts.price === undefined ||
        this.infoProducts.price === null ||
        this.infoProducts.price === ""
      ) {
        warnings.push("Please enter the product price.");
        isValid = false;
      } else if (this.infoProducts.price < 0) {
        warnings.push("Please enter the product price more than 0 baht.");
        isValid = false;
      }
      //Remain
      if (this.infoProducts.remain === 0) {
        warnings.push("Please enter the product remain.");
        isValid = false;
      }
      //Size
      if (this.infoProducts.size === "0") {
        warnings.push("Please select a size.");
        isValid = false;
      }
      //SendFrom
      if (this.infoProducts.sendFrom === "0") {
        warnings.push("Please select a province.");
        isValid = false;
      }
      //DeliveryFee
      if (
        this.infoProducts.deliveryFee === undefined ||
        this.infoProducts.deliveryFee === null ||
        this.infoProducts.deliveryFee === ""
      ) {
        warnings.push("Please enter the delivery fee.");
        isValid = false;
      }
      this.warnings = warnings;
      if (!isValid) {
        console.log("Data validation failed: ", this.warnings);
      }
      return isValid;
    },
  },
  setup(props) {
    const infoProducts = reactive({
      brand: "0",
      category: "0",
      color: "0",
      condition: 0,
      sendFrom: "0",
      size: "0",
      price: 0,
      description: "",
      name: "",
      remain: 0,
      deliveryFee: 0,
    });
    watchEffect(() => {
      if (props.productData) {
        infoProducts.brand = props.productData.brand;
        infoProducts.category = props.productData.category;
        infoProducts.condition = props.productData.condition;
        infoProducts.sendFrom = props.productData.sendFrom;
        infoProducts.size = props.productData.size;
        infoProducts.price = props.productData.price;
        infoProducts.description = props.productData.description;
        infoProducts.name = props.productData.name;
        infoProducts.remain = props.productData.remain;
        infoProducts.deliveryFee = props.productData.deliveryFee;
        infoProducts.color = props.productData.color;
      }
    });
    return { infoProducts };
  },
  data() {
    return {
      imageList: [],
      imageHolder: imageHolder,
      thaiProvinces,
      categoryOptions,
      brandOptions,
      colorOptions,
      sizeOptions,
      warnings: [],
    };
  },
};
</script>

<style scoped>
option {
  color: black;
}
option[disabled] {
  display: none;
}
.scrollable-container::-webkit-scrollbar {
  width: 12px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  margin-top: 100px;
  margin-bottom: 100px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
  border-right: none;
  border-left: none;
  width: 1px;
}
</style>