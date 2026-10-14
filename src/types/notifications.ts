export type NotificationTypeProps = 'ORDER' | 'CHAT' | 'ORDER_STATUS'

export interface NotificationProps {
  created_at: string
  customer: null
  data: {
    chat: number
    message: string
    customer: number
    type: NotificationTypeProps
  }
  id: number
  read: boolean
  shop: string
}

export interface NotificationCountProps {
  chat: number
  notification: number
  order: number
}
