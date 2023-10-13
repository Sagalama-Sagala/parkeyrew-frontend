<template>
  <div class="min-h-screen flex flex-col min-w-full">
    <div class="bg-primary text-white flex flex-col items-center justify-center w-full mt-2 md:h-[36rem] h-[48rem] md:pt-0 pt-8">
      <div class="bg-secondary text-black flex flex-col md:gap-6 gap-16 items-center justify-center md:w-[48rem] w-[16rem] md:h-[24rem] h-full mt-12 md:pb-0 pb-8 rounded-[3rem] shadow-[15.0px_15.0px_0.0px_rgba(0,0,0,0.18)] text-lg">
        <div class="flex md:flex-row flex-col justify-between items-center md:w-[36rem] h-[4rem] md:pt-0 pt-8">
          <div>
            <img class="h-[7rem] rounded-full mb-4" :src=profileURL alt="profile picture">
          </div>
          <div class="flex flex-col justify-center w-[12rem] md:pt-0 pt-4">
            <div>
              <b>{{ username }}</b>
            </div>
            <div class="md:pt-0 pt-3">
              <Rating :rating="reviewStar"/>
            </div>
          </div>
          <div class="flex flex-col">
            <div>
              <img class="w-[3rem] rounded-2xl mb-2 hover:cursor-pointer md:block hidden" :src=editIcon alt="edit profile icon">
            </div>
            <div>
              <img class="w-[3rem] rounded-2xl mb-3 hover:cursor-pointer md:block hidden" :src=shareIcon alt="share icon">
            </div>
          </div>
        </div>
        <div class="md:text-lg text-sm flex flex-row justify-center items-center md:w-[36rem] md:h-[4rem] h-[2rem] md:border-b-2 md:border-t-2 border-black md:gap-10 gap-5 md:pb-6 md:pt-6 pt-[8.5rem]">
          <div>
            <b>{{ follower }}  ผู้ติดตาม</b>
          </div>
          |
          <div>
            <b>{{ following }}  กำลังติดตาม</b>
          </div>
        </div>
        <div class="flex flex-col md:text-lg text-sm md:w-[32rem] w-[12rem] md:h-[4rem] h-[8rem] mb-8 pb-12">
          <b>คำอธิบาย</b>
          <div>{{ description }}</div>
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-5 text-black text-xl items-center justify-center md:space-x-5 md:w-[46rem] mt-6 pb-6">
        <div class="bg-secondary flex items-center justify-center md:w-[22rem] w-[14rem] h-12 rounded-[1rem] hover:cursor-pointer" @click="routeTomyStore()"><h1><b>ร้านค้า</b></h1></div>
        <div class="bg-tertiary flex items-center justify-center md:w-[22rem] w-[14rem] h-12 rounded-[1rem] hover:cursor-pointer" @click="routeToReview()"><h1><b>รีวิว</b></h1></div>
      </div>
    </div>
    <div class="text-black flex flex-col w-full items-center justify-center pt-2 text-lg">
      <div v-for="(item, index) in review" class="flex md:flex-row flex-col md:w-[40rem] w-[18rem] items-center justify-start border-b-2 border-black gap-5 pl-5 py-1 pr-5">
        <img alt="user profile" :src="item.profileURL" class="rounded-full w-[5.5rem] h-[5.5rem]">
        <div class="flex flex-col md:w-[24rem] w-full gap-2">
          <div class="flex flex-row md:w-[24rem] w-full justify-start gap-20 text-[#707070]">
            <b class="text-black md:w-[10rem] w-full">{{ item.username }}</b>
            <div class="md:block hidden">{{ item.reviewDate }} </div> 
          </div>
          {{ item.description }}
        </div>
        <Rating :rating="item.reviewStar"/>
      </div>
    </div>
  </div>
</template>

<script >
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";
import {editIcon, shareIcon } from "@/assets/mystore";

export default{
  components: {
    ProductCard,
    Rating,
  },
  data(){
    return{
      editIcon,
      shareIcon,
      profileURL: "https://cdn.discordapp.com/attachments/968217024440455258/1161369443323093004/Cat.jpg?ex=65380c94&is=65259794&hm=aa9ff31c401b4cb5e6c9bb1a64478eafb111b0f00735dc487627d8f288c222d0&",
      username: "HARIBO Goldbears",
      reviewStar: 4,
      follower: 29,
      following: 9,
      description: "สวัสดีครับ ท่านสมาชิกชมรมคนชอบ🐻 วันพระวันเจ้าไม่เว้นกันเลยอยากจะดูแต่🐻 ไม่เข้าใจจริงๆเลยทั้งเด็กทั้งผู้ใหญ่ตะโกนหาสรรหาแต่🐻 เป็นอะไรกัน! เฮ้ยย ",
      review: [
        {
          profileURL: "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
          username: "หน้าม้าที่ 1",
          reviewStar: 4.5,
          reviewDate: "30 สิงหาคม 2023",
          description: "เจ๋งครับพรี่"
        },
        {
          profileURL: "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
          username: "หน้าม้าที่ 2",
          reviewStar: 4,
          reviewDate: "1 กันยายน 2023",
          description: "เจ๋งครับพรี่ เจ๋งครับพรี่ เจ๋งครับพรี่"
        },
        {
          profileURL: "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
          username: "หน้าม้าที่ 3",
          reviewStar: 4.5,
          reviewDate: "10 กันยายน 2023",
          description: "เสื้อสวยมาก"
        },
      ],
    }
  },
  methods : {
    routeTomyStore(){
      this.$router.push(`/mystore/store`)
    },
    routeToReview(){
      this.$router.push(`/mystore/review`)
    },
  }
}
</script>
