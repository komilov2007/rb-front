import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type SignUpWebsiteProps } from '@/types/sign-up'
import { type BotDetailProps } from '@/types/telegram-bot'

export const createBot = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/bot/create', { ...data, shop: user?.shop })
}

export const getBotDetail = async () => {
  const user = getUser()
  return await request<BotDetailProps>(`v2/shop/${user.shop}/bot/detail`)
}

export const createOrUpdateWebsite = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/website/domain/create-or-update/${user.shop}`, data)
}

export const getWebsiteDetail = async () => {
  const user = getUser()
  return await request<SignUpWebsiteProps>(`v2/website/detail/${user.shop}`)
}

export const deleteWebsite = async (shop?: string) => {
  const user = getUser()
  return await request.delete(`v2/website/delete/${shop ?? user.shop}`)
}

export const updateWebsite = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/website/detail/${user.shop}`, data)
}
