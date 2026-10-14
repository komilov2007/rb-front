export type AuthTabValueProps = 'phone' | 'email'

export type AuthTabsProps = Record<
  AuthTabValueProps,
  {
    label: string
    value: AuthTabValueProps
  }
>

export const AUTH_TABS: AuthTabsProps = {
  phone: {
    label: 'mobile',
    value: 'phone',
  },
  email: {
    label: 'email',
    value: 'email',
  },
}

export const AUTH_TABS_LIST = Object.values(AUTH_TABS)
