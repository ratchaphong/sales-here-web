<template>
  <div class="sso-wrapper">
    <LoadingOverlay v-if="auth.loading" />
    <p>กำลังเข้าสู่ระบบผ่าน SSO</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const token = route.params.token as string

  if (!token) {
    alert('Token ไม่ถูกต้อง')
    return router.push('/login')
  }

  try {
    localStorage.setItem('access_token', token)
    localStorage.setItem('loginTime', new Date().toISOString())

    await auth.fetchProfile()

    if (auth.profile) {
      router.push('/profile')
    } else {
      throw new Error('ไม่พบข้อมูลผู้ใช้')
    }
  } catch (err) {
    console.error('❌ Token ผิดหรือหมดอายุ', err)
    alert('Token ไม่ถูกต้องหรือหมดอายุ')
    router.push('/login')
  }
})
</script>

<style scoped>
.sso-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.sso-wrapper > p {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-text);
  letter-spacing: 2px;
}
</style>
