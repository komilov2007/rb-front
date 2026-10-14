import { WrapperMaps } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useOrderMap } from './useOrderMap'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { Expired } from '@/components/expired'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ImageSub2 from '@/assets/images/sub-2.webp'
import { Map, YMaps, Placemark } from 'react-yandex-maps'
import ImageBranch from '@/assets/images/branch.png'
import LinearProgress from '@mui/material/LinearProgress'
import { SelectBranchFilter } from '@/components/selects/select-branch-filter'

interface OrderMapProps {
  params: { from: string; to: string }
}

export const OrderMap = ({ params }: OrderMapProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const {
    data,
    branch,
    isLoading,
    hasAccess,
    loadingMap,
    handleLoad,
    isFetching,
    handleChangeBranch,
    handleChangeBranchClear,
    mapCenter,
  } = useOrderMap(params)

  return isLoading && !hasAccess ? (
    <Skeleton width='100%' height='100%' variant='rounded' sx={{ borderRadius: '12px' }} />
  ) : (
    <Stack flexGrow={1}>
      <Stack p='14px 18px' direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='title10' component='h2'>
          {t('order_map')}
        </Typography>
        <Stack direction='row' justifyContent='flex-end'>
          <SelectBranchFilter
            value={branch}
            disabled={hasAccess}
            onChange={handleChangeBranch}
            onClear={handleChangeBranchClear}
          />
        </Stack>
      </Stack>
      {hasAccess ? (
        <Expired
          title='Visualize_your_orders_on_the_map'
          description='Upgrade_to_Basic_or_Pro_to_track_your_order_locations'
          image={ImageSub2}
        />
      ) : (
        <Stack height='100%' flexGrow={1}>
          <Box mt='8px' width='100%' height={{ xs: '100%', md: '518px' }} position='relative'>
            {loadingMap && (
              <Stack top='0' left='0' width='100%' height='100%' position='absolute'>
                <Skeleton
                  width='100%'
                  height='100%'
                  variant='rounded'
                  sx={{ borderRadius: '0 0 12px 12px' }}
                />
              </Stack>
            )}
            {isFetching && (
              <Stack width='100%' sx={{ top: 0, left: 0, zIndex: 3, position: 'absolute' }}>
                <LinearProgress sx={{ height: '2px' }} />
              </Stack>
            )}
            <WrapperMaps>
              <YMaps
                query={{
                  coordorder: 'latlong',
                  load: 'Map,Placemark,control.ZoomControl,geoObject.addon.balloon',
                }}
              >
                <Map
                  state={{
                    zoom: 10,
                    title: '',
                    controls: ['zoomControl'],
                    center: [mapCenter[0], mapCenter[1]],
                    behaviors: ['disable("scrollZoom")', 'drag', 'dblClickZoom'],
                  }}
                  modules={['geocode', 'SuggestView', 'templateLayoutFactory']}
                  defaultOptions={{ suppressMapOpenBlock: true }}
                  onLoad={handleLoad}
                >
                  {data?.data.orders.map(({ latitude, longitude }, i: number) => (
                    <Placemark
                      key={i}
                      geometry={[latitude, longitude]}
                      options={{
                        iconColor: theme.palette.allColors.PURPLE,
                      }}
                    />
                  ))}
                  {data?.data.branches.map(({ latitude, longitude }, i: number) => (
                    <Placemark
                      key={i}
                      geometry={[latitude, longitude]}
                      options={{
                        iconImageSize: [40, 40],
                        iconLayout: 'default#image',
                        iconImageHref: ImageBranch,
                      }}
                    />
                  ))}
                </Map>
              </YMaps>
            </WrapperMaps>
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
