<template>
<div v-if="true" class="fixed w-full h-[100%] bg-black bg-opacity-50 z-[1000]"> 
    <div class=" w-full h-full flex justify-center items-center">
        <div class="w-[40rem] md:h-[40rem] h-[30rem] bg-white rounded-xl mx-10 flex flex-col justify-center items-center"> 
            
            <div>
                <h1>เลือกรูปสินค้า</h1>
                <div></div>
            </div>

            <div>
                <h1 class="text-xl my-5">ข้อมูลสินค้า</h1>
                <div> 
                    <div class="flex gap-10 items-center my-5"> 
                        <h1>ชื่อสินค้า</h1>
                        <input class="border-[2px] border-black "/>
                    </div>
                    <div class="flex gap-10 items-center my-5"> 
                        <h1>คำอธิบายสินค้า</h1>
                        <textarea class="border-[2px] border-black"></textarea>
                    </div>
                </div>
            </div>

            <div>
                <h1>หมวดหมู่</h1>
                <div></div>
            </div>

            <div>
                <h1>รายละเอียด</h1>
                <div></div>
            </div>

            <div>
                <h1>รายละเอียดการจัดส่ง</h1>
                <div></div>
            </div>

            <div>
                <h1></h1>
                <div></div>
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
  }
}
</script>
