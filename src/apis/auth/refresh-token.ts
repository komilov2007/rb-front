import axios, { type AxiosResponse } from 'axios'
import { ROUTER } from '@/constants/router'
import { type UserProps } from '@/types/user'
import { type ErrorProps } from '@/types/error'
import { clearUser, getUser, setUser } from '@/utils/user'

const baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * Shared in-flight refresh. Coming back from background, React Query refetches
 * every active query at once; each one saw an expired access token and POSTed
 * its own refresh with the same token. If the backend rotates refresh tokens,
 * all but the first got a 401 and logged the user out. On mobile this happened
 * on practically every app resume.
 */
let inFlight: Promise<AxiosResponse> | null = null

const doRefresh = async () => {
  const user = getUser()
  return await axios({
    baseURL,
    method: 'post',
    url: 'auth/login/refresh',
    data: {
      refresh: user?.refresh,
    },
  })
    .then(res => {
      const newUser: UserProps = { ...user, ...res.data }
      setUser(newUser)
      return res
    })
    .catch(async (error: ErrorProps) => {
      if (user?.isExpiredRefresh && error.response?.status === 401) {
        clearUser()
        window.location.href = ROUTER.AUTH
      }
      return await Promise.reject(error)
    })
}

export const refreshToken = async () => {
  inFlight ??= doRefresh().finally(() => {
    inFlight = null
  })
  return await inFlight
}
