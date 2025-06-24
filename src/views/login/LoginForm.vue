<template>
  <div class="form-wrapper">
    <div class="form-container">
      <SalesHereLogo size="lg" />
      <h1 class="form-title">
        {{ isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก' }}
      </h1>
      <div class="form">
        <input
          v-if="!isLogin"
          v-model="name"
          name="name"
          type="text"
          placeholder="ชื่อผู้ใช้งาน"
          class="form-input"
        />
        <input v-model="email" name="email" type="email" placeholder="อีเมล" class="form-input" />
        <input
          v-model="password"
          name="password"
          type="password"
          placeholder="รหัสผ่าน"
          class="form-input"
        />
        <button @click="handleSubmit" class="btn btn-primary">
          {{ isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก' }}
        </button>
      </div>
      <p class="form-toggle">
        <span>{{ isLogin ? 'ยังไม่มีบัญชี?' : 'มีบัญชีแล้ว?' }}</span>
        <a @click.prevent="toggleMode" href="#" class="btn-link">
          {{ isLogin ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ' }}
        </a>
      </p>
    </div>
    <LoadingOverlay v-if="auth.loading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SalesHereLogo from '@/components/SalesHereLogo.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const toggleMode = () => {
  isLogin.value = !isLogin.value
  name.value = ''
  email.value = ''
  password.value = ''
}

const handleSubmit = async () => {
  if (isLogin.value) {
    if (email.value.trim() && password.value.trim()) {
      try {
        await auth.login({
          email: email.value,
          password: password.value,
        })
        router.push('/home')
      } catch (e) {
        alert('เข้าสู่ระบบไม่สำเร็จ')
      }
    }
  } else {
    if (name.value.trim() && email.value.trim() && password.value.trim()) {
      try {
        await auth.register({
          name: name.value,
          email: email.value,
          password: password.value,
        })
        // ✅ หลังสมัครสมาชิกเสร็จ: กลับไปที่ฟอร์ม Login + เคลียร์ค่า
        isLogin.value = true
        name.value = ''
        email.value = ''
        password.value = ''

        alert('สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ')
      } catch (e) {
        alert('สมัครสมาชิกไม่สำเร็จ')
      }
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-muted);
}

.form-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.form-container > .form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 1px;
}

/* 🖱️ ปุ่มหลัก */
.btn {
  display: inline-block;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.15s ease-in-out;
}

.form-toggle {
  text-align: center;
  font-size: 0.95rem;
  color: var(--color-text);
}

.btn-link {
  background: none;
  border: none;
  color: var(--color-primary);
  text-decoration: underline;
  font-weight: 500;
  margin-left: 0.4rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-link:hover {
  color: var(--color-primary-hover);
}
</style>
