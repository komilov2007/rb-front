import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { SpotProps, PosterProps, SourceProps } from '@/types/poster'

export const getPoster = async () => {
  const user = getUser()
  return await request<PosterProps>(`v2/robomarket/poster/${user.shop}`)
}

export const getSpots = async (token: string) => {
  return await request.post<SpotProps[]>('v2/robomarket/poster/spots', { token })
}

export const installPoster = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/robomarket/poster/${user.shop}`, data)
}

export const uploadPoster = async () => {
  const user = getUser()
  return await request.post(`v2/robomarket/poster/import/${user.shop}`)
}

export const getPosterSources = async <T>(data: T) => {
  return await request.post<SourceProps[]>('v2/robomarket/poster/sources', data)
}
