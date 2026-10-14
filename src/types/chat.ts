import { type PlatformProps } from './dashboard'
import { type PlatformsProps } from './busniness'

export type ChatUserTypesProps = 'all' | 'unread' | 'instagram' | 'review'
export type ChatPlatformProps =
  'ALL' | Exclude<PlatformsProps, 'CLICK' | 'YANDEX' | 'ZOOMRAD' | 'GORGONA'>
export type MessageTypeProps = 'ORDER' | 'MESSAGE' | 'REVIEW'

export interface ChatFileProps {
  name: string
  type: 'video' | 'image' | null
  url: string
  size: string
}
export interface MessageProps {
  bot: number
  botuser: number
  created_at: string
  file: ChatFileProps
  id: number
  is_bot: boolean
  is_first: boolean
  is_new: boolean
  message_id: number
  platform: ChatPlatformProps
  shop: number
  text: string
  is_hidden: boolean
  instagram_message_id: number
  instagram_user: number
  message_type: MessageTypeProps
  order_id: number
  products_count: number
  review_data: {
    rating: number
    comment: string
    images: string[]
  }
}

export interface ChatUserProps {
  id: number
  firstname: string
  last_chat_time: string
  photo: string
  chat: {
    last_chat: string
    new_chats_count: number
  }
}

export type ChatPlatformsOptionsProps = Record<
  ChatPlatformProps,
  {
    label: string
    value: ChatPlatformProps
    title: string
  }
>

export interface MessageHeaderProps {
  firstname: string
  phone: string
  photo: string
  platform: PlatformsProps[]
  username: string
}

export interface ChatMessageReturnProps {
  customer_detail: {
    firstname: string
    id: number
    last_chat: string
    last_chat_time: string
    new_chats_count: number
    photo: string
    code: '071'
    message: string
    timestamp: number
  }
  data: {
    shop: string
    customer: string
    is_bot: boolean
    message: string
    platform: PlatformProps
    file: ChatFileProps
    is_hidden: boolean
  }
  type: 'CHAT'
}

export interface ChatSettingsProps {
  answer: string
  auto_answer: boolean
  id: number
  on_bot: boolean
  on_group: boolean
  shop: string
  answer_instagram: string
}
