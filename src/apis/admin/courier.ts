import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { CourierProps } from '@/types/courier'

export const getCouriers = async () => {
  const user = getUser()
  return await request<CourierProps[]>(`v2/courier/select/${user.shop}`)
}

export const setCourier = async (courier: number, order: number) =>
  await request.post(`v2/order/set/${order}/courier`, {
    courier,
  })
