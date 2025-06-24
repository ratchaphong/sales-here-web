<template>
  <div class="home-page">
    <Navbar />
    <!-- <div class="p-4">
      <h1 class="text-xl font-bold">👤 Profile Page</h1>
      <p v-if="auth.profile">
        สวัสดีคุณ {{ auth.profile.name }}
        <br />
        <button @click="auth.logout" class="mt-2 bg-red-500 text-white px-4 py-1 rounded">
          Logout
        </button>
      </p>
      <p v-else>
        คุณยังไม่ได้เข้าสู่ระบบ
        <router-link to="/login" class="text-blue-500 underline">ไปที่ Login</router-link>
      </p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
