<template>
  <DeviceBlocker />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
// @ts-ignore
import DeviceBlocker from '@/components/DeviceBlocker.vue'
</script>

<style>
/* คุณสามารถใส่ global style ที่นี่ได้ หรือเว้นไว้ก็ได้ */
</style>
