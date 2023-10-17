import { reactive } from "vue";
import { io } from "socket.io-client";
import { getLocal } from "@/common/js/utils.js";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: [],
});

const URL = import.meta.env.VITE_APP_SOCKET;

console.log(URL);

export const socket = io(URL, {
    extraHeaders: {
        Authorization: getLocal("token"),
    },
});

socket.on("connect", () => {
    state.connected = true;
});

