import { lazy } from 'react'
import Layout from './layout'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { type PlatformsProps } from '@/types/busniness'

const FormTelegramBot = lazy(async () => await import('@/components/forms/telegram-bot'))
const FormWebsite = lazy(async () => await import('@/components/forms/website'))
const Settings = lazy(async () => await import('@/components/forms/settings'))
const Category = lazy(async () => await import('./pages/category'))
const Product = lazy(async () => await import('./pages/product'))
const Delivery = lazy(async () => await import('./pages/delivery'))
const Preview = lazy(async () => await import('./pages/preview'))
const NotFound = lazy(async () => await import('@/pages/404'))

interface RouterProps {
  variant: PlatformsProps
}

const Router = ({ variant }: RouterProps) => {
  return (
    <Routes>
      <Route path='/' element={<Layout variant={variant} />}>
        <Route
          index
          element={
            variant === 'WEBSITE' ? (
              <FormWebsite variant='auth' />
            ) : (
              <FormTelegramBot variant='auth' />
            )
          }
        />
        <Route path={ROUTER.CREATE_SETTINGS} element={<Settings variant='auth' />} />
        <Route path={ROUTER.CREATE_CATEGORY} element={<Category />} />
        <Route path={ROUTER.CREATE_PRODUCT} element={<Product />} />
        <Route path={ROUTER.CREATE_DELIVERY} element={<Delivery />} />
        <Route path={ROUTER.CREATE_PREVIEW} element={<Preview />} />
      </Route>
      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default Router
