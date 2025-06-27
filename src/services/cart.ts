import api from '@/lib/api'
import type { CartItem, CreateCartPayload } from '@/stores/cart'

const BASE_URL = 'https://ct-m-service.onrender.com/cart'

export async function fetchCart(): Promise<CartItem[]> {
  const res = await api.get<CartItem[]>(`${BASE_URL}/my`)
  return res.data
}

export async function addToCart(payload: CreateCartPayload): Promise<CartItem> {
  const res = await api.post<CartItem>(BASE_URL, payload)
  return res.data
}

export async function deleteCartItem(id: string): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`)
}
