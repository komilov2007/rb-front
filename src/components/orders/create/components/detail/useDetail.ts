import { useState } from 'react'
import { useOrderStore } from '@/store/order'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useForm, useFieldArray } from 'react-hook-form'
import { getOrderProductById } from '@/apis/admin/order'
import type { OrderProductsProps, ParameterProps } from '@/types/products'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useDetail = (props: OrderProductsProps) => {
  const [count, setCount] = useState(1)
  const { cartsCard, cartsDetail, setCartsCard, setCartsDetail } = useOrderStore(state => ({
    cartsCard: state.cartsCard,
    cartsDetail: state.cartsDetail,
    setCartsCard: state.setCartsCard,
    setCartsDetail: state.setCartsDetail,
  }))

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(defaultValues)
      setCount(1)
    },
  })

  const { data, isLoading } = useQuery({
    enabled: value,
    queryFn: async () => await getOrderProductById(props.id),
    queryKey: [REACT_QUERY_KEYS.ORDER_PRODUCT_BY_ID, props.id],
    select: res => {
      const additional_parameter = res.data.additional_parameter

      const single = additional_parameter
        ?.filter(parametr => parametr.type === 'single')
        .map(parametr => ({ ...parametr, value: '' }))

      const multiple = additional_parameter
        ?.filter(parametr => parametr.type === 'multiple')
        .map(parametr => {
          const skus = parametr.skus.map(s => ({ ...s, check: false }))
          return {
            ...parametr,
            skus,
          }
        })
      return { ...res.data, single, multiple }
    },
    onSuccess: res => {
      if (!props.have_parameter) {
        const finProduct = cartsCard.find(c => c.id === props.id)
        setCount(finProduct?.count ?? 1)
      }
      form.reset({ single: res.single, multiple: res.multiple, hasParameter: !!res?.parameter })
    },
  })

  const defaultValues = schema.cast(
    {
      single: data?.single,
      multiple: data?.multiple,
    },
    { assert: false },
  )

  const form = useForm<SchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const single = useFieldArray({
    name: 'single',
    control: form.control,
  })

  const multiple = useFieldArray({
    name: 'multiple',
    control: form.control,
  })

  const onSubmit = (values: SchemaType) => {
    if (props.have_parameter) {
      const totalParameter = values.parameter
        ? Number(data?.parameter?.skus.find(s => s.id === Number(values.parameter))?.price)
        : 0
      const multiple = values.multiple?.map(m => {
        const skus = m.skus.filter(({ check }) => check)
        return { ...m, skus }
      })
      const totalMultiple = multiple
        ?.map(m => m.skus.map(s => Number(s.price)))
        .flat()
        .reduce((prev, next) => prev + next, 0)
      const totalSingle = values.single
        ?.map(({ value, ...m }) => {
          const skus = m.skus.find(s => s.id === Number(value))
          return Number(skus?.price ?? 0)
        })
        .reduce((prev, next) => prev + next, 0)
      const newTotal = Number(totalSingle) + Number(totalMultiple) + totalParameter
      const total = totalParameter > 0 ? newTotal : newTotal + Number(data?.price)

      if (data) {
        const newCartsDetail = [
          ...cartsDetail,
          {
            ...data,
            count,
            total,
            totalPrice: count * total,
            selectedParametr: values?.parameter,
            additional_parameter: multiple as ParameterProps[],
          },
        ]
        setCartsDetail(newCartsDetail)
      }
    } else {
      const findCartsCard = cartsCard.find(p => p.id === props.id)
      const price = props.sale_type ? props.discount_price : props.price
      const newCartsCard = findCartsCard
        ? cartsCard.map(p => {
            if (p.id === props.id) {
              const price = p.sale_type ? p.discount_price : p.price
              return { ...p, count, totalPrice: count * Number(price) }
            }
            return p
          })
        : [...cartsCard, { ...props, count, totalPrice: count * Number(price) }]

      setCartsCard(newCartsCard)
    }
    setFalse()
  }
  const handleUpdateCount = (count: number) => {
    setCount(count)
  }

  return {
    count,
    data,
    form,
    value,
    single,
    setTrue,
    multiple,
    setFalse,
    onSubmit,
    isLoading,
    handleUpdateCount,
  }
}
