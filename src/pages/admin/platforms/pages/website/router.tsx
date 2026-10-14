import { lazy } from 'react'
import Layout from './layout'
import Stack from '@mui/material/Stack'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(async () => await import('./pages/home'))
const QrCode = lazy(async () => await import('../qr-code'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Analytics = lazy(async () => await import('./pages/analytics'))
const FormWebsite = lazy(async () => await import('@/components/forms/website'))

const Router = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={ROUTER.WEBSITE_DOMAIN} element={<FormWebsite variant='admin' />} />
      <Route path={ROUTER.WEBSITE_ANALYTICS} element={<Analytics />} />
      <Route path={ROUTER.QR_CODE} element={<QrCode variant='WEBSITE' />} />
    </Route>
    <Route
      path={ROUTER.PLATFORM_CREATE}
      element={
        <Stack overflow='auto'>
          <FormWebsite variant='admin' noDelete />
        </Stack>
      }
    />
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
