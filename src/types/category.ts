import { type SourceProps } from './source'
import { type LanguageTypes } from './language'

export type CategoryTypeProps = 'ADD' | 'ASSIGN'
export type ScrollTypeProps = 'HORIZONTAL' | 'VERTICAL'

export interface CategoryProps {
  child: boolean
  childs: number
  created_at: string
  id: number
  name: string
  photo: string
  products: number
  parent: { id: number; name: string }
}

export interface CategoryDetailProps {
  bot: null
  created_at: string
  id: number
  is_active: boolean
  name_en: string
  name_ru: string
  name_uz: string
  name_tr: string
  parent: { id: number; name: string }
  photo: string
  products: number
  shop: string
  updated_at: string
  branches: number[]
  scroll_type: 'HORIZONTAL' | 'VERTICAL'
}

export interface CategoryListProps {
  id: number
  name: string
}

export interface CategoryMainOnlineShopProps extends CategoryListProps {
  child_categories: CategoryMainOnlineShopProps[]
}

export interface CategoryOnlineShopProps {
  id: number
  name: string
  photo: string
  created_at: string
  child_count: number
  products_count: number
  source: SourceProps | null
}

export interface CategoryCatalogOnlineShopProps {
  id: number
  name: string
  photo_url: string
  categories: []
  categories_count: number
  products_count: number
}

export interface CategoryOnlineShopDetailProps {
  id: number
  photo: string
  photo_key: string
  parent_id: string
  banner_photo: string
  banner_photo_key: string
  scroll_type: ScrollTypeProps
  name_translations: Record<LanguageTypes, string>
}

export interface ResCreateCategoryOnlineShop {
  banner_photo: string
  created_at: string
  id: number
  is_main: boolean
  name: string
  parent_id: number
  photo_url: string
  scroll_type: ScrollTypeProps
  shop_id: string
}
