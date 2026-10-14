import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useSwitch } from './useSwitch'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import MuiSwitch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import LoadingButton from '@mui/lab/LoadingButton'
import { type PaymentProps } from '@/types/payment'
import { PAYMENT_TYPES } from '@/constants/payment'
import { forwardRef, useImperativeHandle } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { Alert } from '@/components/alert'
import { InputPassword } from '@/components/inputs/input-password'

export const Switch = forwardRef((props: PaymentProps, ref) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, isLoading, onSubmit, handleChange, checked } =
    useSwitch(props)
  useImperativeHandle(ref, () => {
    return {
      value,
      setTrue,
      setFalse,
    }
  }, [value, setTrue, setFalse])
  const preventAutofillProps = {
    autoComplete: 'new-password',
    inputProps: {
      autoComplete: 'new-password',
      autoCorrect: 'off',
      autoCapitalize: 'none',
      spellCheck: false,
    },
  }
  const click =
    form.getValues('slug') === 'click_api' || form.getValues('slug') === 'click_superapp'

  return (
    <>
      <MuiSwitch
        disabled={isLoading}
        onChange={handleChange}
        onClick={e => {
          e.stopPropagation()
        }}
        checked={checked}
      />
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30'>
                {props.slug === 'unversal'
                  ? t('add_token')
                  : `${t('add')} ${PAYMENT_TYPES[props.state].label}`}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack gap='24px'>
                {form.getValues('slug') === 'robo_pay' ? (
                  <>
                    <Input
                      fullWidth
                      name='store_id'
                      label='Store id'
                      control={form.control}
                      placeholder='enter_store_id'
                    />
                    <Alert>
                      <Typography
                        variant='text'
                        lineHeight='22px'
                        color={theme => theme.palette.allColors.BLACK30}
                      >
                        {t('connect_to_robo_pay_text', { value: PAYMENT_TYPES[props.state].label })}
                      </Typography>
                    </Alert>
                    <InputCheckbox
                      id='code'
                      sx={{ ml: '-9px' }}
                      control={form.control}
                      name='self_fiscalization'
                      label='self_fiscalization'
                    />
                  </>
                ) : form.getValues('slug') === 'unversal' ||
                  form.getValues('slug') === 'uzum-nasiya' ? (
                  <Input
                    fullWidth
                    name='token'
                    label='token'
                    control={form.control}
                    placeholder='enter_token'
                  />
                ) : form.getValues('slug') === 'payme' ? (
                  <>
                    <Input
                      fullWidth
                      name='merchant_id'
                      label='Merchant ID'
                      control={form.control}
                      placeholder='enter_merchant_id'
                    />
                    <Input
                      fullWidth
                      name='key'
                      label='Key'
                      control={form.control}
                      placeholder='enter_key'
                    />
                  </>
                ) : form.getValues('slug') === 'stripe' ? (
                  <Input
                    fullWidth
                    label='Key'
                    name='secret_key'
                    control={form.control}
                    placeholder='enter_key'
                  />
                ) : form.getValues('slug') === 'variant' ? (
                  <>
                    <Input
                      fullWidth
                      name='login'
                      label='phone_number'
                      control={form.control}
                      placeholder='enter_phone_number'
                      {...preventAutofillProps}
                    />
                    <InputPassword
                      fullWidth
                      name='password'
                      label='password'
                      control={form.control}
                      placeholder='enter_password'
                      {...preventAutofillProps}
                    />
                    <Input
                      fullWidth
                      name='minimal_amount'
                      label='min_amount'
                      control={form.control}
                      placeholder='enter_min_amount'
                      type='number'
                      {...preventAutofillProps}
                      inputProps={{
                        ...preventAutofillProps.inputProps,
                        min: 0,
                      }}
                    />{' '}
                    <Input
                      fullWidth
                      name='markup_3_months'
                      label='markup_3_percent'
                      control={form.control}
                      placeholder='markup_is_a_required_field'
                      type='number'
                      {...preventAutofillProps}
                    />
                    <Input
                      fullWidth
                      name='markup_6_months'
                      label='markup_6_percent'
                      control={form.control}
                      placeholder='markup_is_a_required_field'
                      type='number'
                      {...preventAutofillProps}
                    />
                    <Input
                      fullWidth
                      name='markup_9_months'
                      label='markup_9_percent'
                      control={form.control}
                      placeholder='markup_is_a_required_field'
                      type='number'
                      {...preventAutofillProps}
                    />
                    <Input
                      fullWidth
                      name='markup_12_months'
                      label='markup_12_percent'
                      control={form.control}
                      placeholder='markup_is_a_required_field'
                      type='number'
                      {...preventAutofillProps}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      fullWidth
                      name='merchant_id'
                      label='Merchant ID'
                      control={form.control}
                      placeholder='enter_merchant_id'
                    />
                    <Input
                      fullWidth
                      label={click ? 'Service ID' : 'Key'}
                      name='service_id'
                      control={form.control}
                      placeholder='enter_key'
                    />
                    {click && (
                      <>
                        <Input
                          fullWidth
                          name='merchant_user_id'
                          control={form.control}
                          label='Merchant user ID'
                          placeholder='enter_merchant_user_id'
                        />
                        <Input
                          fullWidth
                          name='secret_key'
                          label='Secret key'
                          control={form.control}
                          placeholder='enter_secret_key'
                        />
                        <InputCheckbox
                          id='code'
                          sx={{ ml: '-9px' }}
                          control={form.control}
                          name='self_fiscalization'
                          label='self_fiscalization'
                        />
                        {form.watch('self_fiscalization') && (
                          <>
                            <Controller
                              name='natural'
                              control={form.control}
                              render={({ field, fieldState }) => {
                                return (
                                  <RadioGroup error={fieldState.invalid} {...field}>
                                    <Stack>
                                      <Typography component='h2'>{t('activity_type')}</Typography>
                                      <Stack
                                        direction='row'
                                        sx={{ ml: '-9px', gap: '25px', flexWrap: 'nowrap' }}
                                      >
                                        <FormControlLabel
                                          value='legal'
                                          control={<Radio />}
                                          label={t('legal_entity')}
                                        />
                                        <FormControlLabel
                                          value='individual'
                                          control={<Radio />}
                                          label={t('individual')}
                                        />
                                      </Stack>
                                    </Stack>
                                  </RadioGroup>
                                )
                              }}
                            />
                            <Input
                              fullWidth
                              name='tin_or_pinfl'
                              control={form.control}
                              placeholder='enter_tinpinfl'
                              label={form.watch('natural') === 'individual' ? 'PINFL' : 'TIN'}
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t('save')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
})
