import type { SVGProps, FunctionComponent } from 'react'
import { type NotificationTypeProps } from '@/types/notifications'
import { ReactComponent as IconChat } from '@/assets/icons/chat.svg'
import { ReactComponent as IconInvoice } from '@/assets/icons/invoice.svg'

type NotificationsProps = Record<
  NotificationTypeProps,
  {
    text: string
    type: NotificationTypeProps
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  }
>

export const NOTIFICATIONS: NotificationsProps = {
  CHAT: {
    type: 'CHAT',
    Icon: IconChat,
    text: 'new_message',
  },
  ORDER: {
    type: 'ORDER',
    Icon: IconInvoice,
    text: 'new_order_has_been_created',
  },
  ORDER_STATUS: {
    Icon: IconInvoice,
    type: 'ORDER_STATUS',
    text: 'the_order_has_been_canceled_by_customer',
  },
}
