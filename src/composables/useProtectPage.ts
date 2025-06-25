// composables/useProtectPage.ts
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAccessToken, useAuthStore } from '@/stores/auth'

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
