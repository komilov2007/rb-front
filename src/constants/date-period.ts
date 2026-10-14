import { type DatePeriodProps } from '@/types/date-period'

export const DATE_PERIOD_FILTER: DatePeriodProps = {
  ALL: {
    value: 'ALL',
    label: 'all',
    checked: false,
  },
  DAILY: {
    value: 'DAILY',
    label: 'daily',
    checked: false,
  },
  WEEKLY: {
    value: 'WEEKLY',
    label: 'weekly',
    checked: false,
  },
  MONTHLY: {
    value: 'MONTHLY',
    label: 'monthly',
    checked: false,
  },
  YEARLY: {
    value: 'YEARLY',
    label: 'yearly',
    checked: false,
  },
  CUSTOM: {
    value: 'CUSTOM',
    label: 'custom',
    checked: false,
  },
}
