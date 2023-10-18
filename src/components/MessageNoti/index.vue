<template>
  <div
    class="fixed text-white bg-primary bottom-5 right-5 z-40 rounded-xl w-56 h-20 px-4 py-2 transition-all ease-in-out duration-500"
    :class="isNoti ? 'right-5' : 'right-[-300px]'"
  >
    <div
      class="absolute top-0 right-2 cursor-pointer"
      @click.stop="$emit('closeMessageNoti')"
    >
      x
    </div>
    <h2 class="text-xl">{{ username }}</h2>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    isNoti: {
      type: Boolean,
      default: false,
    },
    roomId: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      defalut: "",
    },
  },
};
</script>
