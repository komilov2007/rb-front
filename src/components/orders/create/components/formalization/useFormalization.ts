import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { phoneFormat } from '@/utils/phone'
import { useOrderStore } from '@/store/order'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useState, type ChangeEvent } from 'react'
import { PAYMENT_TYPES } from '@/constants/payment'
import { yupResolver } from '@hookform/resolvers/yup'
import { type OrderUserAddress } from '@/types/order'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { schemaCreateOrder, type SchemaTypeCreateOrder } from '@/utils/schema'
import { checkUserForOrder, createOrder, getOrderFormDetail } from '@/apis/admin/order'

export interface FormalizationProps {
  handleClose: () => void
}

export const useFormalization = (props: FormalizationProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const total = useOrderStore(state => state.total)
  const { value, setTrue, setFalse } = useBoolean()
  const [addresses, setAddresses] = useState<OrderUserAddress[]>([])
  const { cartsCard, cartsDetail } = useOrderStore(state => ({
    cartsCard: state.cartsCard,
    cartsDetail: state.cartsDetail,
  }))

  const formDetail = useQuery({
    enabled: value,
    queryFn: getOrderFormDetail,
    queryKey: [REACT_QUERY_KEYS.ORDER_FORM_DETAIL],
    select: res => {
      const payments = res.data.payments.map(payment => ({
        value: payment.state,
        label: PAYMENT_TYPES[payment.state].label,
      }))

      return { ...res, data: { ...res.data, payments } }
    },
    onSuccess: res => {
      if (res.data.services.length === 1) {
        form.setValue('delivery_type', res.data.services[0].type)
      }
    },
  })

  const form = useForm<SchemaTypeCreateOrder>({
    mode: 'onChange',
    resolver: yupResolver(schemaCreateOrder),
    defaultValues: schemaCreateOrder.cast({}, { assert: false }),
  })

  const checkUser = useMutation({
    mutationFn: async (phone: string) => await checkUserForOrder({ phone }),
    onSuccess: res => {
      if (res.data !== '') {
        form.setValue('customer_name', res.data.firstname)
        setAddresses(res.data.addresses)
      }
    },
  })

  const create = useMutation({
    mutationFn: async (data: SchemaTypeCreateOrder) => {
      const shipping_datetime =
        data.shipping_date && data.shipping_time
          ? `${dayjs(data.shipping_date).format('YYYY-MM-DD')}T${dayjs(data.shipping_time).format('HH:mm')}:00`
          : null

      const detail = cartsDetail.map(c => ({
        product: c.id,
        quantity: c.count,
        parameter: c?.selectedParametr,
        ad_parameter: c.additional_parameter.map(a => a.skus.map(s => s.id)).flat() ?? [],
      }))
      const card = cartsCard.map(c => ({
        product: c.id,
        quantity: c.count,
        ad_parameter: [],
      }))
      const items = [...card, ...detail]
      const values = {
        items,
        phone: phoneFormat(data.phone),
        customer_name: data.customer_name,
        platform: 'TELEGRAM',
        payment_type: data.payment_type,
        service_type: data.delivery_type,
        is_paid: false,
        is_manual: true,
      }

      const info = {
        ...values,
        shipping_datetime,
        branch: data.branch,
        address: {
          latitude: data.latitude,
          longitude: data.longitude,
          room: data.room,
          floor: data.floor,
          entrance: data.entrance,
          comment: data.comment,
        },
      }
      return await createOrder(info)
    },
    onSuccess: () => {
      setFalse()
      props.handleClose()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ME])
      void queryClient.invalidateQueries({
        predicate: query => {
          const key = query.queryKey[0] as string
          return !!key.includes(REACT_QUERY_KEYS.ORDER_STATUS_LIST)
        },
      })
    },
  })

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace('_', '').replace(/\s/g, '')
    if (phone.length === 9) {
      checkUser.mutate(`+998${phone}`)
    }
  }
  const onSubmit = (data: SchemaTypeCreateOrder) => {
    create.mutate(data)
  }

  return {
    form,
    value,
    total,
    create,
    setTrue,
    onSubmit,
    setFalse,
    addresses,
    checkUser,
    formDetail,
    handleChangePhone,
  }
}
