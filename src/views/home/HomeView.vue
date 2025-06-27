<template>
  <div class="home-page">
    <Navbar />
    <LoadingOverlay v-if="productStore.loading" />

    <div id="product-scroll" class="product-scroll">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="product-section"
        :style="{ backgroundImage: `url(${product.image})` }"
        @click="goToProduct(product.id)"
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
      :search-text="searchText"
      :sort-mode="sortBy"
      @update:search-text="(val) => (searchText = val)"
      @update:sort-mode="(val) => (sortBy = val)"
      @search="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore, type ProductQuery } from '@/stores/product'
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/Navbar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import BottomSearchBar from './BottomSearchBar.vue'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const auth = useAuthStore()
const router = useRouter()

const searchText = ref('')
const sortBy = ref('')
const showSearch = ref(false)
const query: ProductQuery = {
  sortMode: 'fifo',
  limit: 10,
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  searchText.value = ''
  sortBy.value = ''
}

const handleSearch = async () => {
  query.sortMode = sortBy.value || 'fifo'

  try {
    await productStore.fetchProducts(query)
    const scrollTarget = document.getElementById('product-scroll')
    scrollTarget?.scrollIntoView({ behavior: 'smooth' })
  } catch (err) {
    console.warn('⚠️ ไม่สามารถโหลดข้อมูลผู้ใช้ได้:', err)
  } finally {
    toggleSearch()
  }
}

function goToProduct(id: string) {
  router.push(`/product/${id}`)
}

onMounted(async () => {
  if (!auth.profile) {
    try {
      await auth.fetchProfile()
    } catch (err) {
      console.warn('⚠️ ไม่สามารถโหลดข้อมูลผู้ใช้ได้:', err)
      // หากจำเป็นอาจ redirect ไป login ได้ที่นี่
    }
  }

  if (productStore.products.length === 0) {
    await productStore.fetchProducts(query)
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
  cursor: pointer;
}

.product-info {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 0.75rem;
  /* max-width: 400px; */
  width: 40%;
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
