import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    wishList: null,
  }),
  actions: {
    async fetchWishList() {
      if (!this.wishList) {
        axios
          .get("/user/get-user-wishlist")
          .then((response) => {
            console.log(response);
            this.wishList = response.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  persist: true,
});
