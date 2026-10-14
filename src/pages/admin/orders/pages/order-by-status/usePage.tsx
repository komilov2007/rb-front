import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import isToday from 'dayjs/plugin/isToday'
import Tooltip from '@mui/material/Tooltip'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Platform } from '@/components/platform'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { type Theme } from '@mui/material/styles'
import { PAYMENT_TYPES } from '@/constants/payment'
import { numberFormat } from '@/utils/number-format'
import { usePagination } from '@/hooks/usePagination'
import { DELIVERY_TYPES } from '@/constants/delivery'
import { type ColumnDef } from '@tanstack/react-table'
import { OrderStatus } from '@/components/orders/status'
import { OrderAction } from '@/components/orders/action'
import { type SchemaTypeOrderFilter } from '@/utils/schema'
import { useRef, useMemo, type CSSProperties } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconUser } from '@/assets/icons/user.svg'
import { getOrderByStatus, getOrderHistory } from '@/apis/admin/order'
import { type OrderListProps, type OrderByStatusProps } from '@/types/order'
import { ReactComponent as IconTickDouble } from '@/assets/icons/tick-double.svg'
import { ReactComponent as IconClockCircle } from '@/assets/icons/clock-circle.svg'

dayjs.extend(isToday)

export const usePage = ({ status }: OrderByStatusProps) => {
  const { t } = useTranslation()
  const can_edit = useProfileStore(state => state.getPermission('orders', 'can_edit'))
  const { state }: { state: SchemaTypeOrderFilter } = useLocation()
  const detailRef = useRef({ setTrue: (_: OrderListProps) => {} })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()
  const startDate = state?.period ? state.period?.[0] : undefined
  const endDate = state?.period ? state.period?.[1] : undefined
  const isLate = status === 'LATE'

  // eslint-disable-next-line react-hooks/exhaustive-deps, no-sparse-arrays
  const queryKey = [
    `${REACT_QUERY_KEYS.ORDER_STATUS_LIST}_${status === 'ALL' ? '' : status}`,
    endDate,
    startDate,
    { ...params, status, state },
    state?.date,
    state?.branch,
    state?.platform,
    state?.employee?.id,
  ]

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey,
    keepPreviousData: true,
    queryFn: async () => {
      const branch = state?.branch !== 'ALL' ? state?.branch : undefined
      const stateStatus = state?.status?.map(s => s.status)
      const service_type = state?.service_type?.map(s => s.type)
      const payment_type = state?.payment_type?.map(p => p.state)
      const paramStatus =
        stateStatus?.length > 0
          ? stateStatus.join(',')
          : status === 'ALL' || status === 'LATE' || status === 'HISTORY'
            ? undefined
            : status
      const date_after = state?.date !== 'ALL' ? dayjs(startDate).format('YYYY-MM-DD') : undefined
      const date_before = state?.date !== 'ALL' ? dayjs(endDate).format('YYYY-MM-DD') : undefined
      const platform = state?.platform !== 'ALL' ? state?.platform : undefined

      const employee = state?.employee?.id

      const newParams = state
        ? {
            ...params,
            branch,
            platform,
            employee,
            date_after,
            date_before,
            status: paramStatus,
            service_type: service_type?.length > 0 ? service_type.join(',') : undefined,
            payment_type: payment_type?.length > 0 ? payment_type.join(',') : undefined,
          }
        : {
            ...params,
            status: paramStatus,
          }

      if (status === 'HISTORY') {
        return await getOrderHistory(newParams)
      }
      return await getOrderByStatus({
        ...newParams,
        is_late: status === 'LATE' ? true : undefined,
      })
    },
  })

  const columns = useMemo<Array<ColumnDef<OrderListProps>>>(() => {
    const defaultColumns: Array<ColumnDef<OrderListProps>> = [
      {
        header: 'order_id',
        accessorFn: row => row.id,
      },
      {
        header: 'customer_name',
        accessorFn: row => row.customer,
      },
      {
        header: 'date_and_time',
        accessorFn: row => row.created_at,
        cell: cell => {
          if (dayjs(cell.row.original.created_at).isToday()) {
            return (
              <>
                {dayjs(cell.row.original.created_at).format('HH:mm;')} {t('today')}
              </>
            )
          }
          return dayjs(cell.row.original.created_at).format('DD.MM.YYYY, HH:mm')
        },
      },
      {
        header: 'price',
        accessorFn: row => row.amount,
        cell: cell => {
          return (
            <Typography variant='inherit' whiteSpace='nowrap'>
              {`${numberFormat(cell.row.original.amount)} ${cell.row.original.currency.code}`}
            </Typography>
          )
        },
      },
      {
        header: 'payment_type',
        accessorFn: row => row.payment_type,
        cell: cell => {
          const unpaid =
            !cell.row.original.is_paid &&
            (cell.row.original.payment_type === 'PAYME_API' ||
              cell.row.original.payment_type === 'ROBO_CLICK' ||
              cell.row.original.payment_type === 'ROBO_UZUM' ||
              cell.row.original.payment_type === 'ROBO_PAYME' ||
              cell.row.original.payment_type === 'CLICK_API' ||
              cell.row.original.payment_type === 'CLICK_SUPERAPP' ||
              cell.row.original.payment_type === 'ZOOMRAD_MINIAPP')

          return (
            <Stack
              sx={{
                gap: unpaid ? '0' : '5px',
                flexDirection: unpaid ? 'column' : 'row',
                alignItems: unpaid ? 'flex-start' : 'center',
              }}
            >
              {t(PAYMENT_TYPES[cell.row.original.payment_type].label)}
              {cell.row.original.is_paid && (
                <Tooltip title={t('paid')}>
                  <Stack
                    sx={theme => ({ svg: { path: { stroke: theme.palette.allColors.GREEN } } })}
                  >
                    <IconTickDouble />
                  </Stack>
                </Tooltip>
              )}
              {unpaid && (
                <Typography variant='caption' color={theme => theme.palette.allColors.GRAY20}>
                  ({t('unpaid')})
                </Typography>
              )}
            </Stack>
          )
        },
      },
      {
        header: 'order_type',
        accessorFn: row => row.service_type,
        cell: cell => {
          return (
            <Stack
              gap='5px'
              p='3px'
              width='fit-content'
              height='fit-content'
              direction='row'
              alignItems='center'
              whiteSpace='nowrap'
              sx={theme => ({
                borderRadius: '4px',
                border: cell.row.original.shipping_datetime
                  ? `1px solid ${theme.palette.allColors.PURPLE}`
                  : undefined,
              })}
            >
              <Typography sx={theme => ({ color: theme.palette.allColors.PURPLE })}>
                {t(DELIVERY_TYPES[cell.row.original.service_type]?.title)}
              </Typography>
              {cell.row.original.shipping_datetime && (
                <Tooltip
                  title={
                    <Stack>
                      <Typography>
                        {cell.row.original.service_type === 'PICKUP'
                          ? t('pick_up_time')
                          : t('delivery_time')}
                      </Typography>
                      <Typography>
                        {dayjs(cell.row.original.shipping_datetime).format('DD.MM.YYYY, HH:mm')}
                      </Typography>
                    </Stack>
                  }
                >
                  <Stack
                    justifyContent='center'
                    sx={theme => ({
                      'svg path': {
                        fill: theme.palette.allColors.PURPLE,
                      },
                    })}
                  >
                    <IconClockCircle />
                  </Stack>
                </Tooltip>
              )}
            </Stack>
          )
        },
      },
      {
        header: 'status',
        accessorFn: row => row.status,
        cell: cell => {
          return <OrderStatus status={cell.row.original.status} />
        },
      },
      {
        header: 'platform',
        accessorFn: row => row.platform,
        cell: cell => {
          return (
            <Stack width='100%' alignItems='flex-start'>
              {cell.row.original.is_manual ? (
                <Tooltip title='Admin'>
                  <Stack
                    alignItems='center'
                    sx={theme => ({
                      'svg ': {
                        'ellipse , circle': {
                          stroke: theme.palette.allColors.PURPLE,
                        },
                      },
                    })}
                  >
                    <IconUser />
                  </Stack>
                </Tooltip>
              ) : (
                <Platform platform={cell.row.original.platform} />
              )}
            </Stack>
          )
        },
      },
    ]

    return status === 'HISTORY' || !can_edit
      ? defaultColumns
      : [
          ...defaultColumns,
          {
            header: 'action',
            accessorFn: row => row.id,
            cell: cell => {
              return (
                <OrderAction
                  tab={status}
                  queryKey={queryKey}
                  variant='table'
                  {...cell.row.original}
                />
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
  }, [status, can_edit, t, queryKey])

  const handleRowClick = (row: OrderListProps) => {
    detailRef.current.setTrue(row)
  }

  const getRowStyles = (row: OrderListProps, theme: Theme): CSSProperties => {
    if (
      !row.is_paid &&
      (row.payment_type === 'PAYME_API' ||
        row.payment_type === 'ROBO_CLICK' ||
        row.payment_type === 'ROBO_UZUM' ||
        row.payment_type === 'ROBO_PAYME' ||
        row.payment_type === 'CLICK_API' ||
        row.payment_type === 'CLICK_SUPERAPP' ||
        row.payment_type === 'ZOOMRAD_MINIAPP')
    ) {
      return {
        background: theme.palette.allColors.YELLOW20,
      }
    }

    if (row.shipping_datetime && row.shipping_datetime?.length > 0) {
      return {
        background: theme.palette.allColors.PURPLE140,
      }
    }
    return {}
  }

  return {
    data,
    page,
    limit,
    isLate,
    columns,
    queryKey,
    detailRef,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    getRowStyles,
    handleRowClick,
  }
}
