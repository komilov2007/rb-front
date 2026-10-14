import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type TelegramBotSettingsProps } from '@/types/telegram-bot'

interface ResTelegramBotSettingsProps {
  data: TelegramBotSettingsProps
}

export const getTelegramBotSettings = async () => {
  const user = getUser()
  return await request<ResTelegramBotSettingsProps, ResTelegramBotSettingsProps>(
    `v2/bot/detail/${user.shop}`,
  )
}

export const updateTelegramBotSettings = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/bot/detail/${user.shop}/update`, data)
}

export const deleteTelegramBot = async (shop?: string) => {
  const user = getUser()
  return await request.delete(`v2/bot/delete/${shop ?? user.shop}`)
}

export const updateTelegramBotToken = async <T>(data: T) => {
  const user = getUser()
  return await request.post(`v2/bot/update/token/${user.shop}`, data)
}

export const updateTelegramBotRestart = async () => {
  const user = getUser()
  return await request.post(`v2/bot/restart/${user.shop}`)
}

export const updateTelegramBotStop = async () => {
  const user = getUser()
  return await request.post(`v2/bot/stop/${user.shop}`)
}
