import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Image } from '@/components/image'
import { Status } from './components/status'
import { Delete } from './components/delete'
import { Rating } from '@/components/rating'
import { getReviews } from '@/apis/admin/review'
import { type ReviewProps } from '@/types/review'
import Typography from '@mui/material/Typography'
import { usePagination } from '@/hooks/usePagination'
import { useMemo, useState, useCallback } from 'react'
import { FormReview } from '@/components/forms/review'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ColumnDef, SortingState } from '@tanstack/react-table'

export const usePage = () => {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<string | number>('all')
  const { page, limit, params, handlePage, handleLimit } = usePagination()
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const sort = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.REVIEW_LIST, params, status, sort]

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey,
    keepPreviousData: true,
    queryFn: async () => await getReviews({ status: status === 'all' ? undefined : status, sort }),
  })

  const handleUpdateDelete = useCallback(
    (id: number) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: ReviewProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [queryKey, queryClient],
  )

  const handleSort = useCallback((sorting: SortingState) => {
    const next = sorting[0] ?? null

    setSortValue(prev => {
      if (prev?.id === next?.id && prev?.desc === next?.desc) return prev
      return next
    })
  }, [])

  const handleUpdateEdit = useCallback(
    (values: ReviewProps) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: ReviewProps) => (c.id === values?.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [queryClient, queryKey],
  )

  const columns = useMemo<Array<ColumnDef<ReviewProps>>>(() => {
    return [
      {
        id: 'title',
        header: 'product_name',
        accessorFn: row => row.product.title,
        cell: cell => (
          <Box gap='14px' display='flex' alignItems='center'>
            <Stack gap='5px' direction='row' alignItems='center'>
              <Box m='0 14px 0 11px'>
                <Image
                  isGallery
                  radius='5px'
                  src={cell.row.original.product.photo}
                  alt={cell.row.original.product.title}
                  sx={{ height: '37px', width: '42px', minHeight: '37px', minWidth: '42px' }}
                />
              </Box>
              <Typography
                fontSize={13}
                noWrap
                sx={{
                  maxWidth: { xs: 100, md: 300, lg: 500 },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {cell.row.original.product.title}
              </Typography>
            </Stack>
          </Box>
        ),
      },
      {
        id: 'rating',
        header: 'rating',
        enableSorting: true,
        accessorFn: row => row.rating,
        cell: cell => <Rating value={cell.row.original.rating} />,
      },

      {
        id: 'status',
        header: 'status',
        cell: cell => <Status status={cell.row.original.status} />,
      },
      {
        id: 'customer_name',
        header: 'customer_name',
        cell: cell => cell.row.original.customer_name,
      },
      {
        id: 'comment',
        header: 'comment',
        cell: cell => (
          <Typography maxWidth='150px' variant='inherit' noWrap>
            {cell.row.original.comment}
          </Typography>
        ),
      },
      {
        id: 'created_at',
        header: 'created_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
      {
        header: 'action',
        accessorFn: row => row.id,
        cell: row => (
          <Stack gap='10px' direction='row' alignItems='center'>
            <FormReview {...row.row.original} handleUpdate={handleUpdateEdit} />
            <Delete id={row.row.original.id} handleUpdate={handleUpdateDelete} />
          </Stack>
        ),
      },
    ]
  }, [handleUpdateDelete])

  return {
    data,
    page,
    limit,
    status,
    columns,
    setStatus,
    isLoading,
    isFetching,
    handlePage,
    handleSort,
    handleLimit,
  }
}
