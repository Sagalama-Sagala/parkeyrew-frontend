<template>
  <div class="md:text-2xl text-lg my-2 font-semibold">การซื้อของฉัน</div>

  <div
    v-for="(purchase, index) in purchases"
    class="w-full items-center justify-start my-8 md:px-16 text-lg font-medium"
    :key="index"
  >
    <div class="md:text-2xl text-lg my-8">
      จากผู้ขาย {{ purchase.shop.username }} >
    </div>

    <!-- desktop scale -->
    <div>
      <div class="w-full flex justify-around">
        <img
          class="w-28 h-28 flex justify-center bg-gray-300 items-center mx-4 rounded-lg"
          :src="purchase.product?.productImage[0]"
        />
        <div class="w-3/5 flex mx-4">
          <div class="w-1/4">
            <p class="mb-4">ชื่อสินค้า</p>
            <p class="mb-4">ซื้อเมื่อ</p>
            <p class="mb-4">สถานะ</p>
          </div>
          <div>
            <p class="mb-4 text-gray-500 line-clamp-1">
              {{ purchase.product.name }}
            </p>
            <p class="mb-4 text-gray-500">
              {{ formatDate(purchase.createdAt) }}
            </p>
            <p class="mb-4 text-gray-500">
              {{ formatStatus(purchase.status) }}
            </p>
          </div>
        </div>
        <div class="w-1/5 flex">
          <div class="w-1/2">
            <p class="mb-4">ราคาสินค้า</p>
            <p class="mb-4">ค่าส่ง</p>
            <p class="mb-4 text-2xl">รวม</p>
          </div>
          <div class="w-1/2 items-end flex flex-col">
            <p class="mb-4">฿ {{ purchase.product.price }}</p>
            <p class="mb-4">฿ {{ purchase.product.deliveryFee }}</p>
            <p class="mb-4 text-2xl">
              ฿ {{ purchase.product.price + purchase.product.deliveryFee }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-2 mr-4 md:mr-0">
      <button
        class="border-[0.05rem] border-primary px-2 py-1 text-sm md:text-xl md:px-4 md:py-2 rounded-lg text-primary"
        @click="reviewShop"
      >
        รีวิวร้านค้า
      </button>
    </div>

    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { formatDate, formatStatus } from "@/common/js/utils.js";
export default {
  setup() {
    const purchases = ref([]);
    axios
      .get("/history/get-my-purchase")
      .then((response) => {
        console.log(response.data);
        purchases.value = response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return { purchases };
  },
  data() {
    return {
      purchaseInfo: [
        {
          from: "aaa",
          productName:
            "โอดีบีโอ ซิกเนเจอร์ อายแชโดว์ พาเลท ทาตา 4.8g OD276 odbo Signature Eyeshadow Palette",
          time: "12/12/12",
          status: "สำเร็จแล้ว",
          price: 2234,
          deliveryFee: 45,
        },
        {
          from: "bbb",
          productName:
            "โอดีบีโอ เอ็กซ์เทนชั่น มาสคาร่า สองหัว OD922 กันน้ำ ติดทน 4g+4g odbo Extra Extension Mascara",
          time: "01/23/45",
          status: "กำลังจัดส่ง",
          price: 99,
          deliveryFee: 30,
        },
      ],
    };
  },
  methods: {
    formatStatus,
    formatDate,
  },
};
</script>
