<template>
  <Container>
    <div
      class="flex md:flex-row flex-col items-center w-full py-5 px-10 absolute top-0 z-10 bg-white border-b-black border-[1px] rounded-t-2xl"
    >
      <div
        class="flex w-full justify-between items-center text-lg font-semibold"
      >
        <button class="flex items-center gap-x-2" @click="handleBack()">
          <img :src="chevronLeft" alt="back" class="w-5" />
          <p>กลับ</p>
        </button>
        <div
          class="cursor-pointer hover:underline duration-500"
          @click="
            $router.push(`/store/${chatStore.chatRoom?.otherUser?.user?._id}`)
          "
        >
          {{ chatStore.chatRoom?.otherUser?.user?.username }}
        </div>
        <div>
          <img
            :src="threePointLeader"
            alt="three-point-leader"
            class="md:w-10 w-5"
          />
        </div>
      </div>
      <div
        class="md:w-fit w-full flex items-center justify-start md:justify-center gap-x-2 md:mr-16 md:border-black md:border-l-[1px] md:px-3 font-semibold md:pt-0 pt-5"
      >
        <div class="w-16 h-16">
          <img
            :src="chatStore.chatRoom?.product?.productImage[0]"
            alt="product_image"
            class="rounded-lg w-16 h-16"
          />
        </div>
        <div class="whitespace-nowrap">
          <p>{{ chatStore.chatRoom?.product?.name }}</p>
          <p>฿ {{ chatStore.chatRoom?.product?.price }}</p>
        </div>
      </div>
    </div>
    <!-- chat -->
    <div
      class="w-full flex flex-col-reverse md:pt-32 pt-48 text-lg font-semibold h-full overflow-y-auto z-0 scroll-smooth"
      :class="isAddOption ? 'pb-48' : 'pb-28'"
    >
      <div
        v-for="(item, index) in messages.slice().reverse()"
        :key="index"
        class="w-full items-end justify-end flex gap-x-3 md:gap-x-5 border-b-[1px] last:border-t-[1px] border-[#d9d9d9] md:px-16 px-4 md:py-4 py-2"
        :class="item.isMyMessage ? '' : 'flex-row-reverse'"
      >
        <div
          v-if="!item.isImg"
          class="w-96"
          :class="item.isMyMessage ? 'text-right' : 'text-left'"
        >
          <p class="break-words">
            {{ item.text }}
          </p>
          <p class="text-xs font-light pt-1">
            {{ formatDateMessage(item?.createdAt.toString()) }}
          </p>
        </div>

        <div v-else>
          <img
            :src="item.img"
            class="w-[200px] h-[200px] rounded-lg cursor-pointer"
            @click="console.log('hello')"
          />
          <p
            class="text-xs font-light pt-1"
            :class="item.isMyMessage ? 'text-right' : 'text-left'"
          >
            {{ formatDateMessage(item?.createdAt.toString()) }}
          </p>
        </div>

        <span>
          <img
            :src="
              item.isMyMessage
                ? chatStore.chatRoom?.user?.user?.profileImage
                : chatStore.chatRoom?.otherUser?.user?.profileImage
            "
            class="w-16 h-16 rounded-full border-[2px] border-[#D9D9D9]"
          />
        </span>
      </div>
    </div>
    <!-- footer -->
    <div class="absolute bottom-0 w-full py-6 z-10 bg-white rounded-b-2xl">
      <div
        class="w-full flex justify-center items-center"
        :class="isAddOption ? 'flex-col' : ''"
      >
        <div></div>
        <div class="flex md:w-3/5 w-full md:px-0 px-4 md:gap-x-4 gap-x-2">
          <button
            v-if="!isOnUpload"
            class="text-5xl py-0"
            @click="toggleAddOption"
          >
            <img :src="add" class="w-9 border-[1px] border-black rounded p-1" />
          </button>
          <input
            v-model="chatInput"
            class="border-[1px] border-black px-3 py-2 w-full rounded"
            placeholder="พิมพ์ข้อความของคุณ..."
            @keyup.enter="handleSubmitNewMessage()"
          />
          <button
            class="flex items-center gap-x-2 border-black border-[1px] rounded px-4"
            @click="handleSubmitNewMessage()"
          >
            <span>
              <img :src="send" class="w-10" />
            </span>
            <p class="text-lg font-semibold">ส่ง</p>
          </button>
        </div>
        <div v-if="isAddOption" class="flex gap-x-10 pt-3">
          <div
            class="bg-[#d9d9d9] w-24 h-24 rounded-xl flex justify-center items-center"
          >
            <label
              for="upload"
              class="flex flex-col justify-center items-center cursor-pointer"
              v-if="!(imageList.length === 5)"
            >
              <input
                id="upload"
                type="file"
                @change="onFileChange"
                style="display: none"
                multiple
              />
              <img :src="image" class="w-12 h-12" />
            </label>
          </div>
          <div>
            <div v-if="!chatStore.chatRoom?.history?.status">
              <button
                class="bg-[#d9d9d9] w-24 h-24 rounded-xl flex justify-center items-center"
                v-if="chatStore.chatRoom.user.role === 'seller'"
              >
                <img
                  :src="closeDeal"
                  @click="handleEndDeal"
                  class="w-12 h-12"
                />
              </button>
              <button
                class="bg-[#d9d9d9] w-24 h-24 rounded-xl flex justify-center items-center"
                v-if="chatStore.chatRoom.user.role === 'customer'"
                @click="handleSendLocation"
              >
                <img :src="location" class="w-12 h-12" />
              </button>
            </div>
            <div v-else>
              <button
                class="bg-[#d9d9d9] w-24 h-24 rounded-xl flex justify-center items-center"
                v-if="
                  chatStore.chatRoom.history.status !== 'ongoing' &&
                  chatStore.chatRoom.user.role === 'seller'
                "
              >
                <img
                  @click="handleDelivered"
                  :src="delivery"
                  class="w-12 h-12"
                />
              </button>
              <button
                class="bg-[#d9d9d9] w-24 h-24 rounded-xl flex justify-center items-center"
                v-if="
                  chatStore.chatRoom.history.status === 'ongoing' &&
                  chatStore.chatRoom.user.role === 'customer'
                "
              >
                <img :src="location" class="w-12 h-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isOnUpload"
      class="absolute bottom-0 w-full bg-white h-full pt-[10rem] px-3"
    >
      <button @click="handleCloseUpload" class="absolute top-[7rem] right-3">
        x
      </button>
      <div class="flex justify-center items-start w-full h-full">
        <div class="space-y-6">
          <img class="w-[500px] h-[500px]" :src="imageList[imageIndex]" />
          <div class="flex justify-center gap-x-4">
            <div v-for="(image, index) in imageList">
              <div class="relative">
                <button
                  class="absolute top-0 right-[6px] text-white"
                  @click="
                    () => {
                      imageList.splice(index, 1);
                      imageFileList.splice(index, 1);
                      if (imageFileList.length === 0) {
                        this.handleToggleUpload();
                      }
                      if (imageIndex - 1 > 0) {
                        imageIndex -= 1;
                        return;
                      }
                      if (imageIndex + 1 > imageList.length) {
                        imageIndex += 1;
                      }
                    }
                  "
                >
                  x
                </button>
                <img
                  @click="
                    () => {
                      imageIndex = index;
                      console.log(index);
                    }
                  "
                  class="w-[80px] h-[80px] cursor-pointer rounded"
                  :class="
                    index === imageIndex ? 'border-[3px] border-primary' : ''
                  "
                  :key="index"
                  :src="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from "@/components/ChatContainer/index.vue";
