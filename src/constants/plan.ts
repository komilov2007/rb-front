import type { COLORS } from './colors'
import type { SVGProps, FunctionComponent } from 'react'
import { type PricingPlanTypeProps } from '@/types/profile'
import { ReactComponent as IconGlobal } from '@/assets/icons/global.svg'
import { ReactComponent as IconQrMenu } from '@/assets/icons/qr-menu.svg'
import { ReactComponent as IconTelegramSolid } from '@/assets/icons/telegram.svg'
import { ReactComponent as IconInstagramRound } from '@/assets/icons/instagram-round.svg'
import { ReactComponent as IconClickOutline } from '@/assets/icons/click-outline.svg'

export type PlanTypeProps = 'monthly' | 'halfYearly' | 'yearly'

type TabPlanProps = Record<
  PlanTypeProps,
  {
    label: string
    months: number
    discount: number
    value: PlanTypeProps
    color?: keyof typeof COLORS
    bgcolor?: keyof typeof COLORS
  }
>

export type FeaturesTypeProps = 'telegram' | 'website' | 'qrmenu' | 'instagram' | 'click'

export type FeaturesProps = Record<
  FeaturesTypeProps,
  {
    title: string
    feature: FeaturesTypeProps
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string
      }
    >
  }
>

export interface PricingPlanSubProps {
  title: string
  type: PricingPlanTypeProps
  color?: keyof typeof COLORS
  features: FeaturesTypeProps[]
  bgcolor?: keyof typeof COLORS
}

export type PricingPlanProps = Record<PricingPlanTypeProps, PricingPlanSubProps>

export const TAB_PLANS: TabPlanProps = {
  monthly: {
    label: 'three_month',
    months: 3,
    discount: 0,
    value: 'monthly',
  },
  halfYearly: {
    label: 'six_month',
    discount: 10,
    value: 'halfYearly',
    months: 6,
    bgcolor: 'YELLOW30',
    color: 'BLACK30',
  },
  yearly: {
    label: 'twelve_month',
    discount: 20,
    value: 'yearly',
    months: 12,
    bgcolor: 'PURPLE',
    color: 'WHITE',
  },
}

export const PRICING_PLANS: PricingPlanProps = {
  START: {
    title: 'Start',
    type: 'START',
    features: ['telegram', 'website'],
  },
  BASIC: {
    title: 'Basic',
    type: 'BASIC',
    bgcolor: 'YELLOW30',
    color: 'BLACK30',
    features: ['telegram', 'website', 'qrmenu', 'instagram'],
  },
  PRO: {
    title: 'Professional',
    type: 'PRO',
    bgcolor: 'PURPLE',
    color: 'WHITE',
    features: ['telegram', 'website', 'qrmenu', 'instagram', 'click'],
  },
}

export const FEATURES: FeaturesProps = {
  telegram: {
    Icon: IconTelegramSolid,
    title: 'Telegram bot (WebApp)',
    feature: 'telegram',
  },
  website: {
    Icon: IconGlobal,
    title: 'website',
    feature: 'website',
  },
  qrmenu: {
    Icon: IconQrMenu,
    title: 'qr_menu_catalog',
    feature: 'qrmenu',
  },
  instagram: {
    Icon: IconInstagramRound,
    title: 'Instagram',
    feature: 'instagram',
  },
  click: {
    Icon: IconClickOutline,
    title: 'ClickSuperApp',
    feature: 'click',
  },
}

export const PRICES: Record<PricingPlanTypeProps, number> = {
  START: 300000,
  BASIC: 500000,
  PRO: 900000,
}
