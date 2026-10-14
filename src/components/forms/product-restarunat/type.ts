import { type LanguageTypes } from '@/types/language'
import { type SchemaTypeProduct } from '@/utils/schema'
import { type ProductListProps } from '@/types/products'

export type NameProps = keyof Omit<
  SchemaTypeProduct,
  | 'price'
  | 'unit'
  | 'measure'
  | 'parameter'
  | 'additional_parameter'
  | 'images'
  | 'desc_en'
  | 'desc_ru'
  | 'desc_uz'
  | 'desc_tr'
  | 'category'
  | 'branches'
>

export type DescriptionProps = keyof Omit<
  SchemaTypeProduct,
  'price' | 'unit' | 'parameter' | 'additional_parameter' | 'images'
>

export type PanelsProps = Array<{
  label: string
  name: NameProps
  value: LanguageTypes
  description: DescriptionProps
  descriptionLabel: string
}>

export interface FormProductProps {
  id?: number
  count?: number
  noPlus?: boolean
  categoryId?: string | null
  variant: 'edit' | 'add' | 'create'
  handleUpdate: (data?: ProductListProps) => void
}

export interface SkusProps {
  unit: {
    id: number
  }
}

export interface ParameterProps {
  skus: SkusProps[]
}
