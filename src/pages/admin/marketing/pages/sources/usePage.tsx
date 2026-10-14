import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { Copy } from '@/components/copy'
import { Delete } from './components/delete'
import { useMemo, useCallback } from 'react'
import { Platform } from '@/components/platform'
import { getSources } from '@/apis/admin/sources'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { type SourcesProps } from '@/types/sources'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const usePage = () => {
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('sources', 'can_edit'),
      can_delete: state.getPermission('sources', 'can_delete'),
    }
  })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.SOURCE_LIST, params],
    queryFn: async () => await getSources(params),
  })

  const handleUpdateAdd = useCallback(
    (values: SourcesProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.SOURCE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count + 1,
          results: [values, ...data.results],
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateDelete = useCallback(
    (id: number) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.SOURCE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: SourcesProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<SourcesProps>>>(() => {
    const defaultColumns: Array<ColumnDef<SourcesProps>> = [
      {
        header: 'type',
        accessorFn: row => row.platform,
        cell: cell => <Platform platform={cell.row.original.platform} />,
      },
      {
        header: 'source',
        accessorFn: row => row.name,
        cell: cell => (
          <Stack gap='12px' direction='row' alignItems='center'>
            <Typography
              variant='inherit'
              sx={{
                maxWidth: '150px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {cell.row.original.name}
            </Typography>
            <Copy text={cell.row.original.url} />
          </Stack>
        ),
      },
      {
        header: 'total_clicks',
        accessorFn: row => row.total_visits,
      },
      {
        header: 'new_users',
        accessorFn: row => row.new_visits,
      },
      {
        header: 'exists_users',
        accessorFn: row => row.old_visits,
      },
      {
        header: 'total_orders',
        accessorFn: row => row.order_sum,
      },
      {
        header: 'created_date_time',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
      {
        header: 'last_visit',
        accessorFn: row =>
          row.last_visit_time ? dayjs(row.last_visit_time).format('DD.MM.YYYY, HH:mm') : '-',
      },
    ]

    if (can_delete) {
      return [
        ...defaultColumns,
        {
          header: 'action',
          accessorFn: row => row.id,
          meta: {
            getCellContext: () => {
              return {
                sx: {
                  width: '120px',
                },
              }
            },
          },
          cell: row => <Delete id={row.row.original.id} handleUpdate={handleUpdateDelete} />,
        },
      ]
    }
    return defaultColumns
  }, [can_delete, handleUpdateDelete])

  return {
    page,
    data,
    limit,
    columns,
    can_edit,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    handleUpdateAdd,
  }
}
