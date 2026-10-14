import Box from '@mui/material/Box'
import { Platform } from '../platform'
import Stack from '@mui/material/Stack'
import { useFilters } from './useFilters'
import Button from '@mui/material/Button'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { type OrderByStatusProps } from '@/types/order'
import { OrderTypes } from '@/components/forms/order-types'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { DatePeriod } from '@/components/forms/date-period'
import { OrderStatus } from '@/components/forms/order-status'
import { PaymentTypes } from '@/components/forms/payment-types'
import { SelectBranch } from '@/components/selects/select-branch'
import { SelectEmployee } from '@/components/selects/select-employee'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFilterOutline } from '@/assets/icons/filter-outline.svg'

export const Filters = (props: OrderByStatusProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit } = useFilters(props)

  return (
    <>
      <Button
        fullWidth
        startIcon={<IconFilterOutline />}
        variant='outlined-white'
        onClick={setTrue}
      >
        {t('filters')}
      </Button>
      <SwipeableDrawer
        open={value}
        anchor='right'
        onOpen={setTrue}
        onClose={setFalse}
        className='small'
      >
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
              <Stack gap='20px'>
                <SelectBranch all name='branch' control={form.control} />
                <SelectEmployee />
                <PaymentTypes />
                <OrderTypes />
                <Platform />
                {(props.status === 'ALL' ||
                  props.status === 'LATE' ||
                  props.status === 'HISTORY') && <OrderStatus />}
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
