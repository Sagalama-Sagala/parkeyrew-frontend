import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chatRoom: {},
  }),
  actions: {
    setChatRoom(chatRoom) {
      this.chatRoom = chatRoom;
    },
    clearChatRoom() {
      this.chatRoom = {};
    },
  },
  persist: true,
});
