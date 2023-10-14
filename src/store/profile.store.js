import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    focusPage: "record",
    profile: null,
  }),
  actions: {
    async fetchMyProfile() {
      try {
        const res = await axios({
          url: "/user/get-profile-account-user",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        this.profile = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
