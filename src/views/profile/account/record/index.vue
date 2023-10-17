<template>
    <div class="md:text-2xl text-lg">
        <div class="md:text-2xl text-lg my-2 font-semibold">ข้อมูลของฉัน</div>
        <div class="md:text-lg text-sm my-2">
            จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชี้ผู้ใช้นี้
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    <div
        class="md:text-2xl text-lg flex md:flex-row flex-col-reverse md:items-start items-center"
    >
        <div
            v-if="pageState === 0"
            class="md:w-1/2 w-full md:ml-0 ml-16 md:mt-0 mt-[62px]"
        >
            <Defaultrecord />
        </div>
        <div v-if="pageState === 1" class="md:w-1/2 w-full md:ml-0 ml-16">
            <Edit />
        </div>
        <div class="w-1/2 flex flex-col items-center">
            <img
                class="md:w-40 md:h-40 w-28 h-28 md:mt-8 rounded-full"
                :src="
                    imagePreview || profileStore.profile?.profileImage || view
                "
            />
            <button
                v-if="pageState === 1"
                class="border-[0.05rem] border-black px-2 rounded-lg my-4"
                @click="$refs.file.click()"
            >
                เลือกรูป
            </button>
            <input
                type="file"
                hidden
                ref="file"
                @change="uploadFile"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            />
            <div v-if="pageState === 1" class="text-xs mb-2">
                <p>ขนาดไฟล์: สูงสุด 1 MB</p>
                <p>ไฟล์ที่รองรับ: .JPEG, .PNG</p>
            </div>
        </div>
    </div>
    <div class="flex md:mt-10 justify-center">
        <div v-if="pageState === 1" class="flex flex-col">
            <chompu-button
                :loading="loading"
                text="บันทึก"
                @click="save"
                class="my-2 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
            />
            <!-- <button
        class="my-2 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
        @click="save"
      >
        บันทึก
      </button> -->
        </div>
        <button
            v-if="pageState === 0"
            class="my-2 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
            @click="edit"
        >
            แก้ไข
        </button>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
</template>

<script>
import { view } from "@/assets/profile";
import Defaultrecord from "@/components/StepsEditRecord/Default/index.vue";
import Edit from "@/components/StepsEditRecord/Edit/index.vue";
import ChompuButton from "@/components/ChompuButton/index.vue";
import axios from "axios";
import { ref } from "vue";
import { useProfileStore } from "@/store/profile.store.js";

export default {
    setup() {
        const profileStore = useProfileStore();
        profileStore.fetchMyProfile();
        return { profileStore };
    },
    components: {
        Defaultrecord,
        Edit,
        ChompuButton,
    },
    data() {
        return {
            loading: false,
            view,
            pageState: 0,
            profile: "",
            image: null,
            imagePreview: null,
        };
    },
    methods: {
        uploadFile() {
            this.image = this.$refs.file.files[0];
            this.imagePreview = URL.createObjectURL(this.image);
        },
        edit() {
            this.pageState = 1;
        },
        save() {
            if (this.loading) return;
            this.loading = true;
            if (this.image) {
                const formData = new FormData();
                formData.append("image", this.image);
                const headers = { "Content-Type": "multipart/form-data" };

                axios
                    .put("/user/edit-profile-image", formData, { headers })
                    .then(() => {
                        this.pageState = 0;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            axios
                .put("/user/edit-user-info", this.profileStore.profile)
                .then(() => {
                    this.$toast.success("แก้ไขข้อมูลสำเร็จแล้ว");
                    this.pageState = 0;
                })
                .catch((err) => {
                    console.log(err);
                });

            setTimeout(() => {
                this.loading = false;
            }, 3000);
        },
    },
    mounted() {},
};
</script>

