export type PromoCodeTypes = 'PERCENT' | 'AMOUNT'

export interface PromoCodeProps {
  amount: number
  code: string
  end_date: string
  first_order: boolean
  id: number
  limit: number
  min_amount: number
  percent: number
  shop: number
  type: PromoCodeTypes
  used: number
}
