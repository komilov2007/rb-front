import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMarketingStore } from '@/store/marketing'
import { postTelegramPublications } from '@/apis/admin/post'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { schemaTelegramPost, type SchemaTypeTelegramPost } from '@/utils/schema'

export const useFormTelegramPost = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const channels = useMarketingStore(state =>
    state.channels.map(ch => ({ value: ch.id, label: ch.name })),
  )

  const form = useForm<SchemaTypeTelegramPost>({
    mode: 'onChange',
    resolver: yupResolver(schemaTelegramPost),
    defaultValues: schemaTelegramPost.cast({}, { assert: false }),
  })
  const product = useWatch({ control: form.control, name: 'product_id' })
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeTelegramPost) => await postTelegramPublications(data),
    onSuccess: () => {
      modal.setFalse()
      form.reset(schemaTelegramPost.cast({}, { assert: false }))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.TELEGRAM_PUBLICATIONS])
    },
  })

  const onSubmit = (data: SchemaTypeTelegramPost) => {
    mutate(data)
  }

  return { t, form, modal, product, channels, onSubmit, isLoading }
}
