import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type PaymentProps, type PaymentTypeListProps } from '@/types/payment'

export const getPaymentTypes = async () => {
  const user = getUser()
  return await request<PaymentTypeListProps>(`v2/payment/list/order-filter/${user.shop}`)
}

export const getPaymentList = async () => {
  const user = getUser()
  return await request<PaymentProps[]>(`v2/payment/list/${user.shop}`)
}

export const getActivePaymentList = async () => {
  const user = getUser()
  return await request<PaymentProps[]>(`v2/payment/list/${user.shop}`, {
    params: { is_active: true },
  })
}

export const updatePayment = async <T>(data: T, id: number) =>
  await request.post(`v2/payment/${id}/update`, data)

export const checkVariantAuth = async <T>(data: T) => {
  return await request.post<{ ok: boolean }>('v2/robomarket/variant/check-auth', data)
}
