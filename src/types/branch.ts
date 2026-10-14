import { type CityProps, type CountryProps } from './country'

export type ServiceProps =
  | 'DELIVERY'
  | 'PICKUP'
  | 'YANDEX_DELIVERY'
  | 'UZPOST_PICKUP'
  | 'BTS_PICKUP'
  | 'BTS_DELIVERY'
  | 'NOOR_DELIVERY'
  | 'TEZBOR_STANDARD'
  | 'TEZBOR_EXPRESS'
  | 'FARGO_DELIVERY'
  | 'FARGO_PICKUP'
  | 'UZPOST_DELIVERY'
  | 'EMU_DELIVERY'
  | 'RESERVATION'

export type DeliveryTypes = 'FREE' | 'FIXED' | 'FLEXABLE' | 'CUSTOM'

export interface BranchProps {
  address: string
  created_at: string
  id: number
  is_active: boolean
  name: string
  order: number
  service: ServiceProps[]
}

export interface DeliveryProps {
  id: number
  text_uz: string
  text_en: string
  text_ru: string
  text_tr: string
  shop: number
  type: ServiceProps
  price: number
  max_km: number
  every_km_price: number
  inital_km: number
  inital_km_price: number
  is_active: boolean
  cities: CityProps
  country: CountryProps
  delivery: DeliveryTypes
  branches: BranchProps[]
  min_price: number
  shipping_time: boolean
  is_free_threshold: boolean
  max_price: number
  payment_types: number[]
}

export interface BranchListProps extends BranchProps {
  shop: number
  latitude: number
  longitude: number
  group_token: string
}

export interface PickUpProps {
  id: number
  is_active: boolean
  shop: number
  type: string
  branches: BranchProps[]
  shipping_time: boolean
}

export interface BranchDetailProps {
  address: string
  created_at: string
  id: number
  is_active: boolean
  is_main: boolean
  latitude: number
  longitude: number
  name_en: string
  name_ru: string
  name_uz: string
  name_tr: string
  order: number
  shop: string
  service: ServiceProps[]
  working_time: Record<
    number,
    {
      hours: Array<{
        open: string
        close: string
      }>
      is_closed: boolean
    }
  >
}

export interface BranchAllProps {
  id: number
  name: string
}
