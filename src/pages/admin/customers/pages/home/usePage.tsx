import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { Bonus } from '@/components/bonus'
import { ROUTER } from '@/constants/router'
import { stringAvatar } from '@/utils/avatar'
import { useQuery } from '@tanstack/react-query'
import { Platform } from '@/components/platform'
import IconButton from '@mui/material/IconButton'
import { Link, useNavigate } from 'react-router-dom'
import { getCustomers } from '@/apis/admin/customer'
import relativeTime from 'dayjs/plugin/relativeTime'
import { usePagination } from '@/hooks/usePagination'
import { type CustomerProps } from '@/types/customer'
import { Fragment, useMemo, useCallback } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconChat } from '@/assets/icons/chat.svg'

dayjs.extend(relativeTime)

export const usePage = () => {
  const navigate = useNavigate()
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()

  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.CUSTOMER_LIST, params],
    queryFn: async () => await getCustomers(params),
  })

  const handleClickRow = useCallback(
    (row: CustomerProps) => {
      navigate(`${row.id}`, { state: row })
    },
    [navigate],
  )

  const columns = useMemo<Array<ColumnDef<CustomerProps>>>(
    () => [
      {
        header: 'customer_name',
        accessorFn: row => row.firstname,
        cell: cell => (
          <Box gap='14px' display='flex' alignItems='center'>
            <Avatar
              src={cell.row.original.photo}
              {...stringAvatar(cell.row.original.firstname ?? '', {
                width: 29,
                height: 29,
              })}
            />
            {cell.row.original.firstname}
          </Box>
        ),
      },
      {
        header: 'username',
        accessorFn: row => row.username,
      },
      {
        header: 'phone_number',
        accessorFn: row => row.phone ?? '-',
      },
      {
        header: 'orders_number',
        accessorFn: row => row.orders,
      },
      {
        accessorKey: 'bonus_point',
        header: 'bonus_point',
        accessorFn: row => row.cashback_ball,
        cell: cell => <Bonus value={cell.row.original.cashback_ball} />,
      },
      {
        header: 'added_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
      {
        header: 'last_visit',
        accessorFn: row => (row.last_active ? dayjs(row.last_active).fromNow() : '-'),
      },
      {
        header: 'platform',
        accessorFn: row => (row.last_active ? dayjs(row.last_active).fromNow() : '-'),
        cell: cell => {
          return (
            <Stack gap='3px' direction='row' alignItems='center'>
              {cell.row.original.platform
                .filter(p => p !== 'CLICK')
                .map((p, i) => (
                  <Fragment key={p}>
                    {i !== 0 && '/'}
                    <Platform platform={p} />
                  </Fragment>
                ))}
            </Stack>
          )
        },
      },
      {
        header: 'action',
        accessorFn: row => row.id,
        cell: cell => {
          return (
            <IconButton
              sx={theme => ({
                background: theme.palette.allColors.PURPLE,
                ':hover': {
                  background: theme.palette.allColors.PURPLE,
                },
                svg: {
                  path: {
                    stroke: theme.palette.allColors.WHITE,
                  },
                },
              })}
              component={Link}
              onClick={e => {
                e.stopPropagation()
              }}
              to={`${ROUTER.ADMIN}/${ROUTER.CHAT}/${cell.row.original.id}`}
            >
              <IconChat />
            </IconButton>
          )
        },
        meta: {
          getCellContext: () => {
            return {
              sx: {
                width: '85px',
              },
            }
          },
        },
      },
    ],
    [],
  )

  return {
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
    handleClickRow,
  }
}
