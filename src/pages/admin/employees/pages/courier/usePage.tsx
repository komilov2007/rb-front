import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Form } from './components/form'
import { useMemo, useCallback } from 'react'
import { Status } from './components/status'
import { Delete } from './components/delete'
import { useProfileStore } from '@/store/profile'
import { usePagination } from '@/hooks/usePagination'
import type { CourierProps } from '@/types/role'
import type { ColumnDef } from '@tanstack/react-table'
import { getCourier } from '@/apis/admin/role'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const usePage = () => {
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('courier', 'can_edit'),
      can_delete: state.getPermission('courier', 'can_delete'),
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
    queryKey: [REACT_QUERY_KEYS.COURIER_LIST, params],
    queryFn: async () => await getCourier(params),
  })
  const handleUpdateAdd = useCallback(
    (values: CourierProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.COURIER_LIST, params], ({ data, ...rest }) => {
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
      queryClient.setQueryData([REACT_QUERY_KEYS.COURIER_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: CourierProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateEdit = useCallback(
    (values: CourierProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.COURIER_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: CourierProps) => (c.id === values.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<CourierProps>>>(() => {
    const defaultColumns: Array<ColumnDef<CourierProps>> = [
      {
        header: 'full_name',
        accessorFn: row => row.firstname,
      },
      {
        header: 'phone_number',
        accessorFn: row => row.phone,
      },
      {
        header: 'added_date_time',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
    ]
    if (can_edit || can_delete) {
      const status: Array<ColumnDef<CourierProps>> = can_edit
        ? [
            {
              header: 'status',
              accessorFn: row => row.is_active,
              cell: row => <Status {...row.row.original} />,
            },
          ]
        : []

      return [
        ...defaultColumns,
        ...status,
        {
          header: 'action',
          accessorFn: row => row.id,
          cell: row => (
            <Box gap='10px' display='flex' alignItems='center'>
              {can_edit && (
                <Form variant='edit' handleUpdate={handleUpdateEdit} {...row.row.original} />
              )}
              {can_delete && <Delete id={row.row.original.id} handleUpdate={handleUpdateDelete} />}
            </Box>
          ),
        },
      ]
    }
    return defaultColumns
  }, [can_edit, can_delete, handleUpdateEdit, handleUpdateDelete])

  return {
    data,
    page,
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
