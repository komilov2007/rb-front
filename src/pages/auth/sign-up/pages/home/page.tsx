import { usePage } from './usePage'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { Link } from 'react-router-dom'
import { Tabs, WrapInputs } from './style'
import { Alert } from '@/components/alert'
import { ROUTER } from '@/constants/router'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { useGoogleTag } from '@/hooks/useGoogleTag'
import { Trans, useTranslation } from 'react-i18next'
import { InputPhone } from '@/components/inputs/input-phone'
import { AUTH_TABS, AUTH_TABS_LIST } from '@/constants/auth'
import { InputPassword } from '@/components/inputs/input-password'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { HocGoogleVerfication } from '@/hocs/hoc-google-verification/hoc'
import { pastedPhone } from '@/utils/clipboard'

const Page = () => {
  useGoogleTag()
  const { t } = useTranslation()
  const { form, onSubmit, isLoading, onChangeTab } = usePage()

  return (
    <HocGoogleVerfication>
      <FormProvider {...form}>
        <Box
          width='100%'
          display='flex'
          component='form'
          justifyContent='center'
          pb={{ xs: '50px', md: '0' }}
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
                  href='tel:+998781138212'
                  color={theme => theme.palette.allColors.BLACK30}
                >
                  +998(78) 113 82 12
                </Typography>
              </Typography>
            </Alert>
            <Typography
              variant='title'
              component='h1'
              sx={{ mt: { xs: '20px', md: '50px' }, mb: { xs: '13px', md: '23px' } }}
            >
              {t('create_your_account')}
            </Typography>
            <Input
              fullWidth
              name='firstname'
              label='your_name'
              control={form.control}
              autoComplete='username'
              placeholder='enter_your_name'
            />
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
            <WrapInputs>
              {form.watch('tab') === AUTH_TABS.phone.value && (
                <InputPhone
                  fullWidth
                  name='phone'
                  label='phone_number'
                  control={form.control}
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
                control={form.control}
                label='create_password'
                placeholder='enter_password'
                onChange={e => {
                  const cleaned = e.target.value.replace(/\s/g, '')
                  form.setValue('password', cleaned, { shouldValidate: true })
                }}
              />
              <InputPassword
                fullWidth
                name='password2'
                control={form.control}
                label='repeat_password'
                placeholder='enter_password'
                onChange={e => {
                  const cleaned = e.target.value.replace(/\s/g, '')
                  form.setValue('password2', cleaned, { shouldValidate: true })
                }}
              />
            </WrapInputs>
            <InputCheckbox
              name='policy'
              control={form.control}
              sx={{
                '.MuiButtonBase-root': {
                  marginTop: '-9px !important',
                },
              }}
              label={
                <Typography variant='text'>
                  <Trans
                    i18nKey='i_have_read_and_agree_to_the_public_offer_and_the_privacy_policy'
                    components={{
                      publicOffer: (
                        <Typography
                          target='_blank'
                          component={Link}
                          to={`${ROUTER.SIGN_UP}/${ROUTER.PUBLIC_OFFER}`}
                          variant='inherit'
                          sx={theme => ({
                            fontWeight: 500,
                            textDecorationLine: 'underline',
                            color: theme.palette.allColors.PURPLE,
                          })}
                        />
                      ),
                      privacyPolicy: (
                        <Typography
                          target='_blank'
                          component={Link}
                          variant='inherit'
                          to={`${ROUTER.SIGN_UP}/${ROUTER.PRIVACY_POLICY}`}
                          sx={theme => ({
                            fontWeight: 500,
                            textDecorationLine: 'underline',
                            color: theme.palette.allColors.PURPLE,
                          })}
                        />
                      ),
                    }}
                  />
                </Typography>
              }
            />
            <Box mt='31px'>
              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                loading={isLoading}
                variant='contained'
              >
                {t('sign_up')}
              </LoadingButton>
              <Typography mt='18px' variant='text' fontSize='16px' align='center' component='h3'>
                {t('already_have_an_account')}
                <Link to={ROUTER.AUTH}>
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
                    {t('sign_in')}
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </HocGoogleVerfication>
  )
}

export default Page
