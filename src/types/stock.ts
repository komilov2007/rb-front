export type StatusProps = 'UNLIMITED' | 'LIMITED' | 'NOT_AVAILABLE'

export type StockInputProps = 'amount' | 'body_price' | 'weight'
interface ParameterProps {
  amount: number
  body_price: number
  id: number
  name: string
  weight: number
  over_price: number
  price: number | null
  sold: number | null
  status: StatusProps | null
  is_parameter: boolean
}

export interface StockProps extends ParameterProps {
  parameters: ParameterProps[]
}

export interface StockStatusProps {
  amount: number | null
  body_price: string | number
  id: number | string
  status: StatusProps
  weight?: number | null
}

export interface StockOnlineShopProps {
  id: string
  name: string
  sold: number
  photo: string
  amount: number
  margin: string
  profit: number
  weight: number | null
  base_price: number
  body_price: number
  sale_speed: number
  total_sold: number
  updated_at: string
  storage_status: StatusProps
  variants: StockOnlineShopProps[]
  extra_fields: {
    barcode: {
      is_enabled: boolean
      value: string
    }
    location_code: {
      is_enabled: boolean
      value: string
    }
    warehouse: {
      is_enabled: boolean
      value: string
    }
  }
}

export interface MonthlyRecordProps {
  index: number
  month: string
  period_end: string
  total_amount: number
  total_change: string
  total_income: number
  total_profit: number
  period_start: string
  profit_change: string
  income_change: string
}

export interface StockOnlineShopMetrics {
  product: {
    id: string
    photo: string
    title: string
    total_sold: number
    total_amount: number
  }
  monthly_record: MonthlyRecordProps[]
}

export interface StockOnlineShopHistory {
  amount: number
  created_at: string
  id: number
  location: null
  total_sold: number
}

export interface StockOnlieProps {
  amount: number
  body_price: number
  sold: number
  storage_status: StatusProps
}
