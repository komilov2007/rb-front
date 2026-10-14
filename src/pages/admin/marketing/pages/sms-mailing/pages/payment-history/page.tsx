import dayjs from 'dayjs'
import { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import type { ParamProps } from '@/types/params'
import Typography from '@mui/material/Typography'
import { Link, useParams } from 'react-router-dom'
import { numberFormat } from '@/utils/number-format'
import { type ColumnDef } from '@tanstack/react-table'
import { getSmsMailingRecord } from '@/apis/admin/sms-mailing'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { SmsMailingRecordProps } from '@/types/sms-mailing'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'

const Page = () => {
  const { t } = useTranslation()
  const { smsMailingId } = useParams<ParamProps>()
  const {
    data = { data: [] },
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: async () => await getSmsMailingRecord(smsMailingId),
    queryKey: [REACT_QUERY_KEYS.SMS_MAILING_PAYMENT_HISTORY, smsMailingId],
  })

  const columns = useMemo<Array<ColumnDef<SmsMailingRecordProps>>>(
    () => [
      {
        header: 'paid',
        accessorFn: row => `${numberFormat(row.cost)} UZS`,
      },
      {
        header: 'sent',
        accessorFn: row => row.delivered_count,
      },
      {
        header: 'failed',
        accessorFn: row => row.rejected_count,
      },
      {
        header: 'added_date',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
      },
    ],
    [],
  )

  return (
    <Stack overflow='hidden' gap='20px' py='20px'>
      <Stack px='20px' gap='10px' alignItems='flex-start'>
        <Button
          size='small'
          component={Link}
          to={`${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.MARKETING_SMS_MAILING}`}
          variant='text-gray'
          startIcon={<IconArrowLeft />}
        >
          {t('back')}
        </Button>
        <Typography variant='title30' component='h3'>
          {t('payment_history')}
        </Typography>
      </Stack>
      <Stack overflow='hidden'>
        <Table
          isLoading={isLoading}
          isFetching={isFetching}
          emptyTitle='you_have_no_mailing_users'
          options={{
            columns,
            data: data.data,
          }}
        />
      </Stack>
    </Stack>
  )
}

export default Page
