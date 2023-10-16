import { defineStore } from "pinia";
import axios from "axios";

export const useMyStoreStore = defineStore("mystore", {
  state: () => ({
    mystore: null,
    isPopupFormModal: false,
    isLoading: false,
  }),
  actions: {
    async fetchMyStore() {
      this.isLoading = true;
      axios
        .get("/user/get-user-page-by-id")
        .then((response) => {
          this.mystore = response.data;
          console.log('fetched my store')
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    togglePopupForm() {
      this.isPopupFormModal = !this.isPopupFormModal;
    },
  },
  persist: true,
});
