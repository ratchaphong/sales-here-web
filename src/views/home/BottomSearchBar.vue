<!-- src/components/BottomSearchBar.vue -->
<template>
  <transition name="fade">
    <div v-if="modelValue" class="bottom-search-bar">
      <input v-model="searchText" placeholder="ค้นหาชื่อสินค้า..." class="search-input" />
      <select v-model="sortBy" class="sort-selector">
        <option value="">เรียงตาม</option>
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <button class="btn-primary">ค้นหา</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:search', value: string): void
  (e: 'update:sort', value: string): void
}>()

const searchText = ref('')
const sortBy = ref('')
const sortOptions = [
  { label: 'เรียงก่อนซื้อก่อน (FIFO)', value: 'fifo' },
  { label: 'เรียงหลังซื้อก่อน (LIFO)', value: 'lifo' },
  { label: 'รายการใหม่ล่าสุด', value: 'newest' },
  { label: 'ราคาต่ำสุด', value: 'price-asc' },
  { label: 'ราคาสูงสุด', value: 'price-desc' },
]

// Emit updates to parent
watch(searchText, (val) => emit('update:search', val))
watch(sortBy, (val) => emit('update:sort', val))
</script>

<style scoped>
.bottom-search-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 1rem;
  z-index: 15;
}

.search-input {
  flex: 1;
}

.sort-selector {
  flex: 1;
}

.bottom-search-bar button {
  flex: 1;
  font-size: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
