import { ROUTER } from '@/constants/router'

export const TABS = [
  {
    label: 'main',
    value: '',
  },
  {
    label: 'analytics',
    value: `/${ROUTER.WEBSITE_ANALYTICS}`,
  },
  {
    label: 'domain',
    value: `/${ROUTER.WEBSITE_DOMAIN}`,
  },
  {
    label: 'qr_code',
    value: `/${ROUTER.QR_CODE}`,
  },
]
