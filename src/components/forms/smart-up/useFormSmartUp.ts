import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'
import { schemaSmartUp, type SchemaTypeSmartUp } from '@/utils/schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteSmartUp, getSmartUp, importSmartUp, installSmartUp } from '@/apis/admin/smart-up'

export interface FormSmartUpProps extends Partial<RoboMarketAppDetaiProps> {
  onClose: () => void
}

export const useFormSmartUp = ({ onClose }: FormSmartUpProps) => {
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeSmartUp>({
    mode: 'onChange',
    resolver: yupResolver(schemaSmartUp),
    defaultValues: schemaSmartUp.cast({}, { assert: false }),
  })

  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SMART_UP_DETAIL],
    queryFn: getSmartUp,
    onSuccess: res => {
      form.reset({
        login: res.data?.login,
        robot: res.data?.robot,
        fillial: res.data?.fillial,
        password: res.data?.password,
        warehouse: res.data?.warehouse,
        price_type_code: res.data?.price_type?.code,
        price_type_name: res.data?.price_type?.name,
        price_type_currency_code: res.data?.price_type?.currency_code,
      })
    },
  })

  const smartUp = useMutation({
    mutationFn: async ({
      price_type_code,
      price_type_name,
      price_type_currency_code,
      ...data
    }: SchemaTypeSmartUp) => {
      const price_type = {
        code: price_type_code,
        name: price_type_name,
        currency_code: price_type_currency_code,
      }
      return await installSmartUp({
        price_type,
        ...data,
      })
    },
    onSuccess: () => {
      upload.setFalse()
      form.reset(schemaSmartUp.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.SMART_UP_DETAIL])
    },
  })

  const importSmartUpData = useMutation({
    mutationFn: importSmartUp,
    onSuccess: () => {
      onClose()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const deleteMutationSmartUp = useMutation({
    mutationFn: deleteSmartUp,
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.SMART_UP_DETAIL])
      form.reset(schemaSmartUp.cast({}, { assert: false }))
    },
  })

  const handleDelete = () => {
    deleteMutationSmartUp.mutate()
  }

  const onSubmit = (data: SchemaTypeSmartUp) => {
    smartUp.mutate(data)
  }

  const handleClick = () => {
    importSmartUpData.mutate()
  }

  return {
    t,
    form,
    data,
    upload,
    smartUp,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    importSmartUpData,
    deleteMutationSmartUp,
  }
}
