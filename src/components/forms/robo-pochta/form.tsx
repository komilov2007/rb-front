import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import { useRoboPochta } from './useRoboPochta'
import { ProductStock } from '../product-stock'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectCityMerchant } from '@/components/selects/select-city-merchant'
import { SelectPaymentTypes } from '@/components/selects/select-payment-types'

export const FormRoboPochta = (props: RoboMarketAppDetaiProps) => {
  const { t } = useTranslation()
  const {
    open,
    form,
    modal,
    hasToken,
    onSubmit,
    getMerchant,
    postMerchant,
    handleDelete,
    deleteMerchant,
  } = useRoboPochta()

  return (
    <>
      {getMerchant.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <Button onClick={modal.setTrue} variant='outlined-purple'>
          {t(hasToken ? 'installed' : 'install')}
        </Button>
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
                        <Typography variant='title50'>Robo Pochta</Typography>
                        <Typography variant='text270'>{t('robo_pochta_description')}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack gap='10px' mt='20px'>
                  {open.value || !hasToken ? (
                    <>
                      <Stack gap='25px'>
                        <InputPriceFormat
                          name='min_price'
                          control={form.control}
                          placeholder='enter_price'
                          label='minimum_order_amount'
                        />
                        <SelectPaymentTypes />
                        <SelectCityMerchant service_type='TEZBOR_DELIVERY' />
                      </Stack>
                      <Stack gap='14px' justifyContent='flex-end' direction='row'>
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={open.setFalse}
                          sx={{ minWidth: '130px' }}
                        >
                          {t('cancel')}
                        </LoadingButton>
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
                    </>
                  ) : (
                    <>
                      <Stack gap='14px' justifyContent='flex-end' direction='row'>
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={handleDelete}
                          sx={{ minWidth: '130px' }}
                          loading={deleteMerchant.isLoading}
                        >
                          {t('delete')}
                        </LoadingButton>
                        <Button
                          size='small'
                          variant='contained'
                          onClick={open.setTrue}
                          sx={{ minWidth: '130px' }}
                        >
                          {t('edit')}
                        </Button>
                      </Stack>
                    </>
                  )}
                </Stack>
              </Stack>
            </FormProvider>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
      <ProductStock />
    </>
  )
}
