import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        focusPage: "record",
    }),
    actions: {
        setPage(page) {
            this.focusPage = page;
        },
    },
    persist: true,
});

