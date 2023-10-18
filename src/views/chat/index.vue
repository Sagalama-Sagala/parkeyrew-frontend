<template>
  <Container>
    <!-- chat menu -->
    <div class="md:px-24 px-4 pt-7 pb-20">
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
        <div v-for="(item, index) in chatRooms" :key="index">
          <div
            @click="handleChatPrivate(item)"
            class="flex justify-between items-start border-b-[1px] border-black md:text-lg text-sm py-1 cursor-pointer overflow-y-auto"
          >
            <div class="flex justify-center items-start gap-x-2">
              <img
                :src="item.otherUser?.user?.profileImage"
                :alt="item.roomId"
                class="md:w-20 md:h-20 w-12 h-12 rounded-full border-[2px] border-[#D9D9D9]"
              />
              <div class="h-full md:py-3">
                <h2 class="font-semibold">
                  {{ item.otherUser?.user?.username }}
                </h2>
                <h3 class="font-light">
                  {{ item.lastMessage?.user?.username }}
                  <span v-if="item.lastMessage" class="px-1 text-lg">:</span>
                  {{
                    item.lastMessage?.text
                      ? formatMessage(
                          item.lastMessage.text == ""
                            ? "image..."
                            : item.lastMessage?.text,
                        )
                      : ""
                  }}
                </h3>
              </div>
            </div>
            <div class="h-full py-2 flex-col flex justify-end items-end">
              <h2 class="font-semibold">
                {{ item.otherUser.role === "seller" ? "ผู้ขาย" : "ผู้ซื้อ" }}
              </h2>
              <div
                v-if="
                  item.lastMessage &&
                  !item.lastMessage?.otherUserRead &&
                  item.user?.user?.username !== item.lastMessage?.user?.username
                "
                class="pr-3 text-center"
              >
                <img
                  :src="noti"
                  :alt="item.roomId"
                  class="md:w-[18px] md:h-[18px] w-[12px] h-[12px]"
                />
              </div>
            </div>
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
import { ref } from "vue";
import axios from "axios";

import { getLocal } from "@/common/js/utils.js";
import { io } from "socket.io-client";
import { useChatStore } from "@/store/chat.store.js";
import { formatMessage } from "@/common/js/utils.js";

export default {
  setup() {
    const chatRooms = ref([]);
    const chatStore = useChatStore();

    socket.emit("getRooms");

    socket.on("rooms", (response) => {
      console.log(response);
      chatRooms.value = response;
    });

    return { chatRooms, chatStore };
  },
  components: {
    Container,
  },
  methods: {
    handleSellerChat() {},
    handleCustomerChat() {},
    handleChatMenu(menuIndex) {
      this.chatMenu.forEach((item, index) => {
        item.isActive = index === menuIndex;
      });
      if (menuIndex === 0) {
        socket.emit("getRooms");
      } else if (menuIndex === 1) {
        socket.emit("getSellerRooms");
      } else if (menuIndex === 2) {
        socket.emit("getCustomerRooms");
      }
    },
    handleChatPrivate(room) {
      this.chatStore.setChatRoom(room);
      console.log(room.id);
      this.$router.push(`chat/${room.id}`);
    },
    formatMessage,
  },
  data() {
    return {
      chatMenu: [
        { title: "แชททั้งหมด", isActive: true },
        { title: "แชทกับผู้ขาย", isActive: false },
        { title: "แชทกับผู้ซื้อ", isActive: false },
      ],
      profile,
      noti,
    };
  },
};
</script>
