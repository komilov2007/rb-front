import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { defaultLanguages } from '@/utils/languages'
import { yupResolver } from '@hookform/resolvers/yup'
import { type LanguageTypes } from '@/types/language'
import { schema, type SchemaType } from './form.schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type TelegramBotSettingsProps } from '@/types/telegram-bot'
import { updateTelegramBotSettings } from '@/apis/admin/telegram-bot'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

type PanelsProps = Array<{
  value: LanguageTypes
  button: 'button_uz' | 'button_ru' | 'button_en' | 'button_tr'
  start_text: 'start_text_uz' | 'start_text_ru' | 'start_text_en' | 'start_text_tr'
}>

export const usePage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id, users, orders, token, is_active, updated_at, group_token, ...defaultValues } =
    useOutletContext<TelegramBotSettingsProps>()

  const form = useForm<SchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const extra_info = defaultLanguages(
        'button',
        {
          button_en: data.button_en,
          button_ru: data.button_ru,
          button_uz: data.button_uz,
          button_tr: data.button_tr,
        },
        true,
      )
      const start_text = defaultLanguages(
        'start_text',
        {
          start_text_en: data.start_text_en,
          start_text_ru: data.start_text_ru,
          start_text_uz: data.start_text_uz,
          start_text_tr: data.start_text_tr,
        },
        true,
      )

      const values = {
        ...start_text,
        ...extra_info,
      }
      return await updateTelegramBotSettings(values)
    },
    onSuccess: res => {
      toast.success(t('the_action_has_successfully_been_completed'))
      queryClient.setQueryData([REACT_QUERY_KEYS.TELEGRAM_BOT_SETTINGS], ({ data, ...rest }) => {
        return { ...rest, data: res.data }
      })
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const panels: PanelsProps = [
    {
      value: 'uz',
      button: 'button_uz',
      start_text: 'start_text_uz',
    },
    {
      value: 'ru',
      button: 'button_ru',
      start_text: 'start_text_ru',
    },
    {
      value: 'en',
      button: 'button_en',
      start_text: 'start_text_en',
    },
    {
      value: 'tr',
      button: 'button_tr',
      start_text: 'start_text_tr',
    },
  ]

  const handleCancel = () => {
    form.reset(defaultValues)
  }

  return { form, panels, onSubmit, isLoading, group_token, handleCancel }
}
