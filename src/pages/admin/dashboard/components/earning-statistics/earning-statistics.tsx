import Chart from 'react-apexcharts'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getEarningGraph } from '@/apis/admin/dashboard'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface EarningStatisticsProps {
  params: { from: string; to: string }
}

export const EarningStatistics = ({ params }: EarningStatisticsProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    keepPreviousData: true,
    queryFn: async () => await getEarningGraph(params),
    queryKey: [REACT_QUERY_KEYS.DASHBOARD_EARNING_GRAPH, params.from, params.to, params],
  })

  return isLoading ? (
    <Skeleton width='100%' height='100%' variant='rounded' sx={{ borderRadius: '12px' }} />
  ) : (
    <Stack p='14px 18px'>
      <Stack gap='5px' direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='title10' component='h2'>
          {t('earning_statistics')}
        </Typography>
      </Stack>
      <Stack>
        <Chart
          height='330'
          options={{
            chart: {
              type: 'area',
              height: 330,
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'straight',
            },
            labels: [],
            xaxis: {
              categories: Object.keys(data?.data ?? {}),
            },
            colors: [theme.palette.allColors.PURPLE10],
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: [
                  theme.palette.allColors.PURPLE210,
                  theme.palette.allColors.PURPLE220,
                ],
              },
            },
          }}
          type='area'
          series={[
            {
              name: t('earning'),
              data: Object.values(data?.data ?? {}),
            },
          ]}
        />
      </Stack>
    </Stack>
  )
}
