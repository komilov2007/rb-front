import { InputStock } from './input'
import Stack from '@mui/material/Stack'
import { Image } from '@/components/image'
import { useFormStore } from '@/store/form'
import { getProductStock } from '@/apis/common'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useMemo, useState, useCallback } from 'react'
import type { ProductStockProps } from '@/types/common'
import { getPaginationOffset } from '@/utils/pagination'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { ColumnDef, ExpandedState } from '@tanstack/react-table'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

const limit = 10

export const useFormProductStock = () => {
  const hasMore = useBoolean(true)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<ProductStockProps[]>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const { productStockBoolean, setProductStockBoolean } = useFormStore(state => ({
    productStockBoolean: state.productStockBoolean,
    setProductStockBoolean: state.setProductStockBoolean,
  }))

  const {
    refetch,
    isLoading,
    isFetching,
    data = { data: { results: [], count: 0 } },
  } = useQuery({
    queryFn: async () =>
      await getProductStock({
        limit,
        show_missed_weights: 'true',
        offset: getPaginationOffset({ page, limit }),
      }),
    enabled: productStockBoolean,
    queryKey: [REACT_QUERY_KEYS.PRODUCT_STOCK, page, limit],
    onSuccess: res => {
      const newResults = [...results, ...res.data.results]
      setResults(newResults)
      if (res.data.count === newResults.length) {
        hasMore.setFalse()
      }
    },
  })

  const handleNext = () => {
    if (!isFetching && !isLoading) {
      if (data.data.count > results.length) {
        setPage(page + 1)
      } else {
        hasMore.setFalse()
      }
    }
  }

  const handleClose = useCallback(() => {
    setResults([])
    setProductStockBoolean(false)()
  }, [setProductStockBoolean])

  const handleUpdate = useCallback(() => {
    void refetch()
    handleClose()
  }, [refetch, handleClose])

  const columns = useMemo<Array<ColumnDef<ProductStockProps>>>(
    () => [
      {
        id: 'name',
        minSize: 360,
        header: 'product_name',
        accessorFn: row => row.name,
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
              gap='10px'
              direction='row'
              minWidth={360}
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
      },
      {
        id: 'weight',
        header: () => {
          return <InputStock type='all' key='all' handleUpdate={handleUpdate} />
        },

        accessorFn: row => row.weight,
        cell: cell => {
          return <InputStock id={cell.row.original.id} type='product' />
        },
      },
    ],
    [expanded, handleUpdate],
  )

  return {
    page,
    results,
    hasMore,
    columns,
    expanded,
    isLoading,
    isFetching,
    handleNext,
    setExpanded,
    handleClose,
    productStockBoolean,
  }
}
