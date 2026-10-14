import { type SVGProps, type FunctionComponent } from 'react'

export type PaymentTypeProps =
  | 'CASH'
  | 'CARD'
  | 'PAYME'
  | 'CLICK'
  | 'PAYME_API'
  | 'CLICK_API'
  | 'GLOBAL_PAY'
  | 'ROBO_PAY'
  | 'UZUM_NASIYA'
  | 'ALIF_NASIYA'
  | 'BANK'
  | 'ROBO_PAYME'
  | 'ROBO_CLICK'
  | 'ROBO_UZUM'
  | 'UZUM'
  | 'CLICK_SUPERAPP'
  | 'ZOOMRAD_MINIAPP'
  | 'STRIPE'
  | 'INSTALLMENT'
  | 'VARIANT'
  | 'UZUM_NASIYA_NEW'

export interface PaymentProps {
  id: number
  slug: 'payme' | 'click' | 'no-token' | 'unversal' | 'variant' | 'uzum-nasiya'
  state: PaymentTypeProps
  data: {
    id: number
    is_active: boolean
    updated_at: string
    self_fiscalization?: boolean
    params: {
      token: string
      tin: string
      pinfl: string
    }
  } | null
}

export type PaymentTypeListProps = Array<{
  id: number
  is_active: boolean
  state: PaymentTypeProps
}>

export type PaymentOptionProps = Record<
  PaymentTypeProps,
  {
    desc?: string
    label: string
    type: PaymentTypeProps
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  }
>

export interface VariantAuthPayload {
  phone_number: string
  password: string
  minimal_amount: number
}

export interface VariantAuthResponse {
  data: {
    ok: boolean
  }
}