import { state, socket } from "@/socket";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { chevronLeft, threePointLeader, send, add } from "@/assets/common";
import { image, closeDeal, location, delivery } from "@/assets/chat";
import { onBeforeRouteLeave } from "vue-router";
import { useChatStore } from "@/store/chat.store.js";
import axios from "axios";
import { formatDateMessage } from "@/common/js/utils.js";

export default {
  setup() {
    const isAddOption = ref(false);
    const messages = ref([]);
    const route = useRoute();
    const chatStore = useChatStore();
    const imageList = ref([]);
    const isOnUpload = ref(false);
    const imageFileList = ref([]);
    const imageIndex = ref(0);

    onBeforeRouteLeave((to, from) => {
      chatStore.clearChatRoom();
      socket.emit("leaveRoom");
    });

    socket.emit("joinRoom", route.params.id);

    socket.on("messages", (response) => {
      console.log(response);
      messages.value = response;
    });

    socket.on("message", (response) => {
      if (!messages.value.includes(response)) {
        messages.value.push(response);
      }
    });

    return {
      imageIndex,
      imageFileList,
      isAddOption,
      messages,
      chatStore,
      imageList,
      isOnUpload,
      imageFileList,
    };
  },
  computed: {
    connected() {
      return state.connected;
    },
  },
  methods: {
    handleSendLocation() {
      if (!this.chatStore.chatRoom?.user?.user?.mainAddress) {
        this.$router.push("/profile/address");
        console.log("hello");
      } else {
        const address = [
          this.chatStore.chatRoom?.user?.user?.mainAddress?.firstname +
            this.chatStore.chatRoom?.user?.user?.mainAddress?.lastname,
          this.chatStore.chatRoom?.user?.user?.mainAddress?.address,
          this.chatStore.chatRoom?.user?.user?.mainAddress?.addressDescription,
          this.chatStore.chatRoom?.user?.user?.mainAddress?.phone,
        ];
        for (let i = 0; i < 4; i++) {
          socket.emit("addMessage", {
            roomId: this.$route.params.id,
            message: { text: address[i] },
          });
        }
      }
    },
    onFileChange(e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.imageList.length < 5) {
          this.imageList.push(URL.createObjectURL(file));
          this.imageFileList.push(file);
        }
      }
      console.log(this.imageFileList);
      this.handleToggleUpload();
    },
    handleToggleUpload() {
      this.imageIndex = 0;
      this.isOnUpload = !this.isOnUpload;
      this.toggleAddOption();
    },
    handleCloseUpload() {
      this.isOnUpload = false;
      this.isAddOption = false;
    },
    handleSubmitNewMessage() {
      if (this.imageFileList.length > 0) {
        const imgSend = new FormData();
        for (let i = 0; i < this.imageFileList.length; i++) {
          imgSend.append(`image${i + 1}`, this.imageFileList[i]);
        }
        axios
          .post("/file-upload/many", imgSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            for (let i = 0; i < this.imageFileList.length; i++) {
              console.log(i);
              socket.emit("addMessage", {
                roomId: this.$route.params.id,
                message: { text: "", isImg: true, img: response.data[i] },
              });
            }
            this.imageFileList = [];
          })
          .catch((err) => {
            console.log("error from upload image", err);
          });
      }
      if (this.chatInput !== "") {
        socket.emit("addMessage", {
          roomId: this.$route.params.id,
          message: { text: this.chatInput },
        });
        this.chatInput = "";
      }
      if (this.isOnUpload) {
        this.isOnUpload = false;
        this.isAddOption = false;
      }
    },
    handleBack() {
      this.$router.push("/chat");
    },
    toggleAddOption() {
      this.isAddOption = !this.isAddOption;
    },
    handleEndDeal() {
      axios
        .post("/product/decrease-product-count", {
          roomId: this.chatStore.chatRoom.id,
          productId: this.chatStore.chatRoom.product._id,
          customerId: this.chatStore.chatRoom.otherUser.user._id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelivered() {
      axios
        .put(
          `/history/update-to-ongoing/${this.chatStore.chatRoom.history._id}`,
        )
        .then((response) => {
          socket.emit("addMessage", {
            roomId: this.$route.params.id,
            message: { text: "ส่งของไปแล้วจ้า" },
          });
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatDateMessage,
  },
  components: {
    Container,
  },
  data() {
    return {
      chatInput: "",
      defaultImg: "https://placehold.co/200x200",
      chevronLeft,
      threePointLeader,
      send,
      image,
      closeDeal,
      delivery,
      add,
      location,
      closeDeal,
      mockProfile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Circle_Davys-Grey_Solid.svg/1024px-Circle_Davys-Grey_Solid.svg.png",
    };
  },
};
</script>
