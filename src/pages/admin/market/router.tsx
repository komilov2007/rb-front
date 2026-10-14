import { lazy } from 'react'
import Layout from './layout'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => await import('./pages/home'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Detail = lazy(async () => await import('./pages/detail'))
const Instagram = lazy(async () => await import('./pages/instagram'))

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
      </Route>
      <Route path={ROUTER.ROBO_MARKET_APP_ID} element={<Detail />} />
      <Route path={ROUTER.INSTAGRAM} element={<Instagram />} />
      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default Router
