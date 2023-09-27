<template>
    <h2 class="text-center text-lg font-semibold mb-4">ตั้งรหัสผ่าน</h2>

    <div class="flex flex-col gap-4">
        <input
            type="text"
            name="tel"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="เบอร์โทร"
            v-model="formValue.tel"
            @input="updateForm('tel', $event.target.value)"
            required
        />
        <input
            type="text"
            name="password"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="รหัสผ่าน"
            v-model="formValue.password"
            @input="updateForm('password', $event.target.value)"
            required
        />
        <input
            type="text"
            name="confirm-password"
            class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
            placeholder="ยืนยันรหัสผ่าน"
            v-model="formValue.confirm_password"
            @input="updateForm('confirm_password', $event.target.value)"
            required
        />
    </div>
</template>

<script>
export default {
    props: ["formValue"],
    emits: ["updateFormValue"],
    methods: {
        updateForm(label, data) {
            this.$emit("updateFormValue", { label, data });
        },
    },
};
</script>

