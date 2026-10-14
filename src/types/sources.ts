import { type PlatformsProps } from './busniness'

export interface SourcesProps {
  bot: number
  code: string
  created_at: string
  id: number
  last_visit_time: string
  name: string
  new_visits: number
  old_visits: number
  order_count: number
  order_sum: number
  platform: PlatformsProps
  shop: number
  total_visits: number
  url: string
}
