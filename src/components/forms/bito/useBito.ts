import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { useBoolean } from '@/hooks/useBoolean'
import { schemaBito, type SchemaTypeBito } from './form.schema'
import { getBitoToken, importBito, installBito } from '@/apis/admin/bito'

export interface BitoProps {
  onClose: () => void
}

export const useBito = (props: BitoProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean(false)
  const form = useForm<SchemaTypeBito>({
    mode: 'onChange',
    resolver: yupResolver(schemaBito),
    defaultValues: schemaBito.cast({}, { assert: false }),
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.BITO_DETAIL],
    queryFn: getBitoToken,
    onSuccess: res => {
      form.reset(res.data)
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeBito) => await installBito(data),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BITO_DETAIL])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const { mutate: importMutation, isLoading: importLaoding } = useMutation({
    mutationFn: async () => await importBito(),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BITO_DETAIL])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('BITO'),
    onSuccess: () => {
      props.onClose()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BITO_DETAIL])
      form.reset(schemaBito.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaTypeBito) => {
    mutate(data)
  }

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const handleClick = () => {
    importMutation()
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
    handleClick,
    importLaoding,
  }
}
