import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => await import('./pages/home'))
const Users = lazy(async () => await import('./pages/users'))
const NotFound = lazy(async () => await import('@/pages/404'))
const PaymentHistory = lazy(async () => await import('./pages/payment-history'))

const Router = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTER.SMS_MAILING_ID} element={<Users />} />
    <Route
      path={`${ROUTER.PAYMENT_HISTORY}/${ROUTER.SMS_MAILING_ID}`}
      element={<PaymentHistory />}
    />
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
