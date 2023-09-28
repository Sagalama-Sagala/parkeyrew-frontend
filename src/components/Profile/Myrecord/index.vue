<template>
    
    <div class="md:text-2xl text-lg">
        <div class="md:text-2xl text-lg my-2 font-semibold">ข้อมูลของฉัน</div>
        <div class="md:text-lg text-sm my-2">
            จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชี้ผู้ใช้นี้
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    
    <div class="md:text-2xl text-lg flex md:flex-row flex-col-reverse">
        <div class="w-full flex flex-col md:mt-0 mt-4 ">
            <div v-for="(record, index) in records" class="flex justify-center w-full font-light md:flex " :key="index">
                <div class="md:m-10 m-2 md:w-1/2 w-1/4 ">{{record.title}}</div>
                <div class="md:m-10 m-2 md:w-1/2 w-1/4 font-semibold">{{record.value}}</div>
            </div>
        </div>
        <!-- <div v-if="pageState === 0" class="md:w-1/4 w-1/2 md:pl-0 pl-4 font-semibold">
        </div>
        <div v-else-if="pageState === 1" class="w-1/4">
            <div class="m-12">
                <input
                    class="border-[0.08rem] border-black rounded-md px-2"
                    placeholder="mmayyiisuay"
                />
            </div>
            <div class="m-12">
                <input
                    class="border-[0.08rem] border-black rounded-md px-2"
                    placeholder="ณัชชา"
                />
            </div>
            <div class="m-12">
                <input
                    class="border-[0.08rem] border-black rounded-md px-2"
                    placeholder="สวยสะอาด"
                />
            </div>
            <div class="m-12">
                <input
                    class="border-[0.08rem] border-black rounded-md px-2"
                    placeholder="0999999999"
                />
            </div>
        </div> -->
        <div class="w-full flex flex-col  items-center">
            <img class="md:w-36 md:h-36 w-28 h-28 md:mt-8" :src="view" />
        </div>
    </div>
    <div class="flex md:mr-[190px] md:justify-end justify-center">
        <div v-if="pageState === 1" class="flex flex-col">
            <button
                class="border-[0.05rem] border-black px-2 rounded-lg my-4"
            >
                เลือกรูป
            </button>
            <button
                class="my-2  border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
                @click="saveProfile"
            >
                บันทึก
            </button>
        </div>
        <button
            v-if="pageState === 0"
            class="my-2 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
            @click="editProfile"
        >
            แก้ไข
        </button>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
</template>

<script>
import { view } from "@/assets/profile";
export default {
    data() {
        return {
            view,
            records:[
                {title: "ชื่อผู้ใช้", value: "mmayyiisuay"},
                {title: "ชื่อ", value: "ณัชชา"},
                {title: "นามสกุล", value: "สวยสะอาด"},
                {title: "เบอร์โทร", value: "0949193350"},
            ],
            pageState: 0,
        };
    },
    methods: {
        editProfile() {
            this.pageState = 1;
        },
        saveProfile() {
            this.pageState = 0;
        },
    },
};
</script>

