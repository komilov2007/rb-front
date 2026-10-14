import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Form } from './components/form'
import { useMemo, useCallback } from 'react'
import { Status } from './components/status'
import { Delete } from './components/delete'
import { Report } from './components/report'
import { useProfileStore } from '@/store/profile'
import { usePagination } from '@/hooks/usePagination'
import { type EmployeeListProps } from '@/types/role'
import { type ColumnDef } from '@tanstack/react-table'
import { getRoles, getEmployees } from '@/apis/admin/role'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const usePage = () => {
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('employees', 'can_edit'),
      can_delete: state.getPermission('employees', 'can_delete'),
    }
  })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const { data: dataRole = { data: { count: 0, results: [] } }, isLoading: isLoadingRole } =
    useQuery({
      keepPreviousData: true,
      queryKey: [REACT_QUERY_KEYS.ROLE_LIST],
      queryFn: async () => await getRoles({}),
    })

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.EMPLOYEE_LIST, params],
    queryFn: async () => await getEmployees(params),
  })
  const handleUpdateAdd = useCallback(
    (values: EmployeeListProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.EMPLOYEE_LIST, params], ({ data, ...rest }) => {
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
      queryClient.setQueryData([REACT_QUERY_KEYS.EMPLOYEE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: EmployeeListProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateEdit = useCallback(
    (values: EmployeeListProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.EMPLOYEE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: EmployeeListProps) => (c.id === values.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<EmployeeListProps>>>(() => {
    const defaultColumns: Array<ColumnDef<EmployeeListProps>> = [
      {
        header: 'full_name',
        accessorFn: row => row.user.firstname,
      },
      {
        header: 'phone_number',
        accessorFn: row => row.user.phone,
      },
      {
        header: 'role',
        accessorFn: row => row.role.name,
      },
      {
        header: 'orders_count',
        accessorFn: row => row.orders_count,
      },
      {
        header: 'added_date_time',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
    ]
    if (can_edit || can_delete) {
      const status: Array<ColumnDef<EmployeeListProps>> = can_edit
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
              <Report {...row.row.original} />
              {can_edit && (
                <Form
                  variant='edit'
                  id={row.row.original.id}
                  handleUpdate={handleUpdateEdit}
                  data={dataRole?.data.results ?? []}
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
  }, [can_edit, can_delete, handleUpdateEdit, dataRole?.data.results, handleUpdateDelete])

  return {
    data,
    page,
    limit,
    columns,
    dataRole,
    can_edit,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    isLoadingRole,
    handleUpdateAdd,
  }
}
