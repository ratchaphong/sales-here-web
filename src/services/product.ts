import api from '@/lib/api' // ดูข้อ 3 ด้านล่าง
import type { Product, ProductQuery } from '@/stores/product'

const API_BASE = 'https://pd-m-service.onrender.com/products'

export async function fetchProducts(query: ProductQuery): Promise<Product[]> {
  const res = await api.get<Product[]>(API_BASE + '/public', {
    params: query,
  })
  return res.data
}
