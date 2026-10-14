import { type CurrencyProps } from './currency'
import { type LanguageTypes } from './language'
import { type SocialTypeProps } from './socials'

export interface SettingsProps {
  logo: string
  name: string
  cashback_amount: number
  cashback_enabled: boolean
  main_language: LanguageTypes
  desc_en: string | null
  desc_ru: string | null
  desc_uz: string | null
  desc_tr: string | null
  socials: Array<{ url: string; type: SocialTypeProps }>
  business_phone: string
  languages: LanguageTypes[]
  address: {
    latitude: number
    longitude: number
    branch_name: { name_en: string; name_ru: string; name_uz: string; name_tr: string }
  }
  currency: CurrencyProps
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
