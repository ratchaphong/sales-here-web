<template>
  <div class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* ดำโปร่งใส */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* ให้อยู่บนสุด */
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top: 5px solid var(--color-primary); /* สีหลักของธีม */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* หมุนแบบไม่หยุด */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
