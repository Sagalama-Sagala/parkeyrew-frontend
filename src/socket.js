import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

const URL = "http://localhost:3000";

export const socket = io(URL, {
  extraHeaders: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlkIjoiNjRkYzlmY2QzZmUwMjM2ODM5YjkyMzYwIiwiaWF0IjoxNjk1NzU0NTk3LCJleHAiOjE2OTYwMTM3OTd9.ibFuxIzFjng6iAyKuz7EHCIt3JGshlcmFY0By6sZ-n4",
  },
});

socket.on("connect", () => {
  state.connected = true;
});
