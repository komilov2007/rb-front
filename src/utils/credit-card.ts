import { CREDIT_CARDS } from '@/constants/credit-card'

export const getCreditCardMask = (value: string) => {
  const card =
    Object.values(CREDIT_CARDS).find(c => c.startWiths.find(s => value?.startsWith(s))) ??
    CREDIT_CARDS.DEFAULT
  return card?.mask
}

export const getCreditCardIcon = (value: string) => {
  const card =
    Object.values(CREDIT_CARDS).find(c => c.startWiths.find(s => value?.startsWith(s))) ??
    CREDIT_CARDS.DEFAULT
  return card?.Icon
}

export const validateCreditCardNumber = (card: string) => {
  const value = card.split(' ').join('')
  const originalCard = value.replace(/_/g, '')

  if (!value) {
    return false
  }
  if (originalCard.length === 16) {
    return true
  }
  if (value.length > 3) {
    const card = Object.values(CREDIT_CARDS).find(c => c.startWiths.find(s => value?.startsWith(s)))
    const pattern = card?.exactPatterns.find(c => c.test(value))
    if (value.length !== card?.length || !pattern) {
      return false
    }
  }

  return true
}
