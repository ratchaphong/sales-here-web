<template>
  <header class="navbar">
    <router-link to="/home" class="logo"><SalesHereLogo size="sm" /></router-link>
    <nav>
      <router-link v-if="!isLoggedIn" to="/login">เข้าสู่ระบบ</router-link>
      <template v-else>
        <router-link to="/profile">โปรไฟล์</router-link>
        <a @click.prevent="logout" href="#">ออกจากระบบ</a>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import SalesHereLogo from './SalesHereLogo.vue'

const auth = useAuthStore()
const isLoggedIn = computed(() => !!auth.profile)

const logout = () => {
  auth.logout()
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(10px); */
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 1.5rem;
}

.logo {
  color: unset;
  text-decoration: unset;
  font-weight: unset;
  transition: unset;
}

nav {
  display: flex;
  gap: 1.5rem;
}
</style>
