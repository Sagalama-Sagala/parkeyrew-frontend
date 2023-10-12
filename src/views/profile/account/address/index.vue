<template>
    <div class="md:text-2xl text-lg flex justify-between w-[95%]">
        <div class="md:text-2xl text-lg my-2 font-semibold">ที่อยู่ของฉัน</div>
        <button
            class="border-[0.05rem] border-primary px-4 py-2 rounded-lg text-primary"
            @click="togglePopup"
        >
            เพิ่ม +
        </button>
    </div>
    <div
        v-if="showPopup"
        class="z-20 h-screen w-full fixed left-0 top-0 bg-black bg-opacity-30"
        @click="togglePopup"
    ></div>
    <div
        class="z-30 fixed top-[20%] h-[500px] px-5 py-5 m-4 bg-white rounded shadow-xl md:text-base text-sm w-5/6 md:w-1/2"
        :class="showPopup ? 'block' : 'hidden'"
    >
        <div class="">
            <p class="text-lg md:text-2xl font-bold">ที่อยู่ใหม่</p>
            <input
                type="text"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="ชื่อจริง-นามสกุล"
            />
            <input
                type="text"
                class="focus:outline-none mt-4 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="หมายเลขโทรศัพท์"
            />
            <input
                type="text"
                class="focus:outline-none mt-4 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="จังหวัด, เขต, อำเภอ, รหัสไปรษณีย์"
            />
            <textarea
                type="text"
                class="focus:outline-none block w-full h-[100px] mt-4 px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="บ้านเลขที่, ซอย, หมู่, ถนน, แขวง/ตำบล"
            />
            <div class="flex mt-8">
                <input type="checkbox" v-model="checked" />
                <div class="ml-1">เลือกเป็นที่อยู่ตั้งต้น</div>
                <!-- true false -->
            </div>
            <div class="mt-8 justify-end flex">
                <button
                    class="px-4 py-2 mx-1 rounded-lg md:hover:bg-gray-100"
                    @click="togglePopup"
                >
                    ยกเลิก
                </button>
                <button
                    class="border-[0.05rem] border-black px-4 py-2 mx-1 rounded-lg md:hover:shadow-md"
                    @click="saveNewAddr"
                >
                    ยืนยัน
                </button>
            </div>
        </div>
    </div>

    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    <div
        v-for="(adr, index) in address"
        class="w-full font-bold flex items-center justify-start my-2"
        :key="index"
    >
        <!-- desktop scale -->
        <div class="w-full my-4 pl-4 hidden md:block">
            <div class="flex justify-around mr-8">
                <p class="">{{ adr.name }}</p>
                <p class="">{{ adr.lastname }}</p>
                <div
                    class="w-[10px] border-r-[0.08rem] h-[24px] border-black"
                ></div>
                <p class="w-1/4">{{ adr.phone }}</p>
            </div>
            <div class="w-full font-normal">
                <p class="break-words mt-2">
                    {{ adr.add }}
                </p>
            </div>
            <div v-if="adr.priority === 1" class="justify-start">
                <button
                    class="border-[0.05rem] rounded-lg px-2 border-primary text-white p-[3px] mt-2 bg-blue-600 font-light text-xs"
                >
                    ค่าเริ่มต้น
                </button>
            </div>
        </div>

        <!-- mobile scale -->
        <div class="w-full my-4 pl-4 md:hidden" @click="editAddr">
            <div class="flex justify-around mr-8">
                <p class="">{{ adr.name }}</p>
                <p class="">{{ adr.lastname }}</p>
                <div
                    class="w-[10px] border-r-[0.08rem] h-[24px] border-black"
                ></div>
                <p class="w-1/4">{{ adr.phone }}</p>
            </div>
            <div class="w-full font-normal">
                <p class="break-words mt-2">
                    {{ adr.add }}
                </p>
            </div>
            <div v-if="adr.priority === 1" class="justify-start">
                <button
                    class="border-[0.05rem] rounded-lg px-2 border-primary text-white p-[3px] mt-2 bg-blue-600 font-light text-xs"
                >
                    ค่าเริ่มต้น
                </button>
            </div>
        </div>

        <!-- desktop scale -->
        <div class="hidden md:block">
            <div
                class="flex justify-center items-center align-bottom px-4 flex-col md:flex-row"
            >
                <button
                    class="border-b-[0.05rem] px-2 pt-2 border-black md:mx-2"
                >
                    แก้ไข
                </button>
                <button
                    v-if="adr.priority !== 1"
                    class="border-b-[0.05rem] px-2 pt-2 border-black md:mx-2"
                >
                    ลบ
                </button>
            </div>
            <div
                v-if="adr.priority !== 1"
                class="flex justify-center mt-4 items-end"
            >
                <button
                    class="border-[0.05rem] rounded-md px-2 border-black text-black font-normal"
                >
                    ตั้งเป็นค่าเริ่มต้น
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    data() {
        return {
            checked: ref(false),
            showPopup: false,
            address: [
                {
                    name: "ณัชชา",
                    lastname: "สวยสะอาด",
                    phone: "0949193350",
                    add: "A3 - 409 อาคาร AJ park 701 ซอยฉลองกรุง 1 ถนนฉลองกรุง แขวง ลาดกระบัง เขตลาดกระบัง 10520",
                    priority: 1,
                },
                {
                    name: "ณัชชา",
                    lastname: "สวยสะอาด",
                    phone: "0949193350",
                    add: "247 หมู่ 7 บ้านโน้น ตำบลนี้ อำเถอนู้น จังหวัดนั้นนั้น 33000",
                    priority: 0,
                },
            ],
        };
    },
    methods: {
        togglePopup() {
            this.showPopup = !this.showPopup;
        },
        editAddr() {
            console.log("click on phone");
        },
        saveNewAddr() {
            console.log("fetch send addr");
        },
    },
};
</script>

