import { type LazyExoticComponent } from 'react'

export interface MailingProps {
  error: number
  file: string
  id: number
  schedule_datetime: string
  success: number
  title: string
  users: number
  clicks: number
  blocked: number
}

export interface MailingDetailProps {
  clicks: number
  created_at: string
  error: number
  file: string
  id: number
  schedule_datetime: string
  success: number
  title: string
  users: number
  blocked: number
}

export interface MailingUsersProps {
  city: number
  country: number
  created_at: string
  firstname: string
  id: number
  last_active: string
  orders: number
  orders_sum: number
}

export type MarketMailingCreateStepProps = 'send' | 'users' | 'description'
export type CreateMailingStepsProps = Record<
  MarketMailingCreateStepProps,
  LazyExoticComponent<() => JSX.Element>
>
export interface FilterKey {
  country: string
  cities: string
  orders: string
  orders_sum: string
  date: string
}
