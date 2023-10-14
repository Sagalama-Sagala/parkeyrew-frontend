<template>
  <div class="bg-primary w-full md:justify-center  md:flex text-white md:pt-16 pt-5 md:h-screen h-full"> 
    <div class="md:pl-48 pl-10 md:pr-0 pr-10 md:w-[50%] w-full">
      <p class="pt-20 md:text-3xl text-xl font-medium">ช่องทางติดต่อ</p>
      <p class="mt-2 ">
        <p class="md:text-2xl text-lg font-light">บอกเราว่าคุณพบเจอปัญหา</p>
        <p class="md:text-2xl text-lg font-light">หรือต้องการอะไร :) </p>
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
        <p class="mx-2 text-base ">phamuesong@gmail.com</p>
      </div>
      <p class="mt-6 md:text-2xl text-base font-medium">ทีมผู้พัฒนา  💻</p>
      
      <div class=" relative mt-4 flex md:justify-center" >
        <transition name="" mode="out-in">
          <img :src="members[currentIndex].src" alt="Image" class="w-[325px]  h-56 object-cover rounded-2xl " :key="currentIndex" />
        </transition>        
        
      
        <button class="absolute top-0 left-0 z-10 flex items-center justify-center h-full md:px-4 cursor-pointer group focus:outline-none"
                @click=prevSlide      
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-300 group-hover:bg-white/50 dark:group-hover:bg-gray-500  ">
            <img :src="prev" class="w-4 h-4"/>
          </span>
        </button>
        <div  class="absolute z-10 flex justify-center  space-x-2 items-end h-full p-4 w-full ">
          <button v-for="i in 9" type="button" class="w-3 h-3 rounded-full " 
            :class="i-1 === currentStep ? 'bg-yellow-400' : 'bg-gray-300'" 
            @click="pushStep(i-1)">
          </button>
        </div>
        <button  class="absolute top-0 right-0 z-10 flex items-center justify-center h-full md:px-4 cursor-pointer group focus:outline-none"
                @click=nextSlide 
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-300 group-hover:bg-white/50 dark:group-hover:bg-gray-500 ">
            <img :src="next" class="w-4 h-4"/>
          </span>
        </button>
      </div>
      <p class="justify-center flex w-full mt-2">{{members[currentIndex].name}}</p> 
      <p class="justify-center text-xs flex w-full ">{{members[currentIndex].dis}}</p> 
      
      
      


    </div>

    <div class="flex justify-start pl-10 md:w-[50%] w-full text-black text-center md:pt-20 pt-10  ">
      <div class="bg-white md:w-[70%] w-[86%] md:mb-0 mb-20 h-[500px] p-6 rounded-2xl shadow-[30.0px_30.0px_0.0px_rgba(0,0,0,0.18)]">
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
          
          <div v-if="showAlert" class="mt-4" :class="showAlert === 'Email sent successfully!' ? 'text-green-600' : 'text-red-600'">
            {{ showAlert  }}
          </div>
          
        </form>
      </div>
    </div>

    



  </div>
</template>


<script >
import {naning,mayji,jap,hon,boss,bambie,chompu,cd,card,jark,next,prev,circleBlack,circleGray} from "@/assets/contact";

export default {
  data() {
      return {
        next,
        prev,
        showAlert: '',
        clearMessage: '',
        members: [
                {
                    name: "แบมบี้ ไผสิมางามเกิน",
                    src: bambie,
                    dis: "phamuesong back-end team",
                },
                {
                    name: "ผมแจ๊ป ยอดนักบิด",
                    src: jap,
                    dis: "phamuesong back-end team",
                },
                {
                    name: "นะนิ้ง เองจ้าา",
                    src: naning,
                    dis: "phamuesong front-end team",
                },
                {
                    name: "ชมพู่ คอนเกรตเกลือ",
                    src: chompu,
                    dis: "phamuesong front-end team",
                },
                {
                    name: "ซีดี ดีวีดี",
                    src: cd,
                    dis: "phamuesong front-end team"
                },
                {
                    name: "มอจ้อ ท้อชิบ",
                    src: mayji,
                    dis: "phamuesong front-end/UXUI team",
                },
                {
                    name: "วอนนาเพลย์ การ์ด ",
                    src: card,
                    dis: "phamuesong front-end team"
                },
                {
                    name: "ฮอนด้า ยามาฮ่าอิซูซุ",
                    src: hon,
                    dis: "phamuesong devops team",
                },
                {
                    name: "บอส ตะเอ๋ตะเอง",
                    src: boss,
                    dis: "phamuesong full stack team",
                },
            ],
        currentIndex: 0,
        currentStep: 0,
      };
    },
    
    methods: {
      
      sendEmail() {
      emailjs.sendForm('service_x4d0cem', 'template_nuj1nau', this.$refs.form, 'MGXaQzcdX9_gSx5lO')
        .then((result) => {
            console.log('SUCCESS!', result.text);
            setTimeout(() => {
            this.showAlert = "Email sent successfully!";
            this.errorMessage = '';
          }, 2000);
        }, (error) => {
            console.log('FAILED...', error.text);
            setTimeout(() => {
            this.showAlert = "Email Error!";
            this.clearMessage = ''; 
          }, 2000);
        });
      },
      goToSlide(index) {
        this.currentIndex = index;
      },
      prevSlide() {
        if (this.currentIndex == 0){
          this.currentIndex = this.members.length - 1;
        }else {
          this.currentIndex = this.currentIndex - 1;
        }
        if (this.currentStep == 0){
          this.currentStep = this.members.length - 1;
        }else {
          this.currentStep = this.currentStep - 1;
        }
        console.log(this.currentStep)
      },
      nextSlide() {
        if (this.currentIndex == this.members.length - 1){
          this.currentIndex = 0;
        }else {
          this.currentIndex = this.currentIndex + 1;
        }
        if (this.currentStep  == this.members.length - 1){
          this.currentStep  = 0;
        }else {
          this.currentStep  = this.currentStep + 1;
        }
        console.log(this.currentStep)
      },
      pushStep(step) {
        this.currentStep = step;
        this.currentIndex = step;
      },

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
        emailjs.init("MGXaQzcdX9_gSx5lO");
      })();
    `;
    document.body.appendChild(script2);
  },
  };
</script>
