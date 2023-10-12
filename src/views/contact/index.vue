<template>
  <div class="bg-primary w-full justify-center flex text-white pt-20 h-screen"> 
    <div class="pl-48  w-[50%]">
      <p class="pt-20 text-3xl font-medium">ช่องทางติดต่อ</p>
      <p class="mt-2 ">
        <p class="text-2xl font-light">บอกเราว่าคุณพบเจอปัญหา</p>
        <p class="text-2xl font-light">หรือต้องการอะไร :) </p>
      </p>
      <div class="p-2 mt-6 rounded-2xl border-orange-50 border-2 w-fit flex items-center">
        <svg width="50" height="" viewBox="0 0 84 66" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.5" y="0.214966" width="83" height="65.57" rx="16" fill="#FFF9F9"/><g clip-path="url(#clip0_883_3072)">
          <path d="M22.9865 59.7175V32.9196L14.6328 25.3164L7.14185 21.0972L7.14185 54.9884C7.14185 57.6051 9.27281 59.7175 11.8953 59.7175H22.9865Z" fill="#4285F4"/>
          <path d="M61.0134 59.7175H72.1045C74.735 59.7175 76.858 57.5972 76.858 54.9884V21.0974L68.3734 25.93L61.0134 32.9196V59.7175Z" fill="#34A853"/>
          <path d="M22.9866 32.9196L21.8499 22.4489L22.9866 12.4274L42 26.6145L61.0134 12.4274L62.2849 21.9078L61.0134 32.9196L42 47.1067L22.9866 32.9196Z" fill="#EA4335"/>
          <path d="M61.0134 12.4274V32.9196L76.858 21.0972V14.7918C76.858 8.94373 70.1479 5.6099 65.4502 9.11712L61.0134 12.4274Z" fill="#FBBC04"/>
          <path d="M7.14209 21.0972L14.4293 26.5348L22.9867 32.9196V12.4274L18.5499 9.11713C13.8441 5.60963 7.14209 8.94373 7.14209 14.7915V21.097V21.0972Z" fill="#C5221F"/></g><defs>
          <clipPath id="clip0_883_3072"><rect width="69.72" height="52.29" fill="white" transform="translate(7.13989 7.68494)"/></clipPath></defs>
        </svg>
        <p class="mx-2">phamuesong@gmail.com</p>
      </div>
      <p class="mt-6 text-2xl font-medium">ทีมผู้พัฒนา  💻</p>

      <div class="relative mt-4 flex justify-center">
        <transition name="fade" mode="out-in">
          <img :key="currentImage" :src=jark alt="Image" class="w-[325px] h-64 object-cover rounded-lg" />
          
        </transition>
        <button class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-300 group-hover:bg-white/50 dark:group-hover:bg-gray-500  ">
            <img :src="prev" class="w-4 h-4"/>

          </span>
        </button>
        <button  class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-300 group-hover:bg-white/50 dark:group-hover:bg-gray-500 ">
              <img :src="next" class="w-4 h-4"/>
            </span>
        </button>
      </div>
    </div>

    <div class="flex justify-start pl-10 w-[50%] text-black text-center pt-20  ">
      <div class="bg-white w-[70%] h-[500px] p-6 rounded-2xl shadow-[30.0px_30.0px_0.0px_rgba(0,0,0,0.18)]">
        <p class="text-2xl "> ส่งอีเมลถึงเรา</p>
        <form ref="form" @submit.prevent="sendEmail" action="" class="mt-2">
          <input
            type="text"
            name="name"
            class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="ชื่อ นามสกุล"
            required
          />
          <input
            type="email"
            name="email"
            class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="อีเมล"
            required
          />
          <input
            type="text"
            name="subject"
            class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="หัวเรื่อง"
            required
          />
          <textarea
              type="text"
              name="message"
              class="focus:outline-none block w-full h-[100px] mt-6 px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
              placeholder="รายละเอียด"
          />
          <button
              type="submit"
              value="Send"
              class="mt-6 justify-center w-[40%] px-3 py-1 bg-tertiary font-normal rounded-md hover:scale-105 duration-300"
            >
              ส่งอีเมล
          </button>
        </form>
      </div>
    </div>

    



  </div>
</template>


<script >
import {jark,next,prev} from "@/assets/contact";

export default {
  data() {
      return {
        jark,
        next,
        prev,
        currentImage: 0,
        currentStep: 0,
      };
    },
    
    methods: {
      nextImage() {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      },
      prevImage() {
        this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
      },
      pushStep(step) {
      this.currentStep = step;
      },
      sendEmail() {
      emailjs.sendForm('service_x4d0cem', 'template_nuj1nau', this.$refs.form, 'MGXaQzcdX9_gSx5lO')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    }

    },
    mounted() {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script1.type = 'text/javascript';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.innerHTML = `
      (function(){
        emailjs.init("YOUR_PUBLIC_KEY");
      })();
    `;
    document.body.appendChild(script2);
  },
  };
</script>