import { ReactComponent as IconSunDark } from '@/assets/icons/sun-dark.svg'
import { ReactComponent as IconSunLight } from '@/assets/icons/sun-light.svg'
import { ReactComponent as IconHalfMoonDark } from '@/assets/icons/half-moon-dark.svg'
import { ReactComponent as IconHalfMoonLight } from '@/assets/icons/half-moon-light.svg'

export const MODES = [
  {
    value: 'light',
    label: 'Light',
    IconLight: IconSunLight,
    IconDark: IconSunDark,
  },
  {
    value: 'dark',
    label: 'Dark',
    IconLight: IconHalfMoonLight,
    IconDark: IconHalfMoonDark,
  },
]
