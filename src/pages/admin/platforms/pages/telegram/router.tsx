import { lazy } from 'react'
import Layout from './layout'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => await import('./pages/home'))
const QrCode = lazy(async () => await import('../qr-code'))
const NotFound = lazy(async () => await import('@/pages/404'))

const Actions = lazy(async () => await import('./pages/actions'))
const FormTelegramBot = lazy(async () => await import('@/components/forms/telegram-bot'))

const Router = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={ROUTER.TELEGRAM_BOTS_ACTIONS} element={<Actions />} />
      <Route path={ROUTER.QR_CODE} element={<QrCode variant='TELEGRAM' />} />
    </Route>
    <Route path={ROUTER.PLATFORM_CREATE} element={<FormTelegramBot variant='admin' />} />
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
