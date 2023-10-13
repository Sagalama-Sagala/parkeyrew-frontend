<template>
<div v-if="true" class="fixed w-full h-[100%] bg-black bg-opacity-50 z-[1000]"> 
    <div class=" w-full h-full flex justify-center items-center">
        <div class="w-[40rem] md:h-[40rem] h-[30rem] bg-white py-2 rounded-xl mx-10 flex flex-col justify-center items-center overflow-y-auto"> 
            <div class="w-[30rem] mx-auto">
            <div >
                <h1 class="text-xl my-5">รูปภาพสินค้า</h1>
                <div></div>
            </div>

            <div>
                <h1 class="text-xl my-5">ข้อมูลสินค้า</h1>
                <div class="ml-10"> 
                    <div class="flex  my-5"> 
                        <h1 class="w-[8rem]">ชื่อสินค้า</h1>
                        <input class="border-[2px] border-black "/>
                    </div>
                    <div class="flex   my-5"> 
                        <h1 class="w-[8rem]">คำอธิบายสินค้า</h1>
                        <textarea class="border-[2px] border-black"></textarea>
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-xl ">หมวดหมู่</h1>
                <div class="flex justify-center">  
                    <div class="flex w-[24rem] items-center my-5"> 
                        <select class="border-[2px] border-black w-[10rem] "> 
                            <option v-for="option in categoryOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-xl ">รายละเอียด</h1>
                <div class="flex justify-center"> 
                    <div class="w-[12rem] ">
                        <div class="flex items-center my-5"> 
                            <h1 class="w-[4rem]">แบรนด์</h1>
                            <select class="border-[2px] border-black w-[6rem]">
                                <option v-for="option in brandOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                        <div class="flex  items-center my-5"> 
                            <h1 class="w-[4rem]">สี</h1>
                            <select class="border-[2px] border-black w-[6rem]">
                                <option v-for="option in colorOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                        <div class="flex  items-center my-5"> 
                            <h1 class="w-[4rem]">สภาพ</h1>
                            <select class="border-[2px] border-black w-[6rem]">
                                <option v-for="option in conditionOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-[12rem]">
                        <div class="flex items-center my-5"> 
                            <h1 class="w-[4rem]">ราคา</h1>
                            <input class="border-[2px] border-black w-[6rem]"/>
                        </div>
                        <div class="flex  items-center my-5"> 
                            <h1 class="w-[4rem]">จำนวน</h1>
                        </div>
                        <div class="flex items-center my-5"> 
                            <h1 class="w-[4rem]">ไซต์</h1>
                            <select class="border-[2px] border-black w-[6rem]">
                                <option v-for="option in sizeOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1>รายละเอียดการจัดส่ง</h1>
                <div class="flex justify-center "> 
                    <div class="flex items-center my-5 w-[12rem]"> 
                        <h1 class="w-[4rem]">ส่งจาก</h1>
                        <select class="border-[2px] border-black w-[6rem]"></select>
                    </div>
                    <div class="flex items-center my-5 w-[12rem]"> 
                        <h1 class="w-[4rem]">ค่าส่ง</h1>
                        <select class="border-[2px] border-black w-[6rem]"></select>
                    </div>
                </div>
            </div>

            <div>
                <h1></h1>
                <div></div>
            </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>


export default {
  name: 'PopupForm',
  props: {
    msg: String
  },
  data()
  {
    return {
      categoryOptions: [{id:1,label:"เสื้อผ้า"},{id:2,label:"รองเท้า"},{id:3,label:"กระเป๋า"}],
      brandOptions: [{id:1,label:"Nike"},{id:2,label:"Adidas"},{id:3,label:"Converse"}],
      colorOptions: [{id:1,label:"ขาว"},{id:2,label:"เขียว"},{id:3,label:"แดง"}],
      conditionOptions: [{id:1,label:"ใหม่"},{id:2,label:"เก่า"}],
      sizeOptions: [{id:1,label:"S"},{id:2,label:"M"},{id:3,label:"L"}],

    }
  }
}
</script>
