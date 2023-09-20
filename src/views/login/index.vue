<template>
    <div class="min-h-screen bg-primary">
      <div class="flex flex-wrap mt-20 mx-10 p-10 justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <img class="w-52 md:h-52" src="@/assets/login/logo1.png " alt="" />
          <img class="w-56" src="@/assets/login/logo2.png" alt="" />
        </div>
  
        <div
          class="container p-4 w-80 h-72 my-10 mx-10 shadow-lg bg-white rounded-lg"
        >
          <div class="text-center text-lg font-semibold">
            เข้าสู่ระบบ
            <label class="block mt-4 px-4">
              <input
                type="text"
                id="username"
                class="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
                placeholder="ชื่อผู้ใช้"
                required
            /></label>
  
            <label class="block mt-5 px-4">
              <input
                type="password"
                id="password"
                class="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
                placeholder="รหัสผ่าน"
                required
            /></label>
  
            <div class="block mt-5 px-4">
              <button
                type="submit"
                class="mt-1 block w-full px-3 py-1 bg-tertiary font-normal rounded-md active:text-white active:bg-black"
              >
                เข้าสู่ระบบ
              </button>
            </div>
            <div class="mt-5 px-4 font-medium text-sm">
              ไม่เคยมีบัญชีใช่ไหม ? &puncsp;&puncsp;&puncsp;
              <a href="#" class="text-primary font-medium text-sm">สมัครใหม่</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  