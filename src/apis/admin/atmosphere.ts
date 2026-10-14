import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type {
  AtmosphereProps,
  AtmosphereImageProps,
  AtmosphereCategoryProps,
} from '@/types/atmosphere'

export const getAtmosphere = async () => {
  const user = getUser()
  return await request<AtmosphereProps>(`v2/atmosphere/${user.shop}`)
}

export const updateAtmosphere = async <T>(data: T) => {
  const user = getUser()
  return await request.patch<AtmosphereProps>(`v2/atmosphere/${user.shop}`, data)
}

export const createAtmosphereCategory = async <T>(data: T) =>
  await request.post<AtmosphereCategoryProps>('v2/atmosphere/category/create', data)

export const updateAtmosphereCategory = async <T>(data: T, id: number) =>
  await request.patch<AtmosphereCategoryProps>(`v2/atmosphere/category/${id}/update`, data)

export const deleteAtmosphereCategory = async (id: number) =>
  await request.delete(`v2/atmosphere/category/${id}/delete`)

export const changeAtmosphereCategoryPosition = async (id: number, above: number | null) =>
  await request.post(`v2/atmosphere/category/${id}/change/position`, { above })

export const createAtmosphereImages = async <T>(data: T) =>
  await request.post<AtmosphereImageProps[]>('v2/atmosphere/image/create', data)

export const deleteAtmosphereImage = async (id: number) =>
  await request.delete(`v2/atmosphere/image/${id}/delete`)

export const changeAtmosphereImagePosition = async (id: number, above: number | null) =>
  await request.post(`v2/atmosphere/image/${id}/change/position`, { above })
