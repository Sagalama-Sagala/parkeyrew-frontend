<template>
<div v-if="isModalOpen" class="fixed w-full h-[100%] bg-black bg-opacity-50 z-[1000]" @click="handleClickOutside"> 
    <div class=" w-full h-full flex justify-center items-center">
        <div class="w-[40rem] md:h-[40rem]  h-[30rem] bg-white py-2 rounded-xl flex flex-col justify-center items-center overflow-y-scroll overflow-x-hidden scrollable-container mx-10"> 
            <div class="md:mt-[8rem] mt-[30rem]  flex flex-col md:items-start  ">
                <div class="md:mt-[0rem] mt-[1rem]">
                <div >
                <h1 class="text-xl my-5">รูปภาพสินค้า</h1>
                <div class="flex ml-5">
                    <div class="grid md:grid-cols-5 grid-cols-2 gap-2 mr-2 " > 
                        <div v-for="(image, index) in imageList" :key="index" >
                            <div class="relative">
                                <img :src="image" class="w-[5rem] h-[5rem] object-cover border-black border-[1px]  " />
                                <button class="absolute top-0 right-0 bg-red-400 w-[1rem] h-[1rem] leading-3 text-white" @click="deleteImage(index)">x</button>
                            </div>
                        </div>  
                        <label for="upload" class=" flex flex-col justify-center items-center" v-if="!(imageList.length === 4)">
                        <img :src="imageHolder" class="w-[5rem]" />
                        <label class="text-gray-600"> {{imageList.length}}/4</label>
                        </label>
                        <input id="upload" type="file" @change="onFileChange" style="display:none" multiple>
                    </div>
                    
                </div>
            </div>

            <div>
                <h1 class="text-xl">ข้อมูลสินค้า</h1>
                <div class="flex flex-col md:items-center"> 
                    <div class="flex flex-col md:w-[24rem] justify-center items-center">
                        <div class="flex flex-col md:flex-row my-5 "> 
                            <h1 class="md:w-[8rem]">ชื่อสินค้า</h1>
                            <input class="border-[1px] border-black md:w-[20rem] w-[10rem]" v-model="infoProducts.name"/>
                        </div>
                        <div class="flex flex-col md:flex-row   "> 
                            <h1 class="md:w-[8rem]">คำอธิบายสินค้า</h1>
                            <textarea class="border-[1px] border-black md:w-[20rem] w-[10rem]" v-model="infoProducts.description"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-xl ">หมวดหมู่</h1>
                <div class="flex justify-center">  
                    <div class="flex md:w-[24rem] items-center my-5 "> 
                        <select class="border-[1px] border-black w-[10rem]" v-model="infoProducts.category"> 
                            <option disabled selected value="0" >เลือกหมวดหมู่</option>
                            <option v-for="option in categoryOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-xl ">รายละเอียด</h1>
                <div class="flex md:justify-center md:flex-row flex-col gap-0 "> 
                    <div class="md:w-[12rem] ">
                        <div class="flex items-center my-5 justify-center"> 
                            <h1 class="w-[4rem]">แบรนด์</h1>
                            <select class="border-[1px] border-black w-[6rem]" v-model="infoProducts.brand">
                                <option disabled selected value="0" >เลือกแบรนด์</option>
                                <option v-for="option in brandOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                        <div class="flex  items-center my-5 justify-center"> 
                            <h1 class="w-[4rem]">สี</h1>
                            <select class="border-[1px] border-black w-[6rem]" v-model="infoProducts.color">
                                <option disabled selected value="0" >เลือกสี</option>
                                <option v-for="option in colorOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                        <div class="flex  items-center md:my-5 justify-center"> 
                            <h1 class="w-[4rem]">สภาพ</h1>
                            <input class="border-[1px] border-black w-[6rem]" v-model.number="infoProducts.condition"/>
                        </div>
                    </div>
                    <div class="md:w-[12rem] ">
                        <div class="flex items-center my-5 justify-center"> 
                            <h1 class="w-[4rem]">ราคา</h1>
                            <input class="border-[1px] border-black w-[6rem]" v-model.number="infoProducts.price"/>
                        </div>
                        <div class="flex  items-center my-5 justify-center"> 
                            <h1 class="w-[4rem]">จำนวน</h1>
                            <div class="flex gap-5">
                                <button @click=handleDecrese class="w-6 h-6 border-[1px] rounded-md border-black leading-3">-</button>
                                <h1>{{ infoProducts.remain  }}</h1>
                                <button @click="handleIncrese" class="w-6 h-6 border-[1px] rounded-md border-black leading-3">+</button>
                            </div>
                        </div>
                        <div class="flex items-center my-5 justify-center"> 
                            <h1 class="w-[4rem]">ไซต์</h1>
                            <select class="border-[1px] border-black w-[6rem]" v-model="infoProducts.size">
                                <option disabled selected value="0" >เลือกไซต์</option>
                                <option v-for="option in sizeOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <h1 class="text-xl">รายละเอียดการจัดส่ง</h1>
                <div class="flex justify-center flex-col md:flex-row gap-3"> 
                    <div class="flex items-center justify-center md:my-5 w-[12rem]"> 
                        <h1 class="w-[4rem]">ส่งจาก</h1>
                        <select class="border-[1px] border-black w-[6rem]" v-model="infoProducts.sendFrom"> 
                            <option disabled selected value="0">เลือกจังหวัด</option>
                            <option v-for="option in shipFormOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-center w-[12rem] "> 
                        <h1 class="w-[4rem]">ค่าส่ง</h1>
                        <input v-model.number="infoProducts.deliveryFee" class="border-[1px] border-black w-[6rem]"/>
                    </div>
                </div>
            </div>

                <div class="flex gap-6 h-[2.5rem] md:justify-end justify-center   ">
                    <button @click="handleToggleModal" class="text-[#969696] hover:text-black duration-100">ยกเลิก </button>
                    <button @click="handleOk" class="text-primary border-[1px] border-primary hover:bg-primary hover:text-white duration-100 rounded-lg px-4">ลงขาย</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>

