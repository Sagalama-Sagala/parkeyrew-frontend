<template>
  <section class="bg-primary min-h-screen flex items-center justify-center">
    <!--login container-->
    <div class="flex max-w-3xl items-center gap-x-14">
      <!--images-->
      <div class="md:block hidden mt-20">
        <img class="w-64 mx-5" :src="logo1" alt="" />
        <img class="w-72 mr-10" :src="logo2" alt="" />
      </div>

      <!--form-->
      <div
        class="md:h-full md:w-80 bg-white px-10 py-8 mt-12 rounded-xl shadow-[30.0px_30.0px_0.0px_rgba(0,0,0,0.18)]"
      >
        <h2 class="text-center text-lg font-semibold mb-4">เข้าสู่ระบบ</h2>

        <div class="flex flex-col gap-3 input-group input-group-lg">
          <input
            type="text"
            name="username"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="ชื่อผู้ใช้"
            v-model="formValue.username"
          />
          <div class="relative">
            <input
              :type="inputTypeIcon"
              class="focus:outline-none form-control mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
              placeholder="รหัสผ่าน"
              v-model="formValue.password"
            />
            <p v-if="isInvalid" class="mt-3 text-red-400 text-sm">
              ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
            </p>
            <button class="input-group-text" @click.prevent="toggleInputIcon">
              <img
                :src="inputTypeIcon === 'password' ? eye : eyeOff"
                class="absolute top-3 right-3"
              />
            </button>

            <!-- New Button -->
            <chompu-button
              text="เข้าสู่ระบบ"
              @click="submitForm"
              :loading="loading"
              type="submit"
              class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
            />
            <!-- Old button -->
            <!-- <button
                            @click="submitForm"
                            type="submit"
                            class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
                        >
                            เข้าสู่ระบบ
                        </button> -->
          </div>
          <p class="text-center">
            ไม่เคยมีบัญชีใช่ไหม ?
            <button
              class="text-primary font-medium text-sm"
              @click.prevent="submitRegisterForm"
            >
              สมัครใหม่
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { logo1, logo2, eye, eyeOff } from "@/assets/login_register";
import axios from "axios";
import { setLocal } from "@/common/js/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ChompuButton from "@/components/ChompuButton/index.vue";

export default {
  components: { ChompuButton },
  setup() {
    const router = useRouter();
    const isInvalid = ref(false);
    return { isInvalid };
  },
  data() {
    return {
      loading: false,
      inputTypeIcon: "password",
      logo1,
      logo2,
      eye,
      eyeOff,
      formValue: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.loading) return;
      this.loading = true;
      axios
        .post("/auth/login", this.formValue)
        .then((response) => {
          setLocal("token", response.data.access_token);
          this.$router.push("/");
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            console.log(this.isInvalid);
            this.isInvalid = true;
            console.log(this.isInvalid);
            console.log(err);
          }, 1000);
        });
    },
    toggleInputIcon() {
      this.inputTypeIcon =
        this.inputTypeIcon === "password" ? "text" : "password";
    },
    submitRegisterForm() {
      this.$router.push("/register");
    },
  },
};
</script>
