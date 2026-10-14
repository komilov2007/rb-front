import Box from '@mui/material/Box'
import { useMemo } from 'react'
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from '@/utils/avatar'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { getClients } from '@/apis/admin/dashboard'
import { type ClientsProps } from '@/types/dashboard'
import { type ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useTopCustomers = (params: { from: string; to: string }) => {
  const { is_free, is_basic, is_expired } = useProfileStore(state => ({
    is_free: state.me?.subscription.is_free,
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const { data = { data: [] }, isLoading } = useQuery({
    enabled: !hasAccess,
    keepPreviousData: true,
    queryFn: async () => await getClients(params),
    queryKey: [REACT_QUERY_KEYS.DASHBOARD_CLIENTS_LIST, params, params.from, params.to],
  })

  const columns = useMemo<Array<ColumnDef<ClientsProps>>>(
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
        header: 'phone_number',
        accessorFn: row => row.phone ?? '-',
      },
      {
        header: 'orders_number',
        accessorFn: row => row.order_count,
      },
    ],
    [],
  )

  return { data, columns, isLoading, hasAccess }
}
