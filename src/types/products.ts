import { type StatusProps } from './stock'
import { type PromoCodeTypes } from './promo-code'

export type ParameterTypeProps = 'single' | 'multiple'

export interface ProductCategoryProps {
  id: number
  name: string
}

export interface ProductListProps {
  category: string
  created_at: string
  discount_price: number
  id: number
  image: string
  is_active: boolean
  is_xit: boolean
  name: string
  price: string
  sale_amount: string
  sale_type: PromoCodeTypes
}

export interface ProductListDiscountProps {
  id: number
  name: string
}

export interface ProductListDiscountOnlineShopProps {
  id: number
  title: string
}

export interface UnitProps {
  id: number
  unit: string
  name: string
}
export interface ProductDetailProps {
  desc_en: string
  desc_ru: string
  desc_uz: string
  id: number
  name_en: string
  name_ru: string
  name_uz: string
  photos: Array<{ photo: string }>
  price: string
  shop: number
  unit: UnitProps
  category: ProductCategoryProps
  parameter: null
  additional_parameter: []
}

export interface OrderProductsProps {
  index: number
  isFirst: boolean
  isLast: boolean
  id: number
  name: string
  price: string
  photo: string
  is_xit: boolean
  have_parameter: boolean
  sale_type: PromoCodeTypes
  sale_amount: string
  discount_price: string
  status: StatusProps
  category: ProductCategoryProps
  amount: number
  count: number
  total: number
  totalPrice: number
}

export interface OrderProductByIdProps {
  additional_parameter: ParameterProps[]
  amount: string
  category: ProductCategoryProps
  desc: string
  id: number
  name: string
  parameter: ParameterProps | null
  photos: Array<{ photo: string }>
  price: string
  shop: string
  status: StatusProps
  unit: UnitProps
  weekly_orders: number
  count: number
  total: number
  totalPrice: number
  sale_type: PromoCodeTypes
  sale_amount: string
  selectedParametr?: number
}

export interface SkusProps {
  id: number
  price: string
  amount: string
  name: string
  status: StatusProps
}

export interface ParameterProps {
  id: number
  name: string
  skus: SkusProps[]
  type: ParameterTypeProps
}
