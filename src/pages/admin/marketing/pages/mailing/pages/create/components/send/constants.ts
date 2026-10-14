type SendTimeTypeProps = 'NOW' | 'CUSTOM'

type SendTimeOptionProps = Record<SendTimeTypeProps, { label: string; value: SendTimeTypeProps }>

export const SEND_TIME_OPTIONS: SendTimeOptionProps = {
  NOW: {
    value: 'NOW',
    label: 'Now',
  },
  CUSTOM: {
    value: 'CUSTOM',
    label: 'Custom date&time',
  },
}
