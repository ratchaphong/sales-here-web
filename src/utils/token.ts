// src/utils/token.ts
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

export function removeAccessToken() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('loginTime')
}

export function setAccessToken(token: string) {
  localStorage.setItem('access_token', token)
  localStorage.setItem('loginTime', new Date().toISOString())
}
