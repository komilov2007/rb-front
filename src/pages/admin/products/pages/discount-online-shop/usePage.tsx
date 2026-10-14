import dayjs from 'dayjs'
import { Delete } from './delete'
import Box from '@mui/material/Box'
import { ROUTER } from '@/constants/router'
import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useProfileStore } from '@/store/profile'
import IconButton from '@mui/material/IconButton'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { getOnlineShopDiscounts } from '@/apis/admin/discount'
import { type DiscountOnlineShopProps } from '@/types/discount'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { DISCOUNT_OPTIONS_ONLINE_SHOP } from '@/constants/discount'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'

export const usePage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
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
    queryKey: [REACT_QUERY_KEYS.DISCOUNT_LIST_ONLINE_SHOP, params],
    queryFn: async () => await getOnlineShopDiscounts(params),
  })

  const handleUpdateAdd = useCallback(
    (values: DiscountOnlineShopProps) => {
      queryClient.setQueryData(
        [REACT_QUERY_KEYS.DISCOUNT_LIST_ONLINE_SHOP, params],
        ({ data, ...rest }) => {
          const newData = {
            ...data,
            count: data.count + 1,
            results: [values, ...data.results],
          }
          return { ...rest, data: newData }
        },
      )
    },
    [params, queryClient],
  )

  const handleOpen = () => {
    navigate(`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.DISCOUNT}/${ROUTER.CREATE}`)
  }

  const handleNavigateEdit = useCallback(
    (id: number) => {
      navigate(`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.DISCOUNT}/${ROUTER.EDIT}/${id}`)
    },
    [navigate],
  )

  const columns = useMemo<Array<ColumnDef<DiscountOnlineShopProps>>>(() => {
    const defaultColumns: Array<ColumnDef<DiscountOnlineShopProps>> = [
      {
        header: 'discount_name',
        accessorFn: row => row.name,
      },
      {
        header: 'products',
        accessorFn: row => row.products_count,
      },
      {
        header: 'discount_type',
        accessorFn: row => t(DISCOUNT_OPTIONS_ONLINE_SHOP[row.discount_type].label),
      },
      {
        header: 'from',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
      {
        header: 'to',
        accessorFn: row => dayjs(row.expires_at).format('DD.MM.YYYY, HH:mm'),
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
                <IconButton
                  radius='8px'
                  onClick={() => {
                    handleNavigateEdit(row.row.original.id)
                  }}
                >
                  <IconEdit />
                </IconButton>
              )}
              {can_delete && <Delete id={row.row.original.id} />}
            </Box>
          ),
        },
      ]
    }
    return defaultColumns
  }, [can_edit, can_delete, t, handleNavigateEdit])

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
    handleOpen,
  }
}
