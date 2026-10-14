import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useFormEmu } from './useFormEmu'
import Skeleton from '@mui/material/Skeleton'
import { FormProvider } from 'react-hook-form'
import { ProductStock } from '../product-stock'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectCityMerchant } from '@/components/selects/select-city-merchant'
import { SelectPaymentTypes } from '@/components/selects/select-payment-types'

export const FormEmu = (props: RoboMarketAppDetaiProps) => {
  const {
    t,
    open,
    form,
    modal,
    hasToken,
    onSubmit,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  } = useFormEmu()

  const content = () => (
    <>
      <Box p='5px 32px 50px'>
        <Wrapper>
          <FormProvider {...form}>
            <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
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
                    <img src={props.icon} alt={props.name} />
                  </Stack>
                  <Stack justifyContent='center'>
                    <Typography variant='title50'>EMU</Typography>
                    <Typography variant='text270'>{t('company_guarantee_description')}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              {open.value || !hasToken ? (
                <Stack gap='15px' marginTop={'20px'}>
                  <Input
                    fullWidth
                    name='username'
                    label='username'
                    control={form.control}
                    placeholder='enter_username'
                  />
                  <Input
                    fullWidth
                    name='password'
                    label='password'
                    control={form.control}
                    placeholder='enter_password'
                  />
                  <InputPriceFormat
                    name='min_price'
                    control={form.control}
                    placeholder='enter_price'
                    label='minimum_order_amount'
                  />
                  <SelectPaymentTypes />
                  <SelectCityMerchant service_type='FARGO_DELIVERY' />
                  <Stack gap='15px' justifyContent='flex-end' direction='row'>
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
                    <LoadingButton
                      size='small'
                      type='submit'
                      variant='contained'
                      sx={{ minWidth: '130px' }}
                      loading={postMerchant.isLoading}
                    >
                      {t('save')}
                    </LoadingButton>
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
            </Box>
          </FormProvider>
        </Wrapper>
      </Box>
    </>
  )

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
          {t(hasToken ? 'installed' : 'install')}
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
        {content()}
      </SwipeableDrawer>
      <ProductStock />
    </>
  )
}
