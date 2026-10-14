import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { useRef, useMemo } from 'react'
import isToday from 'dayjs/plugin/isToday'
import { Bonus } from '@/components/bonus'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { type ParamProps } from '@/types/params'
import { useProfileStore } from '@/store/profile'
import { PAYMENT_TYPES } from '@/constants/payment'
import { type OrderListProps } from '@/types/order'
import { numberFormat } from '@/utils/number-format'
import { usePagination } from '@/hooks/usePagination'
import { DELIVERY_TYPES } from '@/constants/delivery'
import { type ColumnDef } from '@tanstack/react-table'
import { OrderStatus } from '@/components/orders/status'
import { OrderAction } from '@/components/orders/action'
import { getCustomerOrders } from '@/apis/admin/customer'
import { type CustomerOrdersProps } from '@/types/customer'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

dayjs.extend(isToday)

export const useOrder = () => {
  const { t } = useTranslation()
  const { customerId } = useParams<ParamProps>()
  const detailRef = useRef({ setTrue: (_: OrderListProps) => {} })
  const { page, limit, params, handlePage, handleLimit } = usePagination()
  const { can_edit, currency } = useProfileStore(state => {
    return {
      currency: state.me?.currency?.code,
      can_edit: state.getPermission('orders', 'can_edit'),
    }
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.CUSTOMER_ORDERS_LIST, customerId, params]

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: async () => await getCustomerOrders(customerId, params),
  })

  const columns = useMemo<Array<ColumnDef<CustomerOrdersProps>>>(() => {
    const defaultColumns: Array<ColumnDef<CustomerOrdersProps>> = [
      {
        header: 'order_id',
        accessorFn: row => row.id,
      },
      {
        header: 'date_and_time',
        accessorFn: row => row.created_at,
        cell: cell => {
          return (
            <Stack whiteSpace='nowrap'>
              {dayjs(cell.row.original.created_at).isToday() ? (
                <>
                  {dayjs(cell.row.original.created_at).format('HH:mm;')} {t('today')}
                </>
              ) : (
                dayjs(cell.row.original.created_at).format('DD.MM.YYYY, HH:mm')
              )}
            </Stack>
          )
        },
      },
      {
        header: 'price',
        accessorFn: row => {
          return `${numberFormat(row.amount)} ${currency}`
        },
      },
      {
        accessorKey: 'bonus_point',
        header: 'bonus_point',
        cell: cell => (
          <Bonus
            value={`${cell.row.original.used_ball !== 0 ? '-' : ''}${cell.row.original.used_ball}`}
          />
        ),
      },
      {
        header: 'payment_type',
        accessorFn: row => {
          return t(PAYMENT_TYPES[row.payment_type].label)
        },
      },
      {
        header: 'order_type',
        accessorFn: row => {
          return t(DELIVERY_TYPES[row.service_type].title)
        },
      },
      {
        header: 'status',
        accessorFn: row => row.status,
        cell: cell => {
          return <OrderStatus status={cell.row.original.status} />
        },
      },
    ]
    return !can_edit
      ? defaultColumns
      : [
          ...defaultColumns,
          {
            header: 'action',
            accessorFn: row => row.id,
            cell: cell => {
              return (
                <OrderAction tab='ALL' queryKey={queryKey} variant='table' {...cell.row.original} />
              )
            },
            meta: {
              getCellContext: () => {
                return {
                  sx: {
                    width: '160px',
                  },
                }
              },
            },
          },
        ]
  }, [can_edit, queryKey, t, currency])

  const handleRowClick = (row: OrderListProps) => {
    detailRef.current.setTrue(row)
  }

  return {
    data,
    page,
    limit,
    columns,
    queryKey,
    detailRef,
    isLoading,
    isFetching,
    handlePage,
    handleLimit,
    handleRowClick,
  }
}
