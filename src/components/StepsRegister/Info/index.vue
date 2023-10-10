<template>
  <h2 class="text-center text-lg font-semibold mb-4">สมัครใหม่</h2>

  <div class="flex flex-col gap-4">
    <input
      type="text"
      name="name"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="ชื่อ"
      v-model="formValue.firstname"
      @input="updateForm('firstname', $event.target.value)"
      required
    />
    <input
      type="text"
      name="sername"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="นามสกุล"
      v-model="formValue.lastname"
      @input="updateForm('lastname', $event.target.value)"
      required
    />
    <input
      type="text"
      name="username"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="ชื่อผู้ใช้"
      v-model="formValue.username"
      @input="updateForm('username', $event.target.value)"
      required
    />
  </div>
</template>

<script>
export default {
  props: ["formValue"],
  emits: ["update-form-value"],
  methods: {
    updateForm(label, data) {
      this.$emit("update-form-value", { label, data });
    },
  },
};
</script>
