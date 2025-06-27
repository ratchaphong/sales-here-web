<template>
  <div class="history-page">
    <Navbar />
    <LoadingOverlay v-if="cartStore.loading" />

    <div class="container">
      <h1>ประวัติรายการของฉัน</h1>

      <section class="cart-section">
        <h2>🛒 ตะกร้าปัจจุบัน</h2>
        <div v-if="cartStore.items.length === 0" class="empty">ไม่มีสินค้าในตะกร้า</div>
        <ul v-else>
          <li v-for="item in cartStore.items" :key="item.id">
            <strong>{{ getProductName(item.productId) }}</strong
            ><br />
            จำนวน: {{ item.quantity }}<br />
            วันที่เพิ่ม: {{ formatDate(item.createdAt) }}<br />
            เวลา: {{ formatTime(item.createdAt) }}<br />
            สถานะ:
            <span v-if="item.isDeleted">ลบแล้ว</span>
            <span v-else>ปกติ</span>
          </li>
        </ul>
      </section>

      <section class="order-section">
        <h2>📦 รายการที่สั่งซื้อสำเร็จ</h2>
        <div v-if="cartStore.orders.length === 0" class="empty">ยังไม่มีประวัติการสั่งซื้อ</div>
        <ul v-else>
          <li v-for="order in cartStore.orders" :key="order.id">
            <strong>{{ getProductName(order.productId) }}</strong
            ><br />
            ราคา: {{ order.totalPrice.toLocaleString() }} บาท<br />
            วันที่: {{ formatDate(order.createdAt) }}<br />
            เวลา: {{ formatTime(order.createdAt) }}<br />
            สถานะ: {{ order.status }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import dayjs from 'dayjs'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const cartStore = useCartStore()
const productStore = useProductStore()

onMounted(async () => {
  // โหลดสินค้า (จะได้ใช้แมพชื่อได้)
  if (productStore.products.length === 0) {
    await productStore.fetchProducts({ sortMode: 'latest', limit: 100 })
  }
  await cartStore.fetchCart()
  await cartStore.fetchOrders()
})

function formatDate(dateStr: string) {
  return dayjs(dateStr).format('DD/MM/YYYY HH:mm')
}

function formatTime(dateStr: string) {
  return dayjs(dateStr).format('HH:mm')
}

function getProductName(productId: string) {
  const product = productStore.products.find((p) => p.id === productId)
  return product ? product.name : `(${productId})`
}
</script>

<style scoped>
.history-page {
  margin-top: 6rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
}

section {
  margin-bottom: 2rem;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-top: 0;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  color: var(--color-text);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

li:last-child {
  border-bottom: none;
}

.empty {
  text-align: center;
  color: #9ca3af; /* เทาอ่อนสำหรับสถานะ */
  margin: 2rem 0;
}
</style>
