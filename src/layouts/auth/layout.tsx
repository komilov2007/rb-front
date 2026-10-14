import { Hoc } from './hoc'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Logo } from '@/components/logo'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { Suspense } from '@/components/suspense'
import Typography from '@mui/material/Typography'
import { Outlet, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import VideoRobosell from '@/assets/videos/robosell.mp4'
import VideoRobosellWebm from '@/assets/videos/robosell.webm'
import { Subcription } from '@/components/modals/subcription'
import VideoMobileRobosell from '@/assets/videos/mobile-robosell.mp4'
import VideoMobileRobosellWebm from '@/assets/videos/mobile-robosell.webm'
import { Left, Right, WrapLeft, Container, WrapHeader } from './style'
import { ReactComponent as IconRocket } from '@/assets/icons/rocket.svg'
import { getAuthLayoutContent, HOSTNAME } from '@/constants/domain-themes'
import { SelectI18nLanguage } from '@/components/selects/select-i18n-language/select'

const Layout = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { title, description, IconLogoSolid } = getAuthLayoutContent()
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  const isRobosell =
    HOSTNAME === 'localhost' || HOSTNAME === 'robosell.uz' || HOSTNAME === 'dev.robosell.uz'

  return (
    <>
      <Hoc>
        <Container>
          <WrapLeft>
            <Left>
              <Suspense>
                <WrapHeader>
                  <Logo variant='admin' to={ROUTER.AUTH} />
                  <SelectI18nLanguage variant='select' />
                </WrapHeader>
                <Outlet />
              </Suspense>
            </Left>
          </WrapLeft>
          {isRobosell ? (
            <Right sx={{ display: { xs: pathname === ROUTER.AUTH ? 'flex' : 'none', md: 'flex' } }}>
              <Box ml={{ md: '72px', xs: '20px' }} width='100%' maxWidth='438px'>
                <Typography
                  component='div'
                  variant='text170'
                  m={{ md: '50px 0 18px', xs: '10px 0' }}
                >
                  <Box gap='10px' display='flex' alignItems='center'>
                    <Typography variant='inherit' component='span'>
                      {t('the_simplest_way_to_manage_your_business')}
                    </Typography>
                    <Box
                      display='flex'
                      alignItems='center'
                      sx={{
                        svg: {
                          width: { md: '40px', xs: '20px' },
                          height: { md: '40px', xs: '20px' },
                        },
                      }}
                    >
                      <IconRocket />
                    </Box>
                  </Box>
                </Typography>
                <Typography variant='text180'>
                  {t(
                    'streamline_organize_and_optimize_unleashing_the_power_of_product_information_management',
                  )}
                </Typography>
              </Box>
              <Stack
                mb='20px'
                alignSelf='center'
                alignItems='center'
                justifyContent='center'
                sx={{
                  width: { md: '45vw', xs: '90vw' },
                }}
              >
                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  preload='auto'
                  style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                >
                  {isSafari ? (
                    <source src={isMobile ? VideoMobileRobosell : VideoRobosell} type='video/mp4' />
                  ) : (
                    <source
                      src={isMobile ? VideoMobileRobosellWebm : VideoRobosellWebm}
                      type='video/webm'
                    />
                  )}
                </video>
              </Stack>
            </Right>
          ) : (
            <Stack
              flexGrow={1}
              alignItems='center'
              justifyContent='center'
              sx={theme => ({
                display: { xs: 'none', md: 'flex' },
                backgroundColor: theme.palette.allColors.PURPLE,
              })}
            >
              <Stack alignItems='center' justifyContent='center'>
                <IconLogoSolid />
              </Stack>
              <Stack mt='-50px' gap='10px' alignItems='center' justifyContent='center'>
                <Typography variant='text170' textAlign='center' maxWidth='30vw'>
                  {t(title)}
                </Typography>
                <Typography variant='text180' textAlign='center'>
                  {t(description)}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Container>
      </Hoc>
      <Subcription variant='dialog' />
    </>
  )
}

export default Layout
