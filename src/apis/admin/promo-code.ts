import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import { type PromoCodeProps } from '@/types/promo-code'

export const getPromoCodes = async <T>(params: T) => {
  const user = getUser()
  return await request<List<PromoCodeProps>>(`v2/promocode/list/${user.shop}`, { params })
}

export const deletePromoCode = async (id: number) =>
  await request.delete(`v2/promocode/${id}/delete`)

export const createPromoCode = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/promocode/create', { ...data, shop: user.shop })
}

export const getDetailPromoCode = async (id: number) =>
  await request<PromoCodeProps>(`v2/promocode/${id}/detail`)

export const updatePromoCode = async <T>(data: T, id: string) => {
  return await request.put(`v2/promocode/${id}/update`, data)
}
