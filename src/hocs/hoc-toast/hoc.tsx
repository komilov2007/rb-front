import { type HocProps } from '@/types/hoc'
import { useTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { ContainerToastProps } from '@/constants/toast'

export const HocTaost = ({ children }: HocProps) => {
  const theme = useTheme()

  return (
    <>
      {children}
      <ToastContainer {...ContainerToastProps} theme={theme.palette.mode} />
    </>
  )
}
