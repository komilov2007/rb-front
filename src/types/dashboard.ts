export interface ClientsProps {
  created_at: string
  firstname: string
  id: number
  last_active: string
  orders: number
  phone: string
  photo: string
  username: string
  order_count: number
}

export interface PlatformProps {
  total: number
  CLICK: number
  WEBSITE: number
  TELEGRAM: number
  INSTAGRAM: number
  UZUM: number
  YANDEX: number
}

export interface TrafficSourceProps {
  direct: number
  total: number
  sources: Array<{ name: string; percentage: number }>
}

export type TopProductsProps = Array<{
  id: number
  photo: string
  amount: number
  name: string
}>

export interface MapProps {
  branches: Array<{
    latitude: number
    longitude: number
  }>
  orders: Array<{
    latitude: number
    longitude: number
  }>
  coords: { latitude: number; longitude: number }
}

export type EarningGraphProps = Record<number, number>
export type OrderStatusProps = Record<
  number,
  {
    new: number
    cancel: number
    completed: number
  }
>
