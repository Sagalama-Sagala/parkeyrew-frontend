<template>
  <div class=" bg-secondary min-h-screen ">
    <div class="bg-white text-black pt-20 flex justify-center items-center f">
      <div class="border-b-[1px] border-b-black text-black flex gap-[10rem] text-[1.3rem] w-full mx-4 justify-center flex-wrap px-5">
        <div class="flex flex-col gap-3 "> 
          <div > 
            <img src="https://placehold.co/600x400" class="w-[40rem]"  >
          </div>

          <div class="flex h-20 justify-center gap-2 ">
            <img src="https://placehold.co/600x400" class="h-20" >
            <img src="https://placehold.co/600x400" class="h-20">
          </div>

          <div class="flex justify-around">
            <h1> สถิติการเข้าดู</h1>
            <h1> มีคนถูกใจสินค้า</h1>
          </div>

        </div>

        <div class=" w-[30rem] flex flex-col gap-5"> 

          <div class="flex justify-between"> 
            <div> 
              <h1>ชื่อสินค้า</h1> 
              <h1>ราคา</h1>
            </div>

            <div class="flex flex-col justify-center items-center"> 
              <div class="flex gap-2"> 
                  <img :src="Heart" class="border-[1px] border-black rounded-xl flex justify-center items-center p-1">
                  <img :src="Sharearrow" class="border-[1px] border-black rounded-xl flex justify-center items-center">
              </div> 

              <span>สินค้าคงเหลือ</span>
            </div>
          </div>




          <div> 
              <p>รายละเอียดสินค้า</p>
              <p class=" text-[1.1rem] font-light">รายละเอียดสินค้ารายละเอียดสินค้ารายละเอียดสินค้ารายละเอียดสินค้ารายละเอียดสินค้ารายละเอียดสินค้ารายละเอียดสินค้า</p>
          </div>
          
          <div class="flex justify-around">
            <div class="flex gap-4"> 
              <div >
                <h1>แบรนด์</h1>
                <h1>สี</h1>
                <h1>สภาพ</h1>
                <h1>ไซส์</h1>
              </div>
              <div class=" font-light">
                <h1>ฟหกหก</h1>
                <h1>ฟหกo</h1>
                <h1>ฟหก</h1>
                <h1>ฟหก</h1>
              </div>
            </div>

            <div class="flex gap-4"> 
              <div>
                <h1>หมวดหมู่</h1>
                <h1>ลงขายเมื่อ</h1>
                <h1>ส่งจาก</h1>
              </div>
              <div class=" font-light">
                <h1>ะำหะ</h1>
                <h1>ฟหกฟหก</h1>
                <h1>ฟหกฟหก</h1>
              </div>
            </div>
          </div>


          <div class="flex justify-around items-center border-[1px] border-black  rounded-2xl h-[3rem]">
            <img src="https://placehold.co/600x400" class=" w-3">
            <div> 
              <h1>ชื่อผู้ขาย</h1>
              <h1>star</h1>
            </div>

            <div class="flex">  
              <div class="flex  border-[1px] border-black"> 
                <img src="https://placehold.co/600x400" class="w-3">
                <h1>แชท</h1>
              </div>

              <div class="flex  border-[1px] border-black"> 
                <img src="https://placehold.co/600x400" class="w-3">
                <h1>โทร</h1>
              </div>
            </div>


          </div>
          <div class="flex flex-1 justify-end items-end"> 
            <h1 class="hover:underline hover:cursor-pointer"> 
              ดูร้านค้าผู้ชายคนนี้ >
            </h1>
          </div>
          
        </div>
      </div>
    </div>
    <div class="flex justify-end"> 
      <h1>ดูร้านอื่นของผู้ขาย></h1>
    </div>
    <div class="flex justify-evenly">
        <Cardproduct />
        <Cardproduct />
        <Cardproduct />
        <Cardproduct />
    </div>
  </div>
</template>

<script>
import {Sharearrow} from '@/assets/Product'
import {Heart} from '@/assets/Product'
import Cardproduct from '../../components/ProductCard/index.vue'
export default {
  components: {
    Cardproduct, // Add this line to register the Cardproduct component
  },
  data()
  {
    return{
      Sharearrow:Sharearrow,
      Heart:Heart,
    }
  }
  
}
</script>
