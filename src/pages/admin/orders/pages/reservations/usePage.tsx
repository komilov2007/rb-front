import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Reject } from './components/reject'
import { Status } from './components/status'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { ALL_OPTION } from '@/constants/option'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { usePagination } from '@/hooks/usePagination'
import { useRef, useMemo, useState, useCallback, type MouseEvent } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { RESERVATION_STATUS_TABS } from '@/constants/reservation'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import type { ReservationProps, ReservationStatusTabProps } from '@/types/reservation'
import {
  getReservations,
  getReservationStats,
  getReservationBranches,
} from '@/apis/admin/reservation'

export const usePage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const can_edit = useProfileStore(state => state.getPermission('orders', 'can_edit'))
  const detailRef = useRef({ setTrue: (_: ReservationProps) => {} })
  const [sortValue, setSortValue] = useState<{ id: string; desc: boolean }>()
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()
  const statusParam = searchParams.get('status') ?? ALL_OPTION.value
  const status = (
    statusParam in RESERVATION_STATUS_TABS ? statusParam : ALL_OPTION.value
  ) as ReservationStatusTabProps
  const branch = searchParams.get('branch') ?? ALL_OPTION.value
  const branchParam = branch === ALL_OPTION.value ? undefined : branch

  const ordering = useMemo(() => {
    if (!sortValue) return undefined
    const prefix = sortValue.desc ? '-' : ''
    // the reservation moment is split into two fields on the backend
    return sortValue.id === 'date' ? `${prefix}date,${prefix}time` : `${prefix}${sortValue.id}`
  }, [sortValue])

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.RESERVATION_LIST, params, status, branchParam, ordering],
    queryFn: async () =>
      await getReservations({
        ...params,
        ordering,
        branch: branchParam,
        status: status === ALL_OPTION.value ? undefined : status,
      }),
  })

  const { data: stats } = useQuery({
    queryKey: [REACT_QUERY_KEYS.RESERVATION_STATS, branchParam],
    queryFn: async () => await getReservationStats({ branch: branchParam }),
  })

  const { data: branches = [] } = useQuery({
    queryFn: getReservationBranches,
    queryKey: [REACT_QUERY_KEYS.RESERVATION_BRANCH_LIST],
    select: res => res.data.map(b => ({ label: b.name, value: String(b.id) })),
  })

  const handleFilter = (key: 'status' | 'branch') => (value: string) => {
    setSearchParams(searchParams => {
      searchParams.set('page', '1')
      searchParams.set(key, value)
      return searchParams
    })
  }

  const handleSort = useCallback((sorting: SortingState) => {
    const next = sorting[0] ?? null

    setSortValue(prev => {
      if (prev?.id === next?.id && prev?.desc === next?.desc) return prev
      return next
    })
  }, [])

  // the action column is only useful while something on the page still waits for an answer
  const hasPending = data.data.results.some(r => r.status === 'PENDING')

  const columns = useMemo<Array<ColumnDef<ReservationProps>>>(() => {
    // the reject drawer is rendered inside the row, so its clicks must not open the detail
    const handleStop = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
    }

    const handleAnswer = (row: ReservationProps) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      detailRef.current.setTrue(row)
    }

    const defaultColumns: Array<ColumnDef<ReservationProps>> = [
      {
        id: 'id',
        header: 'ID',
        enableSorting: true,
        accessorFn: row => row.id,
      },
      {
        id: 'name',
        header: 'customer_name',
        accessorFn: row => row.name,
      },
      {
        id: 'phone',
        header: 'phone_number',
        accessorFn: row => (row.phone.startsWith('+') ? row.phone : `+${row.phone}`),
      },
      {
        id: 'date',
        enableSorting: true,
        header: 'reservation_date',
        accessorFn: row => `${row.date} ${row.time}`,
        cell: cell => (
          <Typography variant='inherit' whiteSpace='nowrap'>
            {dayjs(cell.row.original.date).format('DD.MM.YYYY')},{' '}
            {cell.row.original.time.slice(0, 5)}
          </Typography>
        ),
      },
      {
        id: 'guests',
        enableSorting: true,
        header: 'guests_count',
        accessorFn: row => row.guests,
      },
      {
        id: 'branch',
        header: 'branch',
        accessorFn: row => row.branch.name,
      },
      {
        id: 'status',
        header: 'status',
        cell: cell => <Status status={cell.row.original.status} />,
      },
      {
        id: 'created_at',
        enableSorting: true,
        header: 'created_date',
        accessorFn: row => row.created_at,
        cell: cell => dayjs(cell.row.original.created_at).format('DD.MM.YYYY, HH:mm'),
      },
    ]

    return !can_edit || !hasPending
      ? defaultColumns
      : [
          ...defaultColumns,
          {
            id: 'action',
            header: 'action',
            cell: cell =>
              cell.row.original.status === 'PENDING' && (
                <Stack gap='10px' direction='row' alignItems='center'>
                  <Stack onClick={handleStop}>
                    <Reject variant='table' id={cell.row.original.id} />
                  </Stack>
                  <Button size='extraSmall' onClick={handleAnswer(cell.row.original)}>
                    {t('reservation_accept')}
                  </Button>
                </Stack>
              ),
            meta: {
              getCellContext: () => {
                return {
                  sx: {
                    width: '210px',
                  },
                }
              },
            },
          },
        ]
  }, [t, can_edit, hasPending])

  const handleRowClick = (row: ReservationProps) => {
    detailRef.current.setTrue(row)
  }

  return {
    data,
    page,
    limit,
    stats,
    status,
    branch,
    columns,
    branches,
    detailRef,
    isLoading,
    isFetching,
    handlePage,
    handleSort,
    searchValue,
    handleLimit,
    handleSearch,
    handleFilter,
    handleRowClick,
  }
}
