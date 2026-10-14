import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Image } from '@/components/image'
import { ROUTER } from '@/constants/router'
import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { getMailings } from '@/apis/admin/mailing'
import { type MailingProps } from '@/types/mailing'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const usePage = () => {
  const navigate = useNavigate()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()
  const { can_edit } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('mailing', 'can_edit'),
    }
  })
  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.MAILING_LIST, params],
    queryFn: async () => await getMailings(params),
  })

  const handleClickRow = useCallback(
    (row: MailingProps) => {
      navigate(`${row.id}`, { state: row })
    },
    [navigate],
  )

  const columns = useMemo<Array<ColumnDef<MailingProps>>>(() => {
    const defaultColumns: Array<ColumnDef<MailingProps>> = [
      {
        header: 'mailing_name',
        accessorFn: row => row.title,
        cell: cell => (
          <Box gap='14px' display='flex' alignItems='center'>
            <Image
              isGallery
              radius='5px'
              src={cell.row.original.file}
              alt={cell.row.original.title}
              sx={{ height: '37px', width: '42px' }}
            />
            {cell.row.original.title}
          </Box>
        ),
      },
      {
        header: 'total_users',
        accessorFn: row => row.users,
      },
      {
        header: 'sent',
        accessorFn: row => row.success,
      },
      {
        header: 'failed',
        accessorFn: row => row.error,
      },
      {
        header: 'clicks',
        accessorFn: row => row.clicks,
      },
      {
        header: 'blocked',
        accessorFn: row => row.blocked,
      },
      {
        header: 'sent_date_time',
        accessorFn: row => dayjs(row.schedule_datetime).format('DD.MM.YYYY, HH:mm'),
      },
    ]

    return defaultColumns
  }, [])

  const handleOpen = () => {
    const canOpen =
      (subscription?.tariff === 'START' && subscription?.limit.mailing_count < 5) ||
      (subscription?.tariff === 'BASIC' && subscription?.limit.mailing_count < 25) ||
      subscription?.tariff === 'PRO'

    if (canOpen) {
      navigate(ROUTER.MARKETING_CREATE_MAILING)
    } else {
      setSubscriptionModal(true, {
        title: '',
        description: '',
      })
    }
  }

  return {
    page,
    data,
    limit,
    columns,
    can_edit,
    isLoading,
    handleOpen,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    handleClickRow,
  }
}
