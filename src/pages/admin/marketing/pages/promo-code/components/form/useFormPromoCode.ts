import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { type PromoCodeProps } from '@/types/promo-code'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { createPromoCode, getDetailPromoCode, updatePromoCode } from '@/apis/admin/promo-code'

export interface FormPromoCodeProps {
  id?: number
  variant: 'add' | 'edit'
  handleUpdate: (data: PromoCodeProps) => void
  count?: number
}

export const useFormPromoCode = ({ id, variant, count = 0, handleUpdate }: FormPromoCodeProps) => {
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const { isFetching, isLoading: isLoadingDetail } = useQuery({
    enabled: value && variant === 'edit',
    queryKey: [REACT_QUERY_KEYS.PROMO_CODE_DETAIL, id],
    queryFn: async () => await getDetailPromoCode(Number(id)),
    onSuccess: res => {
      const { id, used, shop, ...rest } = res.data
      const end_time = res.data.end_date
      form.reset({ ...rest, end_time })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const end_date = `${dayjs(data.end_date).format('YYYY-MM-DD')}T${dayjs(data.end_time).format(
        'HH:mm:00',
      )}`

      const code = data.code.toLocaleUpperCase()

      const values = { ...data, code, end_date }

      if (variant === 'edit') {
        return await updatePromoCode(values, String(id))
      }

      return await createPromoCode(values)
    },
    onSuccess: res => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate(res.data)
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleOpen = () => {
    const { tariff } = subscription || {}
    const canOpen = (tariff === 'START' && count < 5) || tariff === 'BASIC' || tariff === 'PRO'

    if (canOpen) {
      setTrue()
    } else {
      setSubscriptionModal(true, {
        title: '',
        description: 'On_the_Start_plan_promo_codes_are_available_only_once',
      })
    }
  }

  return {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isFetching,
    handleOpen,
    isLoadingDetail,
  }
}
