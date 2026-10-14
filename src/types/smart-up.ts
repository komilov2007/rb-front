export interface SmartUpProps {
  robot: string
  login: string
  fillial: string
  password: string
  warehouse: string
  price_type: {
    code: string
    name: string
    currency_code: string
  }
}

export interface PriceTypeProps {
  code: string
  currency_code: string
  name: string
}
