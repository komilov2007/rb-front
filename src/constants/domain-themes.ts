import type { FC, SVGProps } from 'react'
import { ReactComponent as IconLogo } from '@/assets/icons/logo.svg'
import { COLORS, LIGHT_COLORS, DARK_COLORS } from '@/constants/colors'
import { ReactComponent as IconLogoEra } from '@/assets/icons/logo-era.svg'
import { ReactComponent as IconBitoPay } from '@/assets/icons/bito-pay.svg'
import { ReactComponent as IconRoboPay } from '@/assets/icons/robo-pay.svg'
import { ReactComponent as IconLogoBito } from '@/assets/icons/logo-bito.svg'
import { ReactComponent as IconLogoSolid } from '@/assets/icons/logo-solid.svg'
import { ReactComponent as IconLogoPlum } from '@/assets/icons/logo-plum.svg'
import { ReactComponent as IconLogoPlumSolid } from '@/assets/icons/logo-plum-solid.svg'
import { ReactComponent as IconLogoBitoSolid } from '@/assets/icons/logo-bito-solid.svg'
import { ReactComponent as IconLogoEraOutline } from '@/assets/icons/logo-era-outline.svg'
import { ReactComponent as IconLogoBitoOutline } from '@/assets/icons/logo-bito-outline.svg'

export const HOSTNAME = window.location.hostname

export interface DomainColorSet {
  COLORS: Partial<typeof COLORS>
  DARK_COLORS?: Partial<typeof COLORS>
  LIGHT_COLORS?: Partial<typeof COLORS>
}

