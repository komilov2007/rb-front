import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { PickUpProps } from '@/types/branch'
import type { SettingsProps } from '@/types/settings'
import type { SignUpTelegramProps } from '@/types/sign-up'
import type {
  CategoryListProps,
  ShopListProps,
  ShopPlatformListProps,
  UpdateShopProps,
} from '@/types/shop'
import type { CountryListProps } from '@/types/country'

export const createAndUpdateShop = async <T>(data: T, isAdmin?: boolean) => {
  const user = getUser()
  if (user.shop && !isAdmin) {
    return await request.put(`v2/shop/${user.shop}/update`, data)
  }
  return await request.post('v2/shop/create', data)
}

export const getShopDetails = async () => {
  const user = getUser()
  return await request(`v2/shop/${user.shop}/detail`)
}

export const getShopCountryList = async () => {
  return await request<CountryListProps>('v2/country/list')
}

export const getShopCategoryList = async <T>(params?: T) => {
  return await request<CategoryListProps>('v2/business/category/list', {
    params,
  })
}

export const getShopSettings = async () => {
  const user = getUser()
  return await request<SettingsProps>(`v2/shop/${user.shop}/settings/get`)
}

export const getShopDelivery = async <T>() => {
  const user = getUser()
  return await request<T>(`v2/shop/${user.shop}/service/delivery`)
}

export const updateShopDelivery = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/shop/${user.shop}/service/delivery`, data)
}

export const deleteShopDelivery = async (id: string) =>
  await request.post(`v2/shop/service/${id}/delete`)

export const getShopPickup = async () => {
  const user = getUser()
  return await request<PickUpProps>(`v2/shop/${user.shop}/service/pickup`)
}

export const updateShopPickUp = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/shop/${user.shop}/service/pickup`, data)
}

export const updateShopSettings = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/shop/${user.shop}/settings/update`, data)
}

export const previewNext = async () => {
  const user = getUser()
  return await request.post(`v2/shop/preview/page/${user.shop}`)
}

export const getShops = async () => await request<ShopListProps[]>('v2/shop/list')
export const updateShop = async <T>(data: T) =>
  await request.post<UpdateShopProps>('v2/shop/select', data)

export const getShopPlatforms = async <T>(params?: T) =>
  await request<ShopPlatformListProps[]>('v2/shop/list', {
    params,
  })

export const deleteShop = async (id: string) => await request.delete(`v2/shop/delete/${id}`)

export const getShopTelegramInfo = async () => {
  const user = getUser()
  return await request<SignUpTelegramProps>(`v2/shop/bot/username/${user.shop}`)
}

export const uploadShopLogo = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/shop/logo/${user.shop}`, data)
}

export const shopPayment = async <T>(data: T) =>
  await request.post('v2/transactions/generate', data)
export const shopBankPayment = async <T>(data: T) =>
  await request.post('v2/transactions/bank/transfer', data)
