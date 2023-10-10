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
              <img
                v-if="productData.isRecommend"
                :src="recommend"
                class="w-[4rem] absolute top-0 right-3"
              />
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
            <h1>สถิติการเข้าดู : {{ productData.viewCount }}</h1>
            <h1>มีคนถูกใจสินค้า : {{ productData.likeCount }}</h1>
          </div>
        </div>

        <div class="w-[30rem] flex flex-col md:gap-12 gap-7">
          <div class="flex justify-between md:flex-row flex-col">
            <div
              class="flex flex-row md:flex-col md:justify-end justify-between md:text-[1.5rem] font-bold"
            >
              <h1>ชื่อ : {{ productData.name }}</h1>
              <h1>ราคา : {{ productData.price }} บาท</h1>
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
                />
              </div>
              <span>สินค้าคงเหลือ: {{ productData.remain }}</span>
            </div>
          </div>

          <div>
            <p>รายละเอียดสินค้า</p>
            <p class="text-[1.1rem] font-light">{{ productData.description }}</p>
          </div>

          <div class="flex justify-between gap-20">
            <div class="flex gap-4 md:font-bold">
              <div>
                <h1>แบรนด์</h1>
                <h1>สี</h1>
                <h1>สภาพ</h1>
                <h1>ไซส์</h1>
              </div>
              <div class="md:font-normal font-light">
                <h1>{{ productData.brand }}</h1>
                <h1>{{ productData.color }}</h1>
                <h1>{{ productData.condition }}</h1>
                <h1>{{ productData.size }}</h1>
              </div>
            </div>

            <div class="flex gap-4 md:font-bold">
              <div>
                <h1>หมวดหมู่</h1>
                <h1 class="whitespace-nowrap">ลงขายเมื่อ</h1>
                <h1>ส่งจาก</h1>
              </div>
              <div class="md:font-normal font-light overflow-hidden">
                <h1>{{ productData.category}}</h1>
                <h1 class="whitespace-nowrap ">{{ productData.createdAt.split('T')[0] }}</h1>
                <h1>{{ productData.sendFrom }}</h1>
              </div>
            </div>
          </div>

          <div
            class="flex items-center border-[1px] border-[#111111] px-3 rounded-2xl h-[5rem] gap-3 justify-between"
          >
            <div class="flex items-center gap-4">
              <img
                :src="productData.sellerImage"
                class="hover:bg-secondary hover:cursor-pointer w-[4rem] h-[4rem] rounded-full object-cover border-4"
              />
              <div>
                <h1 class="hover:underline hover:cursor-pointer">
                  {{ sellerData.username }}
                </h1>
                <Rating
                  :rating="sellerData.reviewStar"
                  @childButtonClick="greet"
                  :clickable="true"
                />
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="flex border-[1px] border-[#393838] md:border-black w-[4rem] md:w-[6rem] h-[4rem] rounded-full md:rounded-xl justify-center items-center gap-2 hover:bg-secondary hover:cursor-pointer"
              >
                <img :src="call" class="w-7" />
                <h1 class="hidden md:block">แชท</h1>
              </div>

              <div
                class="flex border-[1px] border-[#393838] md:border-black w-[4rem] md:w-[6rem] h-[4rem] rounded-full md:rounded-xl justify-center items-center gap-2 hover:bg-secondary hover:cursor-pointer"
              >
                <img :src="chat" class="w-[1.5rem]" @click="test" />
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
          @sellerClick="greet(item.title)"
          @click=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import { shareArrow, heart, chat, call } from "@/assets/product";
import { recommend } from "@/assets/product_card";
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";

import { T1, T2, T3, T4 } from "@/assets/TestImage";

export default {
  components: {
    ProductCard,
    Rating,
  },
  methods: {
    updateSelectedImage(index) {
      this.selectedImageIndex = index;
    },
    greet(sellerNAme) {
      console.log(`you click ${sellerNAme}`);
    },
    test()
    {
      console.log(this.sellerData);
    }
  },
  beforeMount() {
    axios
      .get(`/product/get-info-product-page/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.sellerData = {username: response.data.username, reviewStar:response.data.reviewStar};
        this.productData = response.data.product;
        this.products = response.data.productsOfUser.map((item) => ({id:item._id, recommend:true,title:item.name,price:item.price,productImage:item.image,rating:this.sellderData.reviewStar,sellerImage:item.sellerImage,liked:true,tags:[{id:0,label:item.color},{id:1,label:item.size},{id:2,label:item.condition},{id:0,label:item.brand}]}));
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      shareArrow,
      heart,
      recommend,
      chat,
      call,
      selectedImageIndex: 0,
      baseURL: "http://localhost:5173/product/a0000002",
      ProductImage: [T1, T2, T3, T4, call, chat, heart],
      sellderData: {},
      productData: {},
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
      ],
    };
  },
};
</script>
