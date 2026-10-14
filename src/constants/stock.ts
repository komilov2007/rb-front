import { type StatusProps } from '@/types/stock'

interface StockStatusOptionsProps {
  label: string
  value: StatusProps
}

export const STOCK_STATUS_OPTIONS: StockStatusOptionsProps[] = [
  { label: 'unlimited', value: 'UNLIMITED' },
  { label: 'not_available', value: 'NOT_AVAILABLE' },
  { label: 'limited', value: 'LIMITED' },
]