export const DOMAIN_COLOR_MAP: Record<string, DomainColorSet> = {
  'bitomarket.uz': {
    COLORS: {
      PURPLE: '#1A4ED9',
      PURPLE10: '#153EB0',
      PURPLE20:
        'linear-gradient(0deg, rgba(26, 78, 217, 0.15) 0%, rgba(26, 78, 217, 0.15) 100%), #1d2132',
      PURPLE30:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.10) -7.44%, rgba(21, 62, 176, 0.10) 115.82%), #FFF',
      PURPLE40: '#D6DFFA',
      PURPLE50:
        'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(178.89deg, #1A4ED9 -7.44%, #153EB0 115.82%)',
      PURPLE60: '#3C69E4',
      PURPLE70:
        'linear-gradient(0deg, rgba(60, 105, 228, 0.10) 0%, rgba(60, 105, 228, 0.10) 100%), #FFF',
      PURPLE80: 'linear-gradient(179deg, #1A4ED9 -7.44%, #153EB0 115.82%), #FFFFFF',
      PURPLE90: 'linear-gradient(179deg, #1A4ED9 -7.44%, #153EB0 115.82%)',
      PURPLE100:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.05) -7.44%, rgba(21, 62, 176, 0.05) 115.82%)',
      PURPLE110:
        'linear-gradient(0deg, rgba(26, 78, 217, 0.15) 0%, rgba(26, 78, 217, 0.15) 100%), #FFFFFF',
      PURPLE120: '#F8FAFF',
      PURPLE130: 'linear-gradient(0deg, #153EB0 0%, #153EB0 100%), #FFF',
      PURPLE140: '#1a4ed91a',
      PURPLE150: '#E6ECFC',
      PURPLE160: '#153eb059',
      PURPLE170: '#EDF2FC',
      PURPLE180:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.05) -7.44%, rgba(21, 62, 176, 0.05) 115.82%), #FFF',
      PURPLE190:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.20) -7.44%, rgba(21, 62, 176, 0.20) 115.82%), #FFF',
      PURPLE200:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.07) -7.44%, rgba(21, 62, 176, 0.07) 115.82%), #FFF',
      PURPLE210: '#1a4ed961',
      PURPLE220: '#1a4ed900',
      PURPLE230:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.07) -7.44%, rgba(21, 62, 176, 0.07) 115.82%), #101221',
      PURPLE240:
        'linear-gradient(0deg, rgba(60, 105, 228, 0.10) 0%, rgba(60, 105, 228, 0.10) 100%), #282C3C',
      PURPLE250:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.10) -7.44%, rgba(21, 62, 176, 0.10) 115.82%), #FFF',
    },
  },
  'bito.market': {
    COLORS: {
      PURPLE: '#1A4ED9',
      PURPLE10: '#153EB0',
      PURPLE20:
        'linear-gradient(0deg, rgba(26, 78, 217, 0.15) 0%, rgba(26, 78, 217, 0.15) 100%), #1d2132',
      PURPLE30:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.10) -7.44%, rgba(21, 62, 176, 0.10) 115.82%), #FFF',
      PURPLE40: '#D6DFFA',
      PURPLE50:
        'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(178.89deg, #1A4ED9 -7.44%, #153EB0 115.82%)',
      PURPLE60: '#3C69E4',
      PURPLE70:
        'linear-gradient(0deg, rgba(60, 105, 228, 0.10) 0%, rgba(60, 105, 228, 0.10) 100%), #FFF',
      PURPLE80: 'linear-gradient(179deg, #1A4ED9 -7.44%, #153EB0 115.82%), #FFFFFF',
      PURPLE90: 'linear-gradient(179deg, #1A4ED9 -7.44%, #153EB0 115.82%)',
      PURPLE100:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.05) -7.44%, rgba(21, 62, 176, 0.05) 115.82%)',
      PURPLE110:
        'linear-gradient(0deg, rgba(26, 78, 217, 0.15) 0%, rgba(26, 78, 217, 0.15) 100%), #FFFFFF',
      PURPLE120: '#F8FAFF',
      PURPLE130: 'linear-gradient(0deg, #153EB0 0%, #153EB0 100%), #FFF',
      PURPLE140: '#1a4ed91a',
      PURPLE150: '#E6ECFC',
      PURPLE160: '#153eb059',
      PURPLE170: '#EDF2FC',
      PURPLE180:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.05) -7.44%, rgba(21, 62, 176, 0.05) 115.82%), #FFF',
      PURPLE190:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.20) -7.44%, rgba(21, 62, 176, 0.20) 115.82%), #FFF',
      PURPLE200:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.07) -7.44%, rgba(21, 62, 176, 0.07) 115.82%), #FFF',
      PURPLE210: '#1a4ed961',
      PURPLE220: '#1a4ed900',
      PURPLE230:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.07) -7.44%, rgba(21, 62, 176, 0.07) 115.82%), #101221',
      PURPLE240:
        'linear-gradient(0deg, rgba(60, 105, 228, 0.10) 0%, rgba(60, 105, 228, 0.10) 100%), #282C3C',
      PURPLE250:
        'linear-gradient(179deg, rgba(26, 78, 217, 0.10) -7.44%, rgba(21, 62, 176, 0.10) 115.82%), #FFF',
    },
  },
  'hub.era.uz': {
    COLORS: {
      PURPLE: '#14400B',
      PURPLE10: '#0E2D08',
      PURPLE20:
        'linear-gradient(0deg, rgba(20, 64, 11, 0.15) 0%, rgba(20, 64, 11, 0.15) 100%), #1d2132',
      PURPLE30:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.10) -7.44%, rgba(14, 45, 8, 0.10) 115.82%), #FFF',
      PURPLE40: '#D6E6D9',
      PURPLE50:
        'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(178.89deg, #14400B -7.44%, #0E2D08 115.82%)',
      PURPLE60: '#2A6B1C',
      PURPLE70:
        'linear-gradient(0deg, rgba(42, 107, 28, 0.10) 0%, rgba(42, 107, 28, 0.10) 100%), #FFF',
      PURPLE80: 'linear-gradient(179deg, #14400B -7.44%, #0E2D08 115.82%), #FFFFFF',
      PURPLE90: 'linear-gradient(179deg, #14400B -7.44%, #0E2D08 115.82%)',
      PURPLE100:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.05) -7.44%, rgba(14, 45, 8, 0.05) 115.82%)',
      PURPLE110:
        'linear-gradient(0deg, rgba(20, 64, 11, 0.15) 0%, rgba(20, 64, 11, 0.15) 100%), #FFFFFF',
      PURPLE120: '#F8FAF8',
      PURPLE130: 'linear-gradient(0deg, #0E2D08 0%, #0E2D08 100%), #FFF',
      PURPLE140: '#14400B1a',
      PURPLE150: '#E6F3E8',
      PURPLE160: '#0e2d0859',
      PURPLE170: '#EDF7EF',
      PURPLE180:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.05) -7.44%, rgba(14, 45, 8, 0.05) 115.82%), #FFF',
      PURPLE190:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.20) -7.44%, rgba(14, 45, 8, 0.20) 115.82%), #FFF',
      PURPLE200:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.07) -7.44%, rgba(14, 45, 8, 0.07) 115.82%), #FFF',
      PURPLE210: '#14400B61',
      PURPLE220: '#14400B00',
      PURPLE230:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.07) -7.44%, rgba(14, 45, 8, 0.07) 115.82%), #101221',
      PURPLE240:
        'linear-gradient(0deg, rgba(42, 107, 28, 0.10) 0%, rgba(42, 107, 28, 0.10) 100%), #282C3C',
      PURPLE250:
        'linear-gradient(179deg, rgba(20, 64, 11, 0.10) -7.44%, rgba(14, 45, 8, 0.10) 115.82%), #FFF',
    },
  },
  'plummarket.uz': {
    COLORS: {
      BLACK: '#16120F',
      GRAY30: '#848484',
      PURPLE: '#2F8AFF',
      PURPLE10: '#256fd1',
      PURPLE20:
        'linear-gradient(0deg, rgba(47, 138, 255, 0.15) 0%, rgba(47, 138, 255, 0.15) 100%), #1d2132',
      PURPLE30:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.10) -7.44%, rgba(37, 111, 209, 0.10) 115.82%), #FFF',
      PURPLE40: '#d9e9ff',
      PURPLE50:
        'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(178.89deg, #2F8AFF -7.44%, #256fd1 115.82%)',
      PURPLE60: '#5ca5ff',
      PURPLE70:
        'linear-gradient(0deg, rgba(47, 138, 255, 0.10) 0%, rgba(47, 138, 255, 0.10) 100%), #FFF',
      PURPLE80: 'linear-gradient(179deg, #2F8AFF -7.44%, #256fd1 115.82%), #FFFFFF',
      PURPLE90: 'linear-gradient(179deg, #2F8AFF -7.44%, #256fd1 115.82%)',
      PURPLE100:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.05) -7.44%, rgba(37, 111, 209, 0.05) 115.82%)',
      PURPLE110:
        'linear-gradient(0deg, rgba(47, 138, 255, 0.15) 0%, rgba(47, 138, 255, 0.15) 100%), #FFFFFF',
      PURPLE120: '#F8FAFF',
      PURPLE130: 'linear-gradient(0deg, #256fd1 0%, #256fd1 100%), #FFF',
      PURPLE140: '#2f8aff1a',
      PURPLE150: '#e6f0ff',
      PURPLE160: '#256fd159',
      PURPLE170: '#edf5ff',
      PURPLE180:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.05) -7.44%, rgba(37, 111, 209, 0.05) 115.82%), #FFF',
      PURPLE190:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.20) -7.44%, rgba(37, 111, 209, 0.20) 115.82%), #FFF',
      PURPLE200:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.07) -7.44%, rgba(37, 111, 209, 0.07) 115.82%), #FFF',
      PURPLE210: '#2f8aff61',
      PURPLE220: '#2f8aff00',
      PURPLE230:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.07) -7.44%, rgba(37, 111, 209, 0.07) 115.82%), #101221',
      PURPLE240:
        'linear-gradient(0deg, rgba(92, 165, 255, 0.10) 0%, rgba(92, 165, 255, 0.10) 100%), #282C3C',
      PURPLE250:
        'linear-gradient(179deg, rgba(47, 138, 255, 0.10) -7.44%, rgba(37, 111, 209, 0.10) 115.82%), #FFF',
    },
  },
  'robosell.uz': {
    COLORS: {
      PURPLE: COLORS.PURPLE,
    },
  },
}

