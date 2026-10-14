import { ROUTER } from '@/constants/router'
import { ReactComponent as IconLock } from '@/assets/icons/lock.svg'
import { ReactComponent as IconUser } from '@/assets/icons/user.svg'
import { ReactComponent as IconBell } from '@/assets/icons/bell.svg'
import { ReactComponent as IconGlobe } from '@/assets/icons/globe.svg'
import { ReactComponent as IconLayers } from '@/assets/icons/layers.svg'
import { ReactComponent as IconMyCreditCards } from '@/assets/icons/my-credit-cards.svg'
import { ReactComponent as IconLink } from '@/assets/icons/link.svg'

export const PROFILE_SIDEBAR = [
  {
    to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}`,
    Icon: IconUser,
    title: 'edit_profile',
  },
  {
    to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_PASSWORD}`,
    Icon: IconLock,
    title: 'change_password',
  },
  {
    to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_LANGUAGE}`,
    Icon: IconGlobe,
    title: 'language_settings',
  },
  {
    to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_PLATFORMAS}`,
    Icon: IconLayers,
    title: 'platforms',
  },
  // {
  //   to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_API_INTEGRATION}`,
  //   Icon: IconLink,
  //   title: 'api_integration',
  // },
  {
    to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_NOTIFICATIONS}`,
    Icon: IconBell,
    title: 'notifications',
  },
  {
    to: `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_CARDS}`,
    Icon: IconMyCreditCards,
    title: 'my_cards',
  },
]
