// src/lib/axios.ts
import axios from 'axios'
import { getAccessToken } from '@/utils/token'

const instance = axios.create({
  baseURL: 'https://user-m-service.onrender.com',
})

instance.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
