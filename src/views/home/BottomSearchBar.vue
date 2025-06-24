<template>
  <transition name="fade">
    <div v-if="modelValue" class="bottom-search-bar">
      <input
        :value="searchText"
        @input="handleSearchInput"
        placeholder="ค้นหาชื่อสินค้า..."
        class="search-input"
        disabled
      />
      <select :value="sortMode" @change="handleSortChange" class="sort-selector">
        <option value="">เรียงตาม</option>
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <button class="btn-primary" @click="$emit('search')" :disabled="sortMode === ''">
        ค้นหา
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  searchText: string
  sortMode: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:search-text', value: string): void
  (e: 'update:sort-mode', value: string): void
  (e: 'search'): void
}>()

const sortOptions = [
  { label: 'เรียงตามลำดับที่เพิ่มเข้าระบบ (FIFO)', value: 'fifo' },
  { label: 'เรียงตามลำดับที่เพิ่มเข้าระบบ (LIFO)', value: 'lifo' },
  { label: 'รายการใหม่ล่าสุด', value: 'newest' },
  { label: 'ราคาต่ำสุด', value: 'price-asc' },
  { label: 'ราคาสูงสุด', value: 'price-desc' },
]

function handleSearchInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (target) emit('update:search-text', target.value)
}

function handleSortChange(event: Event) {
  const target = event.target as HTMLSelectElement | null
  if (target) emit('update:sort-mode', target.value)
}
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
