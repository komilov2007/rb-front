import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { HocLimit } from '@/hocs/hoc-limit'
import { Outlet, Route, Routes } from 'react-router-dom'
import { HocTariffPrice } from '@/hocs/hoc-price'
import { useProfileStore } from '@/store/profile'

const IkpuRestaurant = lazy(async () => await import('./pages/ikpu'))
const IkpuOnlineShop = lazy(async () => await import('./pages/ikpu-online-shop'))
const NotFound = lazy(async () => await import('@/pages/404'))
const DiscountRestaurant = lazy(async () => await import('./pages/discount-restaurant'))
const DiscountOnlineShop = lazy(async () => await import('./pages/discount-online-shop'))
const StockRestaurant = lazy(async () => await import('./pages/stock-restaurant'))
const StockOnlineShop = lazy(async () => await import('./pages/stock-online-shop'))
const ProductsRestaurant = lazy(async () => await import('./pages/products-restaurant'))
const ProductsOnlineShop = lazy(async () => await import('./pages/products-online-shop'))
const CategoriesRestaurant = lazy(async () => await import('./pages/categories-restaurant'))
const CategoriesOnlineShop = lazy(async () => await import('./pages/categories-online-shop'))
const FormCategoryOnlineShop = lazy(async () => ({
  default: (await import('@/components/forms/category-online-shop')).FormCategoryOnlineShop,
}))
const FormProductOnlineShop = lazy(async () => ({
  default: (await import('@/components/forms/product-online-shop')).FormProductOnlineShop,
}))
const FormDiscountOnlineShop = lazy(async () => ({
  default: (await import('@/components/forms/discount-online-shop')).FormDiscountOnlineShop,
}))

const Router = () => {
  const is_new_version = useProfileStore(state => state.me?.is_new_version)

  return (
    <Routes>
      {is_new_version ? (
        <Route path={ROUTER.IKPU} element={<IkpuOnlineShop />} />
      ) : (
        <Route path={ROUTER.IKPU} element={<IkpuRestaurant />} />
      )}

      <Route
        path={ROUTER.STOCK}
        element={
          <HocTariffPrice>
            <HocLimit>{is_new_version ? <StockOnlineShop /> : <StockRestaurant />}</HocLimit>
          </HocTariffPrice>
        }
      />
      {is_new_version ? (
        <Route
          path={ROUTER.DISCOUNT}
          element={
            <HocTariffPrice>
              <HocLimit>
                <Outlet />
              </HocLimit>
            </HocTariffPrice>
          }
        >
          <Route index element={<DiscountOnlineShop />} />
          <Route path={ROUTER.CREATE} element={<FormDiscountOnlineShop variant='add' />} />
          <Route
            path={`${ROUTER.EDIT}/${ROUTER.DISCOUNT_ID}`}
            element={<FormDiscountOnlineShop variant='edit' />}
          />
        </Route>
      ) : (
        <Route
          path={ROUTER.DISCOUNT}
          element={
            <HocTariffPrice>
              <HocLimit>
                <DiscountRestaurant />
              </HocLimit>
            </HocTariffPrice>
          }
        />
      )}
      {is_new_version ? (
        <>
          <Route path={`${ROUTER.PRODUCTS}/*`}>
            <Route index element={<ProductsOnlineShop />} />
            <Route path={ROUTER.CREATE} element={<FormProductOnlineShop variant='add' />} />
            <Route
              path={`${ROUTER.EDIT}/${ROUTER.PRODUCT_ID}`}
              element={<FormProductOnlineShop variant='edit' />}
            />
          </Route>
          <Route path={`${ROUTER.CATEGORIES}/*`}>
            <Route index element={<CategoriesOnlineShop variant='home' />} />
            <Route path={ROUTER.CREATE} element={<FormCategoryOnlineShop variant='add' />} />
            <Route path={ROUTER.CATEGORY_ID} element={<CategoriesOnlineShop variant='detail' />} />
            <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
            <Route
              path={`${ROUTER.EDIT}/${ROUTER.CATEGORY_ID}`}
              element={<FormCategoryOnlineShop variant='edit' />}
            />
          </Route>
        </>
      ) : (
        <>
          <Route path={ROUTER.PRODUCTS} element={<ProductsRestaurant />} />
          <Route path={ROUTER.CATEGORIES}>
            <Route index element={<CategoriesRestaurant />} />
            <Route path={ROUTER.CATEGORY_ID} element={<ProductsRestaurant />} />
          </Route>
        </>
      )}

      <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default Router
