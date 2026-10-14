import i18n from '@/configs/i18n'
import { router } from '@/router'
import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import { theme } from '@/configs/material'
import { Scroll } from '@/components/scroll'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { HocTaost } from './hocs/hoc-toast/hoc'
import { Suspense } from '@/components/suspense'
import { HocTelegram } from './hocs/hoc-telegram'
import { RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { queryClient } from '@/configs/react-query'
import { HocMetaHandler } from './hocs/hoc-meta-handler'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { QueryClientProvider } from '@tanstack/react-query'
import { HocPrivacyPolicy } from './hocs/hoc-privacy-policy'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { type ReactNode } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import 'dayjs/locale/ru'
import 'dayjs/locale/tr'
import 'dayjs/locale/uz-latn'
import 'unfonts.css'
import './index.css'

/**
 * Dev sessions used to report at 100% too, which burned the project quota and
 * came back as a wall of 429s in the console. Error replays stay at 1.0 — those
 * are the ones worth keeping.
 */
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://2f6026358c5ca7ffb515df5bc5dd4db4@o4509082181959680.ingest.us.sentry.io/4509091250503680',
    integrations: [Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false })],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

window.addEventListener('vite:preloadError', _event => {
  window.location.reload()
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(
      `/firebase-messaging-sw.js?${new URLSearchParams({
        apiKey: import.meta.env.VITE_API_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_API_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_API_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_API_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_API_FIREBASE_MEASUREMENT_ID,
      })}`,
    )
    .then(registration => {
      // console.log('Service Worker registered:', registration)
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error)
    })
} else {
  console.warn('Service Workers are not supported in this browser.')
}

const DAYJS_LOCALE_MAP: Record<string, string> = { uz: 'uz-latn' }

const DateLocaleProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation()
  const locale = DAYJS_LOCALE_MAP[i18n.language] || i18n.language
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      {children}
    </LocalizationProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Scroll>
    <HocTelegram>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider theme={theme}>
          <Suspense>
            <HocMetaHandler>
              <I18nextProvider i18n={i18n} defaultNS='translation'>
                <DateLocaleProvider>
                  <CssBaseline />
                  <HocTaost>
                    <HocPrivacyPolicy>
                      <RouterProvider router={router} />
                    </HocPrivacyPolicy>
                  </HocTaost>
                </DateLocaleProvider>
              </I18nextProvider>
            </HocMetaHandler>
          </Suspense>
        </CssVarsProvider>
      </QueryClientProvider>
    </HocTelegram>
  </Scroll>,
)
