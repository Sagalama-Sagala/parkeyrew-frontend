<template>
  <div class="bg-secondary text-black flex flex-col flex-1 h-full items-center">
    <div
      @click="handleToggle"
      class="text-primary border-primary active:text-secondary active:bg-primary flex items-center justify-center w-40 h-8 mt-5 text-lg border-2 rounded-md hover:cursor-pointer"
    >
      <h1>+ ลงขายสินค้า</h1>
    </div>
    <div class="bg-secondary flex-1 flex flex-col w-full pt-6 overflow-y-auto">
      <div
        class="flex md:flex-row md:flex-wrap flex-col w-full gap-5 justify-start md:pl-[5.2rem]"
      >
        <ProductCard
          v-for="(item, index) in myStoreStore.mystore.products"
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
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard/index.vue";
import PopupForm from "@/components/ProductInfo/PopupForm/index.vue";
import Rating from "@/components/Rating/index.vue";
import Dialog from "@/components/Mystore/Dialog/index.vue";
import { editIcon, shareIcon } from "@/assets/mystore";
import axios from "axios";
import { useMyStoreStore } from "@/store/my-store.store.js";
import { ref } from "vue";

export default {
  setup() {
    const myStoreStore = useMyStoreStore();
    const isModalOpen = ref(false);
    return { myStoreStore, isModalOpen };
  },
  components: {
    ProductCard,
    Rating,
    Dialog,
    PopupForm,
  },
  data() {
    return {
      isModalOpen: false,
      followerDialog: false,
      followingDialog: false,
      editIcon,
      shareIcon,
      profileURL:
        "https://cdn.discordapp.com/attachments/968217024440455258/1161369443323093004/Cat.jpg?ex=65380c94&is=65259794&hm=aa9ff31c401b4cb5e6c9bb1a64478eafb111b0f00735dc487627d8f288c222d0&",
      reviewStar: 4,
      follower: 29,
      following: 9,
    };
  },
  methods: {
    openFollower() {
      this.followerDialog = true;
    },
    closeFollower() {
      this.followerDialog = false;
    },
    openFollowing() {
      this.followingDialog = true;
    },
    closeFollowing() {
      this.followingDialog = false;
    },
    handleToggle() {
      this.myStoreStore.togglePopupForm();
      console.log("toggle");
    },
    handleOk(value, resetData) {
      const newData = {
        name: value.name,
        price: value.price,
        deliveryFee: value.deliveryFee,
        description: value.description,
        brand: value.brand,
        color: value.color,
        size: value.size,
        category: value.category,
        condition: value.condition,
        sendFrom: value.sendFrom,
        remain: value.remain,
      };
      axios
        .post("product/create-product", newData, {
          headers: {
            Authorization: "Bearer " + `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          resetData();
          this.isModalOpen = false;
        })
        .catch((err) => {
          console.log(err.response.data.message);
          err.response.data.message.forEach((item) => {
            alert(item);
          });
        });

      //console.log(infoProducts)
    },
  },
};
</script>
