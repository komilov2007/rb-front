import { type LanguageTypes } from './language'

export interface BannersPropsOnlineShop {
  created_at: string
  updated_at: string
  id: number
  banner_type: string
  product_id?: string
  category_id: number
  have_internal_url: boolean
  desktop_photo: string
  mobile_photo: string
  mobile_photo_url: string
  button_name: string
  button_translations: Record<LanguageTypes, string>
  category_name: string
  product_name: string
  external_url: string
  mobile_photo_key: string
  desktop_photo_key: string
}

export interface BannersProps {
  category: number
  created_at: string
  desktop_photo: string
  have_url: boolean
  id: number
  mobile_photo: string
  product: number
  shop: number
  updated_at: string
  url: string
}

export type BannerProps = 'MAIN' | 'CATEGORY'
export type BannerTypeProps = Record<BannerProps, { value: BannerProps; label: string }>

export type LinkProps = 'PRODUCT' | 'CATEGORY'
export type LinkTypeProps = Record<LinkProps, { value: LinkProps; label: string }>
