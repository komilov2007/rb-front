import type { LanguageTypes } from '@/types/language'

type PanelsProps = Array<{
  value: LanguageTypes
  name: 'name_en' | 'name_ru' | 'name_uz' | 'name_tr'
}>

export const PANELS: PanelsProps = [
  {
    value: 'uz',
    name: 'name_uz',
  },
  {
    value: 'ru',
    name: 'name_ru',
  },
  {
    value: 'en',
    name: 'name_en',
  },
  {
    value: 'tr',
    name: 'name_tr',
  },
]
