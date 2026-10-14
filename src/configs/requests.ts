import { ROUTER } from '@/constants/router'
import { type ErrorProps } from '@/types/error'
import axios, { type AxiosHeaders } from 'axios'
import { clearUser, getUser } from '@/utils/user'
import { refreshToken } from '@/apis/auth/refresh-token'

const baseURLYandex = import.meta.env.VITE_API_BASE_URL_YANDEX

export const requestYandex = axios.create({
  baseURL: baseURLYandex,
  params: {
    format: 'json',
  },
})

const baseURL = import.meta.env.VITE_API_BASE_URL_NEW
const baseURLOld = import.meta.env.VITE_API_BASE_URL_OLD

export const request = axios.create({
  baseURL,
  headers: {
    'Accept-Language': localStorage.getItem('i18nextLng'),
  },
})

const NEW_APIS = [
  'shop/create',
  'getMe',
  'shop/select',
  'bot/create',
  'products/era',
  'robohub/authorize',
  'robohub/disconnect',
  'partner-api',
]

request.interceptors.request.use(
  async config => {
    const user = getUser()

    ;(config.headers as AxiosHeaders).set('Accept-Language', localStorage.getItem('i18nextLng'))
    if (user?.access) {
      config.baseURL =
        NEW_APIS.filter(a => config.url?.includes(a)).length > 0
          ? baseURL
          : user.is_new_version
            ? baseURL
            : baseURLOld

      if (user?.isExpiredRefresh) {
        clearUser()
        window.location.href = ROUTER.AUTH
        return config
      }
      if (!user?.isExpiredAccess) {
        ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${user.access}`)
        return config
      }
      await refreshToken()
      const updatedUser = getUser()
      if (updatedUser?.access) {
        ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${updatedUser.access}`)
        return config
      }
      return config
    }

    return config
  },
  async error => {
    return await Promise.reject(error)
  },
)

request.interceptors.response.use(
  response => {
    return response
  },
  async (error: ErrorProps) => {
    const user = getUser()
    if (error.response?.status === 401 && user?.isExpiredAccess) {
      await refreshToken()
    }
    return await Promise.reject(error)
  },
)
