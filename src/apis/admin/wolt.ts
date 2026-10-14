import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { WoltCredsProps } from '@/types/wolt'

export const getWoltIntegrateUrl = async () => {
  const user = getUser()
  return await request.post<{ url: string }>(`v2/robomarket/wolt/integrate/${user.shop}`)
}

export const getWoltCreds = async () => {
  const user = getUser()
  return await request<WoltCredsProps>(`v2/robomarket/wolt/creds/${user.shop}`)
}

export const saveWoltCreds = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/wolt/creds/${user.shop}`, data)
}

export const importWoltRestaurants = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/wolt/import/${user.shop}`)
}

export const importWoltOnlineShop = async () => {
  const user = getUser()
  return await request.post(`v3/products/wolt/${user.shop}/import-catalog`)
}
