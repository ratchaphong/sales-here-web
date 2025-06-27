import { defineStore } from 'pinia'
import { fetchCart, addToCart, deleteCartItem } from '@/services/cart'

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  createdAt: string
  deletedAt: string | null
  isDeleted: boolean
}

export interface CreateCartPayload {
  productId: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    loading: false,
    items: [] as CartItem[],
  }),
  actions: {
    async fetchCart() {
      this.loading = true
      try {
        const items = await fetchCart()
        this.items = items
      } catch (err) {
        console.error('❌ Failed to fetch cart:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async addToCart(payload: CreateCartPayload) {
      this.loading = true
      try {
        const item = await addToCart(payload)
        this.items.push(item)
      } catch (err) {
        console.error('❌ Failed to add to cart:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteCartItem(id: string) {
      this.loading = true
      try {
        await deleteCartItem(id)
        this.items = this.items.filter((item) => item.id !== id)
      } catch (err) {
        console.error('❌ Failed to delete cart item:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    clearCart() {
      this.items = []
    },
  },
})
