<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal-dialog bg-secondary rounded-3xl shadow-lg w-[40rem]">
        <div class="modal-header p-4 rounded-t-lg justify-center flex">
          <h3 class="text-lg font-semibold">{{title}}</h3>
        </div>
        <div class="modal-body p-4">
          <!--  content here -->
          <slot></slot>
        </div>
        <div class="modal-footer p-4 bg-secondary rounded-b-3xl flex justify-center">
          <button @click="closeDialog" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        title: String,
    },
    methods: {
      closeDialog() {
        this.$emit('close');
      },
    },
  };
  </script>