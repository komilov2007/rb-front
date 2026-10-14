import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAmoCRM, installAmoCRM } from '@/apis/admin/amo-crm'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { schemaAmoCRM, type SchemaTypeAmoCRM } from './form.schema'
import { useBoolean } from '@/hooks/useBoolean'

export interface AmoCRMProps {
  onClose: () => void
}

export const useAmoCRM = (props: AmoCRMProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean(false)

  const form = useForm<SchemaTypeAmoCRM>({
    mode: 'onChange',
    resolver: yupResolver(schemaAmoCRM),
    defaultValues: schemaAmoCRM.cast({}, { assert: false }),
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.AMOCRM_DETAIL],
    queryFn: getAmoCRM,
    onSuccess: res => {
      if (res.data.token && res.data.subdomain) {
        form.setValue('token', res.data.token)
        form.setValue('subdomain', res.data.subdomain)
      }
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeAmoCRM) => await installAmoCRM(data),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.AMOCRM_DETAIL])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('amocrm'),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.AMOCRM_DETAIL])
      form.reset(schemaAmoCRM.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaTypeAmoCRM) => {
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
