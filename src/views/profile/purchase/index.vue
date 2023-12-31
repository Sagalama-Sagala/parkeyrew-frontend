<template>
  <div class="md:text-2xl text-lg my-2 font-semibold">การซื้อของฉัน</div>
  <div v-if="purchases.length === 0">
    <p class="text-center mt-10">ไม่พบรายการ</p>
  </div>

  <div
    v-for="(purchase, index) in purchases"
    class="w-full items-center justify-start my-8 md:px-16 text-lg font-medium"
    :key="index"
  >
    <div class="md:text-2xl text-lg my-8">
      จากผู้ซื้อ {{ purchase?.shop?.firstname }}
      {{ purchase?.shop?.lastname }} >
    </div>

    <!-- desktop scale -->
    <div class="hidden md:block">
      <div class="w-full flex justify-around">
        <img
          class="w-28 h-28 flex justify-center bg-gray-300 items-center mx-4 rounded-lg"
          :src="purchase?.product?.productImage[0]"
        />
        <div class="w-3/5 flex mx-4">
          <div class="w-1/4">
            <p class="mb-4">ชื่อสินค้า</p>
            <p class="mb-4">ซื้อเมื่อ</p>
            <p class="mb-4">สถานะ</p>
          </div>
          <div>
            <p class="mb-4 text-gray-500 line-clamp-1">
              {{ purchase?.product?.name }}
            </p>
            <p class="mb-4 text-gray-500">
              {{ formatDate(purchase?.product?.createdAt) }}
            </p>
            <p class="mb-4 text-gray-500">
              {{ formatStatus(purchase?.status) }}
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
            <p class="mb-4">฿ {{ purchase?.product?.price }}</p>
            <p class="mb-4">฿ {{ purchase?.product?.deliveryFee }}</p>
            <p class="mb-4 text-2xl">
              ฿
              {{ purchase?.product?.price + purchase?.product?.deliveryFee }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile scale -->
    <div class="md:hidden">
      <div class="flex">
        <div
          class="w-1/2 my-6 flex justify-center bg-gray-300 items-center rounded-lg"
        >
          รูป
        </div>
        <div class="ml-4 text-black text-base font-normal">
          <div>
            <p class="mb-2 line-clamp-2">
              {{ purchase?.productName }}
            </p>
          </div>
          <div class="flex justify-between pr-4">
            <div class="w-1/2 flex flex-col justify-around text-gray-500">
              <p class="mb-2">
                {{ purchase?.time }}
              </p>
              <p class="mb-2">
                {{ formatStatus(purchase?.status) }}
              </p>
            </div>
            <div class="w-1/2">
              <div class="mb-1 flex justify-between text-sm">
                <div>ราคาสินค้า</div>
                <div>฿ {{ purchase?.price }}</div>
              </div>
              <div class="mb-1 flex justify-between text-sm">
                <div>ค่าส่ง</div>
                <div>฿ {{ purchase?.deliveryFee }}</div>
              </div>
              <div class="mb-1 flex justify-between font-semibold">
                <div>รวม</div>
                <div>
                  ฿
                  {{ purchase?.price + purchase?.deliveryFee }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex justify-end mt-2 mr-4 md:mr-0 relative items-center gap-x-3"
    >
      <button
        v-if="purchase?.status === 'ongoing'"
        class="border-[0.05rem] border-primary px-2 py-1 text-sm md:text-xl md:px-4 md:py-2 rounded-lg text-primary hover:bg-primary hover:text-white duration-500"
        @click="handleConfirm(purchase?._id)"
      >
        ยืนยันได้รับสินค้า
      </button>
      <!-- <button
                class="border-[0.05rem] border-primary px-2 py-1 text-sm md:text-xl md:px-4 md:py-2 rounded-lg text-primary"
                @click="reviewShop"
            >
                ดูรีวิว
            </button> -->
      <div v-if="purchase?.status === 'complete'">
        <review-modal
          :shop="purchase?.shop"
          :history-id="purchase?._id"
          :review="purchase?.review"
          :shop-name="purchase?.shop?.username"
        />
      </div>
    </div>

    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
  </div>
</template>

<script>
import { useProfileStore } from "@/store/profile.store.js";
import ReviewModal from "@/components/Profile/Purchase/Review/index.vue";
import { formatDate, formatStatus } from "@/common/js/utils.js";
import { ref } from "vue";
import axios from "axios";

export default {
  components: { ReviewModal },
  setup() {
    const purchases = ref([]);

    const fetchMyPurchase = () => {
      axios
        .get("/history/get-my-purchase")
        .then((response) => {
          console.log(response.data);
          purchases.value = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchMyPurchase();

    return { purchases, fetchMyPurchase };
  },

  methods: {
    formatStatus,
    formatDate,
    handleConfirm(historyId) {
      console.log("confirm", historyId);
      axios
        .put(`/history/update-to-complete/${historyId}`)
        .then((response) => {
          this.fetchMyPurchase();
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
