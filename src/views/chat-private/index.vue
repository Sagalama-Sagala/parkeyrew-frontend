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
  </Container>
</template>

<script>
import Container from "@/components/ChatContainer/index.vue";
import { state, socket } from "@/socket";
import { ref } from "vue";

export default {
  setup() {
    const messages = ref([]);
    const chats = ref([]);

    socket.on("message", (message) => {
      messages.value = message;
      console.log(messages);
    });

    socket.on("chat", (message) => {
      chats.value.push(message);
      console.log(chats);
    });

    return { messages, chats };
  },
  computed: {
    connected() {
      return state.connected;
    },
  },
  methods: {
    handleSubmitNewMessage() {
      console.log(this.chatInput);
      socket.emit("chat", this.chatInput);
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
