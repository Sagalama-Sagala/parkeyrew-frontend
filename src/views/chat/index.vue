<template>
  <div
    class="bg-primary pt-24 w-screen h-screen flex justify-center pb-16 px-6"
  >
    <div
      class="bg-white w-[1114px] h-full rounded-2xl md:px-24 px-4 pt-6 pb-10"
    >
      <div>
        <ul class="flex justify-between items-center pb-4">
          <li
            v-for="(item, index) in chatMenu"
            :key="item.title"
            class="md:text-lg text-sm font-semibold"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="h-full overflow-y-auto">
        <div
          v-for="(item, index) in mockupChat"
          :key="item.roomId"
          class="flex justify-between border-b-[1px] border-black py-2 md:text-lg text-sm"
        >
          <div class="flex justify-center items-center gap-x-4">
            <img
              :src="item.profileIcon"
              :alt="item.roomId"
              class="md:w-16 md:h-16 w-12 h-12"
            />
            <div class="flex flex-col justify-around items-start h-full">
              <h2 class="font-semibold">{{ item.chatName }}</h2>
              <h3 class="font-light">{{ item.unread }}</h3>
            </div>
          </div>
          <div class="flex flex-col justify-around items-center">
            <h2 class="font-semibold">
              {{ item.role === "seller" ? "ผู้ขาย" : "ผู้ซื้อ" }}
            </h2>
            <div>O</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profile } from "@/assets/navbar";
export default {
  methods: {
    handleChatMenu() {},
  },
  data() {
    return {
      chatMenu: [
        { title: "แชททั้งหมด" },
        { title: "แชทกับผู้ขาย" },
        { title: "แชทกับผู็ซื้อ" },
      ],
      mockupChat: [
        {
          roomId: "001",
          chatName: "John1",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "002",
          chatName: "John2",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "buyer",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "003",
          chatName: "John3",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "004",
          chatName: "John4",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "005",
          chatName: "John5",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "006",
          chatName: "John6",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "buyer",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "003",
          chatName: "John3",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "004",
          chatName: "John4",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "005",
          chatName: "John5",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "seller",
          unread: true,
          profileIcon: profile,
        },
        {
          roomId: "006",
          chatName: "John6",
          lastMessage: "ปริญญาไม่มีแต่มี...นะจ๊ะ",
          role: "buyer",
          unread: true,
          profileIcon: profile,
        },
      ],
      profile,
    };
  },
};
</script>
