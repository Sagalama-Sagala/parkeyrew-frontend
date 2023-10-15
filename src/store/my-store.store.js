import { defineStore } from "pinia";
import axios from "axios";

export const useMyStoreStore = defineStore("mystore", {
  state: () => ({
    mystore: null,
    isPopupFormModal: false,
  }),
  actions: {
    async fetchMyStore() {
      axios
        .get("/user/get-user-page-by-id")
        .then((response) => {
          this.mystore = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    togglePopupForm() {
      this.isPopupFormModal = !this.isPopupFormModal;
    },
  },
  persist: true,
});
