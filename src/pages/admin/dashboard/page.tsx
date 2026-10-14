import dayjs from 'dayjs'
import { Wrapper } from './style'
import Stack from '@mui/material/Stack'
import { Totals } from './components/totals'
import { Orders } from './components/orders'
import { useSearchParams } from 'react-router-dom'
import { OrderMap } from './components/order-map'
import { TopProducts } from './components/top-products'
import { TopCustomers } from './components/top-customers'
import { PreDashboard } from './components/pre-dashboard'
import { TrafficSource } from './components/traffic-source'
import { OrderStatistics } from './components/order-statistics'
import { EarningStatistics } from './components/earning-statistics'
import { DateRangeFilter } from './components/date-range-filter'

const DEFAULT_FROM = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
const DEFAULT_TO = dayjs().format('YYYY-MM-DD')

const Page = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const from = searchParams.get('from') ?? DEFAULT_FROM
  const to = searchParams.get('to') ?? DEFAULT_TO
  const period = searchParams.get('period') ?? 'weekly'

  const handleApply = (newFrom: string, newTo: string, newPeriod: string) => {
    setSearchParams({ from: newFrom, to: newTo, period: newPeriod })
  }

  const params = { from, to }

  return (
    <Stack gap='20px' p='20px'>
      <DateRangeFilter from={from} to={to} period={period} onApply={handleApply} />
      <Stack
        width='100%'
        height='100%'
        className='scrollPageLayout'
        gap={{ xs: '10px', md: '20px' }}
      >
        <Stack
          display='grid'
          justifyContent='space-between'
          gap={{ xs: '10px', md: '20px' }}
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }}
        >
          <Totals general='earnings' params={params} />
          <Totals general='orders' params={params} />
          <Totals general='clients' params={params} />
        </Stack>
        <PreDashboard />
        <Stack
          display='grid'
          gap={{ xs: '10px', md: '20px' }}
          minHeight={{ xs: ' unset', md: '350px' }}
          gridTemplateColumns={{ xs: '1fr', md: '6fr 4fr' }}
        >
          <Wrapper sx={{ minHeight: { xs: '400px', md: '100%' } }}>
            <EarningStatistics params={params} />
          </Wrapper>
          <Wrapper>
            <OrderStatistics params={params} />
          </Wrapper>
        </Stack>
        <Stack
          display='grid'
          gap={{ xs: '10px', md: '20px' }}
          minHeight={{ xs: ' unset', md: '350px' }}
          gridTemplateColumns={{ xs: '1fr', md: '4fr 6fr' }}
        >
          <Wrapper>
            <TrafficSource params={params} />
          </Wrapper>
          <Wrapper>
            <TopProducts params={params} />
          </Wrapper>
        </Stack>
        <Stack
          display='grid'
          gap={{ xs: '10px', md: '20px' }}
          minHeight={{ xs: '400px', md: '590px' }}
        >
          <Wrapper>
            <OrderMap params={params} />
          </Wrapper>
        </Stack>
        <Stack display='grid' gap={{ xs: '10px', md: '20px' }} minHeight='420px'>
          <Wrapper>
            <Orders params={params} />
          </Wrapper>
        </Stack>
        <Wrapper
          sx={{
            minHeight: '320px',
          }}
        >
          <TopCustomers params={params} />
        </Wrapper>
      </Stack>
    </Stack>
  )
}

export default Page
