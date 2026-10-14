import { type PlatformsProps } from './busniness'

export type SmsMailingStatusProps = 'moderation' | 'inprocess' | 'confirmed' | 'rejected' | 'admin'

export interface SmsMailingProps {
  created_at: string
  id: number
  last_updated_at: string
  shop: string
  status: SmsMailingStatusProps
  template_name: string
  template_text: string
  total_cost: number
  total_recipients: number
}

export interface SmsMailingUsersProps {
  created_at: string
  firstname: string
  id: number
  last_active: string
  orders: number
  phone: string
  photo: string
  platform: PlatformsProps
  username: string
}

export interface SmsMailingSendProps {
  cost: number
}

export interface SmsMailingRecordProps {
  cost: number
  created_at: string
  delivered_count: number
  id: number
  rejected_count: number
  shop: string
  template: number
  template_text: string
}
