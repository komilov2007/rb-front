import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { PriceTypeProps, SmartUpProps } from '@/types/smart-up'

export const getSmartUp = async () => {
  const user = getUser()
  return await request<SmartUpProps>(`v2/smartup/${user.shop}`)
}

export const installSmartUp = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/smartup/${user.shop}`, data)
}

export const importSmartUp = async () => {
  const user = getUser()
  return await request.post(`v2/smartup/${user.shop}/import`)
}

export const deleteSmartUp = async () => {
  const user = getUser()
  return await request.delete(`v2/robomarket/integration/delete/${user.shop}/smartup`)
}

export const priceTypeSmartUp = async <T>(data: T) =>
  await request.post<PriceTypeProps[]>('v2/smartup/price/type', data)
