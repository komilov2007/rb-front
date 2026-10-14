import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { updateSeetings, getIkpuSeetings } from '@/apis/admin/ikpu'
import { useTranslation } from 'react-i18next'

export const useSettings = () => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const {
    data,
    isLoading: isLoadingIkpuSettings,
    isFetching: isFetchingIkpuSettings,
  } = useQuery({
    enabled: value,
    queryFn: getIkpuSeetings,
    queryKey: [REACT_QUERY_KEYS.IKPU_SETTINGS],
    onSuccess: data => {
      form.reset(data?.data)
    },
  })

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: data?.data ?? schema.cast({}, { assert: false }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => await updateSeetings(data),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      setFalse()
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isLoadingIkpuSettings,
    isFetchingIkpuSettings,
  }
}
