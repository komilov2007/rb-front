import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import { useFilters } from './useFilters'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { numberFormat } from '@/utils/number-format'
import { DatePeriod } from '@/components/forms/date-period'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { SelectCity } from '@/components/selects/select-city'
import { SelectCountry } from '@/components/selects/select-country'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFilterOutline } from '@/assets/icons/filter-outline.svg'

export const Filters = () => {
  const { t } = useTranslation()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const {
    sum,
    form,
    value,
    orders,
    setTrue,
    SUM_MAX,
    setFalse,
    onSubmit,
    handleSum,
    ORDER_MAX,
    handleOrders,
  } = useFilters()

  return (
    <>
      <Button startIcon={<IconFilterOutline />} variant='outlined-white' onClick={setTrue}>
        {t('filters')}
      </Button>
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
              <Typography variant='title30'>{t('filters')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack gap='24px'>
                <SelectCountry />
                <SelectCity />
              </Stack>
              <Stack mt='41px' gap='54px'>
                <Stack>
                  <Typography mb='13px' variant='title10' fontWeight='400'>
                    {t('order_number')}
                  </Typography>
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='title20' fontSize='12px'>
                      0
                    </Typography>
                    <Typography variant='title20' fontSize='12px'>
                      {ORDER_MAX}
                    </Typography>
                  </Stack>
                  <Slider disableSwap max={ORDER_MAX} value={orders} onChange={handleOrders} />
                  <Stack alignItems='flex-end'>
                    <Typography variant='title10' fontSize='12px'>
                      {orders[0]}-{orders[1]}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography mb='13px' variant='title10' fontWeight='400'>
                    {t('order_amount', { currency })}
                  </Typography>
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='title20' fontSize='12px'>
                      0
                    </Typography>
                    <Typography variant='title20' fontSize='12px'>
                      {numberFormat(SUM_MAX)}
                    </Typography>
                  </Stack>
                  <Slider max={SUM_MAX} disableSwap value={sum} onChange={handleSum} />
                  <Stack alignItems='flex-end'>
                    <Typography variant='title10' fontSize='12px'>
                      {numberFormat(sum[0])}-{numberFormat(sum[1])}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack maxWidth='290px'>
                <DatePeriod />
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained'>
                  {t('filter')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
