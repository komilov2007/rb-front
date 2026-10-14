import { Container, Dot } from './style'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { getTotals } from '@/apis/admin/dashboard'
import { numberFormat } from '@/utils/number-format'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconDone } from '@/assets/icons/done.svg'
import { ReactComponent as IconClients } from '@/assets/icons/clients.svg'
import { ReactComponent as IconEarnings } from '@/assets/icons/earnings.svg'

interface TotalsProps {
  general: 'clients' | 'orders' | 'earnings'
  params: { from: string; to: string }
}

interface EarningsTotals {
  total_delivery: number
  total_income: number
  total_profit: number
  total_cogs: number
}

interface OrdersTotals {
  amount: number
  cancel: number
  done: number
  new: number
}

interface ClientsTotals {
  amount: number
  avg_order_amount: number
  difference: number
  new_customers: number
  returned_customers: number
}

type DashboardTotalsData = EarningsTotals | OrdersTotals | ClientsTotals

const TOTALS_CONFIG = {
  earnings: {
    label: 'earnings',
    Icon: IconEarnings,
    borderColor: '#5DC983',
  },
  orders: {
    label: 'orders',
    Icon: IconDone,
    borderColor: '#F5A623',
  },
  clients: {
    label: 'total_clients',
    Icon: IconClients,
    borderColor: '#5DC983',
  },
}

interface StatItemProps {
  color: string
  label: string
  value: string
}

const StatItem = ({ color, label, value }: StatItemProps) => (
  <Stack direction='row' alignItems='center' justifyContent='space-between'>
    <Stack direction='row' alignItems='center' gap='6px'>
      <Dot color={color} />
      <Typography variant='text120' color='text.secondary'>
        {label}
      </Typography>
    </Stack>
    <Typography variant='text120' fontWeight='500'>
      {value}
    </Typography>
  </Stack>
)

export const Totals = ({ general, params }: TotalsProps) => {
  const { t } = useTranslation()
  const { Icon, label, borderColor } = TOTALS_CONFIG[general]
  const currency = useProfileStore(state => state.me?.currency?.code)
  const { data, isLoading } = useQuery({
    keepPreviousData: true,
    queryFn: async () => await getTotals(params, general),
    queryKey: [`${REACT_QUERY_KEYS.DASHBOARD_TOTALS}_${general}`, params, params.from, params.to],
    select: res => {
      const data = Object.values(res.data)[0] as DashboardTotalsData
      return { ...res, data }
    },
  })

  const renderStats = () => {
    if (general === 'earnings') {
      const d = data?.data as EarningsTotals
      return (
        <Stack gap='4px'>
          <StatItem
            color='#9B59B6'
            label={t('cost_of_sales')}
            value={`${numberFormat(d.total_cogs)} ${currency}`}
          />
          <StatItem
            color='#4A90D9'
            label={t('delivery_amount')}
            value={`${numberFormat(d.total_delivery)} ${currency}`}
          />
          <StatItem
            color='#4A90D9'
            label={t('profit')}
            value={`${numberFormat(d.total_profit)} ${currency}`}
          />
        </Stack>
      )
    }
    if (general === 'orders') {
      const d = data?.data as OrdersTotals
      return (
        <Stack gap='4px'>
          <StatItem color='#4A90D9' label={t('new')} value={String(d.new ?? 0)} />
          <StatItem color='#5DC983' label={t('done')} value={String(d.done ?? 0)} />
          <StatItem color='#EB5769' label={t('cancelled')} value={String(d.cancel ?? 0)} />
        </Stack>
      )
    }
    const d = data?.data as ClientsTotals
    return (
      <Stack gap='4px'>
        <StatItem color='#4A90D9' label={t('new_customers')} value={String(d.new_customers ?? 0)} />
        <StatItem
          color='#F5A623'
          label={t('returned_customers')}
          value={String(d.returned_customers ?? 0)}
        />
        <StatItem
          color='#9B59B6'
          label={t('average_order')}
          value={`${numberFormat(d.avg_order_amount ?? 0)} ${currency}`}
        />
      </Stack>
    )
  }

  const getMainValue = () => {
    if (general === 'earnings') {
      return `${numberFormat((data?.data as EarningsTotals).total_income)}`
    }
    return String((data?.data as OrdersTotals | ClientsTotals).amount ?? 0)
  }

  const getSuffix = () => {
    if (general === 'earnings') return currency
    return t('ta')
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width='100%' height='160px' variant='rounded' sx={{ borderRadius: '12px' }} />
      ) : (
        <Container borderColor={borderColor}>
          <Stack gap='12px'>
            <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
              <Stack gap='4px'>
                <Typography
                  variant='text'
                  fontSize='12px'
                  fontWeight='600'
                  textTransform='uppercase'
                  color='text.secondary'
                  letterSpacing='0.5px'
                >
                  {t(label)}
                </Typography>
                <Stack direction='row' alignItems='baseline' gap='4px'>
                  <Typography variant='title70' component='h4'>
                    {getMainValue()}
                  </Typography>
                  <Typography variant='text' fontSize='14px' color='text.secondary'>
                    {getSuffix()}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                sx={theme => ({
                  width: 40,
                  height: 40,
                })}
              >
                <Icon />
              </Stack>
            </Stack>
            {renderStats()}
          </Stack>
        </Container>
      )}
    </>
  )
}
