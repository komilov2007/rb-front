import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { InstagramProps, InstagramDetailProps } from '@/types/instagram'

export const sendInstagram = async <T>(params: T) => {
  const user = getUser()
  return await request<InstagramProps>(`v2/instagram/login/${user.shop}`, { params })
}

export const setInstagram = async (code: string) => {
  const user = getUser()
  return await request(`v2/instagram/callback?code=${code}&state=shop_${user.shop}`)
}

export const getInstagram = async () => {
  const user = getUser()
  return await request<InstagramDetailProps>(`v2/instagram/merchant/${user.shop}`)
}

export const deleteInstagram = async () => {
  const user = getUser()
  return await request.delete(`v2/instagram/merchant/${user.shop}`)
}

export const importInstagramUsers = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/instagram/conversation/import/${user.shop}`, data)
}
