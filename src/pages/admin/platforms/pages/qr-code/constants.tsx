import { ReactComponent as IconQrCodeA5 } from '@/assets/icons/qr-code-a5.svg'
import { ReactComponent as IconQrCodeA6 } from '@/assets/icons/qr-code-a6.svg'
import { ReactComponent as IconQrCodeA5Active } from '@/assets/icons/qr-code-a5-active.svg'
import { ReactComponent as IconQrCodeA6Active } from '@/assets/icons/qr-code-a6-active.svg'

export const COLORS = [
  '#000000',
  '#8F8F8F',
  '#FE0000',
  '#E7379A',
  '#FF9AC4',
  '#746FFA',
  '#6F2FC1',
  '#100CA1',
  '#017AFF',
  '#18DCDB',
  '#22BF7C',
  '#FF6C08',
  '#A36453',
]

export const BANNER_SIZE = [
  { value: 'A5', label: 'a5_paper', icon: <IconQrCodeA5 />, checkedIcon: <IconQrCodeA5Active /> },
  { value: 'A6', label: 'a6_paper', icon: <IconQrCodeA6 />, checkedIcon: <IconQrCodeA6Active /> },
]
