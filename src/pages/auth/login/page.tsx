import { usePage } from './usePage'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import { Alert } from '@/components/alert'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { getTitle } from '@/constants/domain-themes'
import { AUTH_TABS, AUTH_TABS_LIST } from '@/constants/auth'
import { InputPhone } from '@/components/inputs/input-phone'
import { InputPassword } from '@/components/inputs/input-password'
import { HocGoogleVerfication } from '@/hocs/hoc-google-verification/hoc'
import { pastedPhone } from '@/utils/clipboard'

const Page = () => {
  const { t } = useTranslation()
  const { form, onSubmit, isLoading, isMultibank, onChangeTab } = usePage()

  return (
    <HocGoogleVerfication>
      {isMultibank ? (
        <Stack
          top='0'
          left='0'
          width='100vw'
          height='100vh'
          position='fixed'
          alignItems='center'
          justifyContent='center'
          bgcolor={theme => theme.palette.allColors.WHITE}
        >
          <Spinner />
        </Stack>
      ) : (
        <Box
          width='100%'
          display='flex'
          component='form'
          justifyContent='center'
          pb={{ xs: '30px', md: '0' }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Box width='100%' maxWidth='478px'>
            <Alert>
              <Typography variant='title20'>
                {t('if_you_have_any_questions_please_contact_support')}{' '}
                <Typography
                  component='a'
                  fontWeight='500'
                  variant='inherit'
                  href={`tel:${getTitle().linkPhone}`}
                  color={theme => theme.palette.allColors.BLACK30}
                >
                  {getTitle().phone}
                </Typography>
              </Typography>
            </Alert>
            <Typography mt='50px' variant='title' component='h1'>
              {t('welcome_back')}
            </Typography>
            <Tabs
              variant='fullWidth'
              aria-label='sign-up'
              onChange={onChangeTab}
              value={form.watch('tab')}
              sx={{ mt: { xs: '12px', md: '24px' } }}
            >
              {AUTH_TABS_LIST.map(({ value, label }) => (
                <Tab key={value} value={value} label={t(label)} />
              ))}
            </Tabs>
            <Stack width='100%' m='23px 0 14px' sx={{ gap: { xs: '15px', md: '25px' } }}>
              {form.watch('tab') === AUTH_TABS.phone.value && (
                <InputPhone
                  fullWidth
                  name='phone'
                  label='phone_number'
                  control={form.control}
                  autoComplete='username'
                  placeholder='enter_phone_number'
                  onPaste={async event => {
                    form.setValue('phone', await pastedPhone(event))
                  }}
                />
              )}
              {form.watch('tab') === AUTH_TABS.email.value && (
                <Input
                  fullWidth
                  name='email'
                  label='email_address'
                  control={form.control}
                  autoComplete='username'
                  placeholder='enter_email'
                />
              )}
              <InputPassword
                fullWidth
                name='password'
                label='password'
                control={form.control}
                placeholder='enter_password'
                onChange={e => {
                  const cleaned = e.target.value.replace(/\s/g, '')
                  form.setValue('password', cleaned, { shouldValidate: true })
                }}
              />
            </Stack>
            <Box display='flex' justifyContent='flex-end' sx={{ mb: { xs: '24px', md: '54px' } }}>
              <Link to={ROUTER.FORGOT_PASSWORD}>
                <Typography
                  variant='text'
                  component='span'
                  sx={theme => ({
                    fontWeight: 500,
                    textDecorationLine: 'underline',
                    color: theme.palette.allColors.PURPLE,
                  })}
                >
                  {t('forgot_your_password')}
                </Typography>
              </Link>
            </Box>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isLoading}
            >
              {t('sign_in')}
            </LoadingButton>
            <Typography mt='18px' variant='text' fontSize='16px' align='center' component='p'>
              {t('dont_have_an_account')}
              <Link to={ROUTER.SIGN_UP}>
                <Typography
                  ml='5px'
                  component='span'
                  variant='inherit'
                  sx={theme => ({
                    fontWeight: 500,
                    textDecorationLine: 'underline',
                    color: theme.palette.allColors.PURPLE,
                  })}
                >
                  {t('sign_up')}
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </HocGoogleVerfication>
  )
}

export default Page
