import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        focusPage: "record",
        profile: null,
        addr: [],
    }),
    actions: {
        async fetchMyProfile() {
            try {
                const res = await axios({
                    url: "/user/get-profile-account-user",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
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
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                console.log(res.data);
                this.addr = [res.data?.mainAddress, ...res.data?.Addresses];
            } catch (error) {
                console.log(error);
            }
        },
    },
    persist: true,
});

