import { type COLORS } from '@/constants/colors'

export type ReservationStatusProps = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'

export type ReservationStatusTabProps = 'ALL' | Exclude<ReservationStatusProps, 'CANCELLED'>

export type ReservationAnswerStatusProps = Extract<ReservationStatusProps, 'ACCEPTED' | 'REJECTED'>

export interface ReservationProps {
  id: number
  branch: {
    id: number
    name: string
    address: string | null
    phone: string | null
  }
  botuser: number
  name: string
  phone: string
  extra_phone: string | null
  date: string
  time: string
  guests: number
  comment: string | null
  status: ReservationStatusProps
  seller_comment: string | null
  answered_at: string | null
  cancelled_at: string | null
  created_at: string
  updated_at: string
}

export type ReservationStatsProps = Record<ReservationStatusProps | 'TOTAL', number>

export interface ReservationBranchProps {
  id: number
  name: string
  is_active: boolean
}

export type StatusProps = Record<
  ReservationStatusProps,
  {
    label: string
    value: ReservationStatusProps
    color: keyof typeof COLORS
    bgcolor: keyof typeof COLORS
  }
>

export type ReservationStatusTabsProps = Record<
  ReservationStatusTabProps,
  {
    label: string
    value: ReservationStatusTabProps
    color?: keyof typeof COLORS
  }
>
