import { ROUTER } from '@/constants/router'

export const TABS = [
  {
    label: 'bot_settings',
    value: '',
  },
  {
    label: 'actions',
    value: `/${ROUTER.TELEGRAM_BOTS_ACTIONS}`,
  },
  {
    label: 'qr_code',
    value: `/${ROUTER.QR_CODE}`,
  },
]
