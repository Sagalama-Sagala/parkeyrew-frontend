<template>
  <div class="relative">
    <img :src="cover" alt="cover" class="w-full h-auto" />
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center space-y-2">
        <h1 class="text-white text-2xl">ผ้าขี้ริ้วห่อทอง ผ้ามือสองห่อใจ</h1>
        <div class="relative">
          <input
            type="text"
            class="bg-transparent border-[1px] border-white h-10 rounded-xl w-full pr-9 pl-3 text-white focus:outline-none"
            v-model="searchInput"
          />
          <span
            class="absolute right-3 top-3 h-full cursor-pointer"
            @click="handleSearch"
          >
            <img :src="search" alt="search" class="w-4" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cover, search } from "@/assets/home";
export default {
  setup() {},
  methods: {
    handleSearch() {
      console.log("Search... ", this.searchInput);
    },
  },
  data() {
    return {
      cover: cover,
      search: search,
      searchInput: null,
    };
  },
};
</script>
