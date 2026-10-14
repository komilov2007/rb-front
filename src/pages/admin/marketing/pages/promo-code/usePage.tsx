import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Delete } from './components/delete'
import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FormPromoCode } from './components/form'
import { useProfileStore } from '@/store/profile'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { getPromoCodes } from '@/apis/admin/promo-code'
import { type PromoCodeProps } from '@/types/promo-code'
import { PROMO_CODE_OPTIONS } from '@/constants/promo-code'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const usePage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('promokod', 'can_edit'),
      can_delete: state.getPermission('promokod', 'can_delete'),
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
    queryKey: [REACT_QUERY_KEYS.PROMO_CODE_LIST, params],
    queryFn: async () => await getPromoCodes(params),
  })

  const handleUpdateEdit = useCallback(
    (values: PromoCodeProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.PROMO_CODE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: PromoCodeProps) => (c.id === values.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateAdd = useCallback(
    (values: PromoCodeProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.PROMO_CODE_LIST, params], ({ data, ...rest }) => {
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
      queryClient.setQueryData([REACT_QUERY_KEYS.PROMO_CODE_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: PromoCodeProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<PromoCodeProps>>>(() => {
    const defaultColumns: Array<ColumnDef<PromoCodeProps>> = [
      {
        header: 'promokod',
        accessorFn: row => row.code,
      },
      {
        header: 'type',
        accessorFn: row => t(PROMO_CODE_OPTIONS[row.type].label),
      },
      {
        header: 'used_ones',
        accessorFn: row => row.used,
      },
      {
        header: 'limit',
        accessorFn: row => row.limit,
      },
      {
        header: 'end_date_time',
        accessorFn: row => dayjs(row.end_date).format('DD.MM.YYYY, HH:mm'),
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
                <FormPromoCode
                  variant='edit'
                  id={row.row.original.id}
                  handleUpdate={handleUpdateEdit}
                />
              )}
              {can_delete && <Delete id={row.row.original.id} handleUpdate={handleUpdateDelete} />}
            </Box>
          ),
          meta: {
            getCellContext: () => {
              return {
                sx: {
                  width: '120px',
                },
              }
            },
          },
        },
      ]
    }
    return defaultColumns
  }, [can_edit, can_delete, t, handleUpdateEdit, handleUpdateDelete])

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
