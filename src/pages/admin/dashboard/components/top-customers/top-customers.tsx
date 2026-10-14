import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { Expired } from '@/components/expired'
import Typography from '@mui/material/Typography'
import ImageSub3 from '@/assets/images/sub-3.webp'
import { useTopCustomers } from './useTopCustomers'

interface TopCustomersProps {
  params: { from: string; to: string }
}

export const TopCustomers = ({ params }: TopCustomersProps) => {
  const { t } = useTranslation()
  const { data, columns, isLoading, hasAccess } = useTopCustomers(params)

  return (
    <Stack
      flexGrow={1}
      sx={{
        '.MuiTableContainer-root': {
          borderRadius: '0 0 12px 12px',
        },
      }}
    >
      <Stack p='14px 18px' direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='title10' component='h2'>
          {t('top_10_customers')}
        </Typography>
      </Stack>
      {hasAccess ? (
        <Expired
          title='See_your_most_loyal_customers'
          description='Track_who_places_the_most_orders_and_stays_active'
          image={ImageSub3}
        />
      ) : isLoading ? (
        <Skeleton
          width='100%'
          height='200px'
          variant='rectangular'
          sx={{ borderRadius: '0 0 12px 12px' }}
        />
      ) : (
        <Table
          emptyTitle='you_have_no_customers'
          options={{
            columns,
            data: data.data,
          }}
        />
      )}
      {}
    </Stack>
  )
}
