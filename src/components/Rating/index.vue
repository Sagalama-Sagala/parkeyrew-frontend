<template>
  <div class="flex">
    <img
      v-for="index in 5"
      :key="index"
      :src="getStarImage(index)"
      class="md:w-5 w-3"
      :class="{ ' hover:translate-y-[-0.15rem] duration-75': clickable }"
      @click="handleStarCick(index)"
    />
  </div>
</template>

<script>
import { star, starfilled, starhalffilled } from "@/assets/product_card";

export default {
  props: {
    rating: {
      type: Number,
      default: 0,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getStarImage() {
      return (index) => {
        const fullStars = Math.floor(this.rating);
        const halfStar = this.rating % 1 >= 0.5;
        if (index <= fullStars) {
          return starfilled;
        } else if (halfStar && index === fullStars + 1) {
          return starhalffilled;
        } else {
          return star;
        }
      };
    },
  },
  methods: {
    handleStarCick(index) {
      this.$emit("childButtonClick", index);
    },
  },
};
</script>
