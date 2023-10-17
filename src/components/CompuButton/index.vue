<template>
  <button :class="class" @click="onClick" :disable="true">
    <img v-if="loading" class="animate-spin h-5 w-5" :src="loadingSVG" />
    <p v-else>{{ text }}</p>
  </button>
</template>

<script>
import { loadingSVG } from "@/assets/buttons";
export default {
  props: {
    loading: false,
    class: "",
    text: "",
    onClick: {
      type: Function,
    },
  },
  setup() {},
  data() {
    return { loadingSVG };
  },
};
</script>
