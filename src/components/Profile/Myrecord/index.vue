<template>
    <div class="text-2xl">
        <div class="my-2 font-semibold">ข้อมูลของฉัน</div>
        <div class="my-2">
            จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของงบัญชี้ผู้ใช้นี้
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8"></div>
    <div class="flex text-2xl">
        <div class="w-1/4 font-light">
            <div class="m-12">ชื่อผู้ใช้</div>
            <div class="m-12">ชื่อ</div>
            <div class="m-12">นามสกุล</div>
            <div class="m-12">หมายเลขโทรศัพท์</div>
        </div>
        <div v-if="pageState === 0" class="w-1/4 font-semibold">
            <div class="m-12">mmayyiisuay</div>
            <div class="m-12">ณัชชา</div>
            <div class="m-12">สวยสะอาด</div>
            <div class="m-12">0999999999</div>
        </div>
        <div v-else-if="pageState === 1" class="w-1/4">
            <div class="m-12">
                <input class="border-[0.08rem] border-black rounded-md px-2" placeholder="mmayyiisuay"/>
            </div>
            <div class="m-12">
                <input class="border-[0.08rem] border-black rounded-md px-2" placeholder="ณัชชา" />
            </div>
            <div class="m-12">
                <input class="border-[0.08rem] border-black rounded-md px-2" placeholder="สวยสะอาด" />
            </div>
            <div class="m-12">
                <input class="border-[0.08rem] border-black rounded-md px-2" placeholder="0999999999" />
            </div>
        </div>
        <div class="w-2/4 flex flex-col justify-center items-center">
            <img class="w-36 h-36 my-8" :src="view" />
            <button
                v-if="pageState === 0"
                class="my-8 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
                @click="editProfile"
            >
                แก้ไข
            </button>
            <button
                v-if="pageState === 1"
                class="my-8 border-2 border-[#204E8F] font-semibold text-[#204E8F] py-2 px-6 rounded-lg"
                @click="saveProfile"
            >
                บันทึก
            </button>
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8"></div>
</template>

<script>
import { view } from "@/assets/profile";
export default {
    data() {
        return { view, pageState: 0 };
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

