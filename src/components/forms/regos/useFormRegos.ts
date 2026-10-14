import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaRegos, type SchemaTypeRegos } from '@/utils/schema'
import { postRegos, importRegos, getRegosCreds } from '@/apis/admin/regos'

export const useFormRegos = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const { t } = useTranslation()
  const form = useForm<SchemaTypeRegos>({
    mode: 'onChange',
    resolver: yupResolver(schemaRegos),
    defaultValues: schemaRegos.cast({}, { assert: false }),
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.REGOS_DETAIL],
    queryFn: getRegosCreds,
    onSuccess: res => {
      form.reset(res.data.regos)
    },
  })

  const hasToken = !!token.data?.data.regos?.integration_id

  const deleteMerchant = useMutation({
    mutationFn: async () => await deleteIntegration('regos'),
    onSuccess: () => {
      void token.refetch()
      form.reset(schemaRegos.cast({}, { assert: false }))
    },
  })

  const postMerchant = useMutation({
    mutationFn: async (data: SchemaTypeRegos) => await postRegos(data),
    onSuccess: () => {
      void token.refetch()
      open.setFalse()
    },
  })

  const importMerchant = useMutation({
    mutationFn: importRegos,
    onSuccess: () => {
      modal.setFalse()
      open.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleDelete = () => {
    deleteMerchant.mutate()
  }

  const handleImport = () => {
    importMerchant.mutate()
  }

  const onSubmit = (data: SchemaTypeRegos) => {
    postMerchant.mutate(data)
  }

  return {
    t,
    open,
    form,
    token,
    modal,
    onSubmit,
    hasToken,
    handleImport,
    postMerchant,
    handleDelete,
    importMerchant,
    deleteMerchant,
  }
}
