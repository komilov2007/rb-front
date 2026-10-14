import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { Image } from '@/components/image'
import { InputStock } from './components/input'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { StatusSelect } from './components/status'
import { usePagination } from '@/hooks/usePagination'
import { useSearchParams } from 'react-router-dom'
import { useMemo, useState, useCallback } from 'react'
import { getStocksOnlineShop } from '@/apis/admin/stock'
import { SalesHistory } from './components/sales-history'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ColumnDef, ExpandedState, SortingState } from '@tanstack/react-table'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import type { StockInputProps, StockOnlineShopProps, StockStatusProps } from '@/types/stock'
import { numberFormat } from '@/utils/number-format'

const FILTER_KEYS = [
  'base_price_from',
  'base_price_to',
  'stock_amount_from',
  'stock_amount_to',
  'margin_from',
  'margin_to',
] as const

export const usePage = () => {
  const queryClient = useQueryClient()
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const [searchParams] = useSearchParams()
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const filterParams = useMemo(() => {
    const result: Record<string, string> = {}
    for (const key of FILTER_KEYS) {
      const value = searchParams.get(key)
      if (value !== null) {
        result[key] = value
      }
    }
    return result
  }, [searchParams])

  const sortParam = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.STOCK_LIST, params, sortParam, filterParams]
  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: async () => await getStocksOnlineShop({ ...params, sort: sortParam, ...filterParams }),
    queryKey,
    keepPreviousData: true,
  })

  const handleUpdate = useCallback(
    (values: StockStatusProps, type?: StockInputProps) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newResults = data.results.map((s: StockOnlineShopProps) => {
          let updated = false
          let newItem = { ...s }

          if (s.id === values.id) {
            updated = true
            if (type === 'body_price') {
              const bodyPrice = Number(values.body_price)
              const profit = s.base_price - bodyPrice
              const margin = (profit / s.base_price) * 100
              const parsedMargin = parseFloat(margin.toFixed(2))

              newItem = {
                ...newItem,
                body_price: bodyPrice,
                profit,
                margin: String(parsedMargin) + '%',
              }
            } else if (type === 'amount') {
              return { ...newItem, amount: values.amount }
            } else {
              newItem = {
                ...newItem,
                weight: values?.weight ?? null,
                storage_status: values.status,
                amount: values.status === 'UNLIMITED' ? 0 : (values.amount ?? 0),
              }
            }
          }

          const newVariants =
            s.variants?.map(variant => {
              if (variant.id === values.id) {
                updated = true
                if (type === 'body_price') {
                  const bodyPrice = Number(values.body_price)
                  const profit = s.base_price - bodyPrice
                  const margin = (profit / s.base_price) * 100
                  const parsedMargin = parseFloat(margin.toFixed(2))

                  return {
                    ...variant,
                    body_price: values.body_price,
                    profit,
                    margin: String(parsedMargin) + '%',
                  }
                }
                if (type === 'amount') {
                  return {
                    ...variant,
                    amount: values.amount,
                  }
                }

                return {
                  ...variant,
                  weight: values.weight,
                  storage_status: values.status,
                  amount: values.status === 'UNLIMITED' ? 0 : (values.amount ?? 0),
                }
              }
              return variant
            }) || []

          if (updated) {
            return { ...newItem, variants: newVariants }
          }

          return s
        })

        const newData = { ...data, results: newResults }
        return { ...rest, data: newData }
      })
    },
    [queryClient, queryKey],
  )

  const handleSort = useCallback((sorting: SortingState) => {
    const next = sorting[0] ?? null

    setSortValue(prev => {
      if (prev?.id === next?.id && prev?.desc === next?.desc) return prev
      return next
    })
  }, [])

  const columns = useMemo<Array<ColumnDef<StockOnlineShopProps>>>(
    () => [
      {
        id: 'name',
        header: 'product_name',
        accessorFn: row => row.name,
        minSize: 360,
        cell: cell => {
          const handleExpand = (e: React.MouseEvent) => {
            e.stopPropagation()
            if (Object.entries(expanded).length === 1 && cell.row.getIsExpanded()) {
              cell.row.getToggleExpandedHandler()()
            } else {
              setExpanded({})
              cell.row.getToggleExpandedHandler()()
            }
          }
          return (
            <Stack
              minWidth={360}
              gap='10px'
              direction='row'
              alignItems='center'
              pl={cell.row.getCanExpand() ? '0' : '40px'}
            >
              {cell.row.getCanExpand() ? (
                <IconButton
                  onClick={handleExpand}
                  sx={theme => ({
                    p: 0,
                    ml: '8px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: theme.palette.allColors.WHITE20,
                    svg: {
                      width: '20px',
                      height: '20px',
                      transform: cell.row.getIsExpanded() ? 'rotate(-180deg)' : undefined,
                    },
                  })}
                >
                  <IconDirectionDown />
                </IconButton>
              ) : null}
              <Image
                isGallery
                radius='5px'
                alt={cell.row.original.name}
                src={cell.row.original.photo}
                sx={{ height: '37px', width: '42px', minHeight: '37px', minWidth: '42px' }}
              />
              <Typography fontSize='13px'>{cell.row.original.name}</Typography>
            </Stack>
          )
        },
        enableSorting: true,
      },
      {
        header: 'entry_price',
        accessorFn: row => row.body_price,
        cell: cell => {
          const bodyPrices = cell.row.original.variants.map(item => item.body_price)
          const minAmount = Math.min(...bodyPrices)
          const maxAmount = Math.max(...bodyPrices)
          return cell.row.original.variants.length === 0 ? (
            <InputStock type='body_price' {...cell.row.original} handleUpdate={handleUpdate} />
          ) : (
            <Typography fontSize='13px'>{`${numberFormat(Number(minAmount))} - ${numberFormat(Number(maxAmount))}`}</Typography>
          )
        },
      },
      {
        header: 'weight',
        accessorFn: row => row.weight,
        cell: cell => {
          return <InputStock type='weight' {...cell.row.original} handleUpdate={handleUpdate} />
        },
      },
      {
        id: 'base_price',
        header: 'selling_price',
        accessorFn: row => row.base_price,
        cell: cell =>
          cell.row.original.variants.length === 0
            ? numberFormat(Number(cell.row.original.base_price))
            : null,
        enableSorting: true,
      },
      {
        id: 'margin',
        header: 'marja',
        accessorFn: row => row.margin,
        cell: cell => {
          return cell.row.original.variants.length === 0 ? (
            <>
              <Typography variant='inherit'>
                {numberFormat(Number(cell.row.original.profit))}
              </Typography>
              <Typography variant='text320'>{cell.row.original.margin}</Typography>
            </>
          ) : null
        },
        enableSorting: true,
      },
      {
        id: 'storage_status',
        header: 'status',
        accessorFn: row => row.storage_status,
        cell: cell =>
          cell.row.original.variants.length === 0 ? (
            <StatusSelect {...cell.row.original} handleUpdate={handleUpdate} />
          ) : null,
        enableSorting: true,
      },
      {
        header: 'remainder',
        accessorFn: row => row.amount,
        cell: cell => {
          const sumAmount = cell.row.original.variants.reduce(
            (acc, variant) => acc + Number(variant.amount),
            0,
          )

          return cell.row.original.variants.length === 0 ? (
            <InputStock type='amount' {...cell.row.original} handleUpdate={handleUpdate} />
          ) : (
            <Typography fontSize='13px'>{sumAmount}</Typography>
          )
        },
      },
      {
        id: 'updated_at',
        header: 'last_update',
        accessorFn: row => dayjs(row.updated_at).format('DD.MM.YYYY'),
        cell: cell =>
          cell.row.original.variants.length === 0
            ? dayjs(cell.row.original.updated_at).format('DD.MM.YYYY')
            : null,
        enableSorting: true,
      },
      {
        header: 'selling_speed',
        accessorFn: row => row.sale_speed,
        cell: cell =>
          cell.row.original.variants.length === 0 ? cell.row.original.sale_speed : null,
      },
      {
        header: 'sales_history',
        accessorFn: row => row.id,
        cell: cell =>
          cell.row.original.variants.length === 0 ? <SalesHistory {...cell.row.original} /> : null,
      },
    ],
    [expanded, handleUpdate],
  )

  return {
    data,
    page,
    limit,
    columns,
    expanded,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    setExpanded,
    handleSearch,
    handleSort,
  }
}
