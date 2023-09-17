<template>
    <div class="flex">
      <img
        v-for="index in 5"
        :key="index"
        :src="getStarImage(index)"
        class="w-5"
      />
    </div>
  </template>
  
  <script>
  import { Star, Starfilled, Starhalffilled } from "@/assets/product-card";
  
  export default {
    props: {
      rating: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      getStarImage() {
        return (index) => {
          const fullStars = Math.floor(this.rating);
          const halfStar = this.rating % 1 >= 0.5;
          if (index <= fullStars) {
            return Starfilled;
          } else if (halfStar && index === fullStars + 1) {
            return Starhalffilled;
          } else {
            return Star;
          }
        };
      },
    },
  };
  </script>
  

  