import { type COLORS } from '@/constants/colors'

export type ReviewStatusProps = 'NEW' | 'ANSWERED'

export type VariantsProps = Record<string, string>

export interface ReviewProps {
  id: number
  rating: number
  comment: string
  images: string[]
  created_at: string

  customer_name: string
  variants: VariantsProps[]
  status: ReviewStatusProps
  admin_review: { comment: string; created_at: string }
  product: {
    id: string
    photo: string
    title: string
  }
}

export type StatusProps = Record<
  ReviewStatusProps,
  {
    label: string
    value: ReviewStatusProps
    color: keyof typeof COLORS
    bgcolor: keyof typeof COLORS
  }
>
