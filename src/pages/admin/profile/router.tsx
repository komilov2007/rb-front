import { lazy } from 'react'
import { Layout } from './layout'
import Stack from '@mui/material/Stack'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { SelectI18nLanguage } from '@/components/selects/select-i18n-language/select'

const Home = lazy(async () => await import('./pages/home'))
const Cards = lazy(async () => await import('./pages/cards'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Password = lazy(async () => await import('./pages/password'))
const Platforms = lazy(async () => await import('./pages/platforms'))
const Notifications = lazy(async () => await import('./pages/notifications'))
const ApiIntegration = lazy(async () => await import('./pages/api-integration'))

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={ROUTER.PROFILE_CARDS} element={<Cards />} />
      <Route path={ROUTER.PROFILE_PASSWORD} element={<Password />} />
      <Route path={ROUTER.PROFILE_PLATFORMAS} element={<Platforms />} />
      <Route path={ROUTER.PROFILE_NOTIFICATIONS} element={<Notifications />} />
      <Route path={ROUTER.PROFILE_API_INTEGRATION} element={<ApiIntegration />} />
      <Route
        path={ROUTER.PROFILE_LANGUAGE}
        element={
          <Stack p='24px 32px' maxWidth='478px'>
            <SelectI18nLanguage variant='radio' />
          </Stack>
        }
      />
      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
    </Route>
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
