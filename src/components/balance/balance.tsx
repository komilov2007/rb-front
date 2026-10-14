import Box from '@mui/material/Box'
import { Spinner } from '../spinner'
import { PAYMENTS } from './constants'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import { Link } from 'react-router-dom'
import { Input } from '../inputs/input'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { CreditCards } from './credit-cards'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import RadioGroup from '@mui/material/RadioGroup'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { numberFormat } from '@/utils/number-format'
import ImageAccount from '@/assets/images/account.png'
import { forwardRef, useImperativeHandle } from 'react'
import { AddCreditCard } from '../forms/add-credit-card'
import InputAdornment from '@mui/material/InputAdornment'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useBalance, type BalanceProps } from './useBalance'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconError } from '@/assets/icons/error.svg'
import { ReactComponent as IconWallet } from '@/assets/icons/wallet.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { WrapImage, WrapIconPlus, BalanceButton, WrapIconWallet } from './style'
import { getTitle } from '@/constants/domain-themes'

export const Balance = forwardRef((props: BalanceProps, ref) => {
  const account = useProfileStore(state => state.me?.account ?? 0)
  const hasAccessStripe = getTitle().stripe

  const {
    t,
    form,
    cards,
    value,
    status,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleClose,
    paymentStatus,
    payment_status,
  } = useBalance(props)

  useImperativeHandle(ref, () => {
    return {
      setTrue,
    }
  }, [setTrue])

  return (
    <>
      {props.variant === 'header' && (
        <>
          {cards.isLoading ? (
            <Skeleton width='200px' height='46px' variant='rounded' sx={{ borderRadius: '29px' }} />
          ) : cards.data?.data.length === 0 && getTitle().atmos ? (
            <AddCreditCard variant='header' handleOpen={setTrue}>
              <BalanceButton>
                <Stack gap='8px' direction='row' alignItems='center'>
                  <WrapIconWallet>
                    <IconWallet />
                  </WrapIconWallet>
                  <Stack alignItems='flex-start' justifyContent='center'>
                    <Typography variant='text' fontSize='10px'>
                      {t('your_balance')}
                    </Typography>
                    <Typography variant='title80' fontSize='13px'>
                      {numberFormat(account)} UZS
                    </Typography>
                  </Stack>
                </Stack>
                <WrapIconPlus>
                  <IconPlus />
                </WrapIconPlus>
              </BalanceButton>
            </AddCreditCard>
          ) : (
            <BalanceButton onClick={setTrue}>
              <Stack gap='8px' direction='row' alignItems='center'>
                <WrapIconWallet>
                  <IconWallet />
                </WrapIconWallet>
                <Stack alignItems='flex-start' justifyContent='center'>
                  <Typography variant='text' fontSize='10px'>
                    {t('your_balance')}
                  </Typography>
                  <Typography variant='title80' fontSize='13px'>
                    {numberFormat(account)} UZS
                  </Typography>
                </Stack>
              </Stack>
              <WrapIconPlus>
                <IconPlus />
              </WrapIconPlus>
            </BalanceButton>
          )}
        </>
      )}
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <WrapImage>
              <img src={ImageAccount} alt='account' />
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
              {props.variant === 'pricing-plan' && (
                <Typography
                  mb='18px'
                  align='center'
                  component='h3'
                  fontSize='24px'
                  variant='title30'
                  color={theme => theme.palette.allColors.RED}
                >
                  {t('there_are_not_enough_funds_in_your_account')}
                </Typography>
              )}
              <Typography
                component='h4'
                align='center'
                variant='text210'
                color={theme => theme.palette.allColors.GRAY560}
              >
                {t('your_current_balance')}{' '}
                <Typography component='span' variant='text210'>
                  {numberFormat(account)} UZS
                </Typography>
              </Typography>
            </WrapImage>
            <Box className='content'>
              <Stack p='17px 0'>
                <InputPriceFormat
                  fullWidth
                  name='amount'
                  control={form.control}
                  label='fill_your_account'
                  placeholder='enter_amount'
                  InputProps={{
                    startAdornment: undefined,
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography variant='text' color={theme => theme.palette.allColors.PURPLE}>
                          UZS
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <Controller
                  name='payment_type'
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <RadioGroup error={fieldState.invalid} {...field}>
                        <CreditCards data={cards.data?.data ?? []} />
                        <Stack mt='36px' mb='60px' gap='12px'>
                          <Typography component='h2' textTransform='uppercase'>
                            {t('payment_systems')}
                          </Typography>
                          <Stack direction='row' sx={{ ml: '-9px', gap: '25px', flexWrap: 'wrap' }}>
                            {PAYMENTS.map(({ Icon, value }) =>
                              value === 'STRIPE' && !hasAccessStripe ? null : (
                                <FormControlLabel
                                  key={value}
                                  value={value}
                                  control={<Radio />}
                                  label={
                                    <Stack
                                      direction='row'
                                      alignItems='center'
                                      justifyContent='center'
                                      sx={{
                                        svg: {
                                          width: '60px',
                                        },
                                      }}
                                    >
                                      <Icon height={30} />
                                      {value === 'BANK' && (
                                        <Typography variant='title40'>{t('via_bank')}</Typography>
                                      )}
                                    </Stack>
                                  }
                                />
                              ),
                            )}
                          </Stack>
                          {form.watch('payment_type') === 'BANK' && (
                            <Input
                              label='tinpinfl'
                              name='tin_or_pinfl'
                              control={form.control}
                              placeholder='enter_tinpinfl'
                            />
                          )}
                        </Stack>
                      </RadioGroup>
                    )
                  }}
                />
              </Stack>
            </Box>
            <Box className='footer' sx={{ justifyContent: 'space-between !important' }}>
              <Typography ml='20px' variant='title110'>
                {form.watch('amount')
                  ? `${numberFormat(form.watch('amount') as number)} UZS`
                  : null}
              </Typography>
              <Stack flexGrow={1} gap='14px' width='100%' direction='row' maxWidth='150px'>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t(form.watch('payment_type') === 'BANK' ? 'send_application' : 'pay_now')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
      <Dialog
        fullWidth
        scroll='body'
        onClose={handleClose}
        open={status === 'checking' || payment_status === '2'}
      >
        <Stack minHeight='400px' alignItems='center' justifyContent='center' p='100px 50px 50px'>
          {status === 'checking' || payment_status === '2' ? (
            paymentStatus.isLoading ? (
              <Spinner />
            ) : (
              <>
                <Stack
                  alignItems='flex-end'
                  sx={{
                    top: 0,
                    right: 0,
                    mb: '32px',
                    p: '20px 20px 0 0',
                    position: 'absolute',
                  }}
                >
                  <IconButton onClick={handleClose}>
                    <IconRemove />
                  </IconButton>
                </Stack>
                {paymentStatus.data?.data.state === 'finished' || payment_status === '2' ? (
                  <>
                    <img src='/payment.gif' alt='payment.gif' style={{ height: '250px' }} />
                    <Stack alignItems='center'>
                      <Typography
                        m='34px 0 17px'
                        align='center'
                        variant='title130'
                        color={theme => theme.palette.allColors.BLACK140}
                      >
                        {t('payment_successfully_done')}
                      </Typography>
                      <Typography
                        mb='42px'
                        align='center'
                        variant='text210'
                        color={theme => theme.palette.allColors.BLACK150}
                      >
                        {t('you_can_use_the_system_again')}
                      </Typography>
                      <Button
                        fullWidth
                        component={Link}
                        size='extraLarge'
                        to={ROUTER.ADMIN_HOME}
                        sx={{ maxWidth: '212px' }}
                      >
                        {t('back_to_home')}
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack alignItems='center'>
                      <IconError />
                    </Stack>
                    <Stack alignItems='center'>
                      <Typography
                        m='34px 0 17px'
                        align='center'
                        variant='title130'
                        color={theme => theme.palette.allColors.BLACK140}
                      >
                        {t('payment_failed')}
                      </Typography>
                      <Typography
                        mb='42px'
                        align='center'
                        variant='text210'
                        color={theme => theme.palette.allColors.BLACK150}
                      >
                        {t('some_error_occurred_please_try_again')}
                      </Typography>
                      <Button
                        fullWidth
                        size='extraLarge'
                        onClick={handleClose}
                        sx={{ maxWidth: '212px' }}
                      >
                        {t('close')}
                      </Button>
                    </Stack>
                  </>
                )}
              </>
            )
          ) : null}
        </Stack>
      </Dialog>
    </>
  )
})
