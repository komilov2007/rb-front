import { WrapEmpty } from './style'
import Chart from 'react-apexcharts'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import { ROUTER } from '@/constants/router'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getTrafficSource } from '@/apis/admin/dashboard'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useProfileStore } from '@/store/profile'
import { Expired } from '@/components/expired'
import ImageSub4 from '@/assets/images/sub-4.png'

interface TrafficSourceProps {
  params: { from: string; to: string }
}

export const TrafficSource = ({ params }: TrafficSourceProps) => {
  const { t } = useTranslation()

  const { is_free, is_basic, is_expired } = useProfileStore(state => ({
    is_free: state.me?.subscription.is_free,
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const { data, isLoading } = useQuery({
    enabled: !hasAccess,
    keepPreviousData: true,
    queryFn: async () => await getTrafficSource(params),
    queryKey: [REACT_QUERY_KEYS.DASHBOARD_TRAFFIC_SOURCE, params, params.from, params.to],
    select: res => {
      const rawSources = res.data.sources.map(s => ({
        name: s.name,
        rawPercentage: Number(s.percentage) || 0,
      }))

      const includeDirect = Number(res.data.direct) > 0
      const directSource = includeDirect
        ? { name: t('direct_transitions'), rawPercentage: Number(res.data.direct) }
        : null

      const allSources = (directSource ? [directSource] : []).concat(
        rawSources.filter(s => s.rawPercentage > 0),
      )

      const totalRaw = allSources.reduce((acc, s) => acc + Math.max(0, s.rawPercentage), 0)

      const isEmpty = totalRaw === 0

      const normalizedSources = allSources.map(s => {
        const safeRaw = Math.max(0, s.rawPercentage)
        const percentage = isEmpty ? 0 : (safeRaw / totalRaw) * 100
        return {
          name: s.name,
          raw: safeRaw,
          percentage,
        }
      })

      return {
        ...res,
        data: {
          ...res.data,
          isEmpty,
          totalRaw,
          sources: normalizedSources,
        },
      }
    },
  })

  return (
    <Stack p='14px 18px'>
      <Stack
        gap='5px'
        pb='17px'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={theme => ({ borderBottom: `1px solid ${theme.palette.allColors.GRAY340}` })}
      >
        <Typography
          component={Link}
          variant='title10'
          to={`${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.MARKETING_SOURCES}`}
        >
          {t('traffic_source')}
        </Typography>
      </Stack>

      {hasAccess ? (
        <Expired
          title='Find_out_where_your_customers_are_coming_from'
          description='traffic_source_description'
          image={ImageSub4}
        />
      ) : isLoading ? (
        <Skeleton width='100%' height='100%' variant='rounded' sx={{ borderRadius: '12px' }} />
      ) : (
        <Stack mt='13px'>
          <Typography variant='title80' component='h5'>
            {data?.data.total}
            <Typography ml='6px' variant='title20' component='span'>
              {t('users')}
            </Typography>
          </Typography>
          <Stack position='relative' alignItems='center'>
            {data?.data.isEmpty && data.data.direct === 0 && <WrapEmpty />}
            <Chart
              height='200'
              options={{
                chart: { type: 'pie' },
                dataLabels: { enabled: false },
                labels: data?.data.sources.map(s => s.name) || [],
                legend: {
                  width: 170,
                  position: 'left',
                  formatter: function (
                    seriesName: string,
                    opts: { seriesIndex: number; w?: { config?: { series?: number[] } } },
                  ) {
                    const idx = opts.seriesIndex
                    const value = opts.w?.config?.series?.[idx]
                    const pct = typeof value === 'number' ? value : 0

                    return `${seriesName} — ${pct.toFixed(1)}%`
                  },
                },
                tooltip: {
                  y: {
                    formatter: function (val: number) {
                      return `${val.toFixed(1)}%`
                    },
                  },
                },
              }}
              type='pie'
              series={data?.data.sources.map(s => s.percentage) || []}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
