<template>
  <div class="bg-secondary min-h-screen flex flex-col gap-2 overflow-hidden">
    <div class="bg-white text-black pt-20 flex justify-center items-center">
      <div
        class="border-b-[1px] border-b-black text-black flex md:gap-[10rem] gap-4 md:text-[1.3rem] text-[1.2rem] w-full mx-4 justify-center flex-wrap px-5 pb-3"
      >
        <div class="flex flex-col gap-5 w-[40rem]">
          <div class="flex flex-wrap gap-2 bg-[#d5d5d5] rounded-xl">
            <div class="relative">
              <img
                :src="ProductImage[selectedImageIndex]"
                class="w-[40rem] md:h-[32rem] h-[23rem] object-contain"
              />
              <img :src="recommend" class="w-[4rem] absolute top-0 right-3" />
            </div>
          </div>

          <div
            class="flex justify-start gap-3 overflow-x-auto pb-3 overflow-y-visible"
          >
            <img
              v-for="(imageUrl, index) in ProductImage"
              :key="index"
              :src="imageUrl"
              class="h-[8rem] w-[11rem] border-grey rounded-xl border-[1px] aspect-[10.5/9] object-contain bg-[#d5d5d5]"
              :class="{
                ' blur-sm border-2 border-black': selectedImageIndex === index,
              }"
              @click="updateSelectedImage(index)"
            />
          </div>

          <div class="flex justify-between mx-10">
            <h1>สถิติการเข้าดู : {{ infoProducts?.product?.viewCount }}</h1>
            <h1>มีคนถูกใจสินค้า : {{ infoProducts?.product?.likeCount }}</h1>
          </div>
        </div>

        <div class="w-[30rem] flex flex-col md:gap-12 gap-7">
          <div class="flex justify-between md:flex-row flex-col">
            <div
              class="flex flex-row md:flex-col md:justify-end justify-between md:text-[1.5rem] font-bold"
            >
              <h1>ชื่อ : {{ infoProducts?.product?.name }}</h1>
              <h1>ราคา : {{ infoProducts?.product?.price }}</h1>
            </div>

            <div
              class="flex md:flex-col md:justify-center justify-between items-center"
            >
              <div class="flex gap-2">
                <img
                  :src="heart"
                  class="border-[2px] border-grey rounded-xl flex justify-center items-center p-1 hover:bg-secondary md:w-14 w-10"
                />
                <img
                  :src="shareArrow"
                  class="border-[2px] border-grey rounded-xl flex justify-center items-center hover:bg-secondary md:w-14 w-10 p-2"
                  @click="handleModal()"
                />
              </div>
              <span>สินค้าคงเหลือ: {{ infoProducts?.product?.remain }}</span>
            </div>
          </div>

          <div>
            <p>รายละเอียดสินค้า</p>
            <p class="text-[1.1rem] font-light">
              {{ infoProducts?.product?.description }}
            </p>
          </div>

          <div class="flex flex-col md:flex-row justify-between md:gap-10">
            <div class="flex gap-4 md:font-bold">
              <div class="w-[5.5rem] md:w-auto">
                <h1>แบรนด์</h1>
                <h1>สี</h1>
                <h1>สภาพ</h1>
                <h1>ไซส์</h1>
              </div>
              <div class="md:font-normal font-light">
                <h1>{{ infoProducts?.product?.brand }}</h1>
                <h1>{{ infoProducts?.product?.color }}</h1>
                <h1>{{ infoProducts?.product?.condition }}</h1>
                <h1>{{ infoProducts?.product?.size }}</h1>
              </div>
            </div>

            <div class="flex gap-4 md:font-bold whitespace-nowrap">
              <div class="w-[5.5rem] md:w-auto">
                <h1>หมวดหมู่</h1>
                <h1>ลงขายเมื่อ</h1>
                <h1>ส่งจาก</h1>
              </div>
              <div class="md:font-normal font-light w-[6rem]">
                <h1>{{ infoProducts?.product?.category }}</h1>
                <h1>{{ formatDate(infoProducts?.product?.createdAt) }}</h1>
                <h1>{{ infoProducts?.product?.sendFrom }}</h1>
              </div>
            </div>
          </div>

          <div
            class="flex items-center border-[1px] border-[#111111] px-3 rounded-2xl h-[5rem] gap-3 justify-between"
          >
            <div class="flex items-center gap-4">
              <img
                src=""
                class="hover:bg-secondary hover:cursor-pointer w-[4rem] h-[4rem] rounded-full object-cover border-4"
              />
              <div>
                <h1 class="hover:underline hover:cursor-pointer">
                  {{ infoProducts?.product?.owner?.username }}
                </h1>
                <Rating
                  :rating="infoProducts?.product?.owner?.reviewStar"
                  @childButtonClick="greet"
                  :clickable="true"
                />
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex border-[1px] border-[#393838] md:border-black w-[4rem] md:w-[6rem] h-[4rem] rounded-full md:rounded-xl justify-center items-center gap-2 hover:bg-secondary hover:cursor-pointer"
                @click="connectChatRoom()"
              >
                <img :src="call" class="w-7" />
                <h1 class="hidden md:block">แชท</h1>
              </div>

              <div
                class="flex border-[1px] border-[#393838] md:border-black w-[4rem] md:w-[6rem] h-[4rem] rounded-full md:rounded-xl justify-center items-center gap-2 hover:bg-secondary hover:cursor-pointer"
              >
                <img :src="chat" class="w-[1.5rem]" />
                <h1 class="hidden md:blcok">โทร</h1>
              </div>
            </div>
          </div>
          <div class="flex flex-1 justify-end items-end">
            <h1 class="hover:underline hover:cursor-pointer">
              ดูร้านค้าผู้ชายคนนี้ >
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <h1>ดูร้านอื่นของผู้ขาย></h1>
    </div>
    <div class="flex overflow-x-auto pb-10">
      <div class="flex gap-x-5 mx-auto">
        <ProductCard
          v-for="(item, index) in infoProducts?.productsOfUser"
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
    </div>
    <PopupForm
      :isModalOpen="isModalOpen"
      @toggleModal="handleModal"
      :productData="infoProducts"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { formatDate } from "@/common/js/utils.js";
import { socket } from "@/socket";
import { useChatStore } from "@/store/chat.store.js";

import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";
import PopupForm from "@/components/ProductInfo/PopupForm/index.vue";

import { T1, T2, T3, T4 } from "@/assets/TestImage";
import { shareArrow, heart, chat, call } from "@/assets/product";
import { recommend } from "@/assets/product_card";

export default {
  setup() {
    const infoProducts = ref([]);
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.id;
    const chatStore = useChatStore();
    axios
      .get(`/product/get-info-product-page/${productId}`)
      .then((response) => {
        infoProducts.value = response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    const connectChatRoom = () => {
      let roomId = "";
      socket.emit("connectRoom", {
        product: infoProducts.value.product,
        seller: infoProducts.value.product.owner,
      });
      socket.on("roomId", (response) => {
        chatStore.setChatRoom(response);
        router.push(`/chat/${response.id}`);
      });
    };

    return { infoProducts, connectChatRoom };
  },
  components: {
    ProductCard,
    Rating,
    PopupForm,
  },
  methods: {
    updateSelectedImage(index) {
      this.selectedImageIndex = index;
    },
    greet(sellerNAme) {
      console.log(`you click ${sellerNAme}`);
    },
    handleLikeClick() {},
    formatDate,
    handleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
  data() {
    return {
      shareArrow,
      heart,
      recommend,
      chat,
      call,
      selectedImageIndex: 0,
      ProductImage: [T1, T2, T3, T4, call, chat, heart],
      isModalOpen: false,
    };
  },
};
</script>
