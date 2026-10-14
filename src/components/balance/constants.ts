import { ReactComponent as IconPayme } from '@/assets/icons/payme.svg'
import { ReactComponent as IconStripe } from '@/assets/icons/stripe.svg'
import { ReactComponent as IconClick } from '@/assets/icons/click.svg'
import { ReactComponent as IconUzumBank } from '@/assets/icons/uzum-bank.svg'
import { ReactComponent as IconBankTransfer } from '@/assets/icons/bank-transfer.svg'

export const PAYMENTS = [
  {
    value: 'PAYME',
    Icon: IconPayme,
  },
  {
    value: 'CLICK',
    Icon: IconClick,
  },
  {
    value: 'UZUM',
    Icon: IconUzumBank,
  },
  {
    value: 'STRIPE',
    Icon: IconStripe,
  },
  {
    value: 'BANK',
    Icon: IconBankTransfer,
  },
]
