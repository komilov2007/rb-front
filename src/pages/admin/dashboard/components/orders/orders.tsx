import Chart from 'react-apexcharts'
import Stack from '@mui/material/Stack'
import { useOrders } from './useOrders'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { Expired } from '@/components/expired'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ImageSub1 from '@/assets/images/sub-1.webp'
import useMediaQuery from '@mui/material/useMediaQuery'

interface OrdersProps {
  params: { from: string; to: string }
}

export const Orders = ({ params }: OrdersProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { data, isLoading, hasAccess } = useOrders(params)

  return isLoading && !hasAccess ? (
    <Skeleton width='100%' height='100%' variant='rounded' sx={{ borderRadius: '12px' }} />
  ) : (
    <Stack flexGrow={1} p='14px 18px'>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='title10' component='h2'>
          {t('orders')}
        </Typography>
      </Stack>
      {hasAccess ? (
        <Expired
          title='Know_when_your_customers_order_most'
          description='Track_peak_order_times_and_optimize_your_strategy'
          image={ImageSub1}
        />
      ) : (
        <Stack>
          <Chart
            type='bar'
            height='350'
            series={data.series.map(s => ({ ...s, name: t(s.name) }))}
            options={{
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  show: false,
                },
              },
              colors: [
                theme.palette.allColors.GREEN,
                theme.palette.allColors.RED,
                theme.palette.allColors.PURPLE10,
              ],
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  borderRadius: 3,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                width: 2,
                show: true,
                colors: ['transparent'],
              },
              xaxis: {
                categories: Object.keys(data.data),
                labels: {
                  style: {
                    fontSize: matches ? '8px' : '13px',
                    colors: theme.palette.allColors.GRAY350,
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: matches ? '8px' : '13px',
                    colors: theme.palette.allColors.GRAY350,
                  },
                },
              },
              fill: {
                opacity: 1,
              },
              legend: {
                position: 'top',
                fontSize: matches ? '8px' : '13px',
                markers: {
                  shape: 'circle',
                },
                itemMargin: {
                  horizontal: 60,
                },
              },
            }}
          />
        </Stack>
      )}
    </Stack>
  )
}
