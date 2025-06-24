<template>
  <div class="home-page">
    <Navbar />

    <div class="product-scroll">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="product-section"
        :style="{ backgroundImage: `url(${product.image})` }"
      >
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p class="price">{{ product.price.toLocaleString() }} บาท</p>
        </div>
      </div>
    </div>
    <button class="floating-button" @click="toggleSearch">🔍</button>
    <BottomSearchBar
      v-model="showSearch"
      @update:search="(val) => (searchText = val)"
      @update:sort="(val) => (sortBy = val)"
    />
    <LoadingOverlay v-if="productStore.loading" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProductStore, type ProductQuery } from '@/stores/product'
import Navbar from '@/components/Navbar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import BottomSearchBar from './BottomSearchBar.vue'

const productStore = useProductStore()
const searchText = ref('')
const sortBy = ref('')
const showSearch = ref(false)
const query: ProductQuery = {
  sortMode: 'fifo',
  limit: 10,
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

const filteredProducts = computed(() => {
  let products = [...productStore.products]

  if (searchText.value.trim()) {
    products = products.filter((p) => p.name.toLowerCase().includes(searchText.value.toLowerCase()))
  }

  if (sortBy.value === 'price_asc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price_desc') {
    products.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name))
  }

  return products
})

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts(query)
  }
})
</script>

<style scoped>
.home-page {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.product-scroll {
  margin-top: 64px;
}

.product-section {
  height: 100vh;
  background-size: cover;
  background-position: center;
  scroll-snap-align: start;
  position: relative;
  color: white;
  display: flex;
  align-items: end;
  padding: 2rem;
  box-sizing: border-box;
}

.product-info {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 0.75rem;
  max-width: 400px;
}

.price {
  font-weight: bold;
  margin-top: 0.5rem;
}

.floating-button {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
}

.floating-button:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
