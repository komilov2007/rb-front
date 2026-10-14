import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import update from 'immutability-helper'
import { Group } from './components/group'
import { useMemo, useCallback } from 'react'
import { Delete } from './components/delete'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { Status } from './components/status/status'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { FormBranch } from '@/components/forms/branch'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getBranches, positionBranch } from '@/apis/admin/branch'
import { type BranchProps, type BranchListProps } from '@/types/branch'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconMenuLineHorizontal } from '@/assets/icons/menu-line-horizontal.svg'

export const usePage = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('branches', 'can_edit'),
      can_delete: state.getPermission('branches', 'can_delete'),
    }
  })
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const {
    data = { data: { results: [], count: 0 } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.BRANCH_LIST, params],
    queryFn: async () => await getBranches(params),
  })

  const { mutate } = useMutation({
    mutationFn: positionBranch,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleUpdateEdit = useCallback(
    (values: BranchProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.BRANCH_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          results: data.results.map((b: BranchProps) => (b.id === values.id ? values : b)),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleUpdateAdd = useCallback(
    (values: BranchProps) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.BRANCH_LIST, params], ({ data, ...rest }) => {
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
      queryClient.setQueryData([REACT_QUERY_KEYS.BRANCH_LIST, params], ({ data, ...rest }) => {
        const newData = {
          ...data,
          count: data.count - 1,
          results: data.results.filter((b: BranchProps) => b.id !== id),
        }
        return { ...rest, data: newData }
      })
    },
    [params, queryClient],
  )

  const handleReOrderRow = useCallback(
    (draggedRowIndex: number, targetRowIndex: number) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.BRANCH_LIST, params], ({ data, ...rest }) => {
        const results: BranchProps[] = data.results
        const dragRecord = results[draggedRowIndex]
        const aboveBranch = targetRowIndex === 0 ? undefined : results[targetRowIndex - 1]
        mutate({ above_branch: aboveBranch?.id, id: dragRecord.id })

        const newResults = update(results, {
          $splice: [
            [draggedRowIndex, 1],
            [targetRowIndex, 0, dragRecord],
          ],
        })

        return { ...rest, data: { ...data, results: newResults } }
      })
    },
    [mutate, params, queryClient],
  )

  const columns = useMemo<Array<ColumnDef<BranchListProps>>>(() => {
    const defaultColumns: Array<ColumnDef<BranchListProps>> = [
      {
        header: 'branch_name',
        accessorFn: row => row.name,
        cell: cell => (
          <Box gap='4px' display='flex' alignItems='center' ref={cell.dropRef}>
            {can_edit && (
              <IconButton ref={cell.dragRef}>
                <IconMenuLineHorizontal />
              </IconButton>
            )}
            {cell.row.original.name}
          </Box>
        ),
      },
      {
        header: 'location',
        accessorFn: row => row.address,
        cell: row => (
          <Typography noWrap variant='inherit'>
            {row.row.original.address}
          </Typography>
        ),
      },
      {
        header: 'Group id',
        accessorFn: row => row.group_token,
        cell: row => {
          return row.row.original?.group_token ? (
            <Group token={row.row.original.group_token} />
          ) : (
            '-'
          )
        },
      },
    ]
    if (can_edit || can_delete) {
      const status: Array<ColumnDef<BranchListProps>> = can_edit
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
          meta: {
            getCellContext: () => {
              return {
                sx: {
                  width: '120px',
                },
              }
            },
          },
          cell: row => {
            return (
              <Box gap='10px' display='flex' alignItems='center'>
                {can_edit && (
                  <FormBranch
                    variant='edit'
                    id={row.row.original.id}
                    handleUpdate={handleUpdateEdit}
                  />
                )}
                {can_delete && (
                  <Delete id={row.row.original.id} handleUpdate={handleUpdateDelete} />
                )}
              </Box>
            )
          },
        },
      ]
    }

    return defaultColumns
  }, [can_delete, can_edit, handleUpdateDelete, handleUpdateEdit])

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
    handleReOrderRow,
  }
}
