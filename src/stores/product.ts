import { defineStore } from 'pinia'
import axios from 'axios'

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

const API_BASE = 'https://pd-m-service.onrender.com/products'

export const useProductStore = defineStore('product', {
  state: () => ({
    loading: false,
    products: [] as Product[],
  }),

  actions: {
    async fetchProducts(query: ProductQuery) {
      this.loading = true
      try {
        const res = await axios.get<Product[]>(API_BASE + '/public', {
          params: query,
        })
        this.products = res.data
      } catch (err) {
        console.error('❌ Failed to fetch products:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
