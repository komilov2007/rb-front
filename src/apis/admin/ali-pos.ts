import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { AliPosProps, AliPosSpotProps } from '@/types/ali-pos'

export const getAliposCreds = async () => {
  const user = getUser()
  return await request<AliPosProps>(`v2/robomarket/alipos/creds/${user.shop}`)
}

export const postAliPosCreds = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/alipos/creds/${user.shop}`, data)
}

export const getAliposSpots = async <T>(data: T) => {
  return await request.post<AliPosSpotProps[]>('v2/robomarket/alipos/restaurants', data)
}

export const importAliPos = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/alipos/import/${user.shop}`)
}
