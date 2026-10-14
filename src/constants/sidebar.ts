import { ROUTER } from './router'
import type { PermissionTypeProps } from '@/types/profile'
import { type SVGProps, type FunctionComponent } from 'react'
import { ReactComponent as IconChat } from '@/assets/icons/chat.svg'
import { ReactComponent as IconCard } from '@/assets/icons/card.svg'
import { ReactComponent as IconRobot } from '@/assets/icons/robot.svg'
import { ReactComponent as IconStore } from '@/assets/icons/store.svg'
import { ReactComponent as IconUsers } from '@/assets/icons/users.svg'
import { ReactComponent as IconInvoice } from '@/assets/icons/invoice.svg'
import { ReactComponent as IconSetting } from '@/assets/icons/setting.svg'
import { ReactComponent as IconTransfer } from '@/assets/icons/transfer.svg'
import { ReactComponent as IconCategory } from '@/assets/icons/category.svg'
import { ReactComponent as IconLocation } from '@/assets/icons/location.svg'
import { ReactComponent as IconCardActive } from '@/assets/icons/card-active.svg'
import { ReactComponent as IconChatActive } from '@/assets/icons/chat-active.svg'
import { ReactComponent as IconPackageBox } from '@/assets/icons/package-box.svg'
import { ReactComponent as IconUsersActive } from '@/assets/icons/users-active.svg'
import { ReactComponent as IconRobotActive } from '@/assets/icons/robot-active.svg'
import { ReactComponent as IconStoreActive } from '@/assets/icons/store-active.svg'
import { ReactComponent as IconFastDelivery } from '@/assets/icons/fast-delivery.svg'
import { ReactComponent as IconChartArrowUp } from '@/assets/icons/chart-arrow-up.svg'
import { ReactComponent as IconInvoiceActive } from '@/assets/icons/invoice-active.svg'
import { ReactComponent as IconSettingActive } from '@/assets/icons/setting-active.svg'
import { ReactComponent as IconTransferActive } from '@/assets/icons/transfer-active.svg'
import { ReactComponent as IconCategoryActive } from '@/assets/icons/category-active.svg'
import { ReactComponent as IconLocationActive } from '@/assets/icons/location-active.svg'
import { ReactComponent as IconPackageBoxActive } from '@/assets/icons/package-box-active.svg'
import { ReactComponent as IconFastDeliveryActive } from '@/assets/icons/fast-delivery-active.svg'
import { ReactComponent as IconChartArrowUpActive } from '@/assets/icons/chart-arrow-up-active.svg'
import { type BusninessTypesProps } from '@/types/busniness'

export interface SidebarProps {
  menu: PermissionTypeProps
  label?: string
  href: string
  active?: boolean
  children?: Array<{
    href: string
    menu: PermissionTypeProps
    isPro?: boolean
  }>
  count?: 'chat' | 'order'
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  IconActive: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  business_type?: BusninessTypesProps
}

export const SIDEBAR: SidebarProps[] = [
  {
    menu: 'dashboard',
    href: ROUTER.DASHBOARD,
    Icon: IconCategory,
    IconActive: IconCategoryActive,
  },
  {
    menu: 'orders',
    href: ROUTER.ORDERS,
    Icon: IconInvoice,
    IconActive: IconInvoiceActive,
    count: 'order',
    children: [
      {
        menu: 'orders',
        href: '',
      },
      {
        menu: 'reservations',
        href: ROUTER.ORDERS_RESERVATIONS,
      },
    ],
  },
  {
    menu: 'customers',
    href: ROUTER.CUSTOMERS,
    Icon: IconUsers,
    IconActive: IconUsersActive,
  },
  {
    menu: 'chat',
    href: ROUTER.CHAT,
    Icon: IconChat,
    count: 'chat',
    IconActive: IconChatActive,
  },
  {
    menu: 'products',
    href: ROUTER.PRODUCTS,
    Icon: IconPackageBox,
    IconActive: IconPackageBoxActive,
    children: [
      {
        menu: 'categories',
        href: ROUTER.CATEGORIES,
      },
      {
        menu: 'products',
        href: ROUTER.PRODUCTS,
      },
      {
        menu: 'discount',
        href: ROUTER.DISCOUNT,
        isPro: true,
      },
      {
        menu: 'IKPU',
        href: ROUTER.IKPU,
      },
      {
        menu: 'stock',
        href: ROUTER.STOCK,
        isPro: true,
      },
    ],
  },
  {
    menu: 'marketing',
    href: ROUTER.MARKETING,
    Icon: IconChartArrowUp,
    IconActive: IconChartArrowUpActive,
    children: [
      {
        menu: 'atmosphere',
        href: ROUTER.MARKETING_ATMOSPHERE,
      },
      {
        menu: 'mailing',
        href: ROUTER.MARKETING_MAILING,
      },
      {
        menu: 'promokod',
        href: ROUTER.MARKETING_PROMO_CODE,
      },
      {
        menu: 'sources',
        href: ROUTER.MARKETING_SOURCES,
        isPro: true,
      },
      {
        menu: 'sms_mailing',
        href: ROUTER.MARKETING_SMS_MAILING,
      },
      {
        menu: 'channel_mailing',
        href: ROUTER.MARKETING_POST,
      },
      {
        menu: 'banner',
        href: ROUTER.BANNERS,
      },
      {
        menu: 'reviews',
        href: ROUTER.MARKETING_REVIEWS,
      },
    ],
  },
  {
    menu: 'platforms',
    href: ROUTER.PLATFORMS,
    Icon: IconRobot,
    IconActive: IconRobotActive,
    children: [
      {
        menu: 'telegram_bot',
        href: ROUTER.TELEGRAM_BOTS,
      },
      {
        menu: 'website',
        href: ROUTER.WEBSITE,
      },
      {
        menu: 'qr_code',
        href: ROUTER.QR_CODE,
        isPro: true,
      },
    ],
  },
  {
    menu: 'payment',
    href: ROUTER.PAYMENT,
    Icon: IconCard,
    IconActive: IconCardActive,
  },
  {
    menu: 'delivery',
    href: ROUTER.DELIVERY,
    Icon: IconFastDelivery,
    IconActive: IconFastDeliveryActive,
  },
  {
    menu: 'branches',
    href: ROUTER.BRANCHES,
    Icon: IconLocation,
    IconActive: IconLocationActive,
  },
  {
    menu: 'employees',
    href: ROUTER.EMPLOYEES,
    Icon: IconUsers,
    IconActive: IconUsersActive,
    children: [
      {
        menu: 'employees',
        href: ROUTER.EMPLOYEES,
      },
      {
        menu: 'roles',
        href: ROUTER.EMPLOYEES_ROLES,
        isPro: true,
      },
      {
        menu: 'courier',
        href: ROUTER.EMPLOYEES_COURIER,
        isPro: true,
      },
    ],
  },
  {
    menu: 'pricing_plan',
    href: ROUTER.PRICING_PLAN,
    Icon: IconTransfer,
    IconActive: IconTransferActive,
    active: true,
  },

  {
    menu: 'market',
    href: ROUTER.ROBO_MARKET,
    Icon: IconStore,
    IconActive: IconStoreActive,
  },
  {
    menu: 'settings',
    href: ROUTER.SETTINGS,
    Icon: IconSetting,
    IconActive: IconSettingActive,
  },
]
