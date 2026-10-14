import Box from '@mui/material/Box'
import { Address } from '../address'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { Select } from '@/components/selects/select'
import { numberFormat } from '@/utils/number-format'
import { DELIVERY_TYPES } from '@/constants/delivery'
import InputAdornment from '@mui/material/InputAdornment'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputPhone } from '@/components/inputs/input-phone'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { type FormalizationProps, useFormalization } from './useFormalization'
import { ReactComponent as IconPaymentCard } from '@/assets/icons/payment-card.svg'
import { pastedPhone } from '@/utils/clipboard'

export const Formalization = (props: FormalizationProps) => {
  const { t } = useTranslation()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const {
    form,
    value,
    total,
    create,
    setTrue,
    onSubmit,
    setFalse,
    addresses,
    checkUser,
    formDetail,
    handleChangePhone,
  } = useFormalization(props)

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack>
          <Typography variant='title70' fontSize='16px'>
            {numberFormat(total)} {currency}
          </Typography>
          <Typography variant='text'>{t('total')}</Typography>
        </Stack>
        <Button size='small' sx={{ borderRadius: '8px', fontSize: '12px' }} onClick={setTrue}>
          {t('formalization')}
        </Button>
      </Stack>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <FormProvider {...form}>
          <Stack flexGrow={1} component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30'>{t('checkout')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            {formDetail.isLoading ? (
              <Spinner center />
            ) : (
              <Stack p='0 32px'>
                <Stack mb='24.5px' gap='42px'>
                  <Stack gap='25px'>
                    <InputPhone
                      fullWidth
                      name='phone'
                      label='phone_number'
                      control={form.control}
                      onChange={handleChangePhone}
                      placeholder='enter_phone_number'
                      onPaste={async event => {
                        form.setValue('phone', await pastedPhone(event))
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Stack direction='row' alignItems='center'>
                              {checkUser.isLoading ? (
                                <Spinner
                                  center
                                  sx={{
                                    '.MuiCircularProgress-root': {
                                      width: '20px !important',
                                      height: '20px !important',
                                    },
                                  }}
                                />
                              ) : null}
                            </Stack>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Input
                      fullWidth
                      name='customer_name'
                      label='customer_name'
                      control={form.control}
                      placeholder='enter_name'
                    />
                  </Stack>
                  <Address services={formDetail.data?.data.services ?? []} addresses={addresses} />
                  <Stack>
                    <Typography mb='10px' variant='title90' fontWeight={500}>
                      {t('payment')}
                    </Typography>
                    <Select
                      name='payment_type'
                      control={form.control}
                      placeholder='select_payment_type'
                      startAdornment={<IconPaymentCard />}
                      options={formDetail.data?.data.payments ?? []}
                    />
                  </Stack>
                </Stack>
                <Divider />
                <Stack gap='8px' m='13.5px 0 43px'>
                  <Typography variant='title90' fontWeight={500}>
                    {t('total')}
                  </Typography>
                  <Stack gap='16px'>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='text110'>{t('price_of_items')}</Typography>
                      <Typography variant='title10' fontSize='14px'>
                        {numberFormat(total)} {currency}
                      </Typography>
                    </Stack>
                    {form.watch('delivery_type') === DELIVERY_TYPES.DELIVERY.type && (
                      <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='text110'>{t('delivery')}</Typography>
                        <Typography variant='title10' fontSize='14px'>
                          {form.watch('delivery').delivery_type === 'FREE' ? (
                            'Free'
                          ) : form.watch('delivery').delivery_type === 'CUSTOM' ? (
                            form.watch('delivery').delivery
                          ) : (
                            <>
                              {numberFormat(form.watch('delivery').delivery ?? 0)} {currency}
                            </>
                          )}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                  <Stack
                    mt='45px'
                    gap='60px'
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <LoadingButton
                      fullWidth
                      type='submit'
                      size='extraLarge'
                      variant='contained'
                      loading={create.isLoading}
                    >
                      {t('create_order')}
                    </LoadingButton>
                    <Stack sx={{ whiteSpace: 'nowrap' }}>
                      <Typography align='right' variant='title70'>
                        {form.watch('delivery').delivery_type === 'FREE' ||
                        form.watch('delivery').delivery_type === 'CUSTOM'
                          ? numberFormat(total)
                          : numberFormat(total + (form.watch('delivery').delivery ?? 0))}{' '}
                        {currency}
                      </Typography>
                      <Typography align='right' variant='text'>
                        {t('total')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Stack>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
