export type MessageStatusProps =
  | 'CANCELED_BY_CUSTOMER'
  | 'NEW'
  | 'LATE_ORDER'
  | 'CANCEL'
  | 'PROGRESS'
  | 'ON_THE_WAY'
  | 'READY'
  | 'COMPLETED'
  | 'DELIVERED'

type MessageProps = Record<MessageStatusProps, { value: MessageStatusProps; label: string }>

export const MESSAGES: MessageProps = {
  NEW: {
    value: 'NEW',
    label: 'new_order_has_been_created',
  },
  CANCELED_BY_CUSTOMER: {
    value: 'CANCELED_BY_CUSTOMER',
    label: 'the_order_has_been_canceled_by_customer',
  },
  LATE_ORDER: {
    value: 'LATE_ORDER',
    label: 'the_order_has_been_late',
  },
  CANCEL: {
    value: 'CANCEL',
    label: 'the_order_has_been_canceled_by_admin',
  },
  PROGRESS: {
    value: 'PROGRESS',
    label: 'the_order_is_in_progress',
  },
  ON_THE_WAY: {
    value: 'ON_THE_WAY',
    label: 'the_order_is_on_the_way',
  },
  READY: {
    value: 'READY',
    label: 'the_order_is_ready',
  },
  COMPLETED: {
    value: 'COMPLETED',
    label: 'the_order_is_completed',
  },
  DELIVERED: {
    value: 'DELIVERED',
    label: 'the_order_is_delivered',
  },
}
