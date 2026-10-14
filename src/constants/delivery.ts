import { type ServiceProps, type DeliveryTypes } from '@/types/branch'

type DelivryOptionsProps = Record<
  DeliveryTypes,
  {
    label: string
    value: DeliveryTypes
  }
>

export const DELIVERIES: DelivryOptionsProps = {
  FREE: {
    label: 'free_shipping',
    value: 'FREE',
  },
  FIXED: {
    label: 'fixed_shipping',
    value: 'FIXED',
  },
  FLEXABLE: {
    label: 'flexable_shipping',
    value: 'FLEXABLE',
  },
  CUSTOM: {
    label: 'custom_text',
    value: 'CUSTOM',
  },
}

interface DeliveryOptionsProps {
  type: ServiceProps
  checked: boolean
  title: string
}

type DelivryTypesProps = Record<
  ServiceProps,
  {
    title: string
    type: ServiceProps
    checked: boolean
  }
>

export const DELIVERY_TYPES: DelivryTypesProps = {
  DELIVERY: {
    type: 'DELIVERY',
    title: 'delivery',
    checked: false,
  },
  PICKUP: {
    type: 'PICKUP',
    title: 'pick_up',
    checked: false,
  },
  YANDEX_DELIVERY: {
    type: 'YANDEX_DELIVERY',
    title: 'yandex_delivery',
    checked: false,
  },
  UZPOST_PICKUP: {
    type: 'UZPOST_PICKUP',
    title: 'uzpost_pickup',
    checked: false,
  },
  UZPOST_DELIVERY: {
    type: 'UZPOST_DELIVERY',
    title: 'uzpost_delivery',
    checked: false,
  },
  EMU_DELIVERY: {
    type: 'EMU_DELIVERY',
    title: 'emu_delivery',
    checked: false,
  },
  BTS_PICKUP: {
    type: 'BTS_PICKUP',
    title: 'bts_pickup',
    checked: false,
  },
  BTS_DELIVERY: {
    type: 'BTS_DELIVERY',
    title: 'bts_delivery',
    checked: false,
  },
  NOOR_DELIVERY: {
    type: 'NOOR_DELIVERY',
    title: 'noor_delivery',
    checked: false,
  },
  TEZBOR_STANDARD: {
    type: 'TEZBOR_STANDARD',
    title: 'tezbor_standard',
    checked: false,
  },
  TEZBOR_EXPRESS: {
    type: 'TEZBOR_EXPRESS',
    title: 'tezbor_express',
    checked: false,
  },
  FARGO_DELIVERY: {
    type: 'FARGO_DELIVERY',
    title: 'fargo_delivery',
    checked: false,
  },
  FARGO_PICKUP: {
    type: 'FARGO_PICKUP',
    title: 'fargo_pickup',
    checked: false,
  },
  RESERVATION: {
    type: 'RESERVATION',
    title: 'table_reservation',
    checked: false,
  },
}

export const DELIVERY_OPTIONS: DeliveryOptionsProps[] = Object.values(DELIVERY_TYPES)
