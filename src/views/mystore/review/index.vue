<template>
  <div
    class="text-black flex flex-col w-full items-center justify-center pt-2 text-lg"
  >
    <div
      v-for="(item, index) in review"
      class="flex md:flex-row flex-col md:w-[40rem] w-[18rem] items-center justify-start border-b-2 border-black gap-5 pl-5 py-1 pr-5"
    >
      <img
        alt="user profile"
        :src="item.profileURL"
        class="rounded-full w-[5.5rem] h-[5.5rem]"
      />
      <div class="flex flex-col md:w-[24rem] w-full gap-2">
        <div
          class="flex flex-row md:w-[24rem] w-full justify-start gap-20 text-[#707070]"
        >
          <b class="text-black md:w-[10rem] w-full">{{ item.username }}</b>
          <div class="md:block hidden">{{ item.reviewDate }}</div>
        </div>
        {{ item.description }}
      </div>
      <Rating :rating="item.reviewStar" />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard/index.vue";
import Rating from "@/components/Rating/index.vue";
import { editIcon, shareIcon } from "@/assets/mystore";

export default {
  components: {
    ProductCard,
    Rating,
  },
  data() {
    return {
      editIcon,
      shareIcon,
      profileURL:
        "https://cdn.discordapp.com/attachments/968217024440455258/1161369443323093004/Cat.jpg?ex=65380c94&is=65259794&hm=aa9ff31c401b4cb5e6c9bb1a64478eafb111b0f00735dc487627d8f288c222d0&",
      username: "HARIBO Goldbears",
      reviewStar: 4,
      follower: 29,
      following: 9,
      description:
        "สวัสดีครับ ท่านสมาชิกชมรมคนชอบ🐻 วันพระวันเจ้าไม่เว้นกันเลยอยากจะดูแต่🐻 ไม่เข้าใจจริงๆเลยทั้งเด็กทั้งผู้ใหญ่ตะโกนหาสรรหาแต่🐻 เป็นอะไรกัน! เฮ้ยย ",
      review: [
        {
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
          username: "หน้าม้าที่ 1",
          reviewStar: 4.5,
          reviewDate: "30 สิงหาคม 2023",
          description: "เจ๋งครับพรี่",
        },
        {
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
          username: "หน้าม้าที่ 2",
          reviewStar: 4,
          reviewDate: "1 กันยายน 2023",
          description: "เจ๋งครับพรี่ เจ๋งครับพรี่ เจ๋งครับพรี่",
        },
        {
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
          username: "หน้าม้าที่ 3",
          reviewStar: 4.5,
          reviewDate: "10 กันยายน 2023",
          description: "เสื้อสวยมาก",
        },
      ],
    };
  },
  methods: {
    routeTomyStore() {
      this.$router.push(`/mystore/store`);
    },
    routeToReview() {
      this.$router.push(`/mystore/review`);
    },
  },
};
</script>
