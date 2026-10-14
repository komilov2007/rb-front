import { type ServiceProps } from './branch'
import { type PlatformsProps } from './busniness'
import { type CurrencyProps } from './currency'
import { type OrderStatusesProps } from './order'
import { type PaymentTypeProps } from './payment'

export interface DetailCustomerProps {
  phone: string
  photo: string
  total_used_ball: number
  cashback_ball: number
  platform: PlatformsProps[]
  shop: number
  username: string
  bot: number
  chat_id: number
  created_at: string
  firstname: string
  id: number
  lang: string
  last_active: string
  last_chat_time: string
  order_history: {
    orders: number
    paid_amount: number
    successfull_orders: number
  }
  addresses: Array<{ id: number; address: string; latitude: number; longitude: number }>
}

export interface CustomerProps {
  cashback_ball: number
  created_at: string
  firstname: string
  id: number
  last_active: string
  orders: number
  phone: string
  photo: string
  username: string
  platform: PlatformsProps[]
}

export interface CustomerOrdersProps {
  amount: string
  created_at: string
  used_ball: number
  currency: CurrencyProps
  customer: string
  id: number
  is_paid: boolean
  payment_type: PaymentTypeProps
  platform: PlatformsProps
  service_type: ServiceProps
  status: OrderStatusesProps
  is_manual: boolean
  is_visible?: boolean
}
