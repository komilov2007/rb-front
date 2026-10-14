import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import update from 'immutability-helper'
import { Image } from '@/components/image'
import { Delete } from './components/delete'
import { Status } from './components/status'
import { useTranslation } from 'react-i18next'
import { ALL_OPTION } from '@/constants/option'
import { useBoolean } from '@/hooks/useBoolean'
import { type ParamProps } from '@/types/params'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { numberFormat } from '@/utils/number-format'
import { usePagination } from '@/hooks/usePagination'
import { type CategoryProps } from '@/types/category'
import { useMemo, useState, useCallback } from 'react'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import { type ProductListProps } from '@/types/products'
import { useParams, useLocation } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getProducts, positionProduct } from '@/apis/admin/product'
import { type SortingState, type ColumnDef } from '@tanstack/react-table'
import { FormProductRestarunat } from '@/components/forms/product-restarunat'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconMenuLineHorizontal } from '@/assets/icons/menu-line-horizontal.svg'

interface LocationProps {
  state: CategoryProps
}

export const usePage = () => {
  const focus = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { state }: LocationProps = useLocation()
  const { categoryId } = useParams<ParamProps>()
  const [branch_ids, setBranchIds] = useState<string | number>(ALL_OPTION.value)
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const { currency, can_edit, can_delete } = useProfileStore(state => {
    return {
      currency: state.me?.currency?.code,
      can_edit: state.getPermission('products', 'can_edit'),
      can_delete: state.getPermission('products', 'can_delete'),
    }
  })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const sortParam = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.PRODUCT_LIST, params, branch_ids, categoryId, sortParam]

  const {
    refetch,
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey,
    keepPreviousData: true,
    queryFn: async () =>
      await getProducts(
        {
          branch_ids: branch_ids === ALL_OPTION.value ? undefined : branch_ids,
          ...params,
          sort: sortParam,
        },
        categoryId,
      ),
  })

  const handleUpdateEdit = useCallback(
    (values?: ProductListProps) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((c: ProductListProps) => (c.id === values?.id ? values : c)),
        }
        return { ...rest, data: newData }
      })
    },
    [queryClient, queryKey],
  )

  const handleUpdate = () => {
    void refetch()
  }

  const handleUpdateAdd = useCallback(
    (values?: ProductListProps) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count + 1,
          results: [values, ...data.results],
        }
        return { ...rest, data: newData }
      })
    },
    [queryKey, queryClient],
  )

  const { mutate } = useMutation({
    mutationFn: positionProduct,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleReOrderRow = useCallback(
    (draggedRowIndex: number, targetRowIndex: number) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const results: ProductListProps[] = data.results
        const dragRecord = results[draggedRowIndex]
        const aboveProduct = targetRowIndex === 0 ? undefined : results[targetRowIndex - 1]
        mutate({ above_product: aboveProduct?.id, id: dragRecord.id })
        const newResults = update(results, {
          $splice: [
            [draggedRowIndex, 1],
            [targetRowIndex, 0, dragRecord],
          ],
        })

        return { ...rest, data: { ...data, results: newResults } }
      })
    },
    [mutate, queryKey, queryClient],
  )

  const handleUpdateDelete = useCallback(
    (id: number) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: ProductListProps) => b.id !== id),
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

  const columns = useMemo<Array<ColumnDef<ProductListProps>>>(() => {
    const defaultColumns: Array<ColumnDef<ProductListProps>> = [
      {
        id: 'name',
        header: 'product_name',
        accessorFn: row => row.name,
        cell: cell =>
          categoryId ? (
            <Box display='flex' alignItems='center' ref={cell.dropRef}>
              {can_edit && (
                <IconButton ref={cell.dragRef}>
                  <IconMenuLineHorizontal />
                </IconButton>
              )}
              <Box m='0 14px 0 11px'>
                <Image
                  isGallery
                  radius='5px'
                  src={cell.row.original.image}
                  alt={cell.row.original.name}
                  sx={{ height: '37px', width: '42px', minHeight: '37px', minWidth: '42px' }}
                />
              </Box>
              {cell.row.original.name}
            </Box>
          ) : (
            <Box gap='14px' display='flex' alignItems='center'>
              <Image
                isGallery
                radius='5px'
                src={cell.row.original.image}
                alt={cell.row.original.name}
                sx={{ height: '37px', width: '42px', minHeight: '37px', minWidth: '42px' }}
              />
              {cell.row.original.name}
            </Box>
          ),
        enableSorting: true,
      },
      {
        id: 'price',
        header: 'price',
        accessorFn: row => row.price,
        cell: cell => (
          <Box display='flex' alignItems='center'>
            {numberFormat(cell.row.original.price)} {currency}
            {DISCOUNT_OPTIONS[cell.row.original.sale_type] && (
              <Stack>{DISCOUNT_OPTIONS[cell.row.original.sale_type].icon}</Stack>
            )}
          </Box>
        ),
        enableSorting: true,
      },
      {
        id: 'created_at',
        header: 'created_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
        enableSorting: true,
      },
    ]
    if (can_edit || can_delete) {
      const status: Array<ColumnDef<ProductListProps>> = can_edit
        ? [
            {
              id: 'status',
              header: 'status',
              accessorFn: row => row.is_active,
              cell: row => <Status {...row.row.original} />,
              enableSorting: true,
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
                <FormProductRestarunat
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
  }, [can_edit, can_delete, categoryId, currency, handleUpdateEdit, handleUpdateDelete])

  return {
    page,
    data,
    limit,
    state,
    focus,
    columns,
    can_edit,
    isLoading,
    branch_ids,
    isFetching,
    handlePage,
    categoryId,
    searchValue,
    handleLimit,
    setBranchIds,
    handleSearch,
    handleUpdate,
    handleUpdateAdd,
    handleReOrderRow,
    handleSort,
  }
}
