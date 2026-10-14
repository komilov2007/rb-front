import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import update from 'immutability-helper'
import { Image } from '@/components/image'
import { ROUTER } from '@/constants/router'
import { Status } from './components/status'
import { Delete } from './components/delete'
import { Rating } from '@/components/rating'
import { Source } from '@/components/source'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { numberFormat } from '@/utils/number-format'
import { usePagination } from '@/hooks/usePagination'
import { useCallback, useMemo, useState } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { type SortingState, type ColumnDef } from '@tanstack/react-table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type ProductListOnlineShopProps } from '@/types/product-online-shop'
import { getProductsOnlineShop, positionProductOnlineShop } from '@/apis/admin/product'
import { ReactComponent as IconMenuLineHorizontal } from '@/assets/icons/menu-line-horizontal.svg'

export const usePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const [categoryCatalog, setCategoryCatalog] = useState<string | number>(
    searchParams.get('categoryId') || '',
  )
  const { currency, can_edit, can_delete, subscription, setSubscriptionModal } = useProfileStore(
    state => {
      return {
        currency: state.me?.currency?.code,
        can_edit: state.getPermission('products', 'can_edit'),
        can_delete: state.getPermission('products', 'can_delete'),
        subscription: state.me?.subscription,
        setSubscriptionModal: state.setSubscriptionModal,
      }
    },
  )

  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const sortParam = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.PRODUCT_LIST, params, sortParam, categoryCatalog]

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey,
    keepPreviousData: true,
    queryFn: async () =>
      await getProductsOnlineShop({
        ...params,
        categories: categoryCatalog,
        sort: sortParam,
      }),
  })

  const { tariff } = subscription || {}
  const count = data?.data?.count || 0
  const canOpen =
    (tariff === 'START' && count < 500) || (tariff === 'BASIC' && count < 3000) || tariff === 'PRO'

  const handleAddProduct = () => {
    canOpen
      ? navigate(`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.PRODUCTS}/${ROUTER.CREATE}`)
      : setSubscriptionModal(true)
  }

  const { mutate } = useMutation({
    mutationFn: positionProductOnlineShop,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleChangeCategory = (value: string | number) => {
    setCategoryCatalog(value)

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      if (value) {
        newParams.set('categoryId', String(value))
      } else {
        newParams.delete('categoryId')
      }
      return newParams
    })
  }

  const handleUpdateDelete = useCallback(
    (id: string) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: ProductListOnlineShopProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [queryKey, queryClient],
  )

  const handleUpdate = () => {
    void refetch()
  }

  const handleReOrderRow = useCallback(
    (draggedRowIndex: number, targetRowIndex: number) => {
      const offset = (Number(page) - 1) * Number(limit)
      const absoluteTargetRowIndex = offset + targetRowIndex

      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const results = data.results
        const dragRecord = results[draggedRowIndex]
        const aboveProduct =
          absoluteTargetRowIndex === 0 ? { id: null } : results[targetRowIndex - 1]

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
    [mutate, queryKey, queryClient, limit, page],
  )

  const handleSort = useCallback((sorting: SortingState) => {
    const next = sorting[0] ?? null

    setSortValue(prev => {
      if (prev?.id === next?.id && prev?.desc === next?.desc) return prev
      return next
    })
  }, [])

  const columns = useMemo<Array<ColumnDef<ProductListOnlineShopProps>>>(() => {
    const defaultColumns: Array<ColumnDef<ProductListOnlineShopProps>> = [
      {
        id: 'title',
        header: 'product_name',
        accessorFn: row => row.title,
        cell: cell => (
          <Box gap='14px' display='flex' alignItems='center'>
            <Stack gap='5px' direction='row' alignItems='center' ref={cell.dropRef}>
              {can_edit && categoryCatalog && (
                <IconButton ref={cell.dragRef}>
                  <IconMenuLineHorizontal />
                </IconButton>
              )}
              <Box m='0 14px 0 11px'>
                <Image
                  isGallery
                  radius='5px'
                  src={cell.row.original.photo}
                  alt={cell.row.original.title}
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
                {cell.row.original.title}
              </Typography>
            </Stack>
          </Box>
        ),
        enableSorting: true,
      },

      {
        id: 'base_price',
        header: 'price',
        accessorFn: row => row.base_price,
        cell: cell => (
          <Box display='flex' alignItems='center'>
            {numberFormat(cell.row.original.base_price)} {currency}
          </Box>
        ),
        enableSorting: true,
      },
      {
        id: 'rating',
        header: 'rating',
        accessorFn: row => row.rating,
        cell: cell => <Rating value={cell.row.original.rating} />,
        enableSorting: true,
      },
      {
        id: 'reviews',
        header: 'reviews',
        cell: cell => <>{cell.row.original.reviews_count}</>,
      },
      {
        id: 'source',
        header: 'source',
        cell: cell => <Source source={cell.row.original.source} />,
      },
      {
        id: 'created_at',
        header: 'created_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
        enableSorting: true,
      },
    ]
    if (can_edit || can_delete) {
      const status: Array<ColumnDef<ProductListOnlineShopProps>> = can_edit
        ? [
            {
              id: 'is_active',
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
                <IconButton
                  radius='8px'
                  component={Link}
                  to={`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.PRODUCTS}/${ROUTER.EDIT}/${row.row.original.id}`}
                >
                  <IconEdit />
                </IconButton>
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
  }, [can_edit, can_delete, currency, handleUpdateDelete, categoryCatalog])

  return {
    data,
    page,
    limit,
    columns,
    can_edit,
    isLoading,
    isFetching,
    handlePage,
    handleSort,
    searchValue,
    handleLimit,
    handleSearch,
    handleUpdate,
    handleReOrderRow,
    handleAddProduct,
    setCategoryCatalog,
    handleChangeCategory,
    categoryCatalog: Number(categoryCatalog),
  }
}
