<template>
  <!-- <div class="p-4">
    <h1 class="text-xl font-bold">👤 Profile Page</h1>
    <p v-if="auth.isLoggedIn">
      สวัสดีคุณ {{ auth.username }}
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
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
