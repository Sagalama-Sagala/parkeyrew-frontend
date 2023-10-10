<template>
  <Container>
    <!-- chat menu -->
    <div>
      <ul class="flex justify-between items-center pb-4">
        <li
          v-for="(item, index) in chatMenu"
          :key="item.title"
          class="md:text-lg text-sm font-semibold cursor-pointer transition-all ease-in-out duration-1000"
          :class="item.isActive ? 'text-black underline' : 'text-[#9c9c9c]'"
          @click="handleChatMenu(index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>

    <!-- chat box -->
    <div class="h-full overflow-y-auto">
      <div v-for="(item, index) in chatRooms" :key="item.product">
        <div
          @click="handleChatPrivate(item.roomId)"
          class="flex justify-between items-center border-b-[1px] border-black md:text-lg text-sm py-1 cursor-pointer"
        >
          <div class="flex justify-center items-center gap-x-2">
            <img
              :src="item.profileIcon"
              :alt="item.roomId"
              class="md:w-20 md:h-20 w-12 h-12"
            />
            <div class="flex flex-col justify-around items-start h-full py-2">
              <h2 class="font-semibold">{{ item.customer?.username }}</h2>
              <h3 class="font-light">{{ item.lastMessage }}</h3>
            </div>
          </div>
          <div class="flex flex-col justify-around items-end h-full py-2">
            <h2 class="font-semibold">
              {{ item.role === "seller" ? "ผู้ขาย" : "ผู้ซื้อ" }}
            </h2>
            <div v-if="item.unread" class="pr-3">
              <img
                :src="noti"
                :alt="item.roomId"
                class="md:w-[18px] md:h-[18px] w-[12px] h-[12px]"
              />
            </div>
            <div
              v-else
              class="block md:w-[18px] md:h-[18px] w-[12px] h-[12px]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import { noti, profile } from "@/assets/chat";
import Container from "@/components/ChatContainer/index.vue";
import { socket } from "@/socket";
import { ref, onBeforeMount } from "vue";

export default {
  setup() {
    const chatRooms = ref([]);

    socket.on("rooms", (response) => {
      console.log("hello");
      console.log(response);
      chatRooms.value = response;
    });

    return { chatRooms };
  },
  components: {
    Container,
  },
  methods: {
    handleChatMenu(menuIndex) {
      this.chatMenu.forEach((item, index) => {
        item.isActive = index === menuIndex;
      });
    },
    handleChatPrivate(roomId) {
      this.$router.push(`chat/${roomId}`);
    },
  },
  data() {
    return {
      chatMenu: [
        { title: "แชททั้งหมด", isActive: true },
        { title: "แชทกับผู้ขาย", isActive: false },
        { title: "แชทกับผู้ซื้อ", isActive: false },
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
      ],
      profile,
      noti,
    };
  },
};
</script>
