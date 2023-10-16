<template>
    <div class="md:text-2xl text-lg">
        <div class="md:text-2xl text-lg my-2 font-semibold">
            ตั้งค่ารหัสผ่าน
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    <div class="flex justify-center items-center">
        <div class="justify-center w-2/3 md:w-1/2">
            <input
                type="password"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="รหัสผ่านเดิม"
                v-model="formValue.oldPassword"
            />
            <p v-if="isInvalid.oldPassword" class="mt-1 text-red-400 text-sm">
                รหัสผ่านเดิมไม่ถูกต้อง
            </p>
            <input
                type="password"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="รหัสผ่านใหม่"
                v-model="formValue.newPassword"
            />
            <input
                type="password"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="ยืนยันรหัสผ่าน"
                v-model="formValue.confirmPassword"
            />
            <p
                v-if="isInvalid.confirmPassword"
                class="mt-1 text-red-400 text-sm"
            >
                รหัสผ่านใหม่ไม่ตรงกัน
            </p>
        </div>
    </div>
    <div class="justify-end flex mt-12 mr-12">
        <button
            class="border-[0.05rem] border-primary px-4 py-2 rounded-lg text-primary"
            @click="submitPass"
        >
            ยืนยัน
        </button>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
// import ToastPlugin from "vue-toast-notification";

export default {
    setup() {
        const isInvalid = ref({
            oldPassword: false,
            newPassword: false,
            confirmPassword: false,
        });
        const formValue = ref({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        return { formValue, isInvalid };
    },
    methods: {
        submitPass() {
            if (this.formValue.newPassword !== this.formValue.confirmPassword) {
                this.isInvalid.confirmPassword = true;
                this.$toast.default("รหัสผ่านใหม่ไม่ตรงกัน");
            } else {
                axios
                    .put("/user/edit-user-password", {
                        oldPassword: this.formValue.oldPassword,
                        newPassword: this.formValue.newPassword,
                    })
                    .then((response) => {
                        if (response.data.status === 400) {
                            this.isInvalid.oldPassword = true;
                            this.$toast.default("รหัสผ่านเดิมไม่ถูกต้อง");
                        } else {
                            this.formValue = {
                                oldPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                            };
                            this.isInvalid = {
                                oldPassword: false,
                                newPassword: false,
                                confirmPassword: false,
                            };
                        }
                        if (response.data.status === 200) {
                            this.$toast.success("เปลี่ยนรหัสผ่านสำเร็จแล้ว");
                        }
                        console.log(response);
                    });
            }
        },
    },
};
</script>

