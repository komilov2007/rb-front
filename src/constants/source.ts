import type { COLORS } from './colors'
import { type SourceProps } from '@/types/source'

type SourcesProps = Record<
  SourceProps,
  {
    label: string
    value: SourceProps
    color: keyof typeof COLORS
    bgcolor: keyof typeof COLORS
  }
>

export const SOURCES: SourcesProps = {
  ROBOHUB: { label: 'Robohub', value: 'ROBOHUB', color: 'PURPLE', bgcolor: 'PURPLE140' },
  BILLZ: { label: 'Billz', value: 'BILLZ', color: 'BLUE50', bgcolor: 'BLUE40' },
  BITO: { label: 'Bito', value: 'BITO', color: 'BLUE70', bgcolor: 'BLUE90' },
  SMARTUP: { label: 'Smartup', value: 'SMARTUP', color: 'GREEN50', bgcolor: 'GREEN40' },
  DIZGO: { label: 'Dizgo', value: 'DIZGO', color: 'GREEN', bgcolor: 'GREEN20' },
  ERA: { label: 'Era', value: 'ERA', color: 'YELLOW', bgcolor: 'YELLOW10' },
  YESPOS: { label: 'YesPOS', value: 'YESPOS', color: 'BROWN', bgcolor: 'YELLOW50' },
  STORFOX: { label: 'Storfox', value: 'STORFOX', color: 'RED', bgcolor: 'RED20' },
  ALI_POS: { label: 'Ali POS', value: 'ALI_POS', color: 'BLUE100', bgcolor: 'BLUE110' },
  WOLT: { label: 'Wolt', value: 'WOLT', color: 'BLUE20', bgcolor: 'BLUE60' },
  REGOS: { label: 'Regos', value: 'REGOS', color: 'YELLOW40', bgcolor: 'YELLOW20' },
  MANUAL: { label: 'Qo‘lda kiritilgan', value: 'MANUAL', color: 'BLUE10', bgcolor: 'GRAY240' },
  API: { label: 'API', value: 'API', color: 'GRAY20', bgcolor: 'GRAY190' },
  ETL: { label: 'ETL', value: 'ETL', color: 'GRAY20', bgcolor: 'GRAY190' },
  DEFAULT: { label: 'Standart', value: 'DEFAULT', color: 'GRAY20', bgcolor: 'GRAY190' },
}
