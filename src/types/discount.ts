export type DiscountTypes = 'PERCENT' | 'AMOUNT'
export type DiscountOnlineShopTypes = 'PERCENT' | 'FIXED'

export interface DiscountProps {
  amount: number
  created_at: string
  finish_date: string
  id: number
  name: string
  percent: number
  products: number
  shop: number
  type: DiscountTypes
}

export interface DiscountDetailProps {
  amount: number
  created_at: string
  finish_date: string
  id: number
  name: string
  percent: number
  products: number[]
  shop: number
  type: DiscountTypes
}

export interface DiscountOnlineShopProps {
  amount: number
  created_at: string
  expires_at: string
  id: number
  name: string
  percent: number
  product_ids: number
  shop: number
  discount_type: DiscountOnlineShopTypes
  products_count: number
}

export interface DiscountDetailOnlineShopProps {
  amount: number
  created_at: string
  expires_at: string
  id: number
  name: string
  percent: number
  product_ids: string[]
  shop: number
  discount_type: DiscountOnlineShopTypes
  products: [{ id: string; title: string }]
}
