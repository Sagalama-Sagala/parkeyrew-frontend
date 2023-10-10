<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-primary text-white flex flex-col items-center justify-center w-full mt-2 md:h-[36rem]">
      <div class="bg-secondary text-black flex flex-col gap-6 items-center justify-center w-[48rem] h-[24rem] mt-12 rounded-[3rem] shadow-[15.0px_15.0px_0.0px_rgba(0,0,0,0.18)] text-lg">
        <div class="flex flex-row justify-between items-center w-[36rem] h-[4rem]">
          <div>
            <img class="h-[7rem] rounded-full mb-4" src="https://cdn.discordapp.com/attachments/968217024440455258/1161369443323093004/Cat.jpg?ex=65380c94&is=65259794&hm=aa9ff31c401b4cb5e6c9bb1a64478eafb111b0f00735dc487627d8f288c222d0&" alt="profile picture">
          </div>
          <div class="flex flex-col justify-center w-[12rem]">
            <div>
              <b>{{ username }}</b>
            </div>
            <div>
              Star Rating
            </div>
          </div>
          <div class="flex flex-col">
            <div @click="increaseFollowing">
              <img class="w-[3rem] border-2 border-gray-400 rounded-2xl mb-2" src="https://cdn.discordapp.com/attachments/968217024440455258/1161330054744252536/edit-svgrepo-com.png?ex=6537e7e5&is=652572e5&hm=85dcc419e180f775aa0c9861ac725c92523e960e7df8a6fad7d3cb6bc2fd5393&" alt="edit profile icon">
            </div>
            <div>
              <img class="w-[3rem] border-2 border-gray-400 rounded-2xl mb-3" src="https://cdn.discordapp.com/attachments/968217024440455258/1161331860752834671/share-svgrepo-com.png?ex=6537e994&is=65257494&hm=efaf9991467e9b9501382d33078bd0c9a42ff0a3b89e2477d587a0e0fd6e9673&" alt="share icon">
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-center items-center w-[36rem] h-[4rem] border-b-2 border-t-2 border-black gap-10 pb-6 pt-6">
          <div>
            <b>{{ follower }}  ผู้ติดตาม</b>
          </div>
          |
          <div>
            <b>{{ following }}  กำลังติดตาม</b>
          </div>
        </div>
        <div class="flex flex-col w-[32rem] h-[4rem] mb-8">
          <b>คำอธิบาย</b>
          <div>{{ description }}</div>
        </div>
      </div>
      <div class="flex text-black items-center justify-center space-x-5 w-1/2 mt-6">
        <div class="bg-tertiary flex items-center justify-center w-1/2 h-12 text-xl rounded-[1rem]"><h1><b>ร้านค้า</b></h1></div>
        <div class="bg-secondary flex items-center justify-center w-1/2 h-12 text-xl rounded-[1rem]"><h1><b>รีวิว</b></h1></div>
      </div>
    </div>
    <div class="bg-secondary text-black flex flex-col flex-1 h-full items-center">
      <div class="text-primary border-primary active:text-secondary active:bg-primary flex items-center justify-center w-40 h-8 mt-5 text-lg border-2 rounded-md hover:cursor-pointer">
        <h1>+ ลงขายสินค้า</h1>
      </div>
      <div class="bg-secondary flex-1 flex flex-col w-full mt-6 ml-44 overflow-y-auto">
        <div class="flex flex-wrap w-full gap-5 justify-start">
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
      username : "HARIBO Goldbears",
      follower : 29,
      following : 9,
      description : "สวัสดีครับ ท่านสมาชิกชมรมคนชอบ🐻 วันพระวันเจ้าไม่เว้นกันเลยอยากจะดูแต่🐻 ไม่เข้าใจจริงๆเลยทั้งเด็กทั้งผู้ใหญ่ตะโกนหาสรรหาแต่🐻 เป็นอะไรกัน! เฮ้ยย ",
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
  },
  methods : {
    decreaseFollowing(){
      this.following--;
    },
    increaseFollowing(){
      this.following++;
    }
  }
}
</script>
