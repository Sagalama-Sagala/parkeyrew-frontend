import { defineStore } from "pinia";
import axios from "axios";

export const useOtherStoreStore = defineStore("otherstore", {
  state: () => ({
    otherStore: null,
    isPopupFormModal: false,
    isLoading: false,
  }),
  actions: {
    async fetchOtherStore(id) {
      this.isLoading = true;
      console.log("fetch other store...");
      axios
        .get(`/user/get-shop-page-by-id/${id}`)
        .then((response) => {
          this.otherStore = response.data;
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
