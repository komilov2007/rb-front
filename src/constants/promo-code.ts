import { type PromoCodeTypes } from '@/types/promo-code'

type PromoCodeOptionsProps = Record<
  PromoCodeTypes,
  {
    label: string
    value: PromoCodeTypes
  }
>

export const PROMO_CODE_OPTIONS: PromoCodeOptionsProps = {
  PERCENT: {
    value: 'PERCENT',
    label: 'percentage_promo_code',
  },
  AMOUNT: {
    value: 'AMOUNT',
    label: 'promo_code_with_amount',
  },
}
