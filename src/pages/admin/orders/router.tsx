import { lazy } from 'react'
import Layout from './layout'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { HocLimit } from '@/hocs/hoc-limit'
import { useProfileStore } from '@/store/profile'

const NotFound = lazy(async () => await import('@/pages/404'))
const Reservations = lazy(async () => await import('./pages/reservations'))
const AutoResponder = lazy(async () => await import('./pages/auto-responder'))
const OrderByStatus = lazy(async () => await import('./pages/order-by-status'))

const Router = () => {
  const isRestaurant = useProfileStore(state => state.me?.business_type === 'RESTAURANT')

  return (
    <Routes>
      <Route
        path='/'
        element={
          <HocLimit>
            <Layout />
          </HocLimit>
        }
      >
        <Route
          index
          element={
            <HocLimit>
              <OrderByStatus status='ALL' />
            </HocLimit>
          }
        />
        <Route path={ROUTER.ORDERS_NEW} element={<OrderByStatus status='NEW' />} />
        <Route path={ROUTER.ORDERS_PROGRESS} element={<OrderByStatus status='PROGRESS' />} />
        <Route path={ROUTER.ORDERS_LATE} element={<OrderByStatus status='LATE' />} />
        <Route path={ROUTER.ORDERS_READY} element={<OrderByStatus status='READY' />} />
        <Route path={ROUTER.ORDERS_ON_THE_WAY} element={<OrderByStatus status='ON_THE_WAY' />} />
        <Route path={ROUTER.ORDERS_HISTORY} element={<OrderByStatus status='HISTORY' />} />
        <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
      </Route>
      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
      <Route path={ROUTER.ORDERS_AUTO_RESPONDER} element={<AutoResponder />} />
      {isRestaurant && <Route path={ROUTER.ORDERS_RESERVATIONS} element={<Reservations />} />}
    </Routes>
  )
}

export default Router
