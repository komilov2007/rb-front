import { ROUTER } from '@/constants/router'
import { ReactComponent as IconBts } from '@/assets/icons/bts.svg'
import { ReactComponent as IconReady } from '@/assets/icons/ready.svg'
import { ReactComponent as IconFargo } from '@/assets/icons/fargo.svg'
import { ReactComponent as IconUzpost } from '@/assets/icons/uzpost.svg'
import { ReactComponent as IconProgress } from '@/assets/icons/progress.svg'
import { ReactComponent as IconCompleted } from '@/assets/icons/completed.svg'
import { ReactComponent as IconTruckFill } from '@/assets/icons/truck-fill.svg'
import type {
  StatusProps,
  OrderSefviceProps,
  OrderDeliveryProps,
  OrderStatusTabsProps,
  OrderDetailStepProps,
  OrderStatusFilterProps,
  OrderStatusesPickUpDetailProps,
  OrderStatusesDelivryDetailProps,
} from '@/types/order'

export const ORDERS_STATUS_TABS: OrderStatusTabsProps = {
  ALL: {
    label: 'all',
    value: '',
    status: 'ALL',
  },
  NEW: {
    label: 'new',
    value: `/${ROUTER.ORDERS_NEW}`,
    status: 'NEW',
    color: 'GREEN',
  },
  PROGRESS: {
    label: 'in_progress',
    value: `/${ROUTER.ORDERS_PROGRESS}`,
    status: 'PROGRESS',
    color: 'YELLOW',
  },
  LATE: {
    label: 'late',
    value: `/${ROUTER.ORDERS_LATE}`,
    status: 'LATE',
    color: 'RED',
  },
  READY: {
    label: 'ready',
    value: `/${ROUTER.ORDERS_READY}`,
    status: 'READY',
    color: 'GRAY30',
  },
  ON_THE_WAY: {
    label: 'on_the_way',
    value: `/${ROUTER.ORDERS_ON_THE_WAY}`,
    status: 'ON_THE_WAY',
    color: 'BLUE10',
  },
  HISTORY: {
    label: 'order_history',
    status: 'HISTORY',
    value: `/${ROUTER.ORDERS_HISTORY}`,
  },
}

export const ORDER_STATUS_FILTER: OrderStatusFilterProps = {
  NEW: {
    status: 'NEW',
    checked: false,
    label: 'new',
  },
  PROGRESS: {
    status: 'PROGRESS',
    checked: false,
    label: 'in_progress',
  },
  READY: {
    status: 'READY',
    checked: false,
    label: 'ready',
  },
  ON_THE_WAY: {
    status: 'ON_THE_WAY',
    checked: false,
    label: 'on_the_way',
  },
  COMPLETED: {
    status: 'COMPLETED',
    checked: false,
    label: 'completed',
  },
  DELIVERED: {
    status: 'DELIVERED',
    checked: false,
    label: 'delivered',
  },
  CANCEL: {
    status: 'CANCEL',
    checked: false,
    label: 'cancelled',
  },
  CANCELED_BY_CUSTOMER: {
    status: 'CANCELED_BY_CUSTOMER',
    checked: false,
    label: 'cancelled_by_customer',
  },
}

export const ORDER_DETAIL_DELIVERED_STEPS: OrderDetailStepProps<OrderStatusesDelivryDetailProps> = [
  {
    title: 'created',
    Icon: IconCompleted,
    step: 1,
    text: '',
    status: 'NEW',
  },
  {
    title: 'in_progress',
    Icon: IconProgress,
    step: 2,
    text: '',
    status: 'PROGRESS',
  },
  {
    title: 'ready',
    Icon: IconReady,
    step: 3,
    text: '',
    status: 'READY',
  },
  {
    title: 'on_the_way',
    Icon: IconTruckFill,
    step: 4,
    text: '',
    status: 'ON_THE_WAY',
  },
  {
    title: 'delivered',
    Icon: IconCompleted,
    step: 5,
    text: '',
    status: 'DELIVERED',
  },
]
export const ORDER_DETAIL_PICKUP_STEPS: OrderDetailStepProps<OrderStatusesPickUpDetailProps> = [
  {
    title: 'created',
    Icon: IconCompleted,
    step: 1,
    text: '',
    status: 'NEW',
  },
  {
    title: 'in_progress',
    Icon: IconProgress,
    step: 2,
    text: '',
    status: 'PROGRESS',
  },
  {
    title: 'ready',
    Icon: IconReady,
    step: 3,
    text: '',
    status: 'READY',
  },
  {
    title: 'completed',
    Icon: IconCompleted,
    step: 4,
    text: '',
    status: 'COMPLETED',
  },
]

