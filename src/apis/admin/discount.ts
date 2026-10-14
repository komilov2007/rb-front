import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  DiscountOnlineShopProps,
  DiscountProps,
  DiscountDetailProps,
  DiscountDetailOnlineShopProps,
} from '@/types/discount'

export const getDiscounts = async <T>(params: T) => {
  const user = getUser()
  return await request<List<DiscountProps>>(`v2/discount/list/${user.shop}`, { params })
}

export const getDetailDiscount = async (id: number) =>
  await request<DiscountDetailProps>(`v2/discount/${id}/detail`)

export const deleteDiscount = async (id: number) => await request.delete(`v2/discount/${id}/delete`)

export const createDiscount = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/discount/create', { ...data, shop: user.shop })
}

export const updateDiscount = async <T>(data: T, id: string) => {
  return await request.put(`v2/discount/${id}/update`, data)
}

export const getOnlineShopDiscounts = async <T>(params: T) => {
  return await request<List<DiscountOnlineShopProps>>('v3/admin/product-discounts', { params })
}

export const getOnlineShopDetailDiscount = async (id: number) =>
  await request<DiscountDetailOnlineShopProps>(`v3/admin/product-discounts/${id}`)

export const deleteOnlineShopDiscount = async (id: number) =>
  await request.delete(`v3/admin/product-discounts/${id}`)

export const createOnlineShopDiscount = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v3/admin/product-discounts', { ...data, shop: user.shop })
}

export const updateOnlineShopDiscount = async <T>(data: T, id: string) => {
  return await request.put(`v3/admin/product-discounts/${id}`, data)
}
