import { defineStore } from "pinia";
import axios from "axios";

export const useOtherStoreStore = defineStore("otherstore", {
  state: () => ({
    otherStore: null,
    isPopupFormModal: false,
  }),
  actions: {
    async fetchOtherStore() {
      // axios
      //   .get("/user/get-user-page-by-id")
      //   .then((response) => {
      //     this.mystore = response.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    togglePopupForm() {
      this.isPopupFormModal = !this.isPopupFormModal;
    },
  },
  persist: true,
});
