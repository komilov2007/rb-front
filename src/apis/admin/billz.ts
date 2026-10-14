import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { BillzTokenProps } from '@/types/billz'

export const uploadBillz = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/billz/${user.shop}`)
}

export const sendToken = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/shop/integration/${user.shop}`, data)
}

export const getBillzToken = async () => {
  const user = getUser()
  return await request<BillzTokenProps>(`v2/robomarket/billz/token/${user.shop}`)
}
