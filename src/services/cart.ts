import api from '@/lib/api'
import type { CartItem, CreateCartPayload, OrderItem } from '@/stores/cart'

const BASE_URL = 'https://ct-m-service.onrender.com'

export async function fetchCart(): Promise<CartItem[]> {
  const res = await api.get<CartItem[]>(`${BASE_URL}/cart/my`)
  return res.data
}

export async function addToCart(payload: CreateCartPayload): Promise<CartItem> {
  const res = await api.post<CartItem>(`${BASE_URL}/cart`, payload)
  return res.data
}

export async function deleteCartItem(id: string): Promise<void> {
  await api.delete(`${BASE_URL}/cart/${id}`)
}

export async function fetchOrders(): Promise<OrderItem[]> {
  const res = await api.get<OrderItem[]>(`${BASE_URL}/order/my`)
  return res.data
}
