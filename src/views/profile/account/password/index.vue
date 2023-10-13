<template>
    <div class="md:text-2xl text-lg">
        <div class="md:text-2xl text-lg my-2 font-semibold">
            ตั้งค่ารหัสผ่าน
        </div>
    </div>
    <div class="border-b-[0.08rem] border-black mr-12 my-8 w-full"></div>
    <div class="flex justify-center items-center">
        <div class="justify-center w-2/3 md:w-1/2">
            <input
                type="password"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="รหัสผ่านเดิม"
            />
            <input
                type="password"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="รหัสผ่านใหม่"
            />
            <input
                type="password"
                class="focus:outline-none mt-6 block w-full px-2 py-2 bg-white border border-black rounded-md shadow-sm placeholder-slate-400"
                placeholder="ยืนยันรหัสผ่าน"
            />
        </div>
    </div>
    <div class="justify-end flex mt-12 mr-12">
        <button
            class="border-[0.05rem] border-primary px-4 py-2 rounded-lg text-primary"
            @click="submitPass"
        >
            ยืนยัน
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        submitPass() {
            console.log("change pass jaaa")
        },
    },
};
</script>

