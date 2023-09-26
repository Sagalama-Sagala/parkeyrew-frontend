<template>
  <Container
    ><div>
      {{ this.$route.params.id }}
      <p>State: {{ connected }}</p>
    </div>
    <div v-for="(item, index) in messages" :key="item">
      {{ item }}
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

    socket.on("message", (message) => {
      messages.value = message;
      console.log(messages);
    });

    return { messages };
  },
  computed: {
    connected() {
      return state.connected;
    },
  },
  methods: {
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
};
</script>
