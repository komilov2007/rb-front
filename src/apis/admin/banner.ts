import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type BannersProps, type BannersPropsOnlineShop } from '@/types/banners'

export const createBanner = async <T>(data: T) => await request.post('v2/banner/create', data)

export const getBanners = async () => {
  const user = getUser()
  return await request<BannersProps[]>(`v2/banner/list/${user.shop}`)
}

export const deleteBanner = async (id: number) => await request.delete(`v2/banner/${id}/delete`)

export const updateBanner = async <T>(data: T, id: number) => {
  return await request.put<BannersProps>(`v2/banner/${id}/update`, data)
}

export const createBannerOnlineShop = async <T>(data: T) =>
  await request.post('v3/admin/banners', data)

export const getBannersOnlineShop = async <T>(params?: T) => {
  const user = getUser()
  return await request<BannersPropsOnlineShop[]>(`v3/banners/${user.shop}`, {
    params,
  })
}

export const getBannerDetailOnlineShop = async (id: string | number) => {
  return await request<BannersPropsOnlineShop>(`v3/banners/detail/${id}`)
}

export const deleteBannerOnlineShop = async (id: number) =>
  await request.delete(`v3/admin/banners/${id}`)

export const updateBannerOnlineShop = async <T>(data: T, id: number) => {
  return await request.put<BannersPropsOnlineShop>(`v3/admin/banners/${id}`, data)
}

export const updateBannerPositionOnlineShop = async <T>(data: T, id: number) => {
  return await request.put<BannersPropsOnlineShop>(`v3/admin/banners/position/${id}`, data)
}
