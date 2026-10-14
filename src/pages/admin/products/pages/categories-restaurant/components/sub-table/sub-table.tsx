import { useCallback } from 'react'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import update from 'immutability-helper'
import { Table } from '@/components/table'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type { CategoryProps } from '@/types/category'
import { type ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getAllCategories, positionCategory } from '@/apis/admin/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface SubTableProps extends CategoryProps {
  columns: Array<ColumnDef<CategoryProps>>
}

export const SubTable = ({ columns, ...props }: SubTableProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    data = { data: [] },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CATEGORY_SUB, props.id],
    queryFn: async () => await getAllCategories({ parent: props.id }),
    select: res => {
      const data = res.data.map(c => ({ ...c, child: true }))
      return { ...res, data }
    },
  })

  const { mutate } = useMutation({
    mutationFn: positionCategory,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleReOrderRow = useCallback(
    (draggedRowIndex: number, targetRowIndex: number) => {
      queryClient.setQueryData([REACT_QUERY_KEYS.CATEGORY_SUB, props.id], ({ data, ...rest }) => {
        const results: CategoryProps[] = data
        const dragRecord = results[draggedRowIndex]
        const aboveCategory = targetRowIndex === 0 ? undefined : results[targetRowIndex - 1]

        mutate({ above_category: aboveCategory?.id, id: dragRecord.id })
        const newResults = update(results, {
          $splice: [
            [draggedRowIndex, 1],
            [targetRowIndex, 0, dragRecord],
          ],
        })

        return { ...rest, data: newResults }
      })
    },
    [mutate, props.id, queryClient],
  )

  const handleClickRow = useCallback(
    (row: CategoryProps) => {
      navigate(`${row.id}`, { state: row })
    },
    [navigate],
  )

  return isLoading ? (
    <Stack
      gap='2px'
      sx={{
        ml: '-10px',
        width: 'calc(100% + 20px)',
      }}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} variant='rectangular' animation={false} width='100%' height='60px' />
      ))}
    </Stack>
  ) : (
    <Stack
      sx={theme => ({
        ml: '-10px',
        mt: '-6px',
        width: 'calc(100% + 20px)',
        background: theme.palette.allColors.PURPLE30,
        '.MuiTableBody-root .MuiTableCell-root': {
          background: theme.palette.allColors.PURPLE30,
        },
        '.MuiTableHead-root': {
          visibility: 'hiiden',
          opacity: 0,
          '.MuiTableCell-root': {
            height: '0!important',
            fontSize: '5px',
          },
        },
      })}
    >
      <Table
        isDnd
        isLoading={isLoading}
        isFetching={isFetching}
        onRowClick={handleClickRow}
        onReOrderRow={handleReOrderRow}
        emptyTitle='you_have_no_categories'
        options={{
          data: data.data,
          columns,
        }}
        renderSubComponent={row => <SubTable {...row} columns={columns} />}
      />
    </Stack>
  )
}
