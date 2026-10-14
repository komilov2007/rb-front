import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { getStocks } from '@/apis/admin/stock'
import { InputStock } from './components/input'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { StatusSelect } from './components/status'
import { numberFormat } from '@/utils/number-format'
import { usePagination } from '@/hooks/usePagination'
import { useMemo, useState, useCallback } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ExpandedState, ColumnDef, SortingState } from '@tanstack/react-table'
import type { StockProps, StockStatusProps, StockInputProps } from '@/types/stock'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

export const usePage = () => {
  const queryClient = useQueryClient()
  const defaultBranch = useProfileStore(state => state.branches[0]?.value)
  const [branch_id, setBranchId] = useSearchParamsState('branch', defaultBranch)
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const sortParam = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.STOCK_LIST, params, branch_id, sortParam]
  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: async () => await getStocks({ branch_id, ...params, sort: sortParam }),
    keepPreviousData: true,
    queryKey,
    select: res => {
      const newResults = res.data.results.map(r =>
        r.parameters.length > 0
          ? {
              ...r,
              parameters: r.parameters.map(p => ({
                ...p,
                price: Number(p.price),
                body_price: Number(p.body_price),
              })),
              price: null,
              status: null,
              sold: null,
            }
          : { ...r, price: Number(r.price), body_price: Number(r.body_price) },
      )
      const newData = {
        ...res.data,
        results: newResults,
      }
      return { ...res, data: newData }
    },
  })

  const handleUpdate = useCallback(
    (values: StockStatusProps, type?: StockInputProps) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newResults = data.results.map((s: StockProps) => {
          if (s.id === values.id) {
            if (type === 'body_price') {
              const over_price = Math.floor(
                100 - (Number(values.body_price) * 100) / Number(s.price),
              )
              return { ...s, over_price, ...values }
            }
            return { ...s, ...values }
          }

          return {
            ...s,
            parameters: s.parameters.map(p => {
              if (p.id === values.id) {
                if (type === 'body_price') {
                  const over_price = Math.floor(
                    100 - (Number(values.body_price) * 100) / Number(p.price),
                  )
                  return { ...p, over_price, ...values }
                }
                return { ...p, ...values }
              }

              return p
            }),
          }
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

  const columns = useMemo<Array<ColumnDef<StockProps>>>(
    () => [
      {
        id: 'name',
        header: 'product_name',
        accessorFn: row => row.name,
        cell: cell => {
          const handleExpand = () => {
            if (Object.entries(expanded).length === 1 && cell.row.getIsExpanded()) {
              cell.row.getToggleExpandedHandler()()
            } else {
              setExpanded({})
              cell.row.getToggleExpandedHandler()()
            }
          }
          return (
            <Stack
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
              <Typography>{cell.row.original.name}</Typography>
            </Stack>
          )
        },
        enableSorting: true,
      },
      {
        id: 'price',
        header: 'price',
        accessorFn: row => row.price,
        cell: cell =>
          cell.row.original.price ? (
            <Box display='flex' alignItems='center' whiteSpace='nowrap'>
              {numberFormat(cell.row.original.price)} {currency}
            </Box>
          ) : null,
        enableSorting: true,
      },
      {
        id: 'body_price',
        header: 'body_price',
        accessorFn: row => row.body_price,
        cell: cell => {
          return cell.row.original.parameters &&
            cell.row.original.parameters.length !== 0 ? null : (
            <InputStock
              type='body_price'
              {...cell.row.original}
              branch_id={branch_id}
              handleUpdate={handleUpdate}
            />
          )
        },
        enableSorting: true,
      },
      {
        id: 'over_price',
        header: 'overpriced',
        accessorFn: row => row.over_price,
        cell: cell => (cell.row.original.over_price ? `${cell.row.original.over_price} %` : null),
        enableSorting: true,
      },
      {
        id: 'status',
        header: 'status',
        accessorFn: row => row.status,
        cell: cell =>
          cell.row.original.status ? (
            <StatusSelect
              {...cell.row.original}
              branch_id={branch_id}
              handleUpdate={handleUpdate}
            />
          ) : null,
        enableSorting: true,
      },
      {
        header: 'available',
        accessorFn: row => row.amount,
        cell: cell =>
          cell.row.original.status ? (
            <InputStock
              type='amount'
              {...cell.row.original}
              branch_id={branch_id}
              handleUpdate={handleUpdate}
            />
          ) : null,
      },
      {
        id: 'sold',
        header: 'sold_out',
        accessorFn: row => row.sold,
        enableSorting: true,
      },
    ],
    [branch_id, currency, expanded, handleUpdate],
  )

  return {
    data,
    page,
    limit,
    columns,
    expanded,
    branch_id,
    isLoading,
    isFetching,
    handlePage,
    setExpanded,
    searchValue,
    setBranchId,
    handleLimit,
    handleSearch,
    handleSort,
  }
}
