import { defineStore } from "pinia";
import axios from "axios";

export const useOtherStoreStore = defineStore("otherstore", {
  state: () => ({
    otherStore: null,
    isPopupFormModal: false,
  }),
  actions: {
    async fetchOtherStore(id) {
      axios
        .get(`/user/get-shop-page-by-id/${id}`)
        .then((response) => {
          this.otherStore = response.data;
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
