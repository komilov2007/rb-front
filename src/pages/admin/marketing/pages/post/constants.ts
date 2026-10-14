import type { SVGProps, FunctionComponent } from 'react'
import { ReactComponent as IconUser } from '@/assets/icons/user.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconPanelSolid } from '@/assets/icons/panel-solid.svg'
import { ReactComponent as IconCheckShield } from '@/assets/icons/check-shield.svg'
import { ReactComponent as IconTelegramSend } from '@/assets/icons/telegram-send.svg'

interface StepProps {
  title: string
  desc: string
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
  color: string
  iconColor: string
  tag?: string
  warning?: string
}

export const STEPS: StepProps[] = [
  {
    title: 'create_telegram_bot_title',
    desc: 'create_telegram_bot_desc',
    Icon: IconTelegramSend,
    color: '#EEF4FF',
    iconColor: '#4F46E5',
  },
  {
    title: 'open_channel_admin_title',
    desc: 'open_channel_admin_desc',
    Icon: IconPanelSolid,
    color: '#ECFEFF',
    iconColor: '#0891B2',
  },
  {
    title: 'add_bot_admin_title',
    desc: 'add_bot_admin_desc',
    Icon: IconUser,
    tag: '@BotUsername',
    color: '#F5F3FF',
    iconColor: '#7C3AED',
  },
  {
    title: 'grant_posting_permissions_title',
    desc: 'grant_posting_permissions_desc',
    Icon: IconCheckShield,
    color: '#ECFDF3',
    iconColor: '#16A34A',
    warning: 'posting_permission_warning',
  },
  {
    title: 'publish_first_post_title',
    desc: 'publish_first_post_desc',
    Icon: IconPlus,
    color: '#F0FDF4',
    iconColor: '#15803D',
  },
]
