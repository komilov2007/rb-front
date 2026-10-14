export interface TelegramBotSettingsProps {
  auto_answer_en: string
  auto_answer_ru: string
  auto_answer_uz: string
  extra_info_en: string
  extra_info_ru: string
  extra_info_uz: string
  group_token: string
  id: number
  is_active: boolean
  orders: number
  firstname: string
  start_text_en: string
  start_text_ru: string
  start_text_uz: string
  token: string
  updated_at: string
  users: number
  username: string
}

export interface BotDetailProps {
  id: number
  shop: string
  token: string
}
