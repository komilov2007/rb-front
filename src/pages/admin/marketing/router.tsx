import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HocLimit } from '@/hocs/hoc-limit'
import { HocTariffPrice } from '@/hocs/hoc-price'
import { useProfileStore } from '@/store/profile'

const NotFound = lazy(async () => await import('@/pages/404'))
const Sources = lazy(async () => await import('./pages/sources'))
const Reviews = lazy(async () => await import('./pages/reviews'))
const Post = lazy(async () => await import('./pages/post'))
const Banners = lazy(async () => await import('./pages/banners'))
const BannersOnlineShop = lazy(async () => await import('./pages/banners-online-shop'))
const PromoCode = lazy(async () => await import('./pages/promo-code'))
const Atmosphere = lazy(async () => await import('./pages/atmosphere'))
const RouterMailing = lazy(async () => await import('./pages/mailing'))
const RouterSmsMailing = lazy(async () => await import('./pages/sms-mailing'))
const FormBanner = lazy(async () => ({
  default: (await import('@/components/forms/banner-online-shop')).FormBannerOnlineShop,
}))

const Router = () => {
  const is_new_version = useProfileStore(state => state.me?.is_new_version)
  const business_type = useProfileStore(state => state.me?.business_type)

  return (
    <Routes>
      <Route
        path={ROUTER.MARKETING_SOURCES}
        element={
          <HocTariffPrice>
            <HocLimit>
              <Sources />
            </HocLimit>
          </HocTariffPrice>
        }
      />
      <Route path={ROUTER.MARKETING_REVIEWS} element={<Reviews />} />
      <Route
        path={ROUTER.MARKETING_PROMO_CODE}
        element={
          <HocLimit>
            <PromoCode />
          </HocLimit>
        }
      />
      <Route path={ROUTER.MARKETING_POST} element={<Post />} />
      <Route
        path={ROUTER.MARKETING_ATMOSPHERE}
        element={
          business_type === 'RESTAURANT' ? (
            <Atmosphere />
          ) : business_type ? (
            // Atmosphere is restaurant-only, e.g. after switching to an online shop
            <Navigate replace to={`${ROUTER.ADMIN}/${ROUTER.DASHBOARD}`} />
          ) : null
        }
      />
      {is_new_version ? (
        <Route path={ROUTER.BANNERS}>
          <Route index element={<BannersOnlineShop />} />
          <Route path={ROUTER.CREATE} element={<FormBanner variant='add' />} />
          <Route
            path={`${ROUTER.EDIT}/${ROUTER.BANNER_ID}`}
            element={<FormBanner variant='edit' />}
          />
        </Route>
      ) : (
        <Route path={ROUTER.BANNERS} element={<Banners />} />
      )}
      <Route path={`${ROUTER.MARKETING_MAILING}/*`} element={<RouterMailing />} />
      <Route path={`${ROUTER.MARKETING_SMS_MAILING}/*`} element={<RouterSmsMailing />} />
      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default Router
