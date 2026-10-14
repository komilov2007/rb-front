import { ReactComponent as IconHumo } from '@/assets/icons/humo.svg'
import { ReactComponent as IconUzcard } from '@/assets/icons/uzcard.svg'
import { ReactComponent as IconCreditCard } from '@/assets/icons/credit-card.svg'

export const humoPattern = /^9860\d{12}$/
export const uzcardPattern = /^8600\d{12}$/

export const MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const getIcon = (value: string) => {
  if (value?.startsWith('8600')) {
    return IconUzcard
  }

  if (value?.startsWith('9860')) {
    return IconHumo
  }

  return IconCreditCard
}
