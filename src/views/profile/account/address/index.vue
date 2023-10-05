<template>
  <div class="md:text-2xl text-lg flex justify-between w-[95%]">
    <div class="md:text-2xl text-lg my-2 font-semibold">ที่อยู่ของฉัน</div>
    <button
      class="border-[0.05rem] border-primary px-4 py-2 rounded-lg text-primary"
    >
      เพิ่ม +
    </button>
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
        <p class="w-1/4">{{ adr.lastname }}</p>
        <div class="w-[10px] border-r-[0.08rem] h-[24px] border-black"></div>
        <p class="w-1/4">{{ adr.phone }}</p>
      </div>
      <div class="w-full font-normal">
        <p class="break-words">
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
      address: [
        {
          name: "ณัชชา",
          lastname: "สวยสะอาด",
          phone: "0949193350",
          add: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdassdasdasdasdasdasdasdasdasdasdasd",
          priority: 1,
        },
        {
          name: "ณัชชา",
          lastname: "สวยสะอาด",
          phone: "0949193350",
          add: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdassdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdassdasdasdasdasdasdasdasdasdasdasd",
          priority: 0,
        },
      ],
    };
  },
};
</script>
