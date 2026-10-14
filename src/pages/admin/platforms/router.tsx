import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { HocLimit } from '@/hocs/hoc-limit'
import { HocTariffPrice } from '@/hocs/hoc-price'

const QrCode = lazy(async () => await import('./pages/qr-code'))
const RouterWebsite = lazy(async () => await import('./pages/website'))
const RouterTelegram = lazy(async () => await import('./pages/telegram'))

const Router = () => (
  <Routes>
    <Route
      path={ROUTER.QR_CODE}
      element={
        <HocTariffPrice>
          <HocLimit>
            <QrCode variant='MENU' />
          </HocLimit>
        </HocTariffPrice>
      }
    />
    <Route path={`${ROUTER.WEBSITE}/*`} element={<RouterWebsite />} />
    <Route path={`${ROUTER.TELEGRAM_BOTS}/*`} element={<RouterTelegram />} />
  </Routes>
)

export default Router
