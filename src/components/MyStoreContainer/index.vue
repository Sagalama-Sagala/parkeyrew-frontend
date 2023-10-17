<template>
  <Loading :isLoading="this.myStoreStore?.isLoading" />
  <div v-if="isEditOpen" class="fixed bg-black bg-opacity-50 w-screen h-screen z-30  " @click="handleToggleEdit" >
    <div class="flex flex-1 h-screen justify-center items-center">
      <div class="bg-white flex flex-col p-10 gap-5 rounded-xl " @click.stop> 
        <h1>คำอธิบาย</h1>
        <textarea v-model="this.editDescription" class="border-[1px] border-black w-[15rem] rounded px-2 md:w-[20rem] md:h-[10rem]" ></textarea>
        <button @click="handleSaveEdit" class="border-[1px] border-primary hover:text-white text-primary hover:bg-primary duration-100 rounded-lg">บันทึก</button>
      </div>
    </div>
  </div>
  <PopupForm
    :isModalOpen="this.myStoreStore?.isPopupFormModal"
    @toggle-modal="handleToggle"
    @fetch-my-store="fetchMyStore()"
  />
  <div class="flex flex-col">
    <div
      class="bg-primary text-white flex flex-col items-center justify-center w-full mt-2 md:h-[36rem] h-[48rem] md:pt-0 pt-8"
    >
      <div
        class="bg-secondary text-black flex flex-col md:gap-6 gap-16 items-center justify-center md:w-[48rem] w-[16rem] md:h-[24rem] h-full mt-12 md:pb-0 pb-8 rounded-[3rem] shadow-[15.0px_15.0px_0.0px_rgba(0,0,0,0.18)] text-lg"
      >
        <div
          class="flex md:flex-row flex-col justify-between items-center md:w-[36rem] h-[4rem] md:pt-0 pt-8"
        >
          <div>
            <img
              class="h-[7rem] w-[7rem] rounded-full mb-4"
              :src="
                !this.myStoreStore?.mystore?.profileImage ||
                this.myStoreStore?.mystore?.profileImage === ''
                  ? 'https://placehold.co/600x400'
                  : this.myStoreStore?.mystore?.profileImage
              "
              alt="profile picture"
            />
          </div>
          <div class="flex flex-col justify-center w-[12rem] md:pt-0 pt-4">
            <div>
              <b>{{ this.myStoreStore?.mystore?.username }}</b>
            </div>
            <div class="md:pt-0 pt-3">
              <Rating :rating="this.myStoreStore?.mystore?.reviewStar" />
            </div>
          </div>
          <div class="flex flex-col">
            <div >
              <img
                class="w-[3rem] rounded-2xl mb-2 hover:cursor-pointer md:block hidden"
                :src="editIcon"
                alt="edit profile icon"
                @click="handleGoToEditProfile"
              />
            </div>
            <div>
              <img
                class="w-[3rem] rounded-2xl mb-3 hover:cursor-pointer md:block hidden cursor-pointer"
                :src="shareIcon"
                alt="share icon"
              />
            </div>
          </div>
        </div>
        <div
          class="md:text-lg text-sm flex flex-row justify-center items-center md:w-[36rem] md:h-[4rem] h-[2rem] md:border-b-2 md:border-t-2 border-black md:gap-10 gap-5 md:pb-6 md:pt-6 pt-[8.5rem]"
        >
          <div class="hover:cursor-pointer" @click="openFollower">
            <b>{{ this.myStoreStore?.mystore?.follower?.length }} ผู้ติดตาม</b>
          </div>
          <Dialog
            v-if="followerDialog"
            @close="closeFollower"
            title="ผู้ติดตาม"
            :isMyStore="true"
          >
          </Dialog>
          |
          <div class="hover:cursor-pointer" @click="openFollowing">
            <b
              >{{
                this.myStoreStore?.mystore?.following?.length
              }}
              กำลังติดตาม</b
            >
          </div>
          <Dialog
            v-if="followingDialog"
            @close="closeFollowing"
            title="กำลังติดตาม"
            :isMyStore="true"
          />
        </div>
        <div
          class="md:text-lg text-sm md:w-[32rem] w-[12rem] md:h-[4rem] h-[12rem]"
        >
          <div class ="flex">
            <b>คำอธิบาย</b>
            <img :src="editIcon" class="w-[1rem] ml-2 hover:cursor-pointer" @click="handleToggleEdit" />
          </div>
          <div >
            {{ this.myStoreStore?.mystore?.description }}
          </div>
        </div>
      </div>
      <div
        class="flex md:flex-row flex-col gap-5 text-black text-xl items-center justify-center md:space-x-5 md:w-[46rem] mt-6 pb-6"
      >
        <div
          class="flex items-center justify-center md:w-[22rem] w-[14rem] h-12 rounded-[1rem] hover:cursor-pointer"
          :class="page === 'mystore' ? 'bg-tertiary' : 'bg-secondary'"
          @click="routeToMyStore()"
        >
          <h1><b>ร้านค้า</b></h1>
        </div>
        <div
          class="flex items-center justify-center md:w-[22rem] w-[14rem] h-12 rounded-[1rem] hover:cursor-pointer"
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
import { editIcon, shareIcon } from "@/assets/mystore";
import { ref } from "vue";
import axios from "axios";
import { useMyStoreStore } from "@/store/my-store.store.js";
import Loading from "@/components/Loading/index.vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const isEditOpen = ref(false);
    const myStoreStore = useMyStoreStore();
    const route = useRoute();
    const page = ref(route.path.split("/").pop());
    
    myStoreStore.fetchMyStore();
    const editDescription = ref(myStoreStore.mystore.description);
    return { myStoreStore, page, isEditOpen , editDescription };
  },
  components: {
    Rating,
    PopupForm,
    Dialog,
    Loading,
  },
  data() {
    return {
      editDescription: "",
      editIcon,
      shareIcon,
      profileURL:
        "https://cdn.discordapp.com/attachments/968217024440455258/1161369443323093004/Cat.jpg?ex=65380c94&is=65259794&hm=aa9ff31c401b4cb5e6c9bb1a64478eafb111b0f00735dc487627d8f288c222d0&",
      followerDialog: false,
      followingDialog: false,
    };
  },
  methods: {
    fetchMyStore() {
      this.myStoreStore.fetchMyStore();
    },
    routeToMyStore() {
      this.$router.push("/mystore");
    },
    routeToReview() {
      this.$router.push("/mystore/review");
    },
    handleGoToEditProfile() {
      this.$router.push("/profile/record");
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
    handleToggle() {
      this.myStoreStore.togglePopupForm();
    },
    handleToggleEdit() {
      if (!this.isEditOpen) {
        this.handleOpenEdit();
      } else {
        this.handleSaveEdit();
      }
    },
    handleOpenEdit() {
      this.isEditOpen = true;
    },
    handleSaveEdit() {
      axios
        .put("/user/edit-user-description", {
          description: this.editDescription,
        })
        .then((response) => {
          this.$toast.success("บันทึกคำอธิบายสำเร็จ");
          this.myStoreStore.mystore.description = this.editDescription;
          this.isEditOpen = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
