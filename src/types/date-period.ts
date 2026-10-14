export type DateTypeProps = 'ALL' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM'
export type DatePeriodProps = Record<
  DateTypeProps,
  {
    value: DateTypeProps
    label: string
    checked: boolean
  }
>
