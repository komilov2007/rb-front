import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import update from 'immutability-helper'
import { Image } from '@/components/image'
import { Delete } from './components/delete'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Theme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { usePagination } from '@/hooks/usePagination'
import { useCategories } from '@/hooks/useCategories'
import { type CategoryProps } from '@/types/category'
import { positionCategory } from '@/apis/admin/category'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ExpandedState, type ColumnDef, type SortingState } from '@tanstack/react-table'
import { FormCategoryRestarunat } from '@/components/forms/category-restarunat'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { useMemo, useState, useCallback, type MouseEvent, type CSSProperties } from 'react'
import { ReactComponent as IconMenuLineHorizontal } from '@/assets/icons/menu-line-horizontal.svg'

export const usePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('categories', 'can_edit'),
      can_delete: state.getPermission('categories', 'can_delete'),
    }
  })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const sortParam = useMemo(() => {
    if (!sortValue) return undefined
    return `${sortValue.desc ? '-' : ''}${sortValue.id}`
  }, [sortValue])

  const { data, refetch, isLoading, isFetching } = useCategories({ ...params, sort: sortParam })

  const handleClickRow = useCallback(
    (row: CategoryProps) => {
      navigate(`${row.id}`, { state: row })
    },
    [navigate],
  )

  const handleUpdate = () => {
    void refetch()
  }

  const handleUpdateEdit = useCallback(
    (isChild: boolean) => () => {
      if (isChild) {
        void queryClient.invalidateQueries({
          predicate: query => {
            const q = query.queryKey[0] as string
            return q.startsWith(REACT_QUERY_KEYS.CATEGORY_SUB)
          },
        })
      } else {
        void queryClient.invalidateQueries({
          predicate: query => {
            const q = query.queryKey[0] as string
            return q.startsWith(REACT_QUERY_KEYS.CATEGORY)
          },
        })
      }
    },
    [queryClient],
  )

  const handleUpdateAdd = useCallback(
    (values?: CategoryProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.CATEGORY, params], ({ data, ...rest }) => {
        if (values?.parent.id) {
          const results = data.results.map((c: CategoryProps) =>
            c.id === values.parent.id ? { ...c, childs: c.childs + 1 } : c,
          )
          const newData = {
            ...data,
            results,
          }
          return { ...rest, data: newData }
        }
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
    (isChild: boolean) => (id: number) => {
      if (isChild) {
        void queryClient.invalidateQueries({
          predicate: query => {
            const q = query.queryKey[0] as string
            return q.startsWith(REACT_QUERY_KEYS.CATEGORY_SUB)
          },
        })
      } else {
        queryClient.setQueryData([REACT_QUERY_KEYS.CATEGORY, params], ({ data, ...rest }) => {
          const newData = {
            ...data,
            count: data.count - 1,
            results: data.results.filter((b: CategoryProps) => b.id !== id),
          }
          return { ...rest, data: newData }
        })
      }
    },
    [params, queryClient],
  )

  const { mutate } = useMutation({
    mutationFn: positionCategory,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleReOrderRow = useCallback(
    (draggedRowIndex: number, targetRowIndex: number) => {
      const offset = (Number(page) - 1) * Number(limit)
      const absoluteTargetRowIndex = offset + targetRowIndex

      queryClient.setQueryData([REACT_QUERY_KEYS.CATEGORY, params], ({ data, ...rest }) => {
        const results: CategoryProps[] = data.results
        const dragRecord = results[draggedRowIndex]
        const aboveCategory = absoluteTargetRowIndex === 0 ? undefined : results[targetRowIndex - 1]
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
    [mutate, params, queryClient, page, limit],
  )

  const getRowStyles = (row: CategoryProps, theme: Theme): CSSProperties => {
    if (row.products === 0) {
      return {
        background: theme.palette.allColors.RED20,
      }
    }
    return {}
  }

  const handleSort = useCallback((sorting: SortingState) => {
    const next = sorting[0] ?? null

    setSortValue(prev => {
      if (prev?.id === next?.id && prev?.desc === next?.desc) return prev
      return next
    })
  }, [])

  const columns = useMemo<Array<ColumnDef<CategoryProps>>>(() => {
    const defaultColumns: Array<ColumnDef<CategoryProps>> = [
      {
        id: 'name',
        header: 'category_name',
        accessorFn: row => row.name,
        cell: cell => {
          return (
            <Box gap='5px' display='flex' alignItems='center'>
              {cell.row.original.child ? null : (
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
                    />
                  </Box>
                  {cell.row.original.name}
                </Stack>
              )}
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
        id: 'childs',
        header: 'sub_category',
        accessorFn: row => row.childs,
        cell: cell => {
          const handleExpand = (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            if (Object.entries(expanded).length === 1 && cell.row.getIsExpanded()) {
              cell.row.getToggleExpandedHandler()()
            } else {
              setExpanded({})
              cell.row.getToggleExpandedHandler()()
            }
          }
          return (
            <Box gap='10px' display='flex' alignItems='center'>
              {cell.row.original.child ? (
                <Stack ml='-30px' gap='5px' direction='row' alignItems='center' ref={cell.dropRef}>
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
                    />
                  </Box>
                  {cell.row.original.name}
                </Stack>
              ) : (
                <>
                  {cell.row.original.childs > 0 && cell.row.original.childs}
                  {cell.row.original.childs > 0 && (
                    <IconButton
                      onClick={handleExpand}
                      sx={theme => ({
                        p: 0,
                        ml: '8px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: theme.palette.allColors.WHITE20,
                        svg: {
                          width: '20px',
                          height: '20px',
                          transform: cell.row.getIsExpanded() ? 'rotate(-180deg)' : undefined,
                        },
                      })}
                    >
                      <IconDirectionDown />
                    </IconButton>
                  )}
                </>
              )}
            </Box>
          )
        },
        enableSorting: true,
      },
      {
        id: 'products',
        header: 'products',
        accessorFn: row => row.products,
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
                  <FormCategoryRestarunat
                    variant='edit'
                    id={row.row.original.id}
                    handleUpdate={handleUpdateEdit(row.row.original.child)}
                  />
                )}
                {can_delete && (
                  <Delete
                    id={row.row.original.id}
                    productsCount={row.row.original.products}
                    handleUpdate={handleUpdateDelete(row.row.original.child)}
                  />
                )}
              </Box>
            )
          },
        },
      ]
    }
    return defaultColumns
  }, [can_delete, expanded, can_edit, handleUpdateEdit, handleUpdateDelete])

  return {
    page,
    data,
    limit,
    columns,
    can_edit,
    expanded,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    setExpanded,
    handleSearch,
    handleUpdate,
    getRowStyles,
    handleClickRow,
    handleUpdateAdd,
    handleReOrderRow,
    handleSort,
  }
}
