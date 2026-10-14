import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { type UserProps, type TokenProps } from '@/types/user'

export const clearUser = () => {
  const value = localStorage.getItem('i18nextLng')
  localStorage.clear()

  sessionStorage.clear()
  if (value !== null) {
    localStorage.setItem('i18nextLng', value)
  }
}

export const setUser = (data: UserProps, isSession?: boolean) => {
  const { isExpiredAccess, isExpiredRefresh, ...values } = data
  const user = JSON.stringify(values)

  if (isSession) {
    sessionStorage.setItem('user', user)
    localStorage.removeItem('user')
  } else {
    localStorage.setItem('user', user)
    sessionStorage.removeItem('user')
  }
}

export const getUser = (): UserProps => {
  const user: UserProps =
    JSON.parse(
      sessionStorage.getItem('user') === 'undefined'
        ? 'null'
        : (sessionStorage.getItem('user') as string),
    ) ??
    JSON.parse(
      localStorage.getItem('user') === 'undefined'
        ? 'null'
        : (localStorage.getItem('user') as string),
    )

  if (user?.access) {
    const jwtAccess: TokenProps = jwtDecode(user.access)
    const jwtRefresh: TokenProps = jwtDecode(user.refresh)
    const isExpiredAccess = dayjs.unix(jwtAccess.exp).diff(dayjs()) < 1
    const isExpiredRefresh = dayjs.unix(jwtRefresh.exp).diff(dayjs()) < 1
    return { ...user, isExpiredAccess, isExpiredRefresh }
  }

  return user
}
