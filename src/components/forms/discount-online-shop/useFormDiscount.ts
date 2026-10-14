import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import {
  createOnlineShopDiscount,
  getOnlineShopDetailDiscount,
  updateOnlineShopDiscount,
} from '@/apis/admin/discount'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { type ParamProps } from '@/types/params'

export interface FormDiscountProps {
  variant: 'add' | 'edit'
}

export const useFormDiscount = ({ variant }: FormDiscountProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { discountId } = useParams<ParamProps>()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const handleBack = () => {
    navigate(-1)
  }

  const { isFetching, isLoading: isLoadingDetail } = useQuery({
    enabled: variant === 'edit',
    queryKey: [REACT_QUERY_KEYS.DISCOUNT_DETAIL_ONLINE_SHOP, discountId],
    queryFn: async () => await getOnlineShopDetailDiscount(Number(discountId)),
    onSuccess: res => {
      const { id, expires_at, discount_type, amount, products, ...rest } = res.data
      const isPercent = discount_type === 'PERCENT'
      const isFixed = discount_type === 'FIXED'
      const productIds = products.map(product => product.id)

      const date = expires_at
      const time = expires_at

      form.reset({
        ...rest,
        product_ids: productIds,
        date,
        time,
        percent: isPercent ? amount : null,
        amount: isFixed ? amount : null,
        discount_type,
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ date, time, ...data }: SchemaType) => {
      const finish_date = `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}`
      const amount = data.discount_type === 'FIXED' ? data.amount : data.percent
      const values = { ...data, expires_at: finish_date, amount }

      if (variant === 'edit') {
        return await updateOnlineShopDiscount(values, String(discountId))
      }

      return await createOnlineShopDiscount(values)
    },
    onSuccess: async res => {
      handleBack()
      toast.success(t('the_action_has_successfully_been_completed'))
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.DISCOUNT_LIST_ONLINE_SHOP])
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, onSubmit, isLoading, isFetching, isLoadingDetail, handleBack, discountId }
}
