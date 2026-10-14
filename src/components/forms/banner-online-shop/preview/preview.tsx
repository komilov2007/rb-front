import Box from '@mui/material/Box'
import Grow from '@mui/material/Grow'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import type { BannerProps } from '@/types/banners'
import ImageBanner from '@/assets/images/banner-image2.svg'
import { ReactComponent as IconIphone } from '@/assets/icons/iphone.svg'
import CateogryImageBanner from '@/assets/images/banner-category-image.svg'
import { Container, WrapMobile, WrapFrontCamera, WrapMobileContent } from './style'
import { ReactComponent as IconIphoneHeader } from '@/assets/icons/iphone-header.svg'
import { VIDEO } from '@/constants/media'

const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL

const isVideo = (src?: string) => VIDEO.some(ext => src?.endsWith(`.${ext}`))

interface PreviewBannerProps {
  img?: string
  btnName?: string
  variant: BannerProps
}

export const PreviewBanner = ({ img, variant = 'MAIN', btnName }: PreviewBannerProps) => {
  const { t } = useTranslation()
  const [showFirst, setShowFirst] = useState(true)
  const { logo, name } = useProfileStore(state => ({
    logo: state.me?.logo,
    name: state.me?.name,
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev)
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const TRANS_MS = 600

  return (
    <Container>
      <Typography variant='title160'>{t('Ko’rinish')}</Typography>
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <WrapMobile>
          <IconIphone />
          <WrapFrontCamera>
            <IconIphoneHeader />
          </WrapFrontCamera>
          <WrapMobileContent>
            {img ? (
              variant === 'MAIN' ? (
                <Box
                  sx={{ position: 'relative', width: '180px', height: '390px', overflow: 'hidden' }}
                >
                  <Grow in={showFirst} timeout={TRANS_MS} mountOnEnter unmountOnExit>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                      }}
                    >
                      <Stack
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                        }}
                      >
                        {isVideo(img) ? (
                          <video
                            src={mediaBaseURL + img}
                            autoPlay
                            loop
                            muted
                            style={{
                              objectFit: 'cover',
                              position: 'absolute',
                              width: '100%',
                              height: 185,
                              top: 0,
                            }}
                          />
                        ) : (
                          <img
                            src={mediaBaseURL + img}
                            height={185}
                            style={{
                              objectFit: 'cover',
                              position: 'absolute',
                              width: '100%',
                              top: 0,
                            }}
                            alt='preview-top'
                          />
                        )}
                        <img
                          src={ImageBanner}
                          height={390}
                          style={{ objectFit: 'cover' }}
                          alt='frame'
                        />
                      </Stack>
                    </Box>
                  </Grow>

                  <Grow in={!showFirst} timeout={TRANS_MS} mountOnEnter unmountOnExit>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                      }}
                    >
                      {isVideo(img) ? (
                        <Box
                          component='video'
                          src={mediaBaseURL + img}
                          autoPlay
                          loop
                          muted
                          sx={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <Box
                          component='img'
                          src={mediaBaseURL + img}
                          alt='preview-full'
                          sx={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      )}
                      {logo && (
                        <Box>
                          <Avatar
                            sx={{
                              position: 'absolute',
                              top: '30px',
                              left: '10px',
                              width: 18,
                              height: 18,
                            }}
                            alt='Remy Sharp'
                            src={logo}
                          />
                          <Typography
                            fontSize={10}
                            sx={{
                              position: 'absolute',
                              top: '32px',
                              left: '32px',
                            }}
                          >
                            {name}
                          </Typography>
                        </Box>
                      )}
                      <Box
                        sx={{
                          maxWidth: '120px',
                          backgroundColor: 'white',
                          borderRadius: '10px',
                          position: 'absolute',
                          bottom: '12px',
                          padding: '2px 8px',
                          filter: (btnName?.length || 0) > 0 ? '' : 'blur(3px)',
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          fontSize={12}
                          fontWeight={500}
                          color='primary'
                        >
                          {(btnName?.length || 0) > 0 ? btnName : 'Buy now!'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grow>
                </Box>
              ) : (
                <Stack
                  sx={{ position: 'relative', width: '180px', height: '390px', overflow: 'hidden' }}
                >
                  {isVideo(img) ? (
                    <video
                      src={mediaBaseURL + img}
                      autoPlay
                      loop
                      muted
                      style={{
                        objectFit: 'cover',
                        borderRadius: '10px',
                        position: 'absolute',
                        width: '170px',
                        height: 64,
                        top: '124px',
                        left: 5,
                        right: 5,
                        boxShadow:
                          'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                      }}
                    />
                  ) : (
                    <img
                      src={mediaBaseURL + img}
                      height={64}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '10px',
                        position: 'absolute',
                        width: '170px',
                        top: '124px',
                        left: 5,
                        right: 5,
                        boxShadow:
                          'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                      }}
                    />
                  )}
                  <img
                    src={CateogryImageBanner}
                    height={390}
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Stack>
              )
            ) : (
              <Stack
                sx={{
                  width: '180px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography fontSize={13} textAlign='center'>
                  {t('banner_preview_placeholder')}
                </Typography>
              </Stack>
            )}
          </WrapMobileContent>
        </WrapMobile>
      </Stack>
    </Container>
  )
}
