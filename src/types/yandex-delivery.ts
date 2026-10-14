export interface YandexDeliveryProps {
  token: string
  taxi_class: 'courier' | 'express' | 'cargo'
  min_price: string
}
