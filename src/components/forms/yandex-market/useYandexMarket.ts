import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getYandexMarket, installYandexMarket } from '@/apis/admin/yandex-market'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { schemaYandexMarket, type SchemaTypeYandexMarket } from './form.schema'
import { useBoolean } from '@/hooks/useBoolean'

export interface YandexMarketProps {
  onClose: () => void
}

export const useYandexMarket = (props: YandexMarketProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean(false)

  const form = useForm<SchemaTypeYandexMarket>({
    mode: 'onChange',
    resolver: yupResolver(schemaYandexMarket),
    defaultValues: schemaYandexMarket.cast({}, { assert: false }),
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.YANDEX_MARKET_DETAIL],
    queryFn: getYandexMarket,
    onSuccess: res => {
      if (res.data.api_key) {
        form.setValue('api_key', res.data.api_key)
      }
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeYandexMarket) => await installYandexMarket(data),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.YANDEX_MARKET_DETAIL])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('YANDEX_MARKET'),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.YANDEX_MARKET_DETAIL])
      form.reset(schemaYandexMarket.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaTypeYandexMarket) => {
    mutate(data)
  }

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return {
    form,
    token,
    onSubmit,
    isLoading,
    deleteMutation,
    handleDelete,
    handleEdit: setTrue,
    cancelEdit: setFalse,
    edit: value,
  }
}
