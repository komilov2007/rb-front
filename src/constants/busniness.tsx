import { ReactComponent as IconGlobe } from '@/assets/icons/globe.svg'
import { ReactComponent as IconZoomrad } from '@/assets/icons/zoomrad.svg'
import { ReactComponent as IconGorgona } from '@/assets/icons/gorgona.svg'
import { ReactComponent as IconWolt } from '@/assets/icons/wolt.svg'
import { ReactComponent as IconYandex } from '@/assets/icons/yandex.svg'
import { ReactComponent as IconTelegram } from '@/assets/icons/telegram.svg'
import { ReactComponent as IconInstagram } from '@/assets/icons/instagram.svg'
import { ReactComponent as IconTelegramSend } from '@/assets/icons/telegram-send.svg'
import { ReactComponent as IconClickOutline } from '@/assets/icons/click-outline.svg'
import type {
  PlatformPlanProps,
  PlatformsOptionsProps,
  BusninessTypesOptionsProps,
} from '@/types/busniness'

export const BUSINESS_TYPES: BusninessTypesOptionsProps = {
  RESTAURANT: {
    value: 'RESTAURANT',
    label: 'restaurant',
  },
  ONLINE_SHOP: {
    value: 'ONLINE_SHOP',
    label: 'online_store',
  },
}

export const PLATFORMS: PlatformsOptionsProps = {
  TELEGRAM: {
    link: 'bot',
    value: 'TELEGRAM',
    label: 'telegram',
    Icon: IconTelegram,
    title: 'telegram_chats',
  },
  WEBSITE: {
    link: 'website',
    value: 'WEBSITE',
    label: 'website',
    Icon: IconGlobe,
    title: 'website_chats',
  },
  CLICK: {
    value: 'CLICK',
    label: 'Click',
    Icon: IconClickOutline,
    title: 'click_chats',
  },
  INSTAGRAM: {
    value: 'INSTAGRAM',
    label: 'Instagram',
    Icon: IconInstagram,
    title: 'Instagram',
  },
  YANDEX: {
    value: 'YANDEX',
    label: 'Yandex',
    Icon: IconYandex,
    title: 'Yandex',
  },
  WOLT: {
    value: 'WOLT',
    label: 'Wolt',
    Icon: IconWolt,
    title: 'Wolt',
  },
  ZOOMRAD: {
    value: 'ZOOMRAD',
    label: 'Zoomrad',
    Icon: IconZoomrad,
    title: 'Zoomrad',
  },
  GORGONA: {
    value: 'GORGONA',
    label: 'Gorgona',
    Icon: IconGorgona,
    title: 'Gorgona',
  },
}

export const PLATFORMS_FORM = Object.values(PLATFORMS).filter(
  p =>
    p.value !== 'CLICK' &&
    p.value !== 'INSTAGRAM' &&
    p.value !== 'YANDEX' &&
    p.value !== 'WOLT' &&
    p.value !== 'ZOOMRAD' &&
    p.value !== 'GORGONA',
)

export const PLATFORM_PLANS: PlatformPlanProps = {
  TELEGRAM: {
    label: PLATFORMS.TELEGRAM.label,
    icon: <IconTelegramSend />,
    value: 'TELEGRAM',
  },
  WEBSITE: {
    label: PLATFORMS.WEBSITE.label,
    icon: <IconGlobe />,
    value: 'WEBSITE',
  },
  TELEGRAM_WEBSITE: {
    label: 'telegram_website',
    icon: (
      <>
        <IconTelegramSend />
        <IconGlobe />
      </>
    ),
    value: 'TELEGRAM_WEBSITE',
  },
}
