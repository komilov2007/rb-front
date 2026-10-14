import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { CloposProps, CloposSpotProps } from '@/types/clopos'

export const getCloposCreds = async () => {
  const user = getUser()
  return await request<CloposProps>(`v2/robomarket/clopos/creds/${user.shop}`)
}

export const postCloposCreds = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/clopos/creds/${user.shop}`, data)
}

export const getCloposSpots = async <T>(data: T) => {
  return await request.post<CloposSpotProps[]>('v2/robomarket/clopos/restaurants', data)
}

export const importClopos = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/clopos/import/${user.shop}`)
}
