<template>
  <h2 class="text-center text-lg font-semibold mb-4">ตั้งรหัสผ่าน</h2>

  <div class="flex flex-col gap-4">
    <input
      type="text"
      name="tel"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="เบอร์โทร"
      v-model="formValue.phone"
      @input="updateForm('phone', $event.target.value)"
    />
    <p v-if="formError.phone !== ''" class="text-red-400 text-sm">
      {{ formError?.phone }}
    </p>
    <input
      type="password"
      name="password"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="รหัสผ่าน"
      v-model="formValue.password"
      @input="updateForm('password', $event.target.value)"
    />
    <p v-if="formError.password !== ''" class="text-red-400 text-sm">
      {{ formError?.password }}
    </p>
    <input
      type="password"
      name="confirm-password"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="ยืนยันรหัสผ่าน"
      v-model="formValue.confirm_password"
      @input="updateForm('confirm_password', $event.target.value)"
    />
    <p v-if="formError.confirm_password !== ''" class="text-red-400 text-sm">
      {{ formError?.confirm_password }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["formValue", "formError"],
  emits: ["updateFormValue"],
  methods: {
    updateForm(label, data) {
      this.$emit("updateFormValue", { label, data });
    },
  },
};
</script>
