import type { SVGProps, FunctionComponent } from 'react'

export type CreditCardTypeProps = 'HUMO' | 'UZCARD' | 'DEFAULT'

export type CreditCardProps = Record<
  CreditCardTypeProps,
  {
    gap: number
    label: string
    length: number
    startWiths: string[]
    value: CreditCardTypeProps
    exactPatterns: RegExp[]
    mask: Array<RegExp | string>
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string
      }
    >
  }
>
