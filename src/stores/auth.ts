import { defineStore } from 'pinia'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/token'
import {
  login as loginService,
  register as registerService,
  fetchProfile as fetchProfileService,
  updateProfile as updateProfileService,
  logout as logoutService,
} from '@/services/user'

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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    profile: null as UserProfile | null,
  }),
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true
      try {
        const token = await loginService(payload)
        setAccessToken(token)
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
        await registerService(payload)
      } finally {
        this.loading = false
      }
    },

    async fetchProfile() {
      const token = getAccessToken()
      if (!token) return
      this.loading = true
      try {
        const token = getAccessToken()
        if (!token) throw new Error('No token')
        const user = await fetchProfileService()
        this.profile = user
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
        const updated = await updateProfileService(payload)
        this.profile = updated
        return true
      } catch (err) {
        console.error('❌ Failed to update profile:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await logoutService()
        this.profile = null
        removeAccessToken()
      } catch (err) {
        console.error('❌ Logout failed:', err)
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
