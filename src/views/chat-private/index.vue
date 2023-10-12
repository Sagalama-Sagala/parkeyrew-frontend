<template>
  <Container>
    <div
      class="flex md:flex-row flex-col items-center w-full py-5 px-10 absolute top-0 z-10 bg-white border-b-black border-[1px] rounded-t-2xl"
    >
      <div
        class="flex w-full justify-between items-center text-lg font-semibold"
      >
        <button class="flex items-center gap-x-2" @click="handleBack()">
          <img :src="chevronLeft" alt="back" class="w-5" />
          <p>กลับ</p>
        </button>
        <div>{{ room.otherUser?.user?.username }}</div>
        <div>
          <img
            :src="threePointLeader"
            alt="three-point-leader"
            class="md:w-10 w-5"
          />
        </div>
      </div>
      <div
        class="md:w-fit w-full flex items-center justify-start md:justify-center gap-x-2 md:mr-16 md:border-black md:border-l-[1px] md:px-3 font-semibold md:pt-0 pt-5"
      >
        <div class="w-16">
          <img :src="defaultImg" alt="product_image" class="rounded-lg" />
        </div>
        <div class="whitespace-nowrap">
          <p>{{ room.product?.name }}</p>
          <p>฿ {{ room.product?.price }}</p>
        </div>
      </div>
    </div>
    <div
      class="w-full justify-end md:pt-32 pt-48 pb-28 text-lg font-semibold h-full overflow-auto z-0 scroll-smooth"
    >
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="w-full items-center justify-end flex gap-x-3 md:gap-x-5 border-b-[1px] first:border-t-[1px] border-[#D9D9D9] md:px-16 px-4 md:py-4 py-2"
        :class="item.user ? '' : 'flex-row-reverse'"
      >
        <p class="pt-5">{{ item.text }}</p>

        <span>
          <img :src="mockProfile" class="w-16" />
        </span>
      </div>
    </div>
    <div class="absolute bottom-0 w-full py-6 z-10 bg-white rounded-b-2xl">
      <div class="w-full flex justify-center items-center">
        <div class="flex md:w-3/5 w-full md:px-0 px-4 md:gap-x-4 gap-x-2">
          <button class="text-5xl py-0">
            <img :src="add" class="w-9 border-[1px] border-black rounded p-1" />
          </button>
          <input
            v-model="chatInput"
            class="border-[1px] border-black px-3 py-2 w-full rounded"
            placeholder="พิมพ์ข้อความของคุณ..."
          />
          <button
            class="flex items-center gap-x-2 border-black border-[1px] rounded px-4"
            @click="handleSubmitNewMessage()"
          >
            <span>
              <img :src="send" class="w-10" />
            </span>
            <p class="text-lg font-semibold">ส่ง</p>
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from "@/components/ChatContainer/index.vue";
import { state, socket } from "@/socket";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { chevronLeft, threePointLeader, send, add } from "@/assets/common";

export default {
  setup() {
    const room = ref([]);
    const messages = ref([]);
    const route = useRoute();

    socket.emit("getRoom", route.params.id);

    socket.on("room", (response) => {
      room.value = response;
    });

    socket.emit("joinRoom", route.params.id);

    socket.on("messages", (response) => {
      messages.value = response;
    });

    socket.on("message", (response) => {
      messages.value.push(response);
      console.log(response);
    });

    return { room, messages };
  },
  computed: {
    connected() {
      return state.connected;
    },
  },
  methods: {
    handleSubmitNewMessage() {
      socket.emit("addMessage", {
        roomId: this.$route.params.id,
        message: { text: this.chatInput },
      });
    },
    handleBack() {
      this.$router.push("/chat");
    },
  },
  components: {
    Container,
  },
  data() {
    return {
      chatInput: "",
      defaultImg: "https://placehold.co/200x200",
      chevronLeft,
      threePointLeader,
      send,
      add,
      mockProfile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Circle_Davys-Grey_Solid.svg/1024px-Circle_Davys-Grey_Solid.svg.png",
      mockChat: [
        { text: "hello", user: true },
        { text: "hi", user: false },
        { text: "kuayrai", user: true },
        { text: "nahee", user: false },
        { text: "yedmaa", user: true },
        { text: "toikumai", user: false },
        { text: "io10", user: true },
        { text: "fuck", user: false },
        { text: "bitch", user: true },
      ],
    };
  },
};
</script>
