<template>
  <div class="w-full flex flex-col">
    <div class="flex w-full font-light md:flex md:my-0 my-2">
      <label class="md:m-6 m-2 md:w-[40%] w-[30%]">ชื่อผู้ใช้</label>
      <input
        class="border-[0.08rem] border-black rounded-md md:my-4 px-2 w-[50%] md:w-[70%]"
        v-model="profileStore.profile.username"
      />
    </div>
    <div class="flex w-full font-light md:flex md:my-0 my-2">
      <label class="md:m-6 m-2 md:w-[40%] w-[30%]">ชื่อ</label>
      <input
        class="border-[0.08rem] border-black rounded-md md:my-4 px-2 w-[50%] md:w-[70%]"
        v-model="profileStore.profile.firstname"
      />
    </div>
    <div class="flex w-full font-light md:flex md:my-0 my-2">
      <label class="md:m-6 m-2 md:w-[40%] w-[30%]">นามสกุล</label>
      <input
        class="border-[0.08rem] border-black rounded-md md:my-4 px-2 w-[50%] md:w-[70%]"
        v-model="profileStore.profile.lastname"
      />
    </div>
    <div class="flex w-full font-light md:flex md:my-0 my-2">
      <label class="md:m-6 m-2 md:w-[40%] w-[30%]">เบอร์โทร์</label>
      <input
        class="border-[0.08rem] border-black rounded-md md:my-4 px-2 w-[50%] md:w-[70%]"
        v-model="profileStore.profile.phone"
      />
    </div>
  </div>
</template>

<script>
import { useProfileStore } from "@/store/profile.store";

export default {
  setup() {
    const profileStore = useProfileStore();
    return {
      profileStore,
    };
  },
};
</script>
