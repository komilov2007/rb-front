import dayjs from 'dayjs'
import { Delete } from './delete'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import update from 'immutability-helper'
import Stack from '@mui/material/Stack'
import { Image } from '@/components/image'
import { ROUTER } from '@/constants/router'
import { Source } from '@/components/source'
import { useTranslation } from 'react-i18next'
import { type ParamProps } from '@/types/params'
import { useProfileStore } from '@/store/profile'
import { type Theme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { usePagination } from '@/hooks/usePagination'
import { type SortingState, type ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type CategoryOnlineShopProps } from '@/types/category'
import { useMemo, useCallback, type CSSProperties, useState } from 'react'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategoriesOnlineShop, positionCategoryOnlineShop } from '@/apis/admin/category'
import { ReactComponent as IconMenuLineHorizontal } from '@/assets/icons/menu-line-horizontal.svg'

export interface PageProps {
  variant: 'home' | 'detail'
}

export const usePage = (props: PageProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const { categoryId } = useParams<ParamProps>()
  const IS_HOME = props.variant === 'home'
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const sortParam = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  const handleBack = () => {
    navigate(-1)
  }

  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('categories', 'can_edit'),
      can_delete: state.getPermission('categories', 'can_delete'),
    }
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.CATEGORY, params, categoryId, sortParam]

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey,
    queryFn: async () =>
      await getCategoriesOnlineShop({ ...params, category_id: categoryId, sort: sortParam }),
  })

  const { mutate } = useMutation({
    mutationFn: positionCategoryOnlineShop,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const getRowStyles = (row: CategoryOnlineShopProps, theme: Theme): CSSProperties => {
    if (row.products_count === 0) {
      return {
        background: theme.palette.allColors.RED20,
      }
    }
    return {}
  }

  const handleClickRow = useCallback(
    (row: CategoryOnlineShopProps) => {
      if (row.child_count === 0) return
      navigate(
        IS_HOME ? `${row.id}` : `${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.CATEGORIES}/${row.id}`,
      )
    },
    [IS_HOME, navigate],
  )

  const handleReOrderRow = useCallback(
    (draggedRowIndex: number, targetRowIndex: number) => {
      const offset = (Number(page) - 1) * Number(limit)
      const absoluteTargetRowIndex = offset + targetRowIndex

      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const results: CategoryOnlineShopProps[] = data.results
        const dragRecord = results[draggedRowIndex]
        const aboveCategory =
          absoluteTargetRowIndex === 0 ? { id: null } : results[targetRowIndex - 1]

        mutate({ above_category: aboveCategory?.id, id: dragRecord.id })
        const newResults = update(results, {
          $splice: [
            [draggedRowIndex, 1],
            [targetRowIndex, 0, dragRecord],
          ],
        })

        return { ...rest, data: { ...data, results: newResults } }
      })
    },
    [queryKey, limit, page, mutate, queryClient],
  )

  const handleUpdateDelete = useCallback(
    (id: number) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: CategoryOnlineShopProps) => b.id !== id),
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

  const columns = useMemo<Array<ColumnDef<CategoryOnlineShopProps>>>(() => {
    const defaultColumns: Array<ColumnDef<CategoryOnlineShopProps>> = [
      {
        id: 'name',
        header: 'category_name',
        accessorFn: row => row.name,
        cell: cell => {
          return (
            <Box gap='5px' display='flex' alignItems='center'>
              <Stack gap='5px' direction='row' alignItems='center' ref={cell.dropRef}>
                {can_edit && (
                  <IconButton ref={cell.dragRef}>
                    <IconMenuLineHorizontal />
                  </IconButton>
                )}
                <Box m='0 14px 0 11px'>
                  <Image
                    isGallery
                    radius='5px'
                    src={cell.row.original.photo}
                    alt={cell.row.original.name}
                    sx={{ height: '37px', width: '47px', minHeight: '37px', minWidth: '47px' }}
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  />
                </Box>
                {cell.row.original.name}
              </Stack>
            </Box>
          )
        },
        enableSorting: true,
        meta: {
          getCellContext: () => {
            return {
              sx: {
                width: '220px',
              },
            }
          },
        },
      },
      {
        meta: {
          getCellContext: () => {
            return {
              sx: {
                width: '220px',
              },
            }
          },
        },
        id: 'child_count',
        header: 'sub_category',
        accessorFn: row => row.child_count,
        enableSorting: true,
      },
      {
        id: 'products_count',
        header: 'products',
        accessorFn: row => row.products_count,
        meta: {
          getCellContext: () => {
            return {
              sx: {
                width: '220px',
              },
            }
          },
        },
        enableSorting: true,
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
      return [
        ...defaultColumns,
        {
          header: 'action',
          accessorFn: row => row.id,
          cell: row => {
            return (
              <Box
                gap='10px'
                display='flex'
                alignItems='center'
                width='fit-content'
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                {can_edit && (
                  <IconButton
                    radius='8px'
                    component={Link}
                    to={`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.CATEGORIES}/${ROUTER.EDIT}/${row.row.original.id}`}
                  >
                    <IconEdit />
                  </IconButton>
                )}
                {can_delete && (
                  <Delete
                    id={row.row.original.id}
                    productsCount={row.row.original.products_count}
                    handleUpdate={handleUpdateDelete}
                  />
                )}
              </Box>
            )
          },
        },
      ]
    }
    return defaultColumns
  }, [can_delete, can_edit, handleUpdateDelete])

  return {
    t,
    page,
    data,
    limit,
    columns,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    getRowStyles,
    handleClickRow,
    handleReOrderRow,
    handleSort,
    handleBack,
    categoryId,
  }
}
