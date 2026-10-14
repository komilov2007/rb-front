export type BillzVersionTypeProps = 'v1' | 'v2'

export type BillzVersionProps = Record<
  BillzVersionTypeProps,
  {
    label: string
    value: BillzVersionTypeProps
  }
>

export interface BillzTokenProps {
  billz: {
    username: string
    secret_token: string
    version: BillzVersionTypeProps
  }
}
