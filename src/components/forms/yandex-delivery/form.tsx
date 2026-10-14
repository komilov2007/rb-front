import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import { TAXI_CLASS } from '@/constants/yandex'
import { ProductStock } from '../product-stock'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Select } from '@/components/selects/select'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useFormYandexDelivery } from './useFormYandexMarket'
import ImageYandexDelivery from '@/assets/images/yandex-delivery.jpeg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputSwitch } from '@/components/inputs/input-switch'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectCityMerchant } from '@/components/selects/select-city-merchant'
import { SelectPaymentTypes } from '@/components/selects/select-payment-types'

export const YandexDelivery = () => {
  const { t } = useTranslation()
  const { form, open, modal, onSubmit, getMerchant, handleDelete, postMerchant, deleteMerchant } =
    useFormYandexDelivery()
  const hasToken = !!getMerchant.data?.data?.credentials?.token

  return (
    <>
      {getMerchant.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <LoadingButton
          onClick={modal.setTrue}
          variant='outlined-purple'
          loading={getMerchant.isLoading}
        >
          {t(getMerchant.data?.data?.credentials?.token ? 'installed' : 'install')}
        </LoadingButton>
      )}
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box
          display='flex'
          p='7px 7px 0 32px'
          component='header'
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Box>
        <Box className='content'>
          <Wrapper>
            <FormProvider {...form}>
              <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
                <Stack direction='row' justifyContent='space-between'>
                  <Stack gap='10px' direction='row'>
                    <Stack
                      sx={{
                        img: {
                          width: '36px',
                          height: '36px',
                        },
                      }}
                    >
                      <img src={ImageYandexDelivery} alt='YandexDelivery' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Yandex Delivery</Typography>
                      <Typography variant='text270' maxWidth='300px'>
                        {t('yandex_delivery_is_an_automatic_order_delivery_service')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                {open.value || !hasToken ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <Input
                      fullWidth
                      name='token'
                      label='token'
                      control={form.control}
                      placeholder='enter_token'
                    />
                    <Select
                      name='taxi_class'
                      label='taxi_class'
                      options={TAXI_CLASS}
                      control={form.control}
                      placeholder='select_taxi_class'
                    />
                    <InputPriceFormat
                      name='min_price'
                      control={form.control}
                      placeholder='enter_price'
                      label='minimum_order_amount'
                    />
                    <InputSwitch name='door_to_door' control={form.control} label='door_to_door' />
                    <SelectPaymentTypes />
                    <SelectCityMerchant service_type='YANDEX_DELIVERY' />
                    <Stack gap='15px' justifyContent='flex-end' direction='row'>
                      <LoadingButton
                        size='small'
                        type='submit'
                        variant='contained'
                        sx={{ minWidth: '130px' }}
                        loading={postMerchant.isLoading}
                      >
                        {t('save')}
                      </LoadingButton>
                      {open.value && (
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={open.setFalse}
                          sx={{ minWidth: '130px' }}
                        >
                          {t('cancel')}
                        </LoadingButton>
                      )}
                    </Stack>
                  </Stack>
                ) : (
                  <Stack gap='15px' justifyContent='flex-end' direction='row' marginTop={'20px'}>
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      onClick={handleDelete}
                      sx={{ minWidth: '130px' }}
                      loading={deleteMerchant.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                      size='small'
                      variant='contained'
                      onClick={open.setTrue}
                      sx={{ minWidth: '130px' }}
                    >
                      {t('edit')}
                    </LoadingButton>
                  </Stack>
                )}
              </Stack>
            </FormProvider>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
      <ProductStock />
    </>
  )
}
