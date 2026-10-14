import { ROUTER } from '@/constants/router'
import { type LocationProps } from './type'
import { type HocProps } from '@/types/hoc'
import { Navigate } from 'react-router-dom'

export const Hoc = ({ children }: HocProps) => {
  const values: LocationProps = JSON.parse(localStorage.getItem('verification') as string)

  if (!(values?.email || values?.phone)) {
    return <Navigate to={values?.location ?? ROUTER.AUTH} />
  }

  return <>{children}</>
}
