<template>
  <h2 class="text-center text-lg font-semibold mb-4">สมัครใหม่</h2>

  <div class="flex flex-col gap-3">
    <input
      type="text"
      name="firstname"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="ชื่อ"
      v-model="formValue.firstname"
      @input="updateForm('firstname', $event.target.value)"
      v-on:keypress="isAllowed($event)"
    />

    <p v-if="formError.firstname !== ''" class="text-red-400 text-sm">
      {{ formError?.firstname }}
    </p>

    <input
      type="text"
      name="lastname"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="นามสกุล"
      v-model="formValue.lastname"
      @input="updateForm('lastname', $event.target.value)"
      v-on:keypress="isAllowed($event)"
    />

    <p v-if="formError.lastname !== ''" class="text-red-400 text-sm">
      {{ formError?.lastname }}
    </p>

    <input
      type="text"
      name="username"
      class="focus:outline-none mt-1 block w-full px-2 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 font-normal"
      placeholder="ชื่อผู้ใช้"
      v-model="formValue.username"
      @input="updateForm('username', $event.target.value)"
      v-on:keypress="isAllowedUsername($event)"
    />

    <p v-if="formError.username !== ''" class="text-red-400 text-sm">
      {{ formError?.username }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["formValue", "formError"],
  emits: ["update-form-value"],
  data() {
    return {};
  },
  methods: {
    updateForm(label, data) {
      this.$emit("update-form-value", { label, data });
    },
    isAllowed(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z0-9!@#$%^&*_-]+$/.test(char)) {
        return true; // Match with regex
      } else {
        e.preventDefault(); // If not match, don't add to input text
      }
    },
    isAllowedUsername(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z_-]+$/.test(char)) {
        return true; // Match with regex
      } else {
        e.preventDefault(); // If not match, don't add to input text
      }
    },
  },
};
</script>
