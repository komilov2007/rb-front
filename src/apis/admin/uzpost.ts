import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { UzpostProps, UzpostCityProps, UzpostDistrictProps } from '@/types/uzpost'

export const getUzpost = async () => {
  const user = getUser()
  return await request<UzpostProps>(`v2/uzpost/customer/${user.shop}`)
}

export const installUzpost = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/uzpost/customer/auth/${user.shop}`, data)
}

export const createOrder = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/uzpost/customer/orders/${user.shop}`, data)
}

export const getUzpostCities = async () =>
  await request<UzpostCityProps>('v2/uzpost/customer/territories/list?type=region')

export const getUzpostDistricts = async (region: number) =>
  await request<UzpostDistrictProps[]>(`v2/uzpost/customer/districts?region_id=${region}`)

export const deleteUzpost = async () => {
  const user = getUser()
  return await request.delete(`v2/uzpost/customer/${user.shop}`)
}
