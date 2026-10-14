import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { FargoProps, FargoCityProps, FargoDistrictProps } from '@/types/fargo'

export const getFargo = async () => {
  const user = getUser()
  return await request<FargoProps>(`v2/robomarket/fargo/${user.shop}`)
}

export const installFargo = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/fargo/${user.shop}`, data)
}

export const createOrder = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/fargo/order/create/${user.shop}`, data)
}

export const getFargoCities = async () => {
  const user = getUser()
  return await request<FargoCityProps>(`v2/robomarket/fargo/region/${user.shop}`)
}

export const getFargoDistricts = async (region: number) => {
  const user = getUser()
  return await request<FargoDistrictProps>(`v2/robomarket/fargo/district/${region}/${user.shop}`)
}
