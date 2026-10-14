import type { StatusProps } from '@/types/review'

export const STATUS: StatusProps = {
  NEW: {
    label: 'new',
    value: 'NEW',
    bgcolor: 'GREEN20',
    color: 'GREEN',
  },
  ANSWERED: {
    label: 'answered',
    value: 'ANSWERED',
    bgcolor: 'YELLOW10',
    color: 'YELLOW',
  },
}
