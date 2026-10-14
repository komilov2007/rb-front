import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useFormStore } from '@/store/form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import type { ErrorProps } from '@/types/error'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaYesPos, type SchemaTypeYesPos } from '@/utils/schema'
import { getYesPos, importYesPos, postYesPos } from '@/apis/admin/yes-pos'

export const useFormYesPos = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const { t } = useTranslation()
  const setProductStockBoolean = useFormStore(state => state.setProductStockBoolean)
  const form = useForm<SchemaTypeYesPos>({
    mode: 'onChange',
    resolver: yupResolver(schemaYesPos),
    defaultValues: schemaYesPos.cast({}, { assert: false }),
  })

  const getMerchant = useQuery({
    queryFn: getYesPos,
    queryKey: [REACT_QUERY_KEYS.YES_POS],
    onSuccess: res => {
      form.reset({
        api_key: res.data?.yes_pos?.api_key,
        branch_id: res.data?.yes_pos?.branch_id,
      })
    },
  })

  const deleteMerchant = useMutation({
    mutationFn: async () => await deleteIntegration('yes_pos'),
    onSuccess: () => {
      void getMerchant.refetch()
      form.reset(schemaYesPos.cast({}, { assert: false }))
    },
  })

  const postMerchant = useMutation({
    mutationFn: async (data: SchemaTypeYesPos) => await postYesPos({ ...data, branch_id: 1 }),
    onSuccess: () => {
      void getMerchant.refetch()
    },
  })

  const importMerchant = useMutation({
    mutationFn: importYesPos,
    onSuccess: () => {
      modal.setFalse()
      open.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaTypeYesPos) => {
    postMerchant.mutate(data, {
      onSuccess: () => {
        modal.setFalse()
        open.setFalse()
      },
      onError: err => {
        const error = err as ErrorProps
        if (error?.response?.data?.code === '010') {
          setProductStockBoolean(true)()
        }
      },
    })
  }

  const handleDelete = () => {
    deleteMerchant.mutate()
  }

  const handleImport = () => {
    importMerchant.mutate()
  }

  return {
    t,
    open,
    form,
    modal,
    onSubmit,
    getMerchant,
    handleImport,
    handleDelete,
    postMerchant,
    deleteMerchant,
    importMerchant,
  }
}
