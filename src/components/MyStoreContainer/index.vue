<template>
  <Loading :isLoading="myStoreStore.isLoading" />
  <PopupForm
    :isModalOpen="this.myStoreStore.isPopupFormModal"
    @toggleModal="handleToggle"
    @fetch-my-store="fetchMyStore()"
<<<<<<< HEAD
  />
=======
    @handleOk = "handleOk"
    />
>>>>>>> 348ee37b872501dcc318586f6a030315a024d5fb
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
              class="h-[7rem] rounded-full mb-4"
              :src="profileURL"
              alt="profile picture"
            />
          </div>
          <div class="flex flex-col justify-center w-[12rem] md:pt-0 pt-4">
            <div>
              <b>{{ myStoreStore.mystore.username }}</b>
            </div>
            <div class="md:pt-0 pt-3">
              <Rating :rating="myStoreStore.mystore.reviewStar" />
            </div>
          </div>
          <div class="flex flex-col">
            <div @click="handleEditProfile">
              <img
                class="w-[3rem] rounded-2xl mb-2 hover:cursor-pointer md:block hidden"
                :src="editIcon"
                alt="edit profile icon"
              />
            </div>
            <div>
              <img
                class="w-[3rem] rounded-2xl mb-3 hover:cursor-pointer md:block hidden"
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
            <b>{{ myStoreStore.mystore.follower.length }} ผู้ติดตาม</b>
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
            <b>{{ myStoreStore.mystore.following.length }} กำลังติดตาม</b>
          </div>
          <Dialog
            v-if="followingDialog"
            @close="closeFollowing"
            title="กำลังติดตาม"
            :isMyStore="true"
          />
        </div>
        <div
          class="flex flex-col md:text-lg text-sm md:w-[32rem] w-[12rem] md:h-[4rem] h-[8rem] mb-8 pb-12"
        >
          <b>คำอธิบาย</b>
          <div>{{ myStoreStore.mystore.description }}</div>
        </div>
      </div>
      <div
        class="flex md:flex-row flex-col gap-5 text-black text-xl items-center justify-center md:space-x-5 md:w-[46rem] mt-6 pb-6"
      >
        <div
          class="flex items-center justify-center md:w-[22rem] w-[14rem] h-12 rounded-[1rem] hover:cursor-pointer"
          :class="page === 'store' ? 'bg-tertiary' : 'bg-secondary'"
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
<<<<<<< HEAD
  </div>
=======
  </div> 
>>>>>>> 348ee37b872501dcc318586f6a030315a024d5fb
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

export default {
  setup() {
    const myStoreStore = useMyStoreStore();
    myStoreStore.fetchMyStore()
    console.log('myStoreStore', myStoreStore.mystore)
    return { myStoreStore };
  },
  components: {
    Rating,
    PopupForm,
    Dialog,
    Loading
  },
  data() {
    return {
      editIcon,
      shareIcon,
      profileURL:
        "https://cdn.discordapp.com/attachments/968217024440455258/1161369443323093004/Cat.jpg?ex=65380c94&is=65259794&hm=aa9ff31c401b4cb5e6c9bb1a64478eafb111b0f00735dc487627d8f288c222d0&",
      page: "store",
      isModalOpen: false,
      followerDialog: false,
      followingDialog: false,
    };
  },
  methods: {
    fetchMyStore() {
      this.myStoreStore.fetchMyStore();
    },
    routeToMyStore() {
      this.page = "store";
      this.$router.push("/mystore");
    },
    routeToReview() {
      this.page = "review";
      this.$router.push("/mystore/review");
    },
    handleEditProfile() {
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
    handleOk(value, resetData) {
      this.myStoreStore.isLoading = true;
      const newData = {
        name: value.name,
        price: value.price,
        deliveryFee: value.deliveryFee,
        description: value.description,
        brand: value.brand,
        color: value.color,
        size: value.size,
        category: value.category,
        condition: value.condition,
        sendFrom: value.sendFrom,
        remain: value.remain,
      };
      axios
        .post("product/create-product", newData)
        .then((response) => {
          this.$router.push(`product/${response.data._id}`);
          this.myStoreStore.isPopupFormModal = false;
          this.myStoreStore.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data.message);
          err.response.data.message.forEach((item) => {
            alert(item);
            this.myStoreStore.isLoading = false;
          });
        });
    },
  },
};
</script>
