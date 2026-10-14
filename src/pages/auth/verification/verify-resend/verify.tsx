import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { useTimer } from '@/hooks/useTimer'
import { type LocationProps } from '../type'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { signUpResendVerificationCode } from '@/apis/auth/sign-up'
import { ReactComponent as IconRedo } from '@/assets/icons/redo.svg'

export const VerifyResend = () => {
  const { t } = useTranslation()
  const values: LocationProps = JSON.parse(localStorage.getItem('verification') as string)
  const username = values?.phone ? { phone: values?.phone } : { email: values?.email }
  const { timerData, isTimeInSeconds } = useTimer({
    minute: 1,
    time: values?.time,
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await signUpResendVerificationCode(username),
    onSuccess: () => {
      const verification = { ...values, time: dayjs().format() }
      localStorage.setItem('verification', JSON.stringify(verification))
    },
  })

  const handleResend = () => {
    mutate()
  }

  return (
    <>
      {isTimeInSeconds ? (
        <Typography variant='text' color={theme => theme.palette.allColors.BLACK30}>
          {timerData}
        </Typography>
      ) : null}
      <Box
        gap='1px'
        display='flex'
        m='11px 0 23px'
        alignItems='center'
        justifyContent='center'
        sx={theme => ({
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        })}
      >
        <Typography variant='text' fontSize='16px'>
          {t('i_didnt_receive_a_code')}
        </Typography>
        <LoadingButton
          variant='text'
          loading={isLoading}
          onClick={handleResend}
          disabled={isTimeInSeconds}
          startIcon={isLoading ? null : <IconRedo />}
          sx={theme => ({
            svg: {
              path: {
                stroke: isTimeInSeconds ? theme.palette.action.disabled : undefined,
              },
            },
          })}
        >
          {t('resend')}
        </LoadingButton>
      </Box>
    </>
  )
}
