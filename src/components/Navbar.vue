<template>
  <header class="navbar">
    <SalesHereLogo size="sm" />
  </header>
</template>

<script setup lang="ts">
import SalesHereLogo from './SalesHereLogo.vue'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(10px); */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
