import type { StatusProps, ReservationStatusTabsProps } from '@/types/reservation'

export const STATUS: StatusProps = {
  PENDING: {
    label: 'reservation_pending',
    value: 'PENDING',
    bgcolor: 'YELLOW10',
    color: 'YELLOW',
  },
  ACCEPTED: {
    label: 'reservation_accepted',
    value: 'ACCEPTED',
    bgcolor: 'GREEN20',
    color: 'GREEN',
  },
  REJECTED: {
    label: 'reservation_rejected',
    value: 'REJECTED',
    bgcolor: 'RED20',
    color: 'RED',
  },
  CANCELLED: {
    label: 'reservation_cancelled',
    value: 'CANCELLED',
    bgcolor: 'GRAY240',
    color: 'GRAY30',
  },
}

export const RESERVATION_STATUS_TABS: ReservationStatusTabsProps = {
  ALL: {
    label: 'all',
    value: 'ALL',
  },
  PENDING: {
    label: STATUS.PENDING.label,
    value: 'PENDING',
    color: 'YELLOW',
  },
  ACCEPTED: {
    label: STATUS.ACCEPTED.label,
    value: 'ACCEPTED',
    color: 'GREEN',
  },
  REJECTED: {
    label: STATUS.REJECTED.label,
    value: 'REJECTED',
    color: 'RED',
  },
}
