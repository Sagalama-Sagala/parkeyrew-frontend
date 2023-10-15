<template>
   <div class="fixed inset-0 flex items-center justify-center z-50">
   <div
      class="fixed w-screen h-screen bg-black bg-opacity-50 z-40 cursor-pointer"
      @click="closeDialog"
    ></div>
    <div class="modal-dialog bg-secondary rounded-3xl shadow-lg w-[40rem] z-50">
      <div class="modal-header p-4 rounded-t-lg justify-center flex">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
      </div>
      <div class="modal-body p-16 max-h-[28rem] overflow-y-auto">
        <div v-if="title === 'ผู้ติดตาม'">
          <div
            class="flex flex-row items-center gap-5 border-b-2 border-[#727272] pt-2 pb-1"
            v-for="(item, index) in follower" :key="index"
          >
            <img
              alt="follower profile"
              :src="item.profileURL"
              class="w-[5.5rem] h-[5.5rem] rounded-full md:block hidden"
            />
            <b class="w-[55%]">{{ index }}</b>
            <div
              class="w- border-2 border-primary rounded-md p-2 text-primary bg-secondary hover:bg-primary hover:text-secondary hover:cursor-pointer max-h-[3rem] min-w-[4.5rem]"
            >
              + ติดตาม
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="flex flex-row items-center gap-5 border-b-2 border-[#727272] pt-2 pb-1"
            v-for="(item, index) in following" :key="index"
          >
            <img
              alt="follower profile"
              :src="item.profileURL"
              class="w-[5.5rem] h-[5.5rem] rounded-full md:block hidden"
            />
            <b class="w-[55%]">{{ item.username }}</b>
            <div
              class="w- border-2 border-primary rounded-md p-2 text-primary bg-secondary hover:bg-primary hover:text-secondary hover:cursor-pointer max-h-[3rem] min-w-[4.5rem]"
            >
              + ติดตาม
            </div>
          </div>
        </div>
        <slot></slot>
      </div>
      <div
        class="modal-footer p-4 bg-secondary rounded-b-3xl flex justify-center"
      >
        <button
          @click="closeDialog"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div> 
</template>

<script>
import { useMyStoreStore } from "@/store/my-store.store.js";
import { useOtherStoreStore } from "@/store/other-store.store.js";
import {ref} from "vue";
export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
    isMyStore: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const StoreStore = ref(null);
    
    if (props.isMyStore) {
      StoreStore.value = useMyStoreStore().mystore;
    } else {
      StoreStore.value = useOtherStoreStore().otherStore;
    }

    const { follower, following } = StoreStore.value

    return {follower, following };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
