import type { LimitTypeprops } from './profile'

export type SlugProps =
  | 'PBX'
  | 'BILLZ'
  | 'IIKO'
  | 'SMARTUP'
  | 'RKIPPER'
  | 'UZPOST'
  | 'FARGO'
  | 'POSTER'
  | 'INSTAGRAM'
  | 'CLICK_SUPERAPP'
  | 'BTS'
  | 'YANDEX_EATS'
  | 'AMOCRM'
  | 'YANDEX_MARKET'
  | 'YANDEX_DELIVERY'
  | 'BITO'
  | 'UZUM_MARKET'
  | 'NOOR_DELIVERY'
  | 'DIZGO'
  | 'ERA'
  | 'ROBO_POCHTA'
  | 'YESPOS'
  | 'EMU'
  | 'CLOPOS'
  | 'ALIPOS'
  | 'WOLT'
  | 'regos'
  | 'zoomrad_webview'
  | 'robohub'

export interface RoboMarketProps {
  created_at: string
  id: number
  name: string
  updated_at: string
}

export interface RoboMarketSliderProps {
  app: number
  id: number
  photo: string
}

export interface RoboMarketListProps {
  icon: string
  id: number
  name: string
  rate: number
  subscription_slug: keyof LimitTypeprops
}

export interface RoboMarketAppProps extends RoboMarketListProps {
  apps: RoboMarketListProps[]
}

export interface RoboMarketAppDetaiProps {
  created_at: string
  desc: string
  icon: string
  id: number
  market: number
  name: string
  rate: number
  updated_at: string
  slug: SlugProps
  app_medias: Array<{ file: string }>
  subscription_slug: keyof LimitTypeprops
  partner_slug?: string | null
  is_connected?: boolean | null
}

export interface RoboMarketAppReviewsProps {
  app: number
  comment: string
  created_at: string
  hide: boolean
  id: number
  rate: number
  user: string
}

export interface PartnerAppConnectionProps {
  partner_app: string
  is_connected: boolean
  connected_at: string
}
