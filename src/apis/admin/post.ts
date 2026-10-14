import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { ChannelsProps, TelegramPublicationsProps } from '@/types/marketing'

export const getPostChannels = async () => {
  const user = getUser()
  return await request<ChannelsProps[]>(`v2/bot/chats/${user.shop}`)
}

export const postTelegramPublications = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/mailing/telegram/publications/${user.shop}`, {
    ...data,
    shop_id: user.shop,
  })
}

export const getTelegramPublications = async () => {
  const user = getUser()
  return await request<TelegramPublicationsProps[]>(`v2/mailing/telegram/publications/${user.shop}`)
}
