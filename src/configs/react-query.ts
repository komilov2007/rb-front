import { toast } from 'react-toastify'
import { sendLog } from '@/apis/common'
import { clearUser } from '@/utils/user'
import { ROUTER } from '@/constants/router'
import { type ErrorProps } from '@/types/error'
import { isReactNative } from '@/utils/native-bridge'
import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query'

const baseURLYandex = import.meta.env.VITE_API_BASE_URL_YANDEX

const CARD_URLS = [
  'v2/bank/card/create',
  'v2/bank/card/confirm',
  'v2/plum/bank/card/create',
  'v2/plum/bank/card/confirm',
]

/**
 * On mobile, requests fail with no `response` far more often than on desktop
 * (dropped connection, captive portal, backgrounded tab). Reading
 * `error.response.data` unguarded threw *inside* the error handler and masked
 * the real failure, so every offline blip surfaced as a confusing secondary
 * crash instead of "no connection".
 */
const messageOf = (error: ErrorProps) =>
  error.response?.data?.error ??
  error.response?.data?.message ??
  error.response?.statusText ??
  error.message

const mutationCache = new MutationCache({
  onError: async res => {
    const error = res as ErrorProps
    if (CARD_URLS.includes(error.config?.url ?? '')) return

    toast.error(messageOf(error))
    if (error.response?.status === 500) {
      await sendLog(JSON.stringify(error.response?.data))
    }
  },
})

const queryCache = new QueryCache({
  onError: async res => {
    const error = res as ErrorProps

    if (error.response?.data?.detail?.length === 1) {
      toast.error(error.response.data.detail[0].msg)
      return
    }

    // Yandex geocoder failures are expected and deliberately silent.
    if (!error.config?.baseURL?.startsWith(baseURLYandex)) {
      toast.error(messageOf(error))

      /**
       * Only a genuine 401 may end the session. A 404 used to log the user out
       * too, which on a flaky mobile connection behind a carrier proxy fires
       * constantly — the resulting forced logout was far worse than the
       * missing resource.
       */
      if (error.response?.status === 401) {
        clearUser()
        window.location.href = ROUTER.AUTH
      }
    }

    if (error.response?.status === 500) {
      await sendLog(JSON.stringify(error.response?.data))
    }
  },
})

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      /**
       * Push notifications drive cache invalidation on the web, but they cannot
       * work in a WebView, so there the app would show stale data indefinitely.
       * Scoped to the native shell deliberately: flipping this on for desktop
       * too would multiply API calls for every browser tab switch.
       */
      refetchOnWindowFocus: isReactNative(),
      retry(failureCount, res) {
        const error = res as ErrorProps
        if (error.response?.status === 404) return false
        if (failureCount < 1) return true
        return false
      },
    },
  },
})
