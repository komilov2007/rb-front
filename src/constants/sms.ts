import type { COLORS } from './colors'
import { type SmsMailingStatusProps } from '@/types/sms-mailing'

type SmsStatusProps = Record<
  SmsMailingStatusProps,
  {
    label: string
    value: SmsMailingStatusProps
    color: keyof typeof COLORS
    bgcolor: keyof typeof COLORS
  }
>

export const SMS_STATUS: SmsStatusProps = {
  moderation: {
    label: 'under_moderation',
    value: 'moderation',
    bgcolor: 'GRAY240',
    color: 'BLUE10',
  },
  inprocess: {
    label: 'in_process',
    value: 'inprocess',
    bgcolor: 'YELLOW10',
    color: 'YELLOW',
  },
  confirmed: {
    label: 'confirmed',
    value: 'confirmed',
    bgcolor: 'GREEN20',
    color: 'GREEN',
  },
  rejected: {
    label: 'rejected',
    value: 'rejected',
    bgcolor: 'RED20',
    color: 'RED',
  },
  admin: {
    label: 'under_moderation',
    value: 'moderation',
    bgcolor: 'GRAY240',
    color: 'BLUE10',
  },
}
