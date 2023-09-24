<template>
  <section class="bg-primary min-h-screen flex items-center justify-center">
    <!--register container-->
    <div class="flex max-w-3xl items-center">
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
        <h2 class="text-center text-lg font-semibold mb-4">สมัครใหม่</h2>

        <form action="" class="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="ชื่อ"
          />
          <input
            type="text"
            name="sername"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="นามสกุล"
          />
          <input
            type="text"
            name="username"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="ชื่อผู้ใช้"
          />

          <button
            type="submit"
            class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
          >
            <a href=""></a>
            ต่อไป
          </button>
          <p class="text-center">
            มีบัญชีอยู่แล้วใช่ไหม ?
            <button
              onclick="run(1,2);"
              class="text-primary font-medium text-sm"
              @click.prevent="submitLogin"
            >
              เข้าสู่ระบบ
            </button>
          </p>
        </form>
      </div>
    </div>
    <!--form1 end-->
  </section>
</template>

<script>
import { logo1, logo2 } from "@/assets/login_register";
export default {
  methods: {
    submitLogin() {
      console.log("dfsdfjsdjio");
      this.$router.push("Login");
    },
  },
  data() {
    return {
      logo1,
      logo2,
    };
  },
};
</script>
