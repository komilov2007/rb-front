import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ParamProps } from '@/types/params'
import { useProfileStore } from '@/store/profile'
import { numberFormat } from '@/utils/number-format'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { useNavigate, useParams } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SmsMailingUsersProps } from '@/types/sms-mailing'
import { useRef, useMemo, useState, type ChangeEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { InputCheckboxIndeterminate } from '@/components/inputs/input-checkbox-indeterminate'
import { getSmsMailingDetail, getSmsMailingUsers, sendSmsMailing } from '@/apis/admin/sms-mailing'

type RowSelectionProps = Record<number, boolean>

interface RefBalanceProps {
  setTrue: () => void
}

export const usePage = () => {
  const send = useBoolean()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const refBalance = useRef<RefBalanceProps>()
  const [price, setPrice] = useState<number>(0)
  const { smsMailingId } = useParams<ParamProps>()
  const { value, setTrue, setFalse } = useBoolean(true)
  const account = useProfileStore(state => state.me?.account ?? 0)
  const [pageByIds, setPageByIds] = useState<
    Array<{ ids: RowSelectionProps; page: number | string }>
  >([])
  const [rowSelection, setRowSelection] = useState<RowSelectionProps>({})
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()
  const selectRowsLength = Object.keys(rowSelection).length
  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.SMS_MAILING_USERS_LIST, params],
    queryFn: async () => await getSmsMailingUsers({ ...params, is_phone_required: true }),
    onSuccess: res => {
      const ids: RowSelectionProps = res.data.results
        .map(r => r.id)
        .reduce((prev, next) => ({ ...prev, [next]: true }), {})

      const hasPageIds = pageByIds.find(p => Number(p.page) === Number(page))
      const newPageByIds = hasPageIds ? pageByIds : [...pageByIds, { page, ids }]
      setPageByIds(newPageByIds)
      setRowSelection({ ...ids, ...rowSelection })
    },
  })

  const detail = useQuery({
    enabled: send.value,
    queryKey: [REACT_QUERY_KEYS.SMS_MAILING_DETAIL, smsMailingId],
    queryFn: async () => await getSmsMailingDetail(smsMailingId),
  })

  const sendMutation1 = useMutation({
    mutationFn: async () => {
      const customers: number[] = value ? [] : Object.keys(rowSelection).map(Number)
      return await sendSmsMailing({
        customers,
        template_id: Number(smsMailingId),
        to_all: value,
        show_price: true,
      })
    },
    onSuccess: res => {
      setPrice(res.data.cost)
    },
  })

  const sendMutation2 = useMutation({
    mutationFn: async () => {
      const customers: number[] = value ? [] : Object.keys(rowSelection).map(Number)
      return await sendSmsMailing({
        customers,
        template_id: Number(smsMailingId),
        to_all: value,
        show_price: false,
      })
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        predicate: query => {
          const q = query.queryKey[0] as string
          return q.startsWith(REACT_QUERY_KEYS.ME)
        },
      })
      navigate(`${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.MARKETING_SMS_MAILING}`)
      void queryClient.invalidateQueries({
        predicate: query => {
          const q = query.queryKey[0] as string
          return q.startsWith(REACT_QUERY_KEYS.SMS_MAILING_LIST)
        },
      })
    },
    onError: () => {
      refBalance.current?.setTrue()
    },
  })

  const handleNext = () => {
    send.setTrue()
    sendMutation1.mutate()
  }

  const handleSubmit = () => {
    sendMutation2.mutate()
  }

  const columns = useMemo<Array<ColumnDef<SmsMailingUsersProps>>>(
    () => [
      {
        id: 'id',
        accessorFn: row => row.id,
        header: ({ table }) => {
          const hasUser = data.data.results.map(u => u.id).some(u => rowSelection[u])
          const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFalse()
            table.getToggleAllRowsSelectedHandler()(e)
          }

          return (
            <Stack gap='8px' direction='row' alignItems='center'>
              <InputCheckboxIndeterminate
                isHeader={hasUser}
                {...{
                  onChange: handleChange,
                  checked: value || table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                }}
              />
              {t('customer_name')}
            </Stack>
          )
        },
        cell: ({ row }) => {
          const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFalse()
            row.getToggleSelectedHandler()(e)
          }

          return (
            <Stack gap='8px' direction='row' alignItems='center'>
              <InputCheckboxIndeterminate
                {...{
                  onChange: handleChange,
                  disabled: !row.getCanSelect(),
                  checked: value || row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                }}
              />
              <Avatar />
              {row.original.firstname}
            </Stack>
          )
        },
      },
      {
        header: 'phone',
        accessorFn: row => row.phone,
      },
      {
        header: 'orders_number',
        accessorFn: row => numberFormat(row.orders),
      },
      {
        header: 'added_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
    ],
    [data.data.results, value, t, rowSelection, setFalse],
  )

  return {
    send,
    data,
    page,
    limit,
    price,
    value,
    detail,
    setTrue,
    columns,
    account,
    isLoading,
    handleNext,
    isFetching,
    handlePage,
    refBalance,
    searchValue,
    handleLimit,
    rowSelection,
    handleSearch,
    handleSubmit,
    sendMutation1,
    sendMutation2,
    setRowSelection,
    selectRowsLength,
  }
}
