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
            @update-form-value="testForm"
          />
        </div>
        <button
          v-if="currentStep === steps.length - 1"
          type="submit"
          class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
          @click="submitRegister"
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
export default {
  setup() {
    const formValue = ref({
      fname: "",
      lname: "",
      username: "",
      tel: "",
      password: "",
      confirm_password: "",
    });

    const testForm = (payload) => {
      formValue.value = {
        ...formValue.value,
        [payload.label]: payload.data,
      };
    };

    return { formValue, testForm };
  },
  emits: ["updateFormValue"],
  components: {
    Info,
    Password,
  },
  methods: {
    next() {
      this.currentStep += 1;
    },
    prev() {
      this.currentStep += 1;
    },
    pushStep(step) {
      this.currentStep = step;
    },
    submitLogin() {
      this.$router.push("Login");
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
