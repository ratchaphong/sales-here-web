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

export interface UserProfile {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  avatar: string
  phoneNumber: string
  address: string
  deletedAt: string | null
  isDeleted: boolean
  role: 'USER' | 'ADMIN' | 'STAFF'
}

export interface UpdateProfilePayload {
  name: string
  phoneNumber: string
  address: string
  avatar?: string
}

const API_BASE = 'https://user-m-service.onrender.com/users'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    profile: null as UserProfile | null,
  }),
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true
      try {
        const res = await axios.post(`${API_BASE}/login`, payload)
        const token = res.data.access_token

        localStorage.setItem('access_token', token)
        localStorage.setItem('username', payload.email)
        localStorage.setItem('loginTime', new Date().toISOString())
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

    async fetchProfile() {
      const token = getAccessToken()
      if (!token) return
      this.loading = true
      try {
        const res = await axios.get<UserProfile>(`${API_BASE}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.profile = res.data
      } catch (err) {
        console.error('❌ Failed to fetch profile:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateProfile(payload: UpdateProfilePayload) {
      const token = getAccessToken()
      if (!token) return
      this.loading = true
      try {
        const res = await axios.patch(`${API_BASE}/profile`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.profile = res.data
        return true
      } catch (err) {
        console.error('❌ Failed to update profile:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.profile = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('loginTime')
    },
  },
})

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}
