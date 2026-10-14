import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => await import('./pages/home'))
const Plan = lazy(async () => await import('./pages/plan'))
const NotFound = lazy(async () => await import('@/pages/404'))

const Router = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTER.PLAN_ID} element={<Plan />} />
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
