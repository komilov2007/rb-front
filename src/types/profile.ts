import { type CurrencyProps } from './currency'
import { type LanguageTypes } from './language'
import type { BusninessTypesProps, PlatformsPlanTypeProps, PlatformsProps } from './busniness'

export type PricingPlanTypeProps = 'START' | 'BASIC' | 'PRO'

export interface LimitTypeprops {
  payment_systems: boolean
  delivery_services: boolean
  pos_systems: boolean
  warehouse_accounting: boolean
  ip_telephony: boolean
  qI_code: boolean
  social_networks: boolean
  marketplaces: boolean
  domains: boolean
  orders_count: number
  mailing_count: number
}

export type PermissionTypeProps =
  | 'dashboard'
  | 'orders'
  | 'reservations'
  | 'customers'
  | 'chat'
  | 'categories'
  | 'products'
  | 'discount'
  | 'IKPU'
  | 'stock'
  | 'mailing'
  | 'promokod'
  | 'sources'
  | 'banner'
  | 'telegram_bot'
  | 'payment'
  | 'delivery'
  | 'branches'
  | 'employees'
  | 'settings'
  | 'pricing_plan'
  | 'marketing'
  | 'market'
  | 'roles'
  | 'platforms'
  | 'website'
  | 'qr_code'
  | 'courier'
  | 'sms_mailing'
  | 'reviews'
  | 'channel_mailing'
  | 'atmosphere'

export type PermissionProps = Array<{
  can_edit: boolean
  can_view: boolean
  can_delete: boolean
  menu: PermissionTypeProps
}>

export type PermissionObjectProps = Record<
  PermissionTypeProps,
  {
    can_edit: boolean
    can_view: boolean
    can_delete: boolean
    menu: PermissionTypeProps
  }
>
export interface ProfileProps {
  email: string
  firstname: string
  phone: string
  photo: string
}

export interface MeProps {
  id: string
  name: string
  step: number
  account: number
  feed_active: boolean
  main_language: LanguageTypes
  is_admin: boolean
  is_finished: boolean
  integrations: {
    is_wolt: boolean
  }
  is_new_version: boolean
  currency: CurrencyProps
  languages: LanguageTypes[]
  logo: string | null
  subscription: {
    difference: number
    expire_date: string
    is_expired: boolean
    is_free: boolean
    months: number
    tariff: PricingPlanTypeProps
    is_basic: boolean
    platform: PlatformsPlanTypeProps
    limit: LimitTypeprops
    alert_text: string
  }
  platforms: PlatformsProps[]
  permissions: PermissionProps
  business_type: BusninessTypesProps
  permissionObject: PermissionObjectProps
  links: {
    bot: string
    website: string
  }
  slug: string
}

export type PreDashBoardProps = Partial<{
  bot: boolean
  shop_settings: boolean
  category: boolean
  product: boolean
  services: boolean
  is_finished: boolean
  website: boolean
}>

export interface TextProps {
  title: string
  text?: string
  description: string
  value?: string
}

export interface ProfileBotFeedProps {
  link: string
  status: boolean
}

export interface ProfileBotStatusProps {
  feed_active: false
  status: true
}
