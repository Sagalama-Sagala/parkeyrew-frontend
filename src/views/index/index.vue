<template>
  <div class="">
    <img :src="cover" />
  </div>
</template>

<script>
import { cover } from "@/assets/home";
export default {
  setup() {},
  data() {
    return {
      cover: cover,
    };
  },
};
</script>