export const ORDER_DELIVERY_OPTIONS: OrderDeliveryProps = {
  DELIVERY: {
    value: 'DELIVERY',
    label: 'delivery',
    desc: 'delivered_by_yandex_taxi_additional_yandex_taxi_price_will_be_added',
  },
  PICKUP: {
    value: 'PICKUP',
    label: 'pick_up',
    desc: 'you_can_pick_it_up_at_the_nearest_branch',
  },
  YANDEX_DELIVERY: {
    value: 'YANDEX_DELIVERY',
    label: 'yandex_delivery',
    desc: 'yandex_delivery_is_a_convenient_way_to_deliver_your_orders_connect_yandex_delivery_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
  UZPOST_PICKUP: {
    value: 'UZPOST_PICKUP',
    label: 'uzpost_pickup',
    desc: 'uzpost_pickup_desc',
  },
  UZPOST_DELIVERY: {
    value: 'UZPOST_DELIVERY',
    label: 'uzpost_delivery',
    desc: 'uzpost_delivery_is_a_convenient_way_to_deliver_your_orders_connect_uzpost_delivery_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
  EMU_DELIVERY: {
    value: 'EMU_DELIVERY',
    label: 'emu_delivery',
    desc: 'emu_delivery_is_a_convenient_way_to_deliver_your_orders_connect_uzpost_delivery_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
  BTS_PICKUP: {
    value: 'BTS_PICKUP',
    label: 'bts_pickup',
    desc: 'bts_pickup_desc',
  },
  BTS_DELIVERY: {
    value: 'BTS_DELIVERY',
    label: 'bts_delivery',
    desc: 'bts_delivery_is_a_convenient_way_to_deliver_your_orders_connect_bts_delivery_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
  NOOR_DELIVERY: {
    value: 'NOOR_DELIVERY',
    label: 'noor_delivery',
    desc: 'noor_delivery_is_a_convenient_way_to_deliver_your_orders_connect_yandex_delivery_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
  TEZBOR_STANDARD: {
    value: 'TEZBOR_STANDARD',
    label: 'tezbor_standard',
    desc: 'tezbor_standard_desc',
  },
  TEZBOR_EXPRESS: {
    value: 'TEZBOR_EXPRESS',
    label: 'tezbor_express',
    desc: 'tezbor_express_desc',
  },
  FARGO_DELIVERY: {
    value: 'FARGO_DELIVERY',
    label: 'fargo_delivery',
    desc: 'fargo_delivery_is_a_convenient_way_to_deliver_your_orders_connect_fargo_delivery_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
  FARGO_PICKUP: {
    value: 'FARGO_PICKUP',
    label: 'fargo_pickup',
    desc: 'fargo_pickup_is_a_convenient_way_to_deliver_your_orders_connect_fargo_pickup_to_appname_and_start_delivering_your_orders_quickly_and_efficiently',
  },
}

export const ORDER_SERVICE_OPTIONS: OrderSefviceProps = {
  YOUR_DELIVERY: {
    value: 'YOUR_DELIVERY',
    label: 'your_delivery',
  },
  FARGO: {
    value: 'FARGO',
    label: 'Fargo',
    Icon: IconFargo,
  },
  UZPOST: {
    value: 'UZPOST',
    label: 'Uzpost',
    Icon: IconUzpost,
  },
  BTS: {
    value: 'BTS',
    label: 'Bts',
    Icon: IconBts,
  },
}

export const STATUS: StatusProps = {
  NEW: {
    label: 'new',
    value: 'NEW',
    bgcolor: 'GREEN20',
    color: 'GREEN',
  },
  ON_THE_WAY: {
    label: 'on_the_way',
    value: 'ON_THE_WAY',
    bgcolor: 'GRAY240',
    color: 'BLUE10',
  },
  PROGRESS: {
    label: 'in_progress',
    value: 'PROGRESS',
    bgcolor: 'YELLOW10',
    color: 'YELLOW',
  },
  DELIVERED: {
    label: 'delivered',
    value: 'DELIVERED',
    bgcolor: 'BLUE40',
    color: 'BLUE50',
  },
  CANCEL: {
    label: 'cancelled',
    value: 'CANCEL',
    bgcolor: 'RED20',
    color: 'RED',
  },
  READY: {
    label: 'ready',
    value: 'READY',
    bgcolor: 'PURPLE30',
    color: 'PURPLE10',
  },
  COMPLETED: {
    label: 'completed',
    value: 'COMPLETED',
    bgcolor: 'GREEN20',
    color: 'GREEN',
  },
  CANCELED_BY_CUSTOMER: {
    label: 'canceled_by_customer',
    value: 'CANCELED_BY_CUSTOMER',
    bgcolor: 'RED',
    color: 'WHITE',
  },
}
