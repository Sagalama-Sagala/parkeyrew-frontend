<template>
  <div class="md:text-2xl text-lg flex justify-between w-[95%]">
    <div class="md:text-2xl text-lg my-2 font-semibold">ที่อยู่ของฉัน</div>
    <button
      class="border-[0.05rem] border-primary px-4 py-2 rounded-lg text-primary"
      @click="togglePopup"
    >
      เพิ่ม +
    </button>
  </div>
  <div v-if="showPopup" class="z-20 h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30" @click="togglePopup"></div>
  <div
      class="z-30 fixed top-[20%] right-[25%] h-[500px] items-center px-8 bg-white py-5 rounded w-[600px] shadow-xl"
      :class="showPopup ? 'block' : 'hidden'"
    >
  <div class="">
    <p class="text-2xl font-bold">ที่อยู่ใหม่</p>
    <div class="flex justify-between mt-4">
      <input
              type="text"
              class="focus:outline-none mt-1 block w-[48%] px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
              placeholder="ชื่อจริง"
            />  
      <input
              type="text"
              class="focus:outline-none mt-1 block w-[48%] px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
              placeholder="นามสกุล"
            />  
    </div>
    <textarea
              type="text"
              class="focus:outline-none block w-full h-[100px] mt-4 px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
              placeholder="บ้านเลขที่,ซอย,หมู่,ถนน,แขวง/ตำบล"
            />  

  </div>

  
  
  </div>

  <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
  <div
    v-for="(adr, index) in address"
    class="w-full font-bold flex items-center justify-start my-2"
    :key="index"
  >
    <div class="w-[50%] my-4 pl-4">
      <div class="flex justify-around">
        <p class="w-1/6">{{ adr.name }}</p>
        <p class="w-1/4 ">{{ adr.lastname }}</p>
        <div class="w-[10px] border-r-[0.08rem] h-[24px] border-black"></div>
        <p class="w-1/4">{{ adr.phone }}</p>
      </div>
      <div class="w-full font-normal">
        <p class="break-words mt-2">
          {{ adr.add }}
        </p>
      </div>
      <div v-if="adr.priority === 1" class="justify-start  ">
        <button class="border-[0.05rem] rounded-lg  px-2 border-primary text-white p-[3px] mt-2 bg-blue-600 font-light text-xs" >
          ค่าเริ่มต้น
        </button>
      </div>
    </div>

    <div class="w-[50%]">

      <div  class="flex justify-end items-end align-bottom  pr-[100px]">
        <button class="border-b-[0.05rem]  px-2 border-black" >
          แก้ไข
        </button>
        <button v-if="adr.priority !== 1" class="ml-2  border-b-[0.05rem]  px-2 border-black" >
          ลบ
        </button>
      </div>
      <div v-if="adr.priority !== 1" class="flex justify-end pr-[100px] mt-4">
        <button class="border-[0.05rem] rounded-md px-2 border-black text-black font-semibold text-sm" >
          ตั้งเป็นค่าเริ่มต้น
        </button>
      </div>
    </div>

  </div>
  

  
</template>

<script>
export default {
  
  data() {
    return {
      showPopup: false,
      address: [
        {
          name: "ณัชชา",
          lastname: "สวยสะอาด",
          phone: "0949193350",
          add: "A3 - 409 อาคาร AJ park 701 ซอยฉลองกรุง 1 ถนนฉลองกรุง แขวง ลาดกระบัง เขตลาดกระบัง 10520",
          priority: 1,
        },
        {
          name: "ณัชชา",
          lastname: "สวยสะอาด",
          phone: "0949193350",
          add: "247 หมู่ 7 บ้านโน้น ตำบลนี้ อำเถอนู้น จังหวัดนั้นนั้น 33000",
          priority: 0,
        },
      ],
    };
  },
    methods: {
      togglePopup() {
        this.showPopup = !this.showPopup;
      },
    },
};
</script>
