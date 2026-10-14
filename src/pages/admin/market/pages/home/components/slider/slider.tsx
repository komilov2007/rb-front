import { useRef } from 'react'
import { Container } from './style'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import IconButton from '@mui/material/IconButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { getMarketSilderList } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconDirectionLeft01 } from '@/assets/icons/direction-left-01.svg'

import 'swiper/css'
import 'swiper/css/navigation'

export const Slider = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_SLIDER_LIST],
    queryFn: getMarketSilderList,
    select: res => {
      const data = Array.from({ length: 100 }, () => res.data).flat()
      return { ...res, data }
    },
  })

  const handlRedirect = (app: number) => () => {
    navigate(`${app}`)
  }

  return (
    <Container>
      {isLoading ? (
        <Stack
          gap='20px'
          display='grid'
          alignItems='center'
          gridTemplateColumns={{ xs: '0.1fr 0.8fr 0.1fr', md: '0.3fr 0.4fr 0.3fr' }}
        >
          <Skeleton
            width='100%'
            animation='wave'
            variant='rectangular'
            sx={{ borderRadius: '0 6px 6px 0', height: { xs: '126px', md: '226px' } }}
          />
          <Skeleton
            width='100%'
            animation='wave'
            variant='rectangular'
            sx={{ borderRadius: '6px', height: { xs: '168px', md: '268px' } }}
          />
          <Skeleton
            width='100%'
            animation='wave'
            variant='rectangular'
            sx={{ borderRadius: '6px 0 0 6px', height: { xs: '126px', md: '226px' } }}
          />
        </Stack>
      ) : (
        <>
          <IconButton
            ref={navigationPrevRef}
            className='swiper-b p-custom'
            sx={{ transform: 'rotate(180deg)' }}
          >
            <IconDirectionLeft01 />
          </IconButton>
          <IconButton ref={navigationNextRef} className='swiper-b n-custom'>
            <IconDirectionLeft01 />
          </IconButton>
          <Swiper
            loop
            speed={500}
            centeredSlides
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onBeforeInit={swiper => {
              //  @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current
              //  @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            breakpoints={{
              [theme.breakpoints.values.xs]: {
                spaceBetween: 10,
                slidesPerView: 1.2,
              },
              [theme.breakpoints.values.sm]: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
            }}
          >
            {data?.data.map(({ app, photo }, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={photo}
                  alt={photo}
                  onClick={handlRedirect(app)}
                  style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </Container>
  )
}
