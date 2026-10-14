import type { SourceProps } from './source'
import type { StockOnlieProps } from './stock'
import type { LanguageTypes, TranslationProps } from './language'

export interface OptionProps {
  name: string
  photo: string
  generateId: string
  price: number | null
  available: number | null
  options: Array<{
    name: string
    photo: string
    generateId: string
    price: number | null
    value: TranslationProps & {
      generateId: string
    }
    available: number | null
    name_translations: TranslationProps
    options: Array<{ value: TranslationProps; name_translations: TranslationProps }>
  }>
}

export interface GroupRowProps {
  path: number[]
  level?: number
  expand: boolean
  option: OptionProps
  onCloseExpand: () => void
  onUpdate: (
    generateId: string,
    field: 'price' | 'available' | 'photo',
    value: number | string,
    isChild?: boolean,
    parentId?: string,
  ) => void
}

export interface ProductListOnlineShopProps {
  base_price: number
  created_at: string
  id: string
  is_active: boolean
  photo: string
  title: string
  rating: number
  reviews_count: number
  source: SourceProps | null
}

export interface ProfitProductProps {
  margin: number
  base_price: number
  body_price: number
  profit_amount: number
}

export interface VariantProps {
  id: string
  photo: string
  price: number
  available: number
  options: Array<{
    id: number
    variant_id: number
    name_translations: Record<LanguageTypes, string>
    value_translations: Record<LanguageTypes, string>
  }>
}

export interface ProfitProductDetailProps {
  stock: {
    width: number
    height: number
    length: number
    weight: number
    dimension_unit: string
  }
  id: string
  title: string
  tags: string[]
  images: string[]
  content: string
  measure_id: number
  is_active: boolean
  category_id: number
  category_name: string
  created_at: string
  updated_at: string
  final_price: number
  display_price: string
  reward_points: number
  image_keys: string[]
  export_integrations: string[]
  mxik_code: string | null
  package_code: string | null
  variants: VariantProps[]
  title_translations: Record<LanguageTypes, string>
  description_translations: Record<LanguageTypes, string>
  properties: Array<{
    name_translations: Record<LanguageTypes, string>
    value_translations: Record<LanguageTypes, string>
  }>
  pricing: {
    margin: number
    base_price: number
    body_price: number
    profit_amount: number
    previous_price: number
  }
  n_variants: Array<{
    id: number
    name: string
    name_translations: Record<LanguageTypes, string>
    options: Array<{
      id: number
      name: string
      images: string[]
      stock: StockOnlieProps
      parent_id: number
      variant_id: string
      base_price: number
      final_price: number
      display_price: string
      name_translations: Record<LanguageTypes, string>
    }>
  }>
}

export interface NameProps {
  name_en: string
  name_ru: string
  name_tr: string
  name_uz: string
}

export interface VariantFormProps {
  parentId?: string
  options?:
    | Array<{
        parentId?: string | undefined
        generateId?: string | undefined
        name_ru: string
        name_en: string
        name_tr: string
        name_uz: string
      }>
    | undefined
  isEdit?: boolean | undefined
  generateId?: string | undefined
  name_ru: string
  name_en: string
  name_tr: string
  name_uz: string
}

export interface GroupParamsProps {
  price: number
  parentId?: string
  available: number
  generateId?: string
  photo?: string | undefined
}

export interface GroupsProps extends GroupParamsProps {
  name_translations?: NameProps
  value_translations?: NameProps
  options: Array<{
    variantId?: string
    parentId?: string | undefined
    generateId?: string | undefined
    name_translations?: NameProps
    value_translations?: NameProps
  }>
}
