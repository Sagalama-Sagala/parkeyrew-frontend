<template>
  <div class="bg-primary min-h-screen min-w-full pt-16">
    <div class="flex flex-wrap p-10 gap-5 md:justify-start justify-center">
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
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard/index.vue";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        {
          id: "a0000001",
          recommended: true,
          title: "ขยะ",
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
      ],
    };
  },
};
</script>
