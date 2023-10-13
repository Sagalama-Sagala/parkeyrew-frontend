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
                            <select class="border-[1px] border-black w-[6rem]" v-model="infoProducts.condition">
                                <option disabled selected value="0" >เลือกสภาพ</option>
                                <option v-for="option in conditionOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="md:w-[12rem] ">
                        <div class="flex items-center my-5 justify-center"> 
                            <h1 class="w-[4rem]">ราคา</h1>
                            <input class="border-[1px] border-black w-[6rem]" v-model="infoProducts.price"/>
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
                        <select class="border-[1px] border-black w-[6rem]"> 
                            <option disabled selected value="0">เลือกจังหวัด</option>
                            <option v-for="option in shipFormOptions" :key="option.id" :value="option.id">{{option.label}}</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-center w-[12rem] "> 
                        <h1 class="w-[4rem]">ค่าส่ง</h1>
                        <input v-model="infoProducts.deliveryFee" class="border-[1px] border-black w-[6rem]"/>
                    </div>
                </div>
            </div>

                <div class="flex gap-6 h-[2.5rem] md:justify-end justify-center   ">
                    <button @click="handleToggleModal" class="text-[#969696] hover:text-black duration-100">ยกเลิก </button>
                    <button @click="test" class="text-primary border-[1px] border-primary hover:bg-primary hover:text-white duration-100 rounded-lg px-4">ลงขาย</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>

