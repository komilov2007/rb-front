import { ROUTER } from '@/constants/router'
import type { COLORS } from '@/constants/colors'
import type { SVGProps, FunctionComponent } from 'react'
import { ReactComponent as IconWebsite } from '@/assets/icons/website.svg'
import { ReactComponent as IconClickSolid } from '@/assets/icons/click-solid.svg'
import { ReactComponent as IconTelegramFill } from '@/assets/icons/telegram-fill.svg'

interface PlatformsProps {
  href?: string
  text?: string
  label: string
  link?: 'bot' | 'website'
  bgcolor: keyof typeof COLORS
  color: keyof typeof COLORS
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  platform: 'CLICK' | 'TELEGRAM' | 'WEBSITE' | 'INSTAGRAM' | 'UZUM' | 'YANDEX'
}

export const PLATFORMS: PlatformsProps[] = [
  {
    color: 'BLUE70',
    bgcolor: 'BLUE60',
    platform: 'TELEGRAM',
    label: 'telegram_bot',
    Icon: IconTelegramFill,
    link: 'bot',
    text: 'create_bot',
    href: ROUTER.TELEGRAM_BOTS,
  },
  {
    color: 'YELLOW',
    label: 'website',
    Icon: IconWebsite,
    bgcolor: 'YELLOW20',
    platform: 'WEBSITE',
    link: 'website',
    href: ROUTER.WEBSITE,
    text: 'create_website',
  },
  {
    color: 'BLUE80',
    label: 'Click',
    Icon: IconClickSolid,
    bgcolor: 'BLUE90',
    platform: 'CLICK',
  },
]