export const DEFAULT_DOMAIN_COLORS: DomainColorSet = {
  COLORS: {
    PURPLE: COLORS.PURPLE,
  },
}

export const resolveDomainColors = () => {
  if (typeof window === 'undefined') return

  const matched = Object.entries(DOMAIN_COLOR_MAP).find(([domain]) => HOSTNAME.includes(domain))

  const domainColors = matched?.[1] || DEFAULT_DOMAIN_COLORS

  Object.assign(COLORS, domainColors.COLORS)

  if (domainColors.LIGHT_COLORS) {
    Object.assign(LIGHT_COLORS, domainColors.LIGHT_COLORS)
  }

  if (domainColors.DARK_COLORS) {
    Object.assign(DARK_COLORS, domainColors.DARK_COLORS)
  }
}

export const DOMAIN_FONT_MAP: Record<string, string> = {
  'plummarket.uz': 'Manrope, serif',
}

export const DEFAULT_FONT = 'Onest, serif'

export const resolveDomainFont = () => {
  if (typeof window === 'undefined') return DEFAULT_FONT

  const matched = Object.entries(DOMAIN_FONT_MAP).find(([domain]) => HOSTNAME.includes(domain))
  const font = matched?.[1] || DEFAULT_FONT

  document.documentElement.style.setProperty('--app-font', font)

  return font
}

