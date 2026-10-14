import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { getOrderDetail } from '@/apis/admin/order'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaOrderDetail, type SchemaTypeOrderDetail } from '@/utils/schema'
import type { OrderDetailProps, OrderListProps, OrderStatusesTabProps } from '@/types/order'

export interface DetailProps {
  status: OrderStatusesTabProps
  queryKey: object | string[]
}

export const useDetail = () => {
  const [row, setRow] = useState<OrderListProps | null>(null)
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      setRow(null)
      form.reset({})
    },
  })

  const { data, isLoading } = useQuery({
    enabled: value && row?.is_visible,
    queryFn: async () => await getOrderDetail(row?.id),
    queryKey: [REACT_QUERY_KEYS.ORDER_STATUS_DETAIL, row?.id],
    onSuccess: res => {
      form.reset(
        schemaOrderDetail.cast(
          {
            courier: res.data.order_details.courier,
          },
          { assert: false },
        ),
      )
    },
  })

  const values = data?.data as OrderDetailProps

  const form = useForm<SchemaTypeOrderDetail>({
    mode: 'onChange',
    resolver: yupResolver(schemaOrderDetail),
    defaultValues: schemaOrderDetail.cast({}, { assert: false }),
  })

  return { row, form, value, values, setRow, setTrue, setFalse, isLoading }
}
