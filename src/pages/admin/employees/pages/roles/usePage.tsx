import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Form } from './components/form'
import { useCallback, useMemo } from 'react'
import { Delete } from './components/delete'
import { Status } from './components/status'
import { type RoleListProps } from '@/types/role'
import { useProfileStore } from '@/store/profile'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { getMenuList, getRoles } from '@/apis/admin/role'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const usePage = () => {
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('roles', 'can_edit'),
      can_delete: state.getPermission('roles', 'can_delete'),
    }
  })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const { data: dataMenu, isLoading: isLoadingMenu } = useQuery({
    queryFn: getMenuList,
    queryKey: [REACT_QUERY_KEYS.ROLE_MENU_LIST],
  })

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.ROLE_LIST, params],
    queryFn: async () => await getRoles(params),
  })

  const handleUpdateEdit = useCallback(
    (values: RoleListProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.ROLE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: RoleListProps) => (c.id === values.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateAdd = useCallback(
    (values: RoleListProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.ROLE_LIST, params], ({ data, ...rest }) => {
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
      queryClient.setQueryData([REACT_QUERY_KEYS.ROLE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: RoleListProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<RoleListProps>>>(() => {
    const defaultColumns: Array<ColumnDef<RoleListProps>> = [
      {
        header: 'role',
        accessorFn: row => row.name,
      },
      {
        header: 'added_date_time',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
      {
        header: 'last_update',
        accessorFn: row => dayjs(row.updated_at).format('DD.MM.YYYY, HH:mm'),
      },
    ]

    if (can_edit || can_delete) {
      const status: Array<ColumnDef<RoleListProps>> = can_edit
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
                <Form
                  variant='edit'
                  id={row.row.original.id}
                  data={dataMenu?.data ?? []}
                  handleUpdate={handleUpdateEdit}
                />
              )}
              {can_delete && (
                <Delete
                  id={row.row.original.id}
                  handleUpdate={handleUpdateDelete}
                  is_admin={row.row.original.is_admin}
                />
              )}
            </Box>
          ),
        },
      ]
    }
    return defaultColumns
  }, [can_edit, can_delete, dataMenu?.data, handleUpdateEdit, handleUpdateDelete])

  return {
    data,
    page,
    limit,
    columns,
    can_edit,
    dataMenu,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    isLoadingMenu,
    handleUpdateAdd,
  }
}
