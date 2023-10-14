<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="fixed w-screen h-screen bg-black bg-opacity-50 z-40"></div>
    <div class="modal-dialog bg-secondary rounded-3xl shadow-lg w-[40rem] z-50">
      <div class="modal-header p-4 rounded-t-lg justify-center flex">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
      </div>
      <div class="modal-body p-16 max-h-[28rem] overflow-y-auto">
        <div v-if="title === 'ผู้ติดตาม'">
          <div
            class="flex flex-row items-center gap-5 border-b-2 border-[#727272] pt-2 pb-1"
            v-for="(item, index) in myStoreStore.mystore.follower"
          >
            <img
              alt="follower profile"
              :src="item.profileURL"
              class="w-[5.5rem] h-[5.5rem] rounded-full md:block hidden"
            />
            <b class="w-[55%]">{{ item.username }}</b>
            <div
              class="w- border-2 border-primary rounded-md p-2 text-primary bg-secondary hover:bg-primary hover:text-secondary hover:cursor-pointer max-h-[3rem] min-w-[4.5rem]"
            >
              + ติดตาม
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="flex flex-row items-center gap-5 border-b-2 border-[#727272] pt-2 pb-1"
            v-for="(item, index) in myStoreStore.mystore.following"
          >
            <img
              alt="follower profile"
              :src="item.profileURL"
              class="w-[5.5rem] h-[5.5rem] rounded-full md:block hidden"
            />
            <b class="w-[55%]">{{ item.username }}</b>
            <div
              class="w- border-2 border-primary rounded-md p-2 text-primary bg-secondary hover:bg-primary hover:text-secondary hover:cursor-pointer max-h-[3rem] min-w-[4.5rem]"
            >
              + ติดตาม
            </div>
          </div>
        </div>
        <slot></slot>
      </div>
      <div
        class="modal-footer p-4 bg-secondary rounded-b-3xl flex justify-center"
      >
        <button
          @click="closeDialog"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMyStoreStore } from "@/store/my-store.store.js";
export default {
  setup() {
    const myStoreStore = useMyStoreStore();
    return { myStoreStore };
  },
  data() {
    return {
      follower: [
        {
          id: 1,
          username: "ผู้ติดตามที่ 1",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
        {
          id: 2,
          username: "ผู้ติดตามที่ 2",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
        {
          id: 3,
          username: "ผู้ติดตามที่ 3",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
        {
          id: 4,
          username: "ผู้ติดตามที่ 4",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
        {
          id: 5,
          username: "ผู้ติดตามที่ 5",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
      ],
      following: [
        {
          id: 1,
          username: "กำลังติดตามที่ 1",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
        {
          id: 2,
          username: "กำลังติดตามที่ 2",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
        {
          id: 3,
          username: "กำลังติดตามที่ 3",
          profileURL:
            "https://cdn.discordapp.com/attachments/968217024440455258/1161677642249023569/Horse.jpg?ex=65392b9c&is=6526b69c&hm=d295d363b57b060cb03872d9e46179f055d006e55b73123d05e37b86476ef3d2&",
        },
      ],
    };
  },
  props: {
    title: String,
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
