import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { type DiscountProps } from '@/types/discount'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { createDiscount, getDetailDiscount, updateDiscount } from '@/apis/admin/discount'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'

export interface FormDiscountProps {
  id?: number
  variant: 'add' | 'edit'
  handleUpdate: (data: DiscountProps) => void
}

export const useFormDiscount = ({ id, variant, handleUpdate }: FormDiscountProps) => {
  const { t } = useTranslation()
  const branches = useProfileStore(state => state.branches.map(b => b.value))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({ branches }, { assert: false }),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const { isFetching, isLoading: isLoadingDetail } = useQuery({
    enabled: value && variant === 'edit',
    queryKey: [REACT_QUERY_KEYS.PROMO_CODE_DETAIL, id],
    queryFn: async () => await getDetailDiscount(Number(id)),
    onSuccess: res => {
      const { id, finish_date, ...rest } = res.data
      const date = finish_date
      const time = finish_date
      form.reset({ ...rest, date, time })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ date, time, ...data }: SchemaType) => {
      const finish_date = `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}`
      const values = { ...data, finish_date }

      if (variant === 'edit') {
        return await updateDiscount(values, String(id))
      }

      return await createDiscount(values)
    },
    onSuccess: res => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate({ ...res.data, products: res.data.products.length })
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading, isFetching, isLoadingDetail }
}
