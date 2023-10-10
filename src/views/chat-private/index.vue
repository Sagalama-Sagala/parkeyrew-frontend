<template>
  <Container
    ><div>
      {{ this.$route.params.id }}
      <p>State: {{ connected }}</p>
    </div>
    <!-- <div v-for="(item, index) in messages" :key="item"> -->
    <!--   {{ item }} -->
    <!-- </div> -->
    <div v-for="(item, index) in chats" :key="item">
      {{ item }}
    </div>
    <input class="border-black bg-gray-200" v-model="chatInput" />
    <div>
      <button @click="handleSubmitNewMessage">send</button>
    </div>
    <button
      class="border-black bg-blue-300 w-fit p-2 rounded"
      @click="createChatRoom()"
    >
      create room
    </button>
  </Container>
</template>

<script>
import Container from "@/components/ChatContainer/index.vue";
import { state, socket } from "@/socket";
import { ref } from "vue";

export default {
  setup() {
    const chats = ref([]);

    socket.on("message", (message) => {
      chats.value.push(message);
      console.log(chats);
    });

    const createChatRoom = () => {
      console.log("... on create");
      socket.emit("createRoom", {
        name: "test1",
        description: "this chat is test1",
        users: [],
      });
    };

    return { chats, createChatRoom };
  },
  computed: {
    connected() {
      return state.connected;
    },
  },
  methods: {
    handleSubmitNewMessage() {
      console.log(this.chatInput);
      socket.emit("message", this.chatInput);
    },
    connect() {
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    },
  },
  components: {
    Container,
  },
  data() {
    return {
      chatInput: "",
    };
  },
};
</script>
