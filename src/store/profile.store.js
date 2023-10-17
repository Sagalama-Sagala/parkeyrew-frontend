import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    focusPage: "record",
    profile: null,
    addr: [],
    purchase: [],
    sales: [],
  }),
  actions: {
    async fetchMyProfile() {
      try {
        const res = await axios({
          url: "/user/get-profile-account-user",
          method: "GET",
        });

        console.log(res.data);
        this.profile = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMyAddress() {
      try {
        const res = await axios({
          url: "/address/get-address-by-userId",
          method: "GET",
        });
        // {"message": "test"} -> ["message"]
        // Object.values(res.data) -> ["test"]
        // []
        if (Object.getOwnPropertyNames(res.data).length > 0) {
          // console.log(Object.getOwnPropertyNames(res.data).length);
          this.addr = [res.data?.mainAddress, ...res.data?.Addresses];
        } else {
          this.addr = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMyPurchase() {
      try {
        const res = await axios({
          url: "/history/get-my-purchase",
          method: "GET",
        });

        if (res.data) {
          this.purchase = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMySales() {
      try {
        const res = await axios({
          url: "/history/get-my-sale",
          method: "GET",
        });

        if (res.data) {
          this.sales = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
