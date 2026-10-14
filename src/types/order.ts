import { type CurrencyProps } from './currency'
import { type COLORS } from '@/constants/colors'
import { type PlatformsProps } from './busniness'
import { type PromoCodeTypes } from './promo-code'
import type { SVGProps, FunctionComponent } from 'react'
import type { DeliveryTypes, ServiceProps } from './branch'
import type { PaymentProps, PaymentTypeProps } from './payment'

export type OrderStatusesTabProps =
  'LATE' | 'NEW' | 'ON_THE_WAY' | 'PROGRESS' | 'READY' | 'ALL' | 'HISTORY'

export type OrderStatusesProps =
  | 'NEW'
  | 'CANCEL'
  | 'PROGRESS'
  | 'ON_THE_WAY'
  | 'READY'
  | 'COMPLETED'
  | 'DELIVERED'
  | 'CANCELED_BY_CUSTOMER'

export type OrderStatusesDelivryDetailProps =
  'NEW' | 'CANCEL' | 'PROGRESS' | 'READY' | 'COMPLETED' | 'ON_THE_WAY' | 'DELIVERED'

export type OrderStatusesPickUpDetailProps = 'NEW' | 'PROGRESS' | 'READY' | 'COMPLETED'

export type OrderStatusCountProps = Record<OrderStatusesTabProps, number>
export type OrderStatusTabsProps = Record<
  OrderStatusesTabProps,
  {
    value: string
    label: string
    status?: OrderStatusesTabProps | null
    color?: keyof typeof COLORS | null
  }
>

export type OrderStatusFilterProps = Record<
  OrderStatusesProps,
  {
    label: string
    checked: boolean
    status: OrderStatusesProps
  }
>
export interface OrderListProps {
  amount: string
  created_at: string
  customer: string | null
  id: number
  is_paid: boolean
  payment_type: PaymentTypeProps
  platform: PlatformsProps
  service_type: ServiceProps
  status: OrderStatusesProps
  currency: CurrencyProps
  is_manual: boolean
  shipping_datetime?: string | null
  is_visible?: boolean
}

export interface OrderByStatusProps {
  status: OrderStatusesTabProps
}

export interface OrderDetailProps {
  used_ball: number
  is_manual: boolean
  admin_comments: Array<{
    comment: string
    created_at: string
  }>
  items: {
    branch: string
    amount: string
    currency: CurrencyProps
    delivery: null
    discount_amount: string
    delivery_price: string
    subtotal: number
    promo_code: {
      amount: number
      id: number
      percent: number
      type: PromoCodeTypes
    }
    products: Array<{
      amount: string
      count: number
      id: number
      additional_parameter: Array<{
        id: number
        name: string
      }>
      media: string
      parameter: {
        id: number
        name: string
      }
      is_external: boolean
      product_snapshot: {
        discount_price: string
        id: number
        name: string
        sale_amount: number
        sale_type: PromoCodeTypes
        price: string
        unit: string
        desc: string
        variants: [{ id: number; name: string; value: string }]
      }
      product: {
        discount_price: string
        id: number
        name: string
        sale_amount: number
        sale_type: PromoCodeTypes
        price: string
        unit: string
        desc: string
      }
    }>
  }
  order_details: {
    id: number
    courier: string
    operator: string
    address: string
    customer: string
    customer_id: string
    is_paid: boolean
    payment_type: PaymentTypeProps
    phone: string
    service_type: ServiceProps
    status: OrderStatusesProps
    comment: string
    google_url: string
    yandex_url: string
    platform: PlatformsProps
    deliver_type: {
      text: string
      delivery_type: DeliveryTypes
    }
    shipping_datetime: string
    is_yandex_courier_verified: boolean
    location: string
    uzum_nasiya?: {
      contract_id: string
      period: string
      price_month: string
      total: string
      fio: string
      phone: string
      created_at: string
      client_act_pdf: string
    }
  }
  status_datetime: Record<
    OrderStatusesDelivryDetailProps,
    { datetime: string; is_active: boolean; is_completed: boolean }
  >
}

export type OrderDetailStepProps<T> = Array<{
  title: string
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  step: number
  text: string
  status: T
}>

export interface OrderCategoryProps {
  id: number
  name: string
}

export interface OrderServiceProps {
  id: number
  is_active: boolean
  type: ServiceProps
}

export interface OrderFormDetailProps {
  currency: CurrencyProps
  payments: PaymentProps[]
  services: OrderServiceProps[]
}

export type OrderDeliveryProps = Record<
  Exclude<ServiceProps, 'RESERVATION'>,
  {
    value: ServiceProps
    label: string
    desc: string
  }
>

export interface OrderUserAddress {
  address: string
  comment: string
  entrance: number
  floor: number
  id: number
  latitude: number
  longitude: number
  room: number
}
export interface OrderUserInfoProps {
  firstname: string
  id: number
  phone: string
  addresses: OrderUserAddress[]
}

export interface OrderDeliveryPrice {
  delivery: number | string
  delivery_type: DeliveryTypes
}

export interface OrderAutoResponderProps {
  late_time: number
  notifications: {
    CANCEL: {
      en: string
      ru: string
      uz: string
      tr: string
    }
    COMPLETED: {
      en: string
      ru: string
      uz: string
      tr: string
    }
    DELIVERED: {
      en: string
      ru: string
      uz: string
      tr: string
    }
    NEW: {
      en: string
      ru: string
      uz: string
      tr: string
    }
    ON_THE_WAY: {
      en: string
      ru: string
      uz: string
      tr: string
    }
    PROGRESS: {
      en: string
      ru: string
      uz: string
      tr: string
    }
    READY: {
      en: string
      ru: string
      uz: string
      tr: string
    }
  }
}

export interface OrderActionProps extends OrderListProps {
  onUpdate?: () => void
  tab: OrderStatusesTabProps
  queryKey: object | string[]
  variant: 'table' | 'modal'
  comment?: string
  data?: OrderDetailProps
  courierId?: number | null | undefined
}

type ServiceTypeProps = 'YOUR_DELIVERY' | 'FARGO' | 'UZPOST' | 'BTS'

export interface OrderSefviceOptionProps {
  label: string
  value: ServiceTypeProps
  Icon?: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
}

export type OrderSefviceProps = Record<ServiceTypeProps, OrderSefviceOptionProps>

export type StatusProps = Record<
  OrderStatusesProps,
  {
    label: string
    value: OrderStatusesProps
    color: keyof typeof COLORS
    bgcolor: keyof typeof COLORS
  }
>
