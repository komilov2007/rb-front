export interface AtmosphereImageProps {
  id: number
  category: number | null
  image: string
  order: number
  created_at: string
}

export interface AtmosphereCategoryProps {
  id: number
  shop: string
  name_uz: string
  name_ru: string
  name_en: string
  name_tr: string
  image: string | null
  order: number
  images: AtmosphereImageProps[]
  created_at: string
  updated_at: string
}

export interface AtmosphereProps {
  id: number
  shop: string
  title_uz: string
  title_ru: string
  title_en: string
  title_tr: string
  desc_uz: string
  desc_ru: string
  desc_en: string
  desc_tr: string
  is_active: boolean
  categories: AtmosphereCategoryProps[]
  images: AtmosphereImageProps[]
  updated_at: string
}
