import { Wrapper } from './style'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router-dom'
import { Slider } from './components/slider'
import Skeleton from '@mui/material/Skeleton'
import { Reviews } from './components/reviews'
import { useQuery } from '@tanstack/react-query'
import { type ParamProps } from '@/types/params'
import Typography from '@mui/material/Typography'
import { Application } from './components/application'
import { getAppDetail } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

const Page = () => {
  const { roboMarketAppId } = useParams<ParamProps>()
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_APP_DETAIL, roboMarketAppId],
    queryFn: async () => await getAppDetail(String(roboMarketAppId)),
  })

  return (
    <Stack
      gap='18px'
      width='100%'
      flexGrow={1}
      height='100%'
      className='transparent'
      direction={{ xs: 'column', md: 'row' }}
      overflow={{ xs: 'auto', md: 'hidden' }}
    >
      {isLoading ? (
        <>
          <Wrapper sx={{ maxWidth: { xs: '100%', md: '343px' } }}>
            <Skeleton width='100%' height='100%' variant='rounded' />
          </Wrapper>
          <Wrapper>
            <Skeleton width='100%' height='100%' variant='rounded' />
          </Wrapper>
        </>
      ) : (
        <>
          <Wrapper
            sx={{ minWidth: { xs: '100%', md: '25%' }, maxWidth: { xs: '100%', md: '343px' } }}
          >
            <Stack p='20px'>
              <Stack mb='12px' gap='11px' direction='row'>
                <img
                  src={data?.data.icon}
                  alt={data?.data.name}
                  style={{ width: '58px', height: '58px', borderRadius: '4px' }}
                />
                <Stack gap='4px'>
                  <Typography variant='text140' component='h4'>
                    {data?.data.name}
                  </Typography>
                  <Stack gap='5px' direction='row' alignItems='center'>
                    <Rating max={1} precision={0.1} value={Number(data?.data.rate) / 5} />
                    <Typography variant='text140' component='h5'>
                      {data?.data.rate}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              {data?.data && <Application {...data?.data} />}
            </Stack>
            <Divider />
            <Reviews />
          </Wrapper>
          <Wrapper sx={{ p: '20px 24px', maxWidth: { xs: '100%', md: 'calc(75% - 24px)' } }}>
            <Stack width='100%' sx={{ overflowY: 'auto' }}>
              <Typography mb='14px' variant='title20' component='h2' fontWeight={500}>
                {data?.data.name}
              </Typography>
              {data?.data?.app_medias && data?.data?.app_medias.length > 0 && (
                <Slider {...data?.data} />
              )}
              <Typography variant='title40' component='p'>
                <div
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{ __html: data?.data.desc as string }}
                />
              </Typography>
            </Stack>
          </Wrapper>
        </>
      )}
    </Stack>
  )
}

export default Page
