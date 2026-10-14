import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => await import('./pages/home'))
const NotFound = lazy(async () => await import('@/pages/404'))
const RouterCreate = lazy(async () => await import('./pages/create'))
const UserPolicy = lazy(async () => await import('@/pages/user-policy'))
const FormShop = lazy(async () => await import('@/components/forms/shop'))

const Router = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={`${ROUTER.CREATE_BOT}/*`} element={<RouterCreate variant='TELEGRAM' />} />
    <Route path={`${ROUTER.CREATE_WEBSITE}/*`} element={<RouterCreate variant='WEBSITE' />} />
    <Route path={ROUTER.BUSINESS_DETAILS} element={<FormShop variant='auth' />} />
    <Route path={`/${ROUTER.PRIVACY_POLICY}`} element={<UserPolicy variant='privacy-policy' />} />
    <Route path={`/${ROUTER.PUBLIC_OFFER}`} element={<UserPolicy variant='public-offer' />} />
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
