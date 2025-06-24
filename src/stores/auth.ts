import { defineStore } from 'pinia'
import axios from 'axios'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

const API_BASE = 'https://user-m-service.onrender.com/users'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginTime: null as string | null,
    loading: false,
  }),
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true
      try {
        const res = await axios.post(`${API_BASE}/login`, payload)
        const token = res.data.access_token

        this.loginTime = new Date().toISOString()

        localStorage.setItem('access_token', token)
        localStorage.setItem('username', payload.email)
        localStorage.setItem('loginTime', this.loginTime)
      } catch (err) {
        console.error('❌ Login failed:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterPayload) {
      this.loading = true
      try {
        await axios.post(`${API_BASE}/register`, payload)
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.loginTime = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('loginTime')
    },
  },
})
