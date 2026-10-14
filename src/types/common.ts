export type DeliveryMerchantTypeProps =
  | 'BTS_DELIVERY'
  | 'UZPOST_DELIVERY'
  | 'YANDEX_DELIVERY'
  | 'NOOR_DELIVERY'
  | 'TEZBOR_DELIVERY'
  | 'FARGO_DELIVERY'
  | 'EMU_DELIVERY'

export interface DeliveryMerchantProps {
  id: number
  cities: number[]
  min_price: number
  payment_types: number[]
  service_type: DeliveryMerchantTypeProps
  pre_order_enabled: boolean
  credentials: {
    token: string
    username: string
    password: string
    taxi_class: string
    login: string
    door_to_door: boolean
  }
}

export interface DeliveryMerchantCityProps {
  id: number
  name: string
  country: number
}

export interface ProductStockProps {
  base_price: number
  id: string
  name: string
  photo: string
  variants: ProductStockProps[]
  weight: number
}

export interface CashbackProps {
  cashback_amount: number
  cashback_enabled: boolean
}

export interface PrivacyPolicyResponseProps {
  policy_general_uz: string
  policy_general_ru: string
  pravicy_policy_uz: string
  pravicy_policy_ru: string
  the_terms_of_service_uz: string
  the_terms_of_service_ru: string
}

export interface GlobalSettingsProps {
  active_payment_type: 'PLUM' | 'ATMOS'
  is_yandex_eats_integrated: boolean
}
