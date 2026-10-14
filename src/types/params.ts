import { type Params } from 'react-router-dom'

export interface ParamProps extends Params {
  planId: string
  chatId: string
  productId: string
  mailingId: string
  categoryId: string
  customerId: string
  smsMailingId: string
  roboMarketAppId: string
}
