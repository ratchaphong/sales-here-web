<template>
  <DeviceBlocker />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSessionCheck } from './utils/useSessionCheck'
import DeviceBlocker from './components/DeviceBlocker.vue'

useSessionCheck()
</script>

<style>
/* คุณสามารถใส่ global style ที่นี่ได้ หรือเว้นไว้ก็ได้ */
</style>
