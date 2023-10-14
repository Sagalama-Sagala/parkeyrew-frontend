<template>
  <div class="bg-primary min-h-screen min-w-full pt-16">
    <div class="flex flex-wrap p-10 gap-5 md:justify-start justify-center">
      <ProductCard
        v-for="(item, index) in productStore.wishList?.wishList"
        :id="item._id"
        :key="item.title"
        :is-recommended="item.recommended"
        :item-name="item.name"
        :item-price="item.price"
        :item-image="item.productImage"
        :rating="item.owner.reviewStar"
        :seller-image="item.sellerImage"
        :seller-name="item.owner.username"
        :liked="true"
        :color="item.color"
        :size="item.size"
        :brand="item.brand"
        :condition="item.condition"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard/index.vue";
import { ref } from "vue";
import axios from "axios";
import { useProductStore } from "@/store/product.store.js";

export default {
  setup() {
    const productStore = useProductStore();

    productStore.fetchWishList();

    return { productStore };
  },
  components: {
    ProductCard,
  },
};
</script>
