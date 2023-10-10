<template>
        
    <div class="md:text-2xl text-lg">
        <div class="md:text-2xl text-lg my-2 font-semibold">ข้อมูลของฉัน</div>
        <div class="md:text-lg text-sm my-2">
            จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชี้ผู้ใช้นี้
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    <div class="md:text-2xl text-lg flex md:flex-row flex-col-reverse md:items-start items-center">
        <div v-if="pageState === 0" class="md:w-1/2 w-full md:ml-0 ml-16 md:mt-0 mt-[62px]">
            <Defaultrecord/>
        </div>
        <div v-if="pageState === 1" class="md:w-1/2 w-full md:ml-0 ml-16">
            <Edit/>
        </div>
        <div class="w-1/2 flex flex-col items-center">
            <img class="md:w-36 md:h-36 w-28 h-28 md:mt-8" :src="view" />
            <button v-if="pageState === 1"
                class="border-[0.05rem] border-black px-2 rounded-lg my-4"
            >
                เลือกรูป
            </button>
            <div v-if="pageState === 1" class="text-xs mb-2">
                <p>ขนาดไฟล์: สูงสุด 1 MB</p>
                <p>ไฟล์ที่รองรับ: .JPEG, .PNG</p>
            </div>
        </div>
    </div>
    <div class="flex md:mt-10 justify-center">
        <div v-if="pageState === 1" class="flex flex-col">
            <button
                class="my-2  border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
                @click="save"
            >
                บันทึก
            </button>
        </div>
        <button
            v-if="pageState === 0"
            class="my-2 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
            @click="edit"
        >
            แก้ไข
        </button>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
</template>

<script>
    import { view } from "@/assets/profile";
    import Defaultrecord from "@/components/StepsEditRecord/Default/index.vue";
    import Edit from "@/components/StepsEditRecord/Edit/index.vue";

    export default {
                components: {
                Defaultrecord,
                Edit,
                },
            data() {
                return {
                    view,
                    pageState: 0,
                };
            },
            methods: {
                edit() {
                    this.pageState = 1;
                },
                save() {
                    this.pageState = 0;
                },
                
            },
        };
</script>

