import { CardLink } from './style'
import Stack from '@mui/material/Stack'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useSignUpStore } from '@/store/sign-up'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { HOSTNAME } from '@/constants/domain-themes'
import { SING_UP_CREATE_STEPS } from '@/constants/sign-up'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { ReactComponent as IconCheckCircleGreen } from '@/assets/icons/check-circle-green.svg'

export const PreDashboard = () => {
  const { t } = useTranslation()
  const setStep = useSignUpStore(state => state.setStep)
  const { platforms, preDashboard } = useProfileStore(state => ({
    platforms: state.me?.platforms,
    preDashboard: state.preDashboard,
  }))
  const { bot, website, is_finished, ...rest } = preDashboard
  const AllRestValues = Object.values(rest).every(v => v)

  const handleStep = (step: number) => () => {
    setStep(step)
    sessionStorage.setItem('step', JSON.stringify(step))
  }

  if (
    is_finished ||
    (platforms && platforms[0] === 'WEBSITE' && website && AllRestValues) ||
    (platforms && platforms[0] === 'TELEGRAM' && bot && AllRestValues)
  ) {
    return null
  }

  return (
    <Stack gap={{ xs: '10px', md: '20px' }}>
      <Stack width='100%' maxWidth={{ xs: '100%', md: '524px' }}>
        <Typography mb='6px' variant='title30'>
          {t('start_your_online_business_now')}
        </Typography>
        <Typography variant='title20' color={theme => theme.palette.allColors.BLACK130}>
          {t(
            'there_are_only_a_few_steps_left_to_launch_your_online_business_complete_the_setup_and_start_receiving_your_first_orders',
          )}
        </Typography>
      </Stack>
      <Stack
        mt={{ xs: '10px', md: '20px' }}
        gap={{ xs: '10px', md: '20px' }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <Stack component='ul' gap={{ xs: '6px', md: '12px' }}>
          {SING_UP_CREATE_STEPS.map(({ Icon, ...s }, i: number) => {
            if (s.id === 'preview') {
              return null
            }
            if (
              (s.id === 'bot' && !platforms?.includes('TELEGRAM')) ||
              (s.id === 'website' && !platforms?.includes('WEBSITE'))
            ) {
              return null
            }
            const isActive = preDashboard[s.id] ?? false
            const PLATFORM =
              platforms && platforms[0] === 'WEBSITE' ? ROUTER.CREATE_WEBSITE : ROUTER.CREATE_BOT

            return (
              <Stack key={i} component='li' onClick={handleStep(s.step)}>
                <CardLink to={`${ROUTER.SIGN_UP}${PLATFORM}${s.href}`} isActive={isActive}>
                  <Stack gap='12px' direction='row'>
                    <Stack className='icon-step'>
                      <Icon />
                    </Stack>
                    <Stack gap='4px'>
                      <Typography variant='title20'>
                        {t(s.title === 'create_bot' ? 'connect_your_telegram_bot' : s.title)}
                      </Typography>
                      <Typography variant='text240'>{t(s.desciption)}</Typography>
                    </Stack>
                  </Stack>
                  {isActive ? (
                    <Stack justifyContent='center'>
                      <IconCheckCircleGreen />
                    </Stack>
                  ) : (
                    <Stack justifyContent='center' className='icon-arrow'>
                      <IconDirectionDown />
                    </Stack>
                  )}
                </CardLink>
              </Stack>
            )
          })}
        </Stack>
        <Stack
          width='100%'
          flexGrow={1}
          sx={{ iframe: { borderRadius: '12px', minHeight: { xs: '250px', md: 'unset' } } }}
        >
          <iframe
            frameBorder='0'
            title='YouTube video player'
            referrerPolicy='strict-origin-when-cross-origin'
            src={
              HOSTNAME.includes('bitomarket.uz') || HOSTNAME.includes('bito.market')
                ? 'https://www.youtube.com/embed/xtaGLj_pK4Y?si=UjOMUPd26YzCZkfL'
                : 'https://www.youtube.com/embed/IBW5hk8NoFI?si=UDxYAXqTxTFTdZE3'
            }
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
