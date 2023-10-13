<template>
<div v-if="true" class="fixed w-full h-[100%] bg-black bg-opacity-50 z-[1000]"> 
    <div class=" w-full h-full flex justify-center items-center">
        <div class="w-[40rem] md:h-[40rem] h-[30rem] bg-white py-2 rounded-xl mx-10 flex flex-col justify-center items-center overflow-y-auto"> 
            <div class="w-[30rem] mx-auto mt-10">
            <div >
                <h1 class="text-xl my-5">รูปภาพสินค้า</h1>
                <div class="flex  ">
                    <div class="flex gap-2 mr-2" > 
                        <div v-for="(image, index) in imageList" :key="index" >
                            <img :src="image" class="w-[5rem] h-[5rem] object-cover border-black border-[1px] " />
                            <button @click="deleteImage(index)">Delete</button>
                        </div>  
                    </div>
                    <label for="upload" class=" flex flex-col justify-center items-center" v-if="!(imageList.length === 4)">
                        <img :src="imageHolder" class="w-[5rem]" />
                        <label class="text-gray-600"> {{imageList.length}}/4</label>
                    </label>
                    <input id="upload" type="file" @change="onFileChange" style="display:none" multiple>
                </div>
            </div>

            <div>
                <h1 class="text-xl">ข้อมูลสินค้า</h1>
                <div class="flex flex-col items-center"> 
                    <div class="w-[24rem]">
                        <div class="flex my-5 "> 
                            <h1 class="w-[8rem]">ชื่อสินค้า</h1>
                            <input class="border-[1px] border-black "/>
                        </div>
                        <div class="flex  "> 
                            <h1 class="w-[8rem]">คำอธิบายสินค้า</h1>
                            <textarea class="border-[1px] border-black"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-xl ">หมวดหมู่</h1>
                <div class="flex justify-center">  
                    <div class="flex w-[24rem] items-center my-5"> 
                        <select class="border-[1px] border-black w-[10rem] "> 
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
                            <select class="border-[1px] border-black w-[6rem]">
                                <option v-for="option in brandOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                        <div class="flex  items-center my-5"> 
                            <h1 class="w-[4rem]">สี</h1>
                            <select class="border-[1px] border-black w-[6rem]">
                                <option v-for="option in colorOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                        <div class="flex  items-center my-5"> 
                            <h1 class="w-[4rem]">สภาพ</h1>
                            <select class="border-[1px] border-black w-[6rem]">
                                <option v-for="option in conditionOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-[12rem]">
                        <div class="flex items-center my-5"> 
                            <h1 class="w-[4rem]">ราคา</h1>
                            <input class="border-[1px] border-black w-[6rem]"/>
                        </div>
                        <div class="flex  items-center my-5"> 
                            <h1 class="w-[4rem]">จำนวน</h1>
                            <div class="flex gap-5">
                                <button class="w-6 h-6 border-[1px] rounded-md border-black leading-3">-</button>
                                <h1>0</h1>
                                <button class="w-6 h-6 border-[1px] rounded-md border-black leading-3">+</button>
                            </div>
                        </div>
                        <div class="flex items-center my-5"> 
                            <h1 class="w-[4rem]">ไซต์</h1>
                            <select class="border-[1px] border-black w-[6rem]">
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
                        <select class="border-[1px] border-black w-[6rem]"></select>
                    </div>
                    <div class="flex items-center my-5 w-[12rem]"> 
                        <h1 class="w-[4rem]">ค่าส่ง</h1>
                        <select class="border-[1px] border-black w-[6rem]"></select>
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
import {imageHolder} from '@/assets/product'
export default {
  name: 'PopupForm',
  props: {
    msg: String
  },
  methods:{
    onFileChange(e) {
      const files = e.target.files;
      if (this.imageList.length < 4) {
        const remainingSlots = 4 - this.imageList.length;
        for (let i = 0; i < Math.min(remainingSlots, files.length); i++) {
          this.imageList.push(URL.createObjectURL(files[i]));
        }
      }
    },
    deleteImage(index) {
      this.imageList.splice(index, 1);
    },
  },
  data()
  {
    return {
      imageList: [],
      imageHolder: imageHolder,
      categoryOptions: [{id:1,label:"เสื้อผ้า"},{id:2,label:"รองเท้า"},{id:3,label:"กระเป๋า"}],
      brandOptions: [{id:1,label:"Nike"},{id:2,label:"Adidas"},{id:3,label:"Converse"}],
      colorOptions: [{id:1,label:"ขาว"},{id:2,label:"เขียว"},{id:3,label:"แดง"}],
      conditionOptions: [{id:1,label:"ใหม่"},{id:2,label:"เก่า"}],
      sizeOptions: [{id:1,label:"S"},{id:2,label:"M"},{id:3,label:"L"}],

    }
  }
}
</script>

<style>
.custom-upload-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
}
</style>