export const DOMAIN_LOGO_MAP: Record<
  string,
  {
    IconLogo: FC<SVGProps<SVGSVGElement>>
    IconLogoSolid: FC<SVGProps<SVGSVGElement>>
    IconLogoSolidDesktop?: FC<SVGProps<SVGSVGElement>>
  }
> = {
  'bitomarket.uz': {
    IconLogo: IconLogoBito,
    IconLogoSolid: IconLogoBitoSolid,
  },
  'bito.market': {
    IconLogo: IconLogoBito,
    IconLogoSolid: IconLogoBitoSolid,
  },
  'hub.era.uz': {
    IconLogo: IconLogoEra,
    IconLogoSolid: IconLogoEra,
  },
  'plummarket.uz': {
    IconLogo: IconLogoPlum,
    IconLogoSolid: IconLogoPlumSolid,
  },
  'robosell.uz': {
    IconLogo,
    IconLogoSolid,
  },
}

export const DEFAULT_LOGO = {
  IconLogo,
  IconLogoSolid,
  IconLogoSolidDesktop: IconLogoSolid,
}

export const getDomainLogo = () => {
  if (typeof window === 'undefined') return DEFAULT_LOGO

  for (const domain in DOMAIN_LOGO_MAP) {
    if (HOSTNAME.includes(domain)) {
      return DOMAIN_LOGO_MAP[domain]
    }
  }

  return DEFAULT_LOGO
}

