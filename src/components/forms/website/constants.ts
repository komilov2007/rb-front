export type DomainsTypeProps = 'YES' | 'NO'

type DomainsProps = Record<
  DomainsTypeProps,
  {
    label: string
    is_sub: boolean
    value: DomainsTypeProps
  }
>

export const DOMAINS: DomainsProps = {
  NO: {
    value: 'NO',
    label: 'no',
    is_sub: true,
  },
  YES: {
    value: 'YES',
    label: 'i_have',
    is_sub: false,
  },
}
