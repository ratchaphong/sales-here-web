import { useAuthStore } from '@/stores/auth'
import { getAccessToken } from '@/utils/token'

export async function useSessionCheck() {
  if (typeof window === 'undefined') return

  const auth = useAuthStore()
  const token = getAccessToken()
  const loginTimeStr = localStorage.getItem('loginTime')

  if (!token || !loginTimeStr) return

  try {
    await auth.fetchProfile() // ✅ รอให้ทำงานเสร็จก่อน
  } catch (error) {
    console.error('⚠️ Failed to fetch profile:', error)
    return // ถ้า fetch ไม่ได้ ก็หยุดทำงานต่อ
  }

  const loginTime = new Date(loginTimeStr).getTime()
  const now = Date.now()
  const ONE_HOUR = 60 * 60 * 1000

  const elapsed = now - loginTime
  const remaining = ONE_HOUR - elapsed

  const remainingMin = Math.floor(remaining / 1000 / 60)
  const remainingSec = Math.floor((remaining / 1000) % 60)

  console.log(`⏳ Session remaining: ${remainingMin}m ${remainingSec}s`)

  if (elapsed > ONE_HOUR) {
    console.log('🕒 Session expired, logging out')
    auth.logout()
  }
}
