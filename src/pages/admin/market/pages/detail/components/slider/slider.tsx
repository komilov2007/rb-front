import { useState } from 'react'
import { VIDEO } from '@/constants/media'
import { Container, WrapperImg } from './style'
import { useTheme } from '@mui/material/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Mousewheel } from 'swiper/modules'
import { type RoboMarketAppDetaiProps } from '@/types/robo-market'

import 'swiper/css'
import 'swiper/css/thumbs'

export const Slider = (props: RoboMarketAppDetaiProps) => {
  const theme = useTheme()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <Container>
      <Swiper
        centeredSlides
        initialSlide={0}
        spaceBetween={20}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {props?.app_medias?.map((item, index) => {
          const isVideo = VIDEO.some(v => item.file.endsWith(`.${v}`))
          return (
            <SwiperSlide key={index}>
              <WrapperImg>
                {isVideo ? (
                  <video src={item.file} controls />
                ) : (
                  <img src={item.file} alt={props.name} />
                )}
              </WrapperImg>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {props.slug !== 'YANDEX_MARKET' && (
        <Swiper
          freeMode
          mousewheel
          initialSlide={0}
          modules={[Thumbs, Mousewheel]}
          watchSlidesProgress
          className='mini-swiper'
          //  @ts-ignore
          onSwiper={setThumbsSwiper}
          breakpoints={{
            [theme.breakpoints.values.xs]: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            [theme.breakpoints.values.sm]: {
              spaceBetween: 12,
              slidesPerView: 5,
            },
          }}
        >
          {props?.app_medias?.map((item, index) => {
            const isVideo = VIDEO.some(v => item.file.endsWith(`.${v}`))
            return (
              <SwiperSlide key={index}>
                <WrapperImg>
                  {isVideo ? <video src={item.file} /> : <img src={item.file} alt={props.name} />}
                </WrapperImg>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </Container>
  )
}
