<template>
  <section class="bg-primary min-h-screen flex items-center justify-center">
    <!--register container-->
    <div class="flex max-w-3xl items-center gap-x-14">
      <!--images-->
      <div class="md:block hidden mt-20">
        <img class="w-64 mx-5" :src="logo1" alt="" />
        <img class="w-72 mr-10" :src="logo2" alt="" />
      </div>

      <!--form 1 begin-->
      <div
        id="teb-1"
        class="md:h-full md:w-80 bg-white px-10 py-8 mt-12 rounded-xl shadow-[30.0px_30.0px_0.0px_rgba(0,0,0,0.18)]"
      >
        <div class="pb-4">
          <component
            v-bind:is="steps[currentStep].component"
            :formValue="formValue"
            :formError="formError"
            @update-form-value="handleForm"
          />
        </div>
        <button
          v-if="currentStep === steps.length - 1"
          type="submit"
          class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
          @click="submitForm"
        >
          ยืนยัน
        </button>
        <button
          v-else
          type="submit"
          class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
          @click="next"
        >
          ต่อไป
        </button>

        <div class="w-full flex justify-center items-center py-4 gap-x-2">
          <button
            v-for="(item, index) in steps"
            :key="item.label"
            @click="pushStep(index)"
          >
            <img
              :src="currentStep >= index ? circleBlack : circleGray"
              class="w-2"
            />
          </button>
        </div>
        <p class="text-center">
          มีบัญชีอยู่แล้วใช่ไหม ?
          <router-link class="text-primary font-medium text-sm" to="/login">
            เข้าสู่ระบบ
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { logo1, logo2, circleBlack, circleGray } from "@/assets/login_register";
import { ref, shallowRef } from "vue";
import Info from "@/components/StepsRegister/Info/index.vue";
import Password from "@/components/StepsRegister/Password/index.vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const formValue = ref({
      firstname: "",
      lastname: "",
      username: "",
      phone: "",
      password: "",
      confirm_password: "",
    });

    const formError = ref({
      firstname: "",
      lastname: "",
      username: "",
      phone: "",
      password: "",
      confirm_password: "",
    });

    const handleForm = (payload) => {
      formValue.value = {
        ...formValue.value,
        [payload.label]: payload.data,
      };
    };

    return { formValue, handleForm, formError };
  },
  // emits: ["updateFormValue"],
  components: {
    Info,
    Password,
  },
  methods: {
    validationPage1() {
      //รีเซ็ต username and password
      this.formError.firstname = "";
      this.formError.lastname = "";
      this.formError.username = "";

      //validation สำหรับ firstname
      if (this.formValue.firstname === "") {
        this.formError.firstname = "กรุณากรอกชื่อ";
      } else if (this.formValue.firstname.match(/[a-z]/) === null) {
        this.formError.firstname = "ชื่อผู้ใช้ต้องประกอบไปด้วย a-z";
      } else if (this.formValue.firstname.length > 30) {
        this.formError.firstname = "ชื่อต้องมีความยาวไม่มากกว่า 30 ตัวอักษร";
      }

      //validation สำหรับ lastname
      if (this.formValue.lastname === "") {
        this.formError.lastname = "กรุณากรอกนามสกุล";
      } else if (this.formValue.lastname.match(/[a-z]/) === null) {
        this.formError.lastname = "นามสกุลต้องประกอบไปด้วย a-z";
      } else if (this.formValue.lastname.length > 30) {
        this.formError.lastname = "นามสกุลต้องมีความยาวไม่มากกว่า 30 ตัวอักษร";
      }

      //validation สำหรับ username
      if (this.formValue.username === "") {
        this.formError.username = "กรุณากรอกชื่อผู้ใช้";
      } else if (this.formValue.username.length < 2) {
        this.formError.username = "ชื่อผู้ใช้งานต้องความยาว 2-20 ตัวอักษร";
      } else if (this.formValue.username.length > 20) {
        this.formError.username = "ชื่อผู้ใช้งานต้องความยาว 2-20 ตัวอักษร";
      }
    },
    validationPage2() {
      //รีเซ็ต phone password and confirm_password
      this.formError.phone = "";
      this.formError.password = "";
      this.formError.confirm_password = "";

      //validation สำหรับ phone
      if (this.formValue.phone.match(/[0-9]/) === null) {
        this.formError.phone = "กรุณากรอกเบอร์โทร 10 หลัก";
      } else if (this.formValue.phone.length != 10) {
        this.formError.phone = "กรุณากรอกเบอร์โทร 10 หลัก";
      }

      //validation สำหรับ password
      if (this.formValue.password === "") {
        this.formError.password = "กรุณากรอกรหัสผ่าน";
      } else if (this.formValue.password.match(/[a-z]/) === null) {
        this.formError.password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.password.match(/[A-Z]/) === null) {
        this.formError.password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.password.match(/[0-9]/) === null) {
        this.formError.password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.password.match(/[!@#$%^&*_-]/) === null) {
        this.formError.password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.password.length < 8) {
        this.formError.password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      }

      //validation สำหรับ confirm_password
      if (this.formValue.confirm_password === "") {
        this.formError.confirm_password = "กรุณากรอกรหัสผ่าน";
      } else if (this.formValue.confirm_password.match(/[a-z]/) === null) {
        this.formError.confirm_password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.confirm_password.match(/[A-Z]/) === null) {
        this.formError.confirm_password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.confirm_password.match(/[0-9]/) === null) {
        this.formError.confirm_password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (
        this.formValue.confirm_password.match(/[!@#$%^&*_-]/) === null
      ) {
        this.formError.confirm_password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.confirm_password.length < 8) {
        this.formError.confirm_password =
          "รหัสผ่านจะต้องประกอบไปด้วยตัวอักขระพิเศษ ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก และตัวเลข มีความยาว 8 ตัวขึ้นไป";
      } else if (this.formValue.confirm_password !== this.formValue.password) {
        this.formError.confirm_password = "รหัสผ่านไม่ตรงกัน";
      }
    },
    next() {
      this.validationPage1();

      //ถ้า username หรือ password มี error ให้จบฟังก์ชันทันที
      if (
        this.formError.firstname !== "" ||
        this.formError.lastname !== "" ||
        this.formError.username !== ""
      ) {
        return;
      }

      this.currentStep += 1;
    },
    prev() {
      this.currentStep -= 1;
    },
    pushStep(step) {
      this.currentStep = step;
    },
    submitLogin() {
      this.$router.push("login");
    },
    updateFormValue(payload) {
      this.formValue = {
        ...this.formValue,
        [payload.label]: payload.data,
      };
    },
    submitRegister() {
      console.log(JSON.stringify(this.formValue, null, 2));
    },
    submitForm() {
      //เรียกใช้งานเกี่ยวกับฟังก์ชัน validate
      this.validationPage2();

      //ถ้า username หรือ password มี error ให้จบฟังก์ชันทันที
      if (
        this.formError.phone !== "" ||
        this.formError.password !== "" ||
        this.formError.confirm_password !== ""
      ) {
        return;
      }
      axios
        .post("/user/register", {
          firstname: this.formValue.firstname,
          lastname: this.formValue.lastname,
          username: this.formValue.username,
          password: this.formValue.password,
          phone: this.formValue.phone,
        })
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((err) => {
          const data = err.response.data;
          console.log(data);
          if (data.statusCode === 400) {
            // this.next.username = true;
            alert(data.message);
            // this.formError.username = "มีชื่อผู้ใช้งานนี้แล้ว";
          }
          console.log(import.meta.env.VITE_APP_API);
          console.log(err);
        });
    },
  },
  data() {
    return {
      logo1,
      logo2,
      circleBlack,
      circleGray,
      currentStep: 0,
      steps: [
        {
          component: shallowRef(Info),
          label: "information",
        },
        {
          component: shallowRef(Password),
          label: "password",
        },
      ],
    };
  },
};
</script>