import {imageHolder} from '@/assets/product'
import {ref} from 'vue' 
const defaultProductData = {
  product: {
    brand: '',
    category: '',
    color: '',
    condition: '',
    shipFrom: '',
    size: '',
    price: '',
    description: '',
    name: '',
    remain: '',
    deliveryFee: '',
  },
};
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
        default: () => defaultProductData
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
    handleClickOutside(event) {
        if (event.target.classList.contains('fixed')) {
        this.handleToggleModal();
        }
    },
    test()
    {   
        console.log(this.productData)
        console.log(this.infoProducts)
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
    
    const colorOptions = [
        { id: 1, label: "ขาว", isCheck: false },
        { id: 2, label: "ดำ", isCheck: false },
        { id: 3, label: "ม่วง", isCheck: false },
        { id: 4, label: "ฟ้า", isCheck: false },
        { id: 5, label: "น้ำเงิน", isCheck: false },
        { id: 6, label: "เขียว", isCheck: false },
        { id: 7, label: "ชมพู", isCheck: false },
        { id: 8, label: "เหลือง", isCheck: false },
        { id: 9, label: "ส้ม", isCheck: false },
        { id: 10, label: "แดง", isCheck: false },
        { id: 11, label: "เทา", isCheck: false },
        { id: 12, label: "น้ำตาล", isCheck: false },
    ]

    const categoryOptions =  [
        {id:1,label:"เดรส"},
        {id:2,label:"ท็อปส์"},
        {id:3,label:"กางเกง"},
        {id:4,label:"เสื้อกันหนาว"},
        {id:5,label:"กระโปรง"},
        {id:6,label:"กระเป๋า"},
        {id:7,label:"ชุดว่ายน้ำ"},
        {id:8,label:"ชุดทำงาน"},
        {id:9,label:"รองเท้า"},
        {id:10,label:"จัํมป์สูท"},
    ]
    const brandOptions =  [{id:1,label:"มีแบรนด์"},{id:2,label:"ไม่มีแบรนด์"}]
    const conditionOptions = [{id:1,label:"ใหม่"},{id:2,label:"เก่า"}]
    const sizeOptions =  
    [   
        { id: 1, label: "S" ,isCheck: false },
        { id: 2, label: "M" ,isCheck: false},
        { id: 3, label: "L" ,isCheck: false},
        { id: 4, label: "XL" ,isCheck: false},
        { id: 5, label: "XXL" ,isCheck: false},
        { id: 6, label: "Oversize" ,isCheck: false}
    ]
    const shipFormOptions = [
    { "id": 1, "label": "กรุงเทพมหานคร" },
    { "id": 2, "label": "สมุทรปราการ" },
    { "id": 3, "label": "นนทบุรี" },
    { "id": 4, "label": "ปทุมธานี" },
    { "id": 5, "label": "พระนครศรีอยุธยา" },
    { "id": 6, "label": "อ่างทอง" },
    { "id": 7, "label": "ลพบุรี" },
    { "id": 8, "label": "สิงห์บุรี" },
    { "id": 9, "label": "ชัยนาท" },
    { "id": 10, "label": "สระบุรี" },
    { "id": 11, "label": "ชลบุรี" },
    { "id": 12, "label": "ระยอง" },
    { "id": 13, "label": "จันทบุรี" },
    { "id": 14, "label": "ตราด" },
    { "id": 15, "label": "ฉะเชิงเทรา" },
    { "id": 16, "label": "ปราจีนบุรี" },
    { "id": 17, "label": "นครนายก" },
    { "id": 18, "label": "สระแก้ว" },
    { "id": 19, "label": "นครราชสีมา" },
    { "id": 20, "label": "บุรีรัมย์" },
    { "id": 21, "label": "สุรินทร์" },
    { "id": 22, "label": "ศรีสะเกษ" },
    { "id": 23, "label": "อุบลราชธานี" },
    { "id": 24, "label": "ยโสธร" },
    { "id": 25, "label": "ชัยภูมิ" },
    { "id": 26, "label": "อำนาจเจริญ" },
    { "id": 27, "label": "บึงกาฬ" },
    { "id": 28, "label": "หนองบัวลำภู" },
    { "id": 29, "label": "ขอนแก่น" },
    { "id": 30, "label": "อุดรธานี" },
    { "id": 31, "label": "เลย" },
    { "id": 32, "label": "หนองคาย" },
    { "id": 33, "label": "มหาสารคาม" },
    { "id": 34, "label": "ร้อยเอ็ด" },
    { "id": 35, "label": "กาฬสินธุ์" },
    { "id": 36, "label": "สกลนคร" },
    { "id": 37, "label": "นครพนม" },
    { "id": 38, "label": "มุกดาหาร" },
    { "id": 39, "label": "เชียงใหม่" },
    { "id": 40, "label": "ลำพูน" },
    { "id": 41, "label": "ลำปาง" },
    { "id": 42, "label": "อุตรดิตถ์" },
    { "id": 43, "label": "แพร่" },
    { "id": 44, "label": "น่าน" },
    { "id": 45, "label": "พะเยา" },
    { "id": 46, "label": "เชียงราย" },
    { "id": 47, "label": "แม่ฮ่องสอน" },
    { "id": 48, "label": "นครสวรรค์" },
    { "id": 49, "label": "อุทัยธานี" },
    { "id": 50, "label": "กำแพงเพชร" },
    { "id": 51, "label": "ตาก" },
    { "id": 52, "label": "สุโขทัย" },
    { "id": 53, "label": "พิษณุโลก" },
    { "id": 54, "label": "พิจิตร" },
    { "id": 55, "label": "เพชรบูรณ์" },
    { "id": 56, "label": "ราชบุรี" },
    { "id": 57, "label": "กาญจนบุรี" },
    { "id": 58, "label": "สุพรรณบุรี" },
    { "id": 59, "label": "นครปฐม" },
    { "id": 60, "label": "สมุทรสาคร" },
    { "id": 61, "label": "สมุทรสงคราม" },
    { "id": 62, "label": "เพชรบุรี" },
    { "id": 63, "label": "ประจวบคีรีขันธ์" },
    { "id": 64, "label": "นครศรีธรรมราช" },
    { "id": 65, "label": "กระบี่" },
    { "id": 66, "label": "พังงา" },
    { "id": 67, "label": "ภูเก็ต" },
    { "id": 68, "label": "สุราษฎร์ธานี" },
    { "id": 69, "label": "ระนอง" },
    { "id": 70, "label": "ชุมพร" },
    { "id": 71, "label": "สงขลา" },
    { "id": 72, "label": "สตูล" },
    { "id": 73, "label": "ตรัง" },
    { "id": 74, "label": "พัทลุง" },
    { "id": 75, "label": "ปัตตานี" },
    { "id": 76, "label": "ยะลา" },
    { "id": 77, "label": "นราธิวาส" }
    ]
    
    const brandId = brandOptions.find((brand) => brand.label === props.productData.product.brand)?.id || 0;

    const categoryId = categoryOptions.find((category) => category.label === props.productData.product.category)?.id || 0;
    const colorId = colorOptions.find((color) => color.label === props.productData.product.color)?.id || 0
    const conditionId = conditionOptions.find((condition) => condition.label === props.productData.product.condition)?.id || 0;
    const sizeId = sizeOptions.find((size) => size.label === props.productData.product.size)?.id || 0;
    const shipFromId = shipFormOptions.find((shipFrom) => shipFrom.label === props.productData.product.shipFrom)?.id || 0;


    const infoProducts = ref({
        brand:brandId,
        category:categoryId,
        color:colorId,
        condition:conditionId,
        shipFrom:shipFromId,
        size:sizeId,
        price:props.productData.product.price,
        description:props.productData.product.description,
        name:props.productData.product.name,
        remain:props.productData.product.remain,
        deliveryFee:props.productData.product.deliveryFee,
    });
    
    return({colorOptions,categoryOptions,brandOptions,conditionOptions,sizeOptions ,shipFormOptions, infoProducts})
  },
  data()
  {
    return {
      imageList: [],
      imageHolder: imageHolder,
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

