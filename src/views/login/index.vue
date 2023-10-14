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
            v-on:keypress="isAllowed($event)"
          />
          <p v-if="formError.username !== ''" class="text-red-400 text-sm">
            {{ formError.username }}
          </p>
          <div class="relative">
            <input
              :type="inputTypeIcon"
              class="focus:outline-none form-control mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
              placeholder="รหัสผ่าน"
              v-model="formValue.password"
              v-on:keypress="isAllowed($event)"
            />
            <p
              v-if="formError.password !== ''"
              class="mt-3 text-red-400 text-sm"
            >
              {{ formError.password }}
            </p>
            <button class="input-group-text" @click.prevent="toggleInputIcon">
              <img
                :src="inputTypeIcon === 'password' ? eye : eyeOff"
                class="absolute top-3 right-3"
              />
            </button>

            <button
              @click="submitForm"
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
export default {
  setup() {
    const router = useRouter();
  },
  data() {
    return {
      inputTypeIcon: "password",
      logo1,
      logo2,
      eye,
      eyeOff,
      formValue: {
        username: "",
        password: "",
      },
      formError: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    validation() {
      //รีเซ็ต username and password
      this.formError.username = "";
      this.formError.password = "";

      //validation สำหรับ username
      if (this.formValue.username === "") {
        this.formError.username = "กรุณากรอกชื่อผู้ใช้";
      } else if (this.formValue.username.match(/[a-z]/) === null) {
        this.formError.username = "ชื่อผู้ใช้งานต้องประกอบไปด้วย a-z";
      } else if (this.formValue.username.match(/[A-Z]/) === null) {
        this.formError.username = "ชื่อผู้ใช้งานต้องประกอบไปด้วย A-Z";
      } else if (this.formValue.username.match(/[0-9]/) === null) {
        this.formError.username = "ชื่อผู้ใช้งานต้องประกอบไปด้วย 0-9";
      } else if (this.formValue.username.match(/[_]/) === null) {
        this.formError.username = "ชื่อผู้ใช้งานต้องประกอบไปด้วย'_'";
      } else if (this.formValue.username.length < 8) {
        this.formError.username = "ชื่อผู้ใช้งานต้องยาวมากกว่า 7 ตัวอักษร";
      }

      //validation สำหรับ password
      if (this.formValue.password === "") {
        this.formError.password = "กรุณากรอกรหัสผ่าน";
      } else if (this.formValue.password.match(/[a-z]/) === null) {
        this.formError.password = "รหัสผ่านต้องประกอบไปด้วย a-z";
      } else if (this.formValue.password.match(/[A-Z]/) === null) {
        this.formError.password = "รหัสผ่านต้องประกอบไปด้วย A-Z";
      } else if (this.formValue.password.match(/[0-9]/) === null) {
        this.formError.password = "รหัสผ่านต้องประกอบไปด้วย 0-9";
      } else if (this.formValue.password.match(/[!@#$%^&*]/) === null) {
        this.formError.password =
          "รหัสผ่านต้องประกอบไปด้วยอักขระพิเศษ (!@#$%^&*)";
      } else if (this.formValue.password.length < 8) {
        this.formError.password = "รหัสผ่านต้องยาวมากกว่า 7 ตัวอักษร";
      }
    },
    submitForm() {
      //เรียกใช้งานเกี่ยวกับฟังก์ชัน validate
      this.validation();

      //ถ้า username หรือ password มี error ให้จบฟังก์ชันทันที
      if (this.formError.username !== "" || this.formError.password !== "") {
        return;
      }

      axios
        .post("/auth/login", this.formValue)
        .then((response) => {
          setLocal("token", response.data.access_token);
          this.$router.push("/");
        })

        .catch((err) => {
          console.log(err);
        });
    },
    isAllowed(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z0-9!@#$%^&*_]+$/.test(char)) {
        return true; // Match with regex
      } else {
        e.preventDefault(); // If not match, don't add to input text
      }
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
