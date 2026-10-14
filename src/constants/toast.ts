import { type ToastContainerProps } from 'react-toastify'

export const ContainerToastProps: ToastContainerProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  rtl: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  limit: 3,
}
