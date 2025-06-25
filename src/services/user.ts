import api from '@/lib/api' // ดูข้อ 3 ด้านล่าง
import type {
  LoginPayload,
  RegisterPayload,
  UserProfile,
  UpdateProfilePayload,
} from '@/stores/auth'

const API_BASE = 'https://user-m-service.onrender.com/users'

export async function login(payload: LoginPayload): Promise<string> {
  const res = await api.post(API_BASE + '/login', payload)
  return res.data.access_token
}

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post(API_BASE + '/register', payload)
}

export async function fetchProfile(): Promise<UserProfile> {
  const res = await api.get<UserProfile>(API_BASE + '/profile')
  return res.data
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
  const res = await api.patch(API_BASE + '/profile', payload)
  return res.data
}
