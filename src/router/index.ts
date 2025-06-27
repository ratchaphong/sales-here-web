import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import ProfileView from '../views/profile/ProfileView.vue'
import { useAuthStore } from '@/stores/auth'
import SSOView from '@/views/sso/SSOView.vue'
import { getAccessToken } from '@/utils/token'
import ProductView from '@/views/product/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/sso/:token',
      name: 'SSO',
      component: SSOView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/', // ✅ เปลี่ยนจาก component: HomeView เป็น redirect
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const token = getAccessToken()

  const loginTimeStr = localStorage.getItem('loginTime')
  const loginTime = loginTimeStr ? new Date(loginTimeStr).getTime() : 0
  const now = Date.now()
  const MAX_SESSION_MS = 60 * 60 * 1000 // 1 ชั่วโมง
  const elapsed = now - loginTime
  const remaining = MAX_SESSION_MS - elapsed

  const remainingMin = Math.floor(remaining / 1000 / 60)
  const remainingSec = Math.floor((remaining / 1000) % 60)

  console.log('🔁 Navigating to:', to.fullPath)
  console.log(`🕒 Session remaining: ${remainingMin}m ${remainingSec}s`)

  if (to.meta.requiresAuth) {
    const expired = elapsed > MAX_SESSION_MS

    if (!token || expired) {
      console.warn('⛔ Session expired or no token → redirecting to /login')
      auth.logout()
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
