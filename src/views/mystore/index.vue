<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-primary text-white flex flex-col items-center justify-center w-full md:h-[38rem]">
      <div class="bg-secondary text-black flex items-center justify-center w-[60rem] h-[24rem] mt-12 rounded-[3rem] shadow-[15.0px_15.0px_0.0px_rgba(0,0,0,0.18)]">
        User Block
      </div>
      <div class="flex text-black items-center justify-center space-x-5 w-1/2 mt-6">
        <div class="bg-tertiary flex items-center justify-center w-1/2 h-12 text-xl rounded-[1rem]"><h1><b>ร้านค้า</b></h1></div>
        <div class="bg-secondary flex items-center justify-center w-1/2 h-12 text-xl rounded-[1rem]"><h1><b>รีวิว</b></h1></div>
      </div>
    </div>
    <div class="bg-secondary text-black flex flex-col flex-1 h-full items-center ">
      <div class="bg-secondary text-primary border-primary flex items-center justify-center w-40 h-8 mt-5 text-lg border-2 rounded-md">
        <h1>+ ลงขายสินค้า</h1>
      </div>
      <!-- <div>
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
      </div> -->
    </div>
  </div>
</template>

<script >
import ProductCard from "@/components/ProductCard/index.vue";

export default{
  components: {
    ProductCard,
  },
  data(){
    return{
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
    }
  }
}
</script>
