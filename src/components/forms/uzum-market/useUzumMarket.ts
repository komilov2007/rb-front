import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { useBoolean } from '@/hooks/useBoolean'
import { schemaUzumMarket, type SchemaTypeUzumMarket } from './form.schema'
import { getUzumMarketToken, installUzumMarket } from '@/apis/admin/uzum-market'

export interface UzumMarketProps {
  onClose: () => void
}

export const useUzumMarket = (props: UzumMarketProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean(false)

  const form = useForm<SchemaTypeUzumMarket>({
    mode: 'onChange',
    resolver: yupResolver(schemaUzumMarket),
    defaultValues: schemaUzumMarket.cast({}, { assert: false }),
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.UZUM_MARKET_DETAIL],
    queryFn: getUzumMarketToken,
    onSuccess: res => {
      form.reset(res.data)
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeUzumMarket) => await installUzumMarket(data),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.UZUM_MARKET_DETAIL])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('UZUM_MARKET'),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.UZUM_MARKET_DETAIL])
      form.reset(schemaUzumMarket.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaTypeUzumMarket) => {
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
