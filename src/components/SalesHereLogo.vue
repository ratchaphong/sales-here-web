<template>
  <div class="sales-logo">
    <div class="logo-text">
      <div class="word-first-line" :style="`--logo-size: ${sizeValue}`">
        <span class="word-main">S</span>&<span class="word-accent">H</span>
      </div>
      <small>we're looking the best thing for you</small>
    </div>
  </div>
</template>

<script setup lang="ts">
const sizeMap = {
  xs: '1rem',
  sm: '2rem',
  md: '4rem',
  lg: '6rem',
} as const

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (val: string): val is keyof typeof sizeMap => ['sm', 'md', 'lg'].includes(val),
  },
})

// ✅ แก้ตรงนี้
const sizeValue = sizeMap[props.size as keyof typeof sizeMap]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@500;600;700&family=Mali:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');

.sales-logo {
  --color-primary: #a58c7e;
  --color-text: #2d2d2d;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-text .word-first-line {
  font-family: 'Luxurious Script', cursive;
  font-weight: bold;
  font-size: var(--logo-size);
  letter-spacing: 0.02em;
}

.logo-text small {
  margin-top: -0.5rem;
  font-family: 'Prompt', 'Mali', sans-serif;
  font-weight: bold;
  font-size: 0.5rem;
  letter-spacing: 0.02em;
}

.word-main {
  color: var(--color-text);
}

.word-accent {
  color: var(--color-primary);
}
</style>
