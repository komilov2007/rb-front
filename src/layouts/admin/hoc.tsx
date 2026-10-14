import { Container } from './style'
import { getUser } from '@/utils/user'
import { type HocProps } from '@/types/hoc'
import { ROUTER } from '@/constants/router'
import { HocFirebase } from './hoc-firebase'
import { Suspense } from '@/components/suspense'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export const Hoc = ({ children }: HocProps) => {
  const user = getUser()
  const { pathname } = useLocation()

  if (!user?.access) {
    return <Navigate to={ROUTER.AUTH} />
  }
  if (user?.access && !user.shop) {
    return <Navigate to={`${ROUTER.SIGN_UP}/${ROUTER.BUSINESS_DETAILS}`} />
  }

  return (
    <HocFirebase>
      {pathname === `${ROUTER.ADMIN}/${ROUTER.PRIVACY_POLICY}` ||
      pathname === `${ROUTER.ADMIN}/${ROUTER.PUBLIC_OFFER}` ? (
        <Suspense>
          <Outlet />
        </Suspense>
      ) : pathname.startsWith(ROUTER.CREATE_WEBSITE_SIGN_UP) ||
        pathname.startsWith(ROUTER.CREATE_BOT_SIGN_UP) ||
        pathname.startsWith(`${ROUTER.SIGN_UP}${ROUTER.VERIFICATION}`) ||
        pathname.startsWith(ROUTER.PRIVACY_POLICY) ? (
        <Container
          sx={{ p: '50px 0', alignItems: 'center', justifyContent: 'center', overflowY: 'auto' }}
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </Container>
      ) : (
        children
      )}
    </HocFirebase>
  )
}
