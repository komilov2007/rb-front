import { type SocialProps } from '@/types/socials'
import { ReactComponent as IconTiktok } from '@/assets/icons/tiktok.svg'
import { ReactComponent as IconYoutube } from '@/assets/icons/youtube.svg'
import { ReactComponent as IconFacebook } from '@/assets/icons/facebook.svg'
import { ReactComponent as IconWhatsapp } from '@/assets/icons/whatsapp.svg'
import { ReactComponent as IconTelegramSolid } from '@/assets/icons/telegram-solid.svg'
import { ReactComponent as IconInstagramSolid } from '@/assets/icons/instagram-solid.svg'

export const SOCIALS: SocialProps = [
  {
    url: '',
    type: 'INSTAGRAM',
    Icon: IconInstagramSolid,
    placeholder: 'Instagram',
  },
  {
    url: '',
    type: 'TELEGRAM',
    Icon: IconTelegramSolid,
    placeholder: 'Telegram',
  },
  {
    url: '',
    type: 'FACEBOOK',
    Icon: IconFacebook,
    placeholder: 'Facebook',
  },
  {
    url: '',
    type: 'YOUTUBE',
    Icon: IconYoutube,
    placeholder: 'Youtube',
  },
  {
    url: '',
    type: 'TIKTOK',
    Icon: IconTiktok,
    placeholder: 'Tiktok',
  },
  {
    url: '',
    type: 'WHATSAPP',
    Icon: IconWhatsapp,
    placeholder: 'Whatsapp',
  },
]
