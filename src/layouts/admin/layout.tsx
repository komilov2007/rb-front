import { Hoc } from './hoc'
import { Outlet } from 'react-router-dom'
import { Alert } from '@/components/alert'
import ErrorBoundary from '@/pages/500/page'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useTheme } from '@mui/material/styles'
import { Suspense } from '@/components/suspense'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { Subcription } from '@/components/modals/subcription'
import { CouponModal } from '@/components/modals/coupon-modal'
import { Main, Wrapper, WrapMain, Container, WrapHeader, WrapAlert } from './style'

const Layout = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const closeBtn = useBoolean(true)
  const subsCloseBtn = useBoolean(true)
  const { subsDifference, isMultibank, isFree, alertText } = useProfileStore(state => ({
    subsDifference: state.me?.subscription.difference,
    isMultibank: state.isMultibank,
    isFree: state.me?.subscription.is_free,
    alertText: state.me?.subscription.alert_text,
  }))

  return (
    <>
      <ErrorBoundary>
        <Hoc>
          <Container isMultibank={isMultibank}>
            <Sidebar variant='sidebar' />
            <Wrapper isMultibank={isMultibank}>
              <WrapHeader>
                <Header />
              </WrapHeader>
              {closeBtn.value && alertText && (
                <WrapAlert>
                  <Alert
                    close
                    center
                    size='sm'
                    onClickClose={() => {
                      closeBtn.setFalse()
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color={theme.palette.allColors.BLACK30}
                      dangerouslySetInnerHTML={{ __html: alertText }}
                    />
                  </Alert>
                </WrapAlert>
              )}
              {subsCloseBtn.value && isFree && (
                <WrapAlert>
                  <Alert
                    close
                    center
                    size='sm'
                    onClickClose={() => {
                      subsCloseBtn.setFalse()
                    }}
                  >
                    <Typography color={theme.palette.allColors.BLACK30} fontSize={14}>
                      {t('trial_active', { value: subsDifference })}
                    </Typography>
                  </Alert>
                </WrapAlert>
              )}
              <WrapMain>
                <Main>
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </Main>
              </WrapMain>
            </Wrapper>
          </Container>
        </Hoc>
      </ErrorBoundary>
      <CouponModal />
      <Subcription variant='dialog' />
    </>
  )
}

export default Layout
