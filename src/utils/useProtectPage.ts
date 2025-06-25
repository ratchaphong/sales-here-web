// composables/useProtectPage.ts
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getAccessToken } from '@/utils/token'

export function useProtectPage() {
  const auth = useAuthStore()
  const router = useRouter()

  const redirectIfNotLoggedIn = () => {
    const token = getAccessToken()
    if (!token) {
      router.push('/home')
    }
  }

  onMounted(() => {
    redirectIfNotLoggedIn()
  })

  watch(
    () => auth.profile,
    (newProfile) => {
      if (!newProfile) {
        router.push('/home')
      }
    },
  )
}
