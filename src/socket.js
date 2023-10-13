import { reactive } from "vue";
import { io } from "socket.io-client";
import { getLocal } from "@/common/js/utils.js";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: [],
});

const URL = import.meta.env.VITE_APP_API || "http://localhost:3000";

export const socket = io(URL, {
    extraHeaders: {
        Authorization: getLocal("token"),
    },
});

