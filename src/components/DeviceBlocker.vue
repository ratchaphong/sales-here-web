<template>
  <div class="device-blocker">
    <div class="device-blocker-inner">
      <p>🚫 เว็บไซต์นี้รองรับเฉพาะหน้าจอ Desktop</p>
      <p>กรุณาเปิดด้วยหน้าจอที่กว้างกว่า 1024px</p>
    </div>
  </div>
</template>

<script setup type="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isSmallScreen = ref(false)

const checkScreen = () => {
  isSmallScreen.value = window.innerWidth < 1024
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>

<style scoped>
.device-blocker {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: white;
  color: #2d2d2d;
  display: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.device-blocker-inner {
  /* max-width: 400px; */
  font-size: 1.5rem;
  font-weight: 600;
}

/* ✅ แสดงเฉพาะหน้าจอที่เล็กกว่า 1024px */
@media (max-width: 1023px) {
  .device-blocker {
    display: flex;
  }
}
</style>
