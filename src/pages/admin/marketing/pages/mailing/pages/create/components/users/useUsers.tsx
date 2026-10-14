import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { useMarketingStore } from '@/store/marketing'
import { usePagination } from '@/hooks/usePagination'
import { getMailingUsers } from '@/apis/admin/mailing'
import { useSearchParams } from 'react-router-dom'
import { type ColumnDef } from '@tanstack/react-table'
import { type MailingUsersProps } from '@/types/mailing'
import { useMemo, useState, type ChangeEvent } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { InputCheckboxIndeterminate } from '@/components/inputs/input-checkbox-indeterminate'
import { useTranslation } from 'react-i18next'
import { numberFormat } from '@/utils/number-format'
import { useProfileStore } from '@/store/profile'

type RowSelectionProps = Record<number, boolean>

export const useUsers = () => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean(true)
  const currency = useProfileStore(state => state.me?.currency?.code)
  const [pageByIds, setPageByIds] = useState<
    Array<{ ids: RowSelectionProps; page: number | string }>
  >([])
  const [rowSelection, setRowSelection] = useState<RowSelectionProps>({})
  const { setStep, setUsers } = useMarketingStore(state => ({
    setStep: state.setStep,
    setUsers: state.setUsers,
  }))
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()
  const [searchParams] = useSearchParams()
  const filterParams = useMemo(
    () => ({
      limit: params.limit,
      offset: params.offset,
      firstname: params.search,
      min_orders: searchParams.get('min_orders') ?? undefined,
      max_orders: searchParams.get('max_orders') ?? undefined,
      min_orders_sum: searchParams.get('min_orders_sum') ?? undefined,
      max_orders_sum: searchParams.get('max_orders_sum') ?? undefined,
      start_date: searchParams.get('start_date') ?? undefined,
      end_date: searchParams.get('end_date') ?? undefined,
      country: searchParams.get('country') ?? undefined,
      cities: searchParams.getAll('cities'),
    }),
    [params, searchParams],
  )
  const selectRowsLength = Object.keys(rowSelection).length
  const {
    data = { data: { count: 0, results: [] } },
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.MAILING_USERS_LIST, filterParams],
    queryFn: async () => await getMailingUsers(filterParams),
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

  const handleNext = () => {
    const users: number[] = value ? [] : Object.keys(rowSelection).map(Number)
    setStep('description')
    setUsers(users)
  }

  const columns = useMemo<Array<ColumnDef<MailingUsersProps>>>(
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
        header: 'country',
        accessorFn: row => row.country,
      },
      {
        header: 'city',
        accessorFn: row => row.city,
      },
      {
        header: 'orders_number',
        accessorFn: row => numberFormat(row.orders),
      },
      {
        id: 'orders_sum',
        header: () => {
          return <div>{t('order_amount', { currency })}</div>
        },
        accessorFn: row => numberFormat(row.orders_sum),
      },
      {
        header: 'added_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
    ],
    [data.data.results, value, t, rowSelection, setFalse, currency],
  )

  return {
    data,
    page,
    limit,
    value,
    setTrue,
    columns,
    isLoading,
    handleNext,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    rowSelection,
    handleSearch,
    setRowSelection,
    selectRowsLength,
  }
}
