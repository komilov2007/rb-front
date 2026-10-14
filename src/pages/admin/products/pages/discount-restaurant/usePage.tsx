import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Form } from './components/form'
import { useMemo, useCallback } from 'react'
import { Delete } from './components/delete'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'
import { getDiscounts } from '@/apis/admin/discount'
import { usePagination } from '@/hooks/usePagination'
import { type DiscountProps } from '@/types/discount'
import { type ColumnDef } from '@tanstack/react-table'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const usePage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('discount', 'can_edit'),
      can_delete: state.getPermission('discount', 'can_delete'),
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
    queryKey: [REACT_QUERY_KEYS.DISCOUNT_LIST, params],
    queryFn: async () => await getDiscounts(params),
  })

  const handleUpdateEdit = useCallback(
    (values: DiscountProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.DISCOUNT_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: DiscountProps) => (c.id === values.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateAdd = useCallback(
    (values: DiscountProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.DISCOUNT_LIST, params], ({ data, ...rest }) => {
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
      queryClient.setQueryData([REACT_QUERY_KEYS.DISCOUNT_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: DiscountProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<DiscountProps>>>(() => {
    const defaultColumns: Array<ColumnDef<DiscountProps>> = [
      {
        header: 'discount_name',
        accessorFn: row => row.name,
      },
      {
        header: 'products',
        accessorFn: row => row.products,
      },
      {
        header: 'discount_type',
        accessorFn: row => t(DISCOUNT_OPTIONS[row.type].label),
      },
      {
        header: 'from',
        accessorFn: row => dayjs(row.created_at).utc().format('DD.MM.YYYY, HH:mm'),
      },
      {
        header: 'to',
        accessorFn: row => dayjs(row.finish_date).utc().format('DD.MM.YYYY, HH:mm'),
      },
    ]
    if (can_edit || can_delete) {
      return [
        ...defaultColumns,
        {
          header: 'action',
          accessorFn: row => row.id,
          cell: row => (
            <Box gap='10px' display='flex' alignItems='center'>
              {can_edit && (
                <Form variant='edit' id={row.row.original.id} handleUpdate={handleUpdateEdit} />
              )}
              {can_delete && <Delete id={row.row.original.id} handleUpdate={handleUpdateDelete} />}
            </Box>
          ),
        },
      ]
    }
    return defaultColumns
  }, [t, can_delete, can_edit, handleUpdateDelete, handleUpdateEdit])

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
