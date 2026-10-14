import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { ERAProps, ERAStoresProps } from '@/types/era'

export const getERAStores = async <T>(data: T) =>
  await request.post<ERAStoresProps[]>('v2/robomarket/era/stores', data)

export const getERA = async () => {
  const user = getUser()
  return await request<ERAProps>(`v2/robomarket/era/creds/${user.shop}`)
}

export const installERA = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/era/creds/${user.shop}`, data)
}

export const uploadERA = async () => {
  const user = getUser()
  return await request.post(`v3/products/era/${user.shop}/import-catalog`)
}
