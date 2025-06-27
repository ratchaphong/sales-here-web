<template>
  <div class="product-detail">
    <Navbar />
    <LoadingOverlay v-if="productStore.loading" />

    <div v-else-if="productStore.product" class="product-card">
      <img :src="productStore.product.image" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h2>{{ productStore.product.name }}</h2>
        <p>{{ productStore.product.description }}</p>
        <p class="price">{{ productStore.product.price.toLocaleString() }} บาท</p>
        <div class="quantity-wrapper">
          <label>จำนวน</label>
          <input v-model.number="quantity" type="number" min="1" />
        </div>
        <button @click="addToCart" class="add-button">เพิ่มลงตะกร้า</button>
      </div>
    </div>

    <div v-else class="not-found">
      <p>ไม่พบข้อมูลสินค้า</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import Navbar from '@/components/Navbar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const productId = route.params.id as string
const quantity = ref(1)

onMounted(async () => {
  await productStore.fetchProductById(productId)
})

async function addToCart() {
  if (!productStore.product) return

  if (!authStore.profile) {
    alert('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า')
    router.push('/login')
    return
  }

  try {
    await cartStore.addToCart({
      productId: productStore.product.id,
      quantity: quantity.value,
    })
    alert('เพิ่มสินค้าลงตะกร้าเรียบร้อย')
    router.push('/')
  } catch (err) {
    console.error('❌ เพิ่มสินค้าลงตะกร้าล้มเหลว:', err)
    alert('เกิดข้อผิดพลาดในการเพิ่มลงตะกร้า')
  }
}
</script>

<style scoped>
.product-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  max-width: 400px;
  max-height: 300px; /* ✅ ความสูงสูงสุด */
  object-fit: cover; /* ✅ ครอปภาพให้เต็มกรอบ */
  border-radius: 6px;
  margin-bottom: 10px;
}

.product-info {
  text-align: center;
}

.price {
  font-weight: bold;
  color: #e91e63;
  margin: 10px 0;
}

.quantity-wrapper {
  margin: 10px 0;
}

.quantity-wrapper input {
  width: 60px;
  padding: 5px;
  text-align: center;
  margin: 0 10px;
}

/* .add-button {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #c2185b;
} */

.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
