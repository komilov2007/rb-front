import type { ReactNode } from 'react'
import { type DiscountTypes, type DiscountOnlineShopTypes } from '@/types/discount'
import { ReactComponent as IconSaleTypeAmount } from '@/assets/icons/sale-type-amount.svg'
import { ReactComponent as IconSaleTypePercent } from '@/assets/icons/sale-type-percent.svg'

type DiscountOptionsProps = Record<
  DiscountTypes,
  {
    label: string
    value: DiscountTypes
    icon: ReactNode
  }
>

export const DISCOUNT_OPTIONS: DiscountOptionsProps = {
  PERCENT: {
    value: 'PERCENT',
    label: 'percent',
    icon: <IconSaleTypePercent />,
  },
  AMOUNT: {
    value: 'AMOUNT',
    label: 'amount',
    icon: <IconSaleTypeAmount />,
  },
}

type DiscountOptionsOnlineShopProps = Record<
  DiscountOnlineShopTypes,
  {
    label: string
    value: DiscountOnlineShopTypes
    icon: ReactNode
  }
>

export const DISCOUNT_OPTIONS_ONLINE_SHOP: DiscountOptionsOnlineShopProps = {
  PERCENT: {
    value: 'PERCENT',
    label: 'percent',
    icon: <IconSaleTypePercent />,
  },
  FIXED: {
    value: 'FIXED',
    label: 'amount',
    icon: <IconSaleTypeAmount />,
  },
}
