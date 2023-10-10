<script setup>
import DefaultBar from "@/components/Navbar/index.vue";
</script>

<template>
  <default-bar />
  <router-view :key="$route.fullPath" />
</template>
