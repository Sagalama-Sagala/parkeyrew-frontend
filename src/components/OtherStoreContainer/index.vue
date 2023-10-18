<template>
  <Loading :isLoading="this.otherStoreStore?.isLoading" />
  <div class="flex flex-col ">
    <div
    class="bg-primary text-white flex flex-col md:items-center md:justify-center w-full md:mt-2  md:pt-0 pt-8"
    >
      <div
      class="bg-secondary mx-[3rem] text-black flex flex-col md:gap-6 gap-[1rem]  items-center justify-center px-10 md:py-[3rem] py-0 mt-[5rem] md:pb-[6rem] pb-8 rounded-[3rem] shadow-[15.0px_15.0px_0.0px_rgba(0,0,0,0.18)] text-lg"
      >
        <div
        class="flex md:flex-row flex-col justify-between items-center md:w-[36rem]  md:pt-0 pt-8 "
        >
          <div>
            <img
              class="h-[7rem] w-[7rem] rounded-full mb-4"
              :src="
                !this.otherStoreStore?.otherStore?.profileImage ||
                this.otherStoreStore?.otherStore?.profileImage === ''
                  ? 'https://placehold.co/600x400'
                  : this.otherStoreStore?.otherStore?.profileImage
              "
              alt="profile picture"
            />
          </div>
          <h1 v-if="!this.otherStoreStore?.otherStore?.isFollow"
            class="border-[1px] border-primary px-2 rounded-md hover:bg-white bg-primary hover:text-primary text-white duration-100 text-sm cursor-pointer md:hidden"
            @click="handleFollow"
          >
            ติดตาม +
          </h1>
          <h1 v-else
            class="border-[1px] border-primary text-primary px-2 rounded-md hover:bg-primary hover:text-white duration-100 text-sm cursor-pointer md:hidden"
            @click="handleUnfollow"
          >
            ยกเลิกติดตาม +
          </h1>
          <div
            class="flex flex-col justify-center w-[12rem] md:pt-0 pt-4 items-center"
          >
            <div>
              <b>{{ this.otherStoreStore?.otherStore?.username }}</b>
            </div>
            <div class="md:pt-0 pt-3">
              <Rating :rating="this.otherStoreStore?.otherStore?.reviewStar" />
            </div>
          </div>
          <div class="flex flex-col">
            <div @click="handleCopyLink">
              <img
                class="w-[3rem] rounded-2xl mb-3 hover:cursor-pointer md:block hidden"
                :src="shareIcon"
                alt="share icon"
              />
            </div>
          </div>
        </div>
        <div
          class="md:text-lg text-sm flex flex-row justify-center items-center md:w-[36rem] md:h-[4rem]  md:border-b-2 md:border-t-2 border-black md:gap-10 gap-5 md:pb-6 md:pt-6 pt-3"
        >
          <div class="flex w-[50%] justify-end">
            <div class="hover:cursor-pointer" @click="openFollower">
              <b
                >{{
                  this.otherStoreStore?.otherStore?.follower.length
                }}
                ผู้ติดตาม</b
              >
            </div>
            <Dialog
              v-if="followerDialog"
              @close="closeFollower"
              title="ผู้ติดตาม"
              :isMyStore="false"
            >
            </Dialog>
          </div>
          |
          <div class="flex items-center w-[50%] justify-between flex-nowrap">
            <div class="hover:cursor-pointer" @click="openFollowing">
              <b class="whitespace-nowrap"
                >{{
                  this.otherStoreStore?.otherStore?.following.length
                }}
                กำลังติดตาม</b
              >
            </div>
            <Dialog
              v-if="followingDialog"
              @close="closeFollowing"
              title="กำลังติดตาม"
              :isMyStore="false"
            />
            <h1
              v-if="!this.otherStoreStore?.otherStore?.isFollow"
              class="border-[1px] border-primary px-2 rounded-md hover:bg-white bg-primary hover:text-primary text-white duration-100 text-sm cursor-pointer hidden md:block"
              @click="handleFollow"
            >
              ติดตาม +
            </h1>
            <h1
              v-else
              class="border-[1px] border-primary text-primary px-2 rounded-md hover:bg-primary hover:text-white duration-100 text-sm cursor-pointer hidden md:block"
              @click="handleUnfollow"
            >
              ยกเลิกติดตาม +
            </h1>
          </div>
        </div>
        <div
          class="flex flex-col md:text-lg text-sm md:w-[32rem] w-[12rem] md:h-[4rem] h-[4rem]   "
        >
          <b>คำอธิบาย</b>
          <div>{{ this.otherStoreStore?.otherStore?.description }}</div>
        </div>
      </div>
      <div
        class="flex gap-5 text-black text-xl items-center justify-center md:space-x-5 md:w-[46rem] mt-6 pb-6"
      >
        <div
        class="flex items-center justify-center md:w-[22rem] w-[7rem] md:h-12 h-10 rounded-[1rem] hover:cursor-pointer"
          :class="page !== 'review' ? 'bg-tertiary' : 'bg-secondary'"
          @click="routeToMyStore()"
        >
          <h1><b>ร้านค้า</b></h1>
        </div>
        <div
        class="flex items-center justify-center md:w-[22rem] w-[7rem] md:h-12 h-10 rounded-[1rem] hover:cursor-pointer"
          :class="page === 'review' ? 'bg-tertiary' : 'bg-secondary'"
          @click="routeToReview()"
        >
          <h1><b>รีวิว</b></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from "@/components/Mystore/Dialog/index.vue";
import PopupForm from "@/components/ProductInfo/PopupForm/index.vue";
import Rating from "@/components/Rating/index.vue";
import Loading from "@/components/Loading/index.vue";

import { editIcon, shareIcon } from "@/assets/mystore";
import { ref, onBeforeUnmount } from "vue";
import axios from "axios";
import { useOtherStoreStore } from "@/store/other-store.store.js";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const otherStoreStore = useOtherStoreStore();
    const page = ref(route.path.split("/").pop());
    otherStoreStore.fetchOtherStore(id);
    return { otherStoreStore, page, id };
  },
  components: {
    Rating,
    PopupForm,
    Dialog,
    Loading,
  },
  data() {
    return {
      editIcon,
      shareIcon,
      isModalOpen: false,
      followerDialog: false,
      followingDialog: false,
    };
  },
  methods: {
    routeToMyStore() {
      this.$router.push(`/store/${this.$route.params.id}`);
    },
    routeToReview() {
      this.$router.push(`/store/${this.$route.params.id}/review`);
    },
    openFollower() {
      this.followerDialog = true;
    },
    closeFollower() {
      this.followerDialog = false;
    },
    openFollowing() {
      this.followingDialog = true;
    },
    closeFollowing() {
      this.followingDialog = false;
    },
    handleFollow() {
      axios
        .post("/user/follow-user-by-id", {
          userId: this.$route.params.id,
        })
        .then(
          (response) => {
            console.log(response.data);
            this.otherStoreStore.fetchOtherStore(this.id);
          },
          (error) => {
            console.log(error);
          },
        );
    },
    handleUnfollow() {
      axios
        .post("/user/unfollow-user-by-id", {
          userId: this.$route.params.id,
        })
        .then(
          (response) => {
            this.otherStoreStore.fetchOtherStore(this.id);
            console.log(response.data);
          },
          (error) => {
            console.log(error);
          },
        );
    },
    handleCopyLink()
        {
            navigator.clipboard.writeText(window.location.href);
            this.$toast.info("คัดลอกลิงค์สำเร็จ");
        }
  },
};
</script>
