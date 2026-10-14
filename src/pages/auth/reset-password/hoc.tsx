import { ROUTER } from '@/constants/router'
import { type HocProps } from '@/types/hoc'
import { type LocationProps } from './type'
import { Navigate, useLocation } from 'react-router-dom'

export const Hoc = ({ children }: HocProps) => {
  const { state }: LocationProps = useLocation()

  if (!state.id) {
    return <Navigate to={ROUTER.AUTH} />
  }

  return <>{children}</>
}
