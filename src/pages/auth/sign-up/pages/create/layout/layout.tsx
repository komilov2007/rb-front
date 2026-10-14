import { Hoc } from './hoc'
import Stack from '@mui/material/Stack'
import { Logo } from '@/components/logo'
import { Help } from '@/components/help'
import { ROUTER } from '@/constants/router'
import { Logout } from '@/components/logout'
import { Stepper } from '@/components/stepper'
import { Suspense } from '@/components/suspense'
import { Outlet, useLocation } from 'react-router-dom'
import { Header, Conatiner, WrapHeader } from './style'
import { type PlatformsProps } from '@/types/busniness'
import { SING_UP_CREATE_STEPS } from '@/constants/sign-up'
import { SelectI18nLanguage } from '@/components/selects/select-i18n-language/select'

interface LayoutProps {
  variant: PlatformsProps
}

const Layout = ({ variant }: LayoutProps) => {
  const location = useLocation()
  const steps = SING_UP_CREATE_STEPS.filter(s =>
    s.id === 'bot' || s.id === 'website'
      ? variant === 'TELEGRAM' && s.id === 'bot'
        ? true
        : !!(variant === 'WEBSITE' && s.id === 'website')
      : true,
  )
  const activeStep =
    steps.find(s => {
      if (
        location.pathname === `${ROUTER.SIGN_UP}/${ROUTER.CREATE_BOT}` ||
        location.pathname === `${ROUTER.SIGN_UP}/${ROUTER.CREATE_WEBSITE}`
      ) {
        return s
      }
      if (s.href !== '') {
        return location.pathname.endsWith(s.href)
      }
      return false
    })?.step ?? 2

  return (
    <Hoc>
      <Header>
        <WrapHeader>
          <Logo variant='admin' />
          <Stack gap={{ xs: '8px', md: '16px' }} direction='row' alignItems='center'>
            <Stack gap={{ xs: '8px', md: '16px' }} direction='row' alignItems='center'>
              <SelectI18nLanguage variant='header' />
              <Help />
            </Stack>
            <Logout varaint='header' />
          </Stack>
        </WrapHeader>
      </Header>
      <Stack minHeight={{ xs: '74px', md: '94px' }} width='100%' />
      <Conatiner>
        <Stepper activeStep={activeStep - 2} steps={steps} />
        <Stack flexGrow={1}>
          <Suspense>
            <Outlet />
          </Suspense>
        </Stack>
      </Conatiner>
    </Hoc>
  )
}

export default Layout
