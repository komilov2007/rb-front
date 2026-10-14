import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { HocLimit } from '@/hocs/hoc-limit'
import { HocTariffPrice } from '@/hocs/hoc-price'

const Home = lazy(async () => await import('./pages/home'))
const Roles = lazy(async () => await import('./pages/roles'))
const Courier = lazy(async () => await import('./pages/courier'))
const NotFound = lazy(async () => await import('@/pages/404'))

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTER.EMPLOYEES} element={<Home />} />
      <Route
        path={ROUTER.EMPLOYEES_ROLES}
        element={
          <HocTariffPrice>
            <HocLimit>
              <Roles />
            </HocLimit>
          </HocTariffPrice>
        }
      />
      <Route
        path={ROUTER.EMPLOYEES_COURIER}
        element={
          <HocTariffPrice>
            <HocLimit>
              <Courier />
            </HocLimit>
          </HocTariffPrice>
        }
      />
      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default Router
