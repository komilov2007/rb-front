import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import { ProductStock } from '../product-stock'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import ImageNoorDelivery from '@/assets/images/noor.png'
import { useFormNoorDelivery } from './useFormNoorDelivery'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectCityMerchant } from '@/components/selects/select-city-merchant'
import { SelectPaymentTypes } from '@/components/selects/select-payment-types'
import { InputSwitch } from '@/components/inputs/input-switch'

export const FormNoorDelivery = () => {
  const { t } = useTranslation()
  const {
    form,
    open,
    modal,
    hasToken,
    onSubmit,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  } = useFormNoorDelivery()

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
        <Box p='24px'>
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
                      <img src={ImageNoorDelivery} alt='Noor delivery logo' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Noor delivery</Typography>
                      <Typography variant='text270'>
                        {t('noor_delivery_is_an_automatic_order_delivery_service')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                {open.value || !hasToken ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <InputTextarea
                      name='token'
                      label='token'
                      control={form.control}
                      sx={{ height: '160px' }}
                      placeholder='enter_the_token_here'
                    />
                    <Stack pb='15px'>
                      <InputSwitch
                        name='pre_order_enabled'
                        control={form.control}
                        label='delivery_time'
                      />
                    </Stack>
                    <InputPriceFormat
                      fullWidth
                      name='min_price'
                      control={form.control}
                      placeholder='enter_price'
                      label='minimum_order_amount'
                    />
                    <SelectPaymentTypes />
                    <SelectCityMerchant service_type='NOOR_DELIVERY' />
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
