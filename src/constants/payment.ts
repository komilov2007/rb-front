import { getTitle } from './domain-themes'
import { type PaymentOptionProps } from '@/types/payment'
import { ReactComponent as IconCash } from '@/assets/icons/cash.svg'
import { ReactComponent as IconVariant } from '@/assets/icons/variant.svg'
import { ReactComponent as IconAlif } from '@/assets/icons/alif.svg'
import { ReactComponent as IconUzum } from '@/assets/icons/uzum.svg'
import { ReactComponent as IconCards } from '@/assets/icons/cards.svg'
import { ReactComponent as IconCardUzum } from '@/assets/icons/uzum-bank.svg'
import { ReactComponent as IconCardPayme } from '@/assets/icons/card-payme.svg'
import { ReactComponent as IconCardClick } from '@/assets/icons/card-click.svg'
import { ReactComponent as IconCardStripe } from '@/assets/icons/card-stripe.svg'
import { ReactComponent as IconCardGlobal } from '@/assets/icons/card-global.svg'
import { ReactComponent as IconBankTransfer } from '@/assets/icons/bank-transfer.svg'
import { ReactComponent as IconPaymentSchedule } from '@/assets/icons/payment-schedule.svg'

export const PAYMENT_TYPES: PaymentOptionProps = {
  CASH: {
    type: 'CASH',
    label: 'cash',
    Icon: IconCash,
    desc: 'when_customer_pays_in_cash',
  },
  CARD: {
    type: 'CARD',
    label: 'card',
    Icon: IconCards,
    desc: 'when_customer_pays_card_to_card',
  },
  PAYME: {
    type: 'PAYME',
    label: 'Payme',
    Icon: IconCardPayme,
  },
  CLICK: {
    type: 'CLICK',
    label: 'Click',
    Icon: IconCardClick,
  },
  GLOBAL_PAY: {
    type: 'GLOBAL_PAY',
    label: 'Global pay',
    Icon: IconCardGlobal,
  },
  PAYME_API: {
    type: 'PAYME_API',
    label: 'Payme',
    Icon: IconCardPayme,
  },
  CLICK_API: {
    type: 'CLICK_API',
    label: 'Click',
    Icon: IconCardClick,
  },
  ROBO_PAY: {
    type: 'ROBO_PAY',
    label: getTitle().paymentTitle,
    Icon: getTitle().paymentIcon,
  },
  ROBO_PAYME: {
    type: 'ROBO_PAYME',
    label: `${getTitle().paymentTitle}(Payme)`,
    Icon: IconCardPayme,
  },
  ROBO_CLICK: {
    type: 'ROBO_CLICK',
    label: `${getTitle().paymentTitle}(Click)`,
    Icon: IconCardClick,
  },
  ROBO_UZUM: {
    type: 'ROBO_UZUM',
    label: `${getTitle().paymentTitle}(Uzum)`,
    Icon: IconCardUzum,
  },
  UZUM: {
    type: 'UZUM',
    label: 'Uzum',
    Icon: IconCardUzum,
  },
  UZUM_NASIYA: {
    type: 'UZUM_NASIYA',
    label: 'Uzum nasiya',
    Icon: IconUzum,
  },
  UZUM_NASIYA_NEW: {
    type: 'UZUM_NASIYA_NEW',
    label: 'Uzum nasiya',
    Icon: IconUzum,
  },
  ALIF_NASIYA: {
    type: 'ALIF_NASIYA',
    label: 'Alif nasiya',
    Icon: IconAlif,
  },
  BANK: {
    type: 'BANK',
    label: 'Bank',
    Icon: IconBankTransfer,
  },
  CLICK_SUPERAPP: {
    type: 'CLICK_SUPERAPP',
    label: 'Click mini app',
    Icon: IconCardClick,
  },
  ZOOMRAD_MINIAPP: {
    type: 'ZOOMRAD_MINIAPP',
    label: 'Zoomrad',
    Icon: IconCards,
  },
  STRIPE: {
    type: 'STRIPE',
    label: 'Stripe',
    Icon: IconCardStripe,
  },
  INSTALLMENT: {
    type: 'INSTALLMENT',
    label: 'installment_payment',
    Icon: IconPaymentSchedule,
  },
  VARIANT: {
    type: 'VARIANT',
    label: 'Variant',
    Icon: IconVariant,
  },
}
