import Stack from '@mui/material/Stack'
import { PLATFORMS } from './constants'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { getPlatform } from '@/apis/admin/dashboard'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { FormClickSuperApp } from '@/components/forms/click-super-app'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { ROUTER } from '@/constants/router'
import { YandexMarket } from '@/components/forms/yandex-market'
import { UzumMarket } from '@/components/forms/uzum-market'
import { PlatformApplicationDrawer } from './platform-drawer'

interface OrderStatisticsProps {
  params: { from: string; to: string }
}

export const OrderStatistics = ({ params }: OrderStatisticsProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    keepPreviousData: true,
    queryFn: async () => await getPlatform(params),
    queryKey: [REACT_QUERY_KEYS.DASHBOARD_PLATFORMS, params, params.from, params.to],
  })
  const { slug, links } = useProfileStore(state => ({
    slug: state.me?.slug,
    links: state.me?.links,
  }))

  return isLoading ? (
    <Skeleton width='100%' height='100%' variant='rounded' sx={{ borderRadius: '12px' }} />
  ) : (
    <Stack p='14px 18px'>
      <Stack
        gap='5px'
        pb='17px'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={theme => ({ borderBottom: `1px solid ${theme.palette.allColors.GRAY340}` })}
      >
        <Typography variant='title10' component='h2'>
          {t('order_statistics')}
        </Typography>
      </Stack>
      <Stack mb='34px' mt='13px' gap='22px'>
        <Typography variant='title80' component='h5'>
          {data?.data.total}
          <Typography ml='6px' variant='title20' component='span'>
            {t('orders_count')}
          </Typography>
        </Typography>
        <Stack gap='22px' component='ul'>
          {PLATFORMS.map(({ Icon, href, text, link, label, color, bgcolor, platform }) => (
            <Stack
              gap='13px'
              key={platform}
              target='_blank'
              direction='row'
              to={link && links ? links[link] : ''}
              component={link && links ? Link : 'li'}
            >
              <Stack justifyContent='center'>
                <Icon />
              </Stack>
              <Stack gap='6px' flexGrow={1}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography
                    component='h6'
                    variant='title20'
                    color={theme => theme.palette.allColors.BLACK90}
                  >
                    {t(label)}
                  </Typography>
                  {slug ? (
                    <Typography
                      variant='title20'
                      color={theme => theme.palette.colors['L-GRAY30-D-GRAY20']}
                    >
                      {data?.data[platform] ?? 0}
                    </Typography>
                  ) : platform === 'CLICK' ? (
                    <PlatformApplicationDrawer appName='Click' buttonLabel='submit_an_application'>
                      <FormClickSuperApp onClose={() => {}} is_application />
                    </PlatformApplicationDrawer>
                  ) : platform === 'UZUM' ? (
                    <PlatformApplicationDrawer appName='Uzum' buttonLabel='submit_an_application'>
                      <UzumMarket onClose={() => {}} />
                    </PlatformApplicationDrawer>
                  ) : platform === 'YANDEX' ? (
                    <PlatformApplicationDrawer appName='Yandex' buttonLabel='submit_an_application'>
                      <YandexMarket onClose={() => {}} />
                    </PlatformApplicationDrawer>
                  ) : link && links?.[link] ? (
                    <Typography
                      variant='title20'
                      color={theme => theme.palette.colors['L-GRAY30-D-GRAY20']}
                    >
                      {data?.data[platform] ?? 0}
                    </Typography>
                  ) : (
                    <Button
                      size='extraSmall'
                      component={Link}
                      to={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${href}`}
                    >
                      {t(text as string)}
                    </Button>
                  )}
                </Stack>
                <Stack>
                  <LinearProgress
                    variant='determinate'
                    value={
                      isNaN((Number(data?.data[platform]) * 100) / Number(data?.data.total))
                        ? 0
                        : (Number(data?.data[platform]) * 100) / Number(data?.data.total)
                    }
                    sx={theme => ({
                      [`.${linearProgressClasses.bar1Determinate}`]: {
                        background: theme.palette.allColors[color],
                      },
                      [`&.${linearProgressClasses.root}`]: {
                        background: theme.palette.allColors[bgcolor],
                      },
                    })}
                  />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
