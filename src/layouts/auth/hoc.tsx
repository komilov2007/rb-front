import { Container } from './style'
import { jwtDecode } from 'jwt-decode'
import { type HocProps } from '@/types/hoc'
import { ROUTER } from '@/constants/router'
import { Suspense } from '@/components/suspense'
import { clearUser, getUser } from '@/utils/user'
import { type MultiBankTokenProps } from '@/types/multibank'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

const AUTH_ACCESS = [
  ROUTER.AUTH,
  ROUTER.SIGN_UP,
  ROUTER.VERIFICATION,
  ROUTER.RESET_PASSWORD,
  ROUTER.FORGOT_PASSWORD,
  `${ROUTER.SIGN_UP}/${ROUTER.PUBLIC_OFFER}`,
  `${ROUTER.SIGN_UP}/${ROUTER.PRIVACY_POLICY}`,
]

export const Hoc = ({ children }: HocProps) => {
  const user = getUser()
  const { pathname } = useLocation()
  const [typeMultibank] = useSearchParamsState('type', '')
  const [langMultibank] = useSearchParamsState('lang', '')
  const [accessTokenMultibank] = useSearchParamsState('access_token', '')
  const hasAuthAccess = AUTH_ACCESS.includes(pathname)

  if (!user?.access && !hasAuthAccess) {
    return <Navigate to={ROUTER.AUTH} />
  }

  if (user?.access) {
    if (accessTokenMultibank.length > 0 && typeMultibank === 'multibank') {
      const prevToken =
        localStorage.getItem('multibank') === 'undefined'
          ? 'null'
          : (localStorage.getItem('multibank') as string)

      const tokenJwt: MultiBankTokenProps = jwtDecode(accessTokenMultibank)
      const prevTokenJwt: MultiBankTokenProps | null =
        typeof prevToken === 'string' ? jwtDecode(prevToken) : null

      if ((prevTokenJwt?.sub && tokenJwt.sub !== prevTokenJwt.sub) || !prevTokenJwt?.sub) {
        clearUser()
        return (
          <Navigate
            to={`${ROUTER.AUTH}?type=${typeMultibank}&lang=${langMultibank}&access_token=${accessTokenMultibank}`}
          />
        )
      }
    }

    if (user?.shop && !!hasAuthAccess) {
      return <Navigate to={`${ROUTER.ADMIN}/${ROUTER.DASHBOARD}`} />
    } else {
      if (hasAuthAccess) {
        return <Navigate to={`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`} />
      }
    }
  }

  if (
    pathname.startsWith(ROUTER.CREATE_WEBSITE_SIGN_UP) ||
    pathname.startsWith(ROUTER.CREATE_BOT_SIGN_UP) ||
    pathname.startsWith(`${ROUTER.SIGN_UP}${ROUTER.VERIFICATION}`) ||
    pathname.endsWith(ROUTER.PRIVACY_POLICY) ||
    pathname.endsWith(ROUTER.PUBLIC_OFFER)
  ) {
    return (
      <Container
        sx={{
          overflowY: 'auto',
          alignItems: 'center',
          paddingBottom: '50px',
          flexDirection: 'column',
        }}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Container>
    )
  }

  return <>{children}</>
}
