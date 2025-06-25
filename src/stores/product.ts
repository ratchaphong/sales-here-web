import { defineStore } from 'pinia'
import { fetchProducts as fetchProductsService } from '@/services/product'

export interface Product {
  id: string
  name: string
  price: number
  description: string
  createdAt: string
  updatedAt: string
  userId: string
  isDeleted: boolean
  deletedAt: string | null
  image: string
  status: 'ACTIVE' | 'INACTIVE'
}

export interface ProductQuery {
  sortMode: string
  limit: number
}

export const useProductStore = defineStore('product', {
  state: () => ({
    loading: false,
    products: [] as Product[],
  }),
  actions: {
    async fetchProducts(query: ProductQuery) {
      this.loading = true
      try {
        const products = await fetchProductsService(query)
        this.products = products
      } catch (err) {
        console.error('❌ Failed to fetch products:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