import {imageHolder} from '@/assets/product'
import {watchEffect, ref, reactive} from 'vue' 
export default {
  name: 'PopupForm',
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    productData:
    {
        type: Object,
        default: () => {}
    }
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
    handleToggleModal() {
      this.$emit("toggleModal");
    },
    handleOk() {
       this.$emit("handleOk",this.infoProducts)
       this.handleReset();
    },
    handleReset()
    {
        this.infoProducts.brand = '';
        this.infoProducts.category = '';
        this.infoProducts.condition = 0;
        this.infoProducts.sendFrom = '';
        this.infoProducts.size = '';
        this.infoProducts.price = 0;
        this.infoProducts.description = '';
        this.infoProducts.name = '';
        this.infoProducts.remain = 0;
        this.infoProducts.deliveryFee = 0;
        this.infoProducts.color = '';
    },
    handleIncrese()
    {
        this.infoProducts.remain += 1
    },
    handleDecrese()
    {
        this.infoProducts.remain -= 1
    }
  },
  setup(props)
  {
    const infoProducts = reactive({
    brand: '',
    category: '',
    color: '',
    condition: 0,
    sendFrom: '',
    size: '',
    price: 0,
    description: '',
    name: '',
    remain: 0,
    deliveryFee: 0,
    });
    watchEffect(() => {
    if (props.productData) {
        infoProducts.brand = props.productData.brand;
        infoProducts.category = props.productData.category;
        infoProducts.condition =  props.productData.condition;
        infoProducts.sendFrom =  props.productData.sendFrom;
        infoProducts.size =  props.productData.size;
        infoProducts.price =  props.productData.price;
        infoProducts.description =  props.productData.description;
        infoProducts.name =  props.productData.name;
        infoProducts.remain =  props.productData.remain;
        infoProducts.deliveryFee =  props.productData.deliveryFee;
        infoProducts.color =  props.productData.color ;
    }
    });
    return {infoProducts}
  },
  data(props)
  {
    return {
      imageList: [],
      imageHolder: imageHolder,

        colorOptions :[
            { id: "ขาว", label: "ขาว"},
            { id: "ดำ", label: "ดำ"},
            { id: "ม่วง", label: "ม่วง"},
            { id: "ฟ้า", label: "ฟ้า" },
            { id: "น้ำเงิน", label: "น้ำเงิน"},
            { id: "เขียว", label: "เขียว"},
            { id: "ชมพู", label: "ชมพู"},
            { id: "เหลือง", label: "เหลือง"},
            { id: "ส้ม", label: "ส้ม"},
            { id: "แดง", label: "แดง"},
            { id: "เทา", label: "เทา"},
            { id: "น้ำตาล", label: "น้ำตาล"},
        ],
        categoryOptions : [
            {id:"เดรส",label:"เดรส"},
            {id:"ท็อปส์",label:"ท็อปส์"},
            {id:"กางเกง",label:"กางเกง"},
            {id:"เสื้อกันหนาว",label:"เสื้อกันหนาว"},
            {id:"กระโปรง",label:"กระโปรง"},
            {id:"กระเป๋า",label:"กระเป๋า"},
            {id:"ชุดว่ายน้ำ",label:"ชุดว่ายน้ำ"},
            {id:"ชุดทำงาน",label:"ชุดทำงาน"},
            {id:"รองเท้า",label:"รองเท้า"},
            {id:"จัํมป์สูท",label:"จัํมป์สูท"},
        ],
        brandOptions : [
            {id:"มีแบรนด์",label:"มีแบรนด์"},{id:"ไม่มีแบรนด์",label:"ไม่มีแบรนด์"}
        ],
        sizeOptions :  [   
            { id: "S", label: "S" },
            { id: "M", label: "M",},
            { id: "L", label: "L" },
            { id: "XL", label: "XL" },
            { id: "XXL", label: "XXL" },
            { id: "Oversize", label: "Oversize" ,}
        ],
        shipFormOptions : [
        { id: "กรุงเทพมหานคร", label: "กรุงเทพมหานคร" },
        { id: "สมุทรปราการ", label: "สมุทรปราการ" },
        { id: "นนทบุรี", label: "นนทบุรี" },
        ],
    }
  }
}

</script>

<style scoped>



.scrollable-container::-webkit-scrollbar {
  width: 12px; 
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1; 
  margin-top: 100px;
  margin-bottom: 100px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 6px;
    border-right: none;
    border-left: none;
    width: 1px;
}
</style>

