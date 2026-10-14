import { ROUTER } from '@/constants/router'
import { type HocProps } from '@/types/hoc'
import { Spinner } from '@/components/spinner'
import { useGeneral } from '@/hooks/useGeneral'
import { HocBranches } from '@/hocs/hoc-branch'
import { useSignUpStore } from '@/store/sign-up'
import { useProfileStore } from '@/store/profile'
import { Navigate, useLocation } from 'react-router-dom'
import { SING_UP_CREATE_STEPS } from '@/constants/sign-up'

export const Hoc = ({ children }: HocProps) => {
  const { isLoading } = useGeneral()
  const { pathname } = useLocation()
  const step = useSignUpStore(state => state.step)
  const preDashboard = useProfileStore(state => state.preDashboard)
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  if (isLoading) {
    return <Spinner center />
  }

  if (preDashboard?.is_finished) {
    return <Navigate to={ROUTER.ADMIN_HOME} />
  }

  if (step === 1 && `${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}` !== pathname) {
    return <Navigate to={`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`} />
  }

  const currentPath = SING_UP_CREATE_STEPS.find(s => `${PATH}${s.href}` === pathname)

  if (Number(currentPath?.step) > step) {
    const currentHref = SING_UP_CREATE_STEPS.find(s => s.step === step)?.href ?? ''
    return <Navigate to={`${PATH}${currentHref}`} />
  }

  return <HocBranches>{children}</HocBranches>
}
