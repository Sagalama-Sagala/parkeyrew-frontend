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

        <form
          action=""
          @submit.prevent="submitForm"
          class="flex flex-col gap-4 input-group input-group-lg"
        >
          <input
            type="text"
            name="username"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="ชื่อผู้ใช้"
            v-model="formValue.username"
            required
          />
          <div class="relative">
            <input
              :type="inputTypeIcon"
              class="focus:outline-none form-control mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
              placeholder="รหัสผ่าน"
              v-model="formValue.password"
              required
            />
            <button class="input-group-text" @click.prevent="toggleInputIcon">
              <img
                :src="inputTypeIcon === 'password' ? eye : eyeOff"
                class="absolute top-3 right-3"
              />
            </button>

            <button
              type="submit"
              class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
            >
              เข้าสู่ระบบ
            </button>
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
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { logo1, logo2, eye, eyeOff } from "@/assets/login_register";
import axios from "axios";
import { setLocal } from "@/common/js/utils.js";
import { useUserStore } from "@/store/user.store.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const formValue = ref({
      username: "",
      password: "",
    });
    const submitForm = () => {
      axios
        .post("/auth/login", formValue.value)
        .then((response) => {
          userStore.setUser(response.data.user);
          setLocal("token", response.data.access_token);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return { submitForm, formValue, userStore };
  },
  data() {
    return {
      inputTypeIcon: "password",
      logo1,
      logo2,
      eye,
      eyeOff,
    };
  },
  methods: {
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