export const DOMAIN_META_MAP = {
  'bitomarket.uz': {
    platform: 'bito',
    favicon: '/bito/favicon.ico',
    themeColor: COLORS.PURPLE,
    appName: 'Bitomarket',
    icons: [
      { rel: 'manifest', href: '/bito/site.webmanifest' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/bito/apple-touch-icon.png' },
      { rel: 'icon', sizes: '96x96', type: 'image/png', href: '/bito/favicon-96x96.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/bito/favicon.ico' },
      { rel: 'mask-icon', color: COLORS.PURPLE, href: '/bito/safari-pinned-tab.svg' },
    ],
  },
  'bito.market': {
    platform: 'bito',
    favicon: '/bito/favicon.ico',
    themeColor: COLORS.PURPLE,
    appName: 'Bitomarket',
    icons: [
      { rel: 'manifest', href: '/bito/site.webmanifest' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/bito/apple-touch-icon.png' },
      { rel: 'icon', sizes: '96x96', type: 'image/png', href: '/bito/favicon-96x96.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/bito/favicon.ico' },
      { rel: 'mask-icon', color: COLORS.PURPLE, href: '/bito/safari-pinned-tab.svg' },
    ],
  },
  'hub.era.uz': {
    platform: 'era',
    favicon: '/era/favicon.ico',
    themeColor: COLORS.PURPLE,
    appName: 'ERA',
    icons: [
      { rel: 'manifest', href: '/era/site.webmanifest' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/era/apple-touch-icon.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/era/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/era/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/era/favicon.ico' },
      { rel: 'mask-icon', color: COLORS.PURPLE, href: '/era/safari-pinned-tab.svg' },
    ],
  },
  'plummarket.uz': {
    platform: 'plum',
    favicon: '/plum/favicon.ico',
    themeColor: COLORS.PURPLE,
    appName: 'Plum',
    icons: [
      { rel: 'manifest', href: '/plum/site.webmanifest' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/plum/apple-touch-icon.png' },
      { rel: 'icon', sizes: '96x96', type: 'image/png', href: '/plum/favicon-96x96.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/plum/favicon.ico' },
      { rel: 'mask-icon', color: COLORS.PURPLE, href: '/plum/safari-pinned-tab.svg' },
    ],
  },
  'robosell.uz': {
    platform: 'robosell',
    favicon: '/robo/favicon.ico',
    themeColor: COLORS.PURPLE,
    appName: 'Robosell',
    icons: [
      { rel: 'manifest', href: '/robo/site.webmanifest' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/robo/apple-touch-icon.png' },
      { rel: 'icon', sizes: '96x96', type: 'image/png', href: '/robo/favicon-96x96.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/robo/favicon.ico' },
      { rel: 'mask-icon', color: COLORS.PURPLE, href: '/robo/safari-pinned-tab.svg' },
    ],
  },
}

export const getCurrentDomainMeta = () => {
  return (
    Object.entries(DOMAIN_META_MAP).find(([domain]) => HOSTNAME.includes(domain))?.[1] ??
    DOMAIN_META_MAP['robosell.uz']
  )
}

export const DOMAIN_AUTH_LAYOUT = {
  'bitomarket.uz': {
    title: 'all_solutions_to_automate_your_business',
    IconLogoSolid: IconLogoBitoOutline,
    description:
      'register_now_and_launch_your_business_online_in_just_1_day_website_telegram_bot_miniapp_and_full_management_system_ready_to_go',
  },
  'bito.market': {
    title: 'all_solutions_to_automate_your_business',
    IconLogoSolid: IconLogoBitoOutline,
    description:
      'register_now_and_launch_your_business_online_in_just_1_day_website_telegram_bot_miniapp_and_full_management_system_ready_to_go',
  },
  'hub.era.uz': {
    title: 'all_solutions_to_automate_your_business',
    IconLogoSolid: IconLogoEraOutline,
    description:
      'register_now_and_launch_your_business_online_in_just_1_day_website_telegram_bot_miniapp_and_full_management_system_ready_to_go',
  },
  'plummarket.uz': {
    title: 'all_solutions_to_automate_your_business',
    IconLogoSolid,
    description:
      'register_now_and_launch_your_business_online_in_just_1_day_website_telegram_bot_miniapp_and_full_management_system_ready_to_go',
  },
  'robosell.uz': {
    title: '',
    IconLogoSolid,
    description: '',
  },
}

export const getAuthLayoutContent = () => {
  return (
    Object.entries(DOMAIN_AUTH_LAYOUT).find(([domain]) => HOSTNAME.includes(domain))?.[1] ??
    DOMAIN_AUTH_LAYOUT['robosell.uz']
  )
}

export const TITLES = {
  'bitomarket.uz': {
    title: 'Bitomarket',
    sub_domain: '.bitostore.uz',
    new_sub_domain: '.bitosite.uz',
    phone: '+998(93) 501 73 00',
    linkPhone: '+998935017300',
    telegram: 'Bitomarket_support',
    paymentTitle: 'Bito pay',
    paymentIcon: IconBitoPay,
    atmos: false,
    stripe: false,
  },
  'bito.market': {
    title: 'Bitomarket',
    sub_domain: '.bitostore.uz',
    new_sub_domain: '.bitosite.uz',
    phone: '+998(93) 501 73 00',
    linkPhone: '+998935017300',
    telegram: 'Bitomarket_support',
    paymentTitle: 'Bito pay',
    paymentIcon: IconBitoPay,
    atmos: false,
    stripe: false,
  },
  'hub.era.uz': {
    title: 'ERA',
    sub_domain: '.hub.era.uz',
    new_sub_domain: '.hub.era.uz',
    phone: '+998(78) 113 82 12',
    linkPhone: '+998781138212',
    telegram: 'roboselladmin',
    paymentTitle: 'Robo pay',
    paymentIcon: IconRoboPay,
    atmos: true,
    stripe: false,
  },
  'plummarket.uz': {
    title: 'Plum',
    sub_domain: '.plummarket.uz',
    new_sub_domain: '.plummarket.uz',
    phone: '+998(99) 855 55 79',
    linkPhone: '+998998555579',
    telegram: 'Plum_Market',
    paymentTitle: 'Robo pay',
    paymentIcon: IconRoboPay,
    atmos: true,
    stripe: false,
  },
  'robosell.uz': {
    title: 'Robo market',
    sub_domain: '.robostore.uz',
    new_sub_domain: '.robosite.uz',
    phone: '+998(78) 113 82 12',
    linkPhone: '+998781138212',
    telegram: 'roboselladmin',
    paymentTitle: 'Robo pay',
    paymentIcon: IconRoboPay,
    atmos: true,
    stripe: false,
  },
}

export const getTitle = () => {
  return (
    Object.entries(TITLES).find(([domain]) => HOSTNAME.includes(domain))?.[1] ??
    TITLES['robosell.uz']
  )
}
