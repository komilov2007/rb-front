import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  MessageProps,
  ChatUserProps,
  MessageHeaderProps,
  ChatSettingsProps,
} from '@/types/chat'

export const geChatUsers = async <T>(params: T) => {
  const user = getUser()
  return await request<List<ChatUserProps>>(`v2/chat/customer/list/${user.shop}`, { params })
}

export const getUserMessages = async <T>(params: T, id?: string) =>
  await request<List<MessageProps>>(`v2/chat/list/${id}`, { params })

export const sendFile = async <T>(data: T) => await request.post('v2/chat/send/file', data)

export const getChatCustomerInfo = async (id?: string) =>
  await request<MessageHeaderProps>(`v2/chat/header/${id}/detail`)

export const getChatSettings = async () => {
  const user = getUser()
  return await request<ChatSettingsProps>(`v2/chat/settings/${user.shop}`)
}

export const updateChatSettings = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/chat/settings/${user.shop}`, { ...data, shop: user.shop })
}
