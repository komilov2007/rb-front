import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import type { ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type {
  MonthlyRecordProps,
  StockOnlineShopProps,
  StockOnlineShopHistory,
} from '@/types/stock'
import { getStockOnlineShopHistory, getStockOnlineShopMetrics } from '@/apis/admin/stock'

interface MonthProps extends MonthlyRecordProps {
  index: number
}

export const useSalesHistory = (props: StockOnlineShopProps) => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()
  const [month, setMonth] = useState<MonthProps | null>()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const { data, isLoading } = useQuery({
    enabled: value,
    queryKey: [REACT_QUERY_KEYS.STOCK_METRICS, props.id],
    queryFn: async () => await getStockOnlineShopMetrics(props.id),
  })

  const history = useQuery({
    enabled: !!(month && typeof month.index === 'number'),
    queryKey: [
      REACT_QUERY_KEYS.STOCK_HISTORY,
      month?.index,
      props.id,
      month?.period_end,
      month?.period_start,
    ],
    queryFn: async () => {
      return await getStockOnlineShopHistory(props.id, {
        period_end: month?.period_end,
        period_start: month?.period_start,
      })
    },
  })

  const columns = useMemo<Array<ColumnDef<StockOnlineShopHistory>>>(
    () => [
      {
        header: 'id',
        accessorFn: row => row.id,
      },
      {
        header: 'time',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY'),
      },
      {
        header: 'location',
        accessorFn: row => row.location,
        cell: cell => {
          return (
            <Typography variant='inherit' maxWidth='150px'>
              {cell.row.original.location}
            </Typography>
          )
        },
      },
      {
        header: 'quantity',
        accessorFn: row => row.total_sold,
      },
      {
        header: 'total_amount',
        accessorFn: row => row.amount,
      },
    ],
    [],
  )

  return {
    t,
    data,
    value,
    month,
    columns,
    history,
    setTrue,
    currency,
    setFalse,
    setMonth,
    isLoading,
  }
}
