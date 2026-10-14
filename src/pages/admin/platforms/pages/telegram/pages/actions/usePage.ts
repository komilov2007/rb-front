import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type TelegramBotSettingsProps } from '@/types/telegram-bot'
import {
  updateTelegramBotStop,
  updateTelegramBotToken,
  updateTelegramBotRestart,
} from '@/apis/admin/telegram-bot'

export const schema = object().shape({
  token: string().required('token_is_a_required_field'),
})

export type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const defaultValues = useOutletContext<TelegramBotSettingsProps>()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      token: defaultValues.token,
    },
  })

  const handleUpdate = () => {
    void queryClient.invalidateQueries([REACT_QUERY_KEYS.TELEGRAM_BOT_SETTINGS])
  }

  const { mutate: mutateStop, isLoading: isLoadingStop } = useMutation({
    mutationFn: updateTelegramBotStop,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate()
    },
  })

  const { mutate: mutateToken, isLoading: isLoadingToken } = useMutation({
    mutationFn: async (data: SchemaType) => await updateTelegramBotToken(data),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate()
    },
  })

  const { mutate: mutateRestart, isLoading: isLoadingRestart } = useMutation({
    mutationFn: updateTelegramBotRestart,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate()
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutateToken(data)
  }

  const handleStop = () => {
    mutateStop()
  }

  const handleRestart = () => {
    mutateRestart()
  }

  return {
    form,
    onSubmit,
    handleStop,
    handleUpdate,
    handleRestart,
    defaultValues,
    isLoadingStop,
    isLoadingToken,
    isLoadingRestart,
  }
}
