export interface ChannelsProps {
  id: number
  name: string
  username: string
  type: 'GROUP' | 'CHANNEL'
}

export interface TelegramPublicationsProps {
  id: number
  chat: number
  photo: string
  content: string
  message_id: number
  product_id: string
  created_at: string
  click_count: number
  button_title: string
}
