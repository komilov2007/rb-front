import { Hoc } from './hoc'
import { Form } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { Trans, useTranslation } from 'react-i18next'
import { InputOtp } from '@/components/inputs/input-otp'
import { VerifyResend } from '@/pages/auth/verification/verify-resend'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { ReactComponent as IconVerification } from '@/assets/icons/verification.svg'

const Page = () => {
  const { t } = useTranslation()
  const { form, info, verify, onSubmit, onComplete, isForgotPassword } = usePage()

  return (
    <Hoc>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display='flex' alignItems='center'>
          <IconVerification />
        </Box>
        <Typography
          align='center'
          variant='title'
          component='h1'
          sx={{ m: { xs: '10px 0', md: '56px 0 11px' } }}
        >
          {t('verification_code')}
        </Typography>
        <Typography
          align='center'
          variant='title20'
          lineHeight='26px'
          color={theme => theme.palette.allColors.GRAY100}
        >
          <Trans
            i18nKey='the_verification_code_has_been_sent_to_your_please_enter_code_below'
            values={{ value: info?.email ?? info?.phone }}
            components={{
              linkTag: <Typography variant='title20' component='span' />,
            }}
          />
        </Typography>
        <Box m='' sx={{ m: { xs: '20px 0', md: '33px 0 41px' } }}>
          <InputOtp name='code' control={form.control} onComplete={onComplete} />
        </Box>
        <VerifyResend />
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={verify.isLoading}
        >
          {t('verify')}
        </LoadingButton>
        <Box mt='10px' display='flex' justifyContent='center'>
          <Button
            size='small'
            component={Link}
            variant='text-gray'
            startIcon={<IconArrowLeft />}
            to={isForgotPassword ? ROUTER.FORGOT_PASSWORD : ROUTER.SIGN_UP}
          >
            {t('back')}
          </Button>
        </Box>
      </Form>
    </Hoc>
  )
}

export default Page
