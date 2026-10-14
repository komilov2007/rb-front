type PackageTypes = 'DOOR_DOOR' | 'DOOR_OFFICE' | 'OFFICE_DOOR' | 'OFFICE_OFFICE'

type OptionTypeProps = 'PICK_UP' | 'DELIVERY'

type OptionsDeliveryProps = Record<OptionTypeProps, { value: OptionTypeProps; label: string }>

type PackageOptionsProps = Record<
  PackageTypes,
  {
    label: string
    value: PackageTypes
  }
>

export const PACKAGE_TYPES: PackageOptionsProps = {
  DOOR_DOOR: {
    value: 'DOOR_DOOR',
    label: 'Door door',
  },
  DOOR_OFFICE: {
    value: 'DOOR_OFFICE',
    label: 'Door office',
  },
  OFFICE_DOOR: {
    value: 'OFFICE_DOOR',
    label: 'Office door',
  },
  OFFICE_OFFICE: {
    value: 'OFFICE_OFFICE',
    label: 'Office office',
  },
}

export const OPTIONS_DELIVERY: OptionsDeliveryProps = {
  PICK_UP: {
    value: 'PICK_UP',
    label: 'pickup_from_door',
  },
  DELIVERY: {
    value: 'DELIVERY',
    label: 'delivery',
  },
}
