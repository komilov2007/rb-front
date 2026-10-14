import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Spinner } from '@/components/spinner'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Trans, useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import { PolicyGeneral } from '@/components/policy-general'
import { InputPhone } from '@/components/inputs/input-phone'
import { UploadCrop } from '@/components/uploads/upload-crop'
import { pastedPhone } from '@/utils/clipboard'

const Page = () => {
  const { t } = useTranslation()
  const {
    form,
    email,
    phone,
    verify,
    onSubmit,
    isLoading,
    handleVerify,
    handleCancel,
    defaultValues,
    handleUpdateEmail,
    handleUpdatePhone,
  } = usePage()

  return (
    <Stack
      flexGrow={1}
      p='24px 32px'
      maxWidth='478px'
      component='form'
      justifyContent='space-between'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Stack>
        <Typography variant='title10' component='h3'>
          {t('edit_profile')}
        </Typography>
        <Stack p='28px 0 62px'>
          <UploadCrop variant='avatar' name='photo' control={form.control} />
        </Stack>
        <Stack gap='28px'>
          <Input
            fullWidth
            label='username'
            name='firstname'
            control={form.control}
            placeholder='enter_username'
          />
          {email.isSuccess ? (
            <Stack gap='14px'>
              <Typography
                variant='text110'
                lineHeight='23px'
                color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
              >
                <Trans
                  i18nKey='the_verification_code_has_been_sent_to_your_device_please_enter_code_below'
                  values={{ value: `****${form.watch('email')?.slice(-8)}` }}
                  components={{
                    linkTag: (
                      <Typography
                        pl='5px'
                        component='span'
                        variant='inherit'
                        color={theme => theme.palette.allColors.PURPLE10}
                      />
                    ),
                  }}
                />
              </Typography>
              <Input
                fullWidth
                name='code'
                control={form.control}
                placeholder='Enter code'
                InputProps={{
                  endAdornment: verify.isLoading ? (
                    <Stack pr='10px'>
                      <Spinner
                        center
                        sx={{
                          '.MuiCircularProgress-root': {
                            width: '20px !important',
                            height: '20px !important',
                          },
                        }}
                      />
                    </Stack>
                  ) : form.formState.errors.code ? undefined : (
                    <InputAdornment position='end'>
                      <Button variant='text' size='extraSmall' onClick={handleVerify('email')}>
                        {t('verify')}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          ) : (
            <Input
              fullWidth
              name='email'
              label='email_address'
              control={form.control}
              autoComplete='username'
              placeholder='enter_email'
              InputProps={{
                endAdornment: email.isLoading ? (
                  <Stack pr='10px'>
                    <Spinner
                      center
                      sx={{
                        '.MuiCircularProgress-root': {
                          width: '20px !important',
                          height: '20px !important',
                        },
                      }}
                    />
                  </Stack>
                ) : form.watch('email') !== defaultValues.email && !form.formState.errors.email ? (
                  <InputAdornment position='end'>
                    <Button variant='text' size='extraSmall' onClick={handleUpdateEmail}>
                      {t('save')}
                    </Button>
                  </InputAdornment>
                ) : undefined,
              }}
            />
          )}
          {phone.isSuccess ? (
            <Stack gap='14px'>
              <Typography
                variant='text110'
                lineHeight='23px'
                color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
              >
                <Trans
                  i18nKey='the_verification_code_has_been_sent_to_your_device_please_enter_code_below'
                  values={{ value: `****${form.watch('phone').slice(-4)}` }}
                  components={{
                    linkTag: (
                      <Typography
                        pl='5px'
                        component='span'
                        variant='inherit'
                        color={theme => theme.palette.allColors.PURPLE10}
                      />
                    ),
                  }}
                />
              </Typography>
              <Input
                fullWidth
                name='code'
                control={form.control}
                placeholder='Enter code'
                InputProps={{
                  endAdornment: verify.isLoading ? (
                    <Stack pr='10px'>
                      <Spinner
                        center
                        sx={{
                          '.MuiCircularProgress-root': {
                            width: '20px !important',
                            height: '20px !important',
                          },
                        }}
                      />
                    </Stack>
                  ) : form.formState.errors.code ? undefined : (
                    <InputAdornment position='end'>
                      <Button variant='text' size='extraSmall' onClick={handleVerify('phone')}>
                        {t('verify')}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          ) : (
            <InputPhone
              fullWidth
              name='phone'
              label='phone_number'
              control={form.control}
              placeholder='enter_phone_number'
              onPaste={async event => {
                form.setValue('phone', await pastedPhone(event))
              }}
              InputProps={{
                endAdornment: phone.isLoading ? (
                  <Stack pr='10px'>
                    <Spinner
                      center
                      sx={{
                        '.MuiCircularProgress-root': {
                          width: '20px !important',
                          height: '20px !important',
                        },
                      }}
                    />
                  </Stack>
                ) : form.watch('phone') !== defaultValues.phone && !form.formState.errors.phone ? (
                  <InputAdornment position='end'>
                    <Button variant='text' size='extraSmall' onClick={handleUpdatePhone}>
                      {t('save')}
                    </Button>
                  </InputAdornment>
                ) : undefined,
              }}
            />
          )}
        </Stack>
        <Stack alignItems='flex-end'>
          <Stack mt='48px' gap='14px' width='100%' direction='row' maxWidth='360px'>
            <Button fullWidth size='small' variant='outlined-transparent' onClick={handleCancel}>
              {t('cancel')}
            </Button>
            <LoadingButton
              fullWidth
              size='small'
              type='submit'
              variant='contained'
              loading={isLoading}
            >
              {t('save_changes')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ display: { sm: 'flex', md: 'none' } }}>
        <PolicyGeneral />
      </Stack>
    </Stack>
  )
}

export default Page
